import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getMultiFactorResolver,
  multiFactor,
  PhoneAuthProvider,
  PhoneMultiFactorGenerator,
  reload,
  reauthenticateWithCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  type MultiFactorError,
  type MultiFactorResolver,
  type User,
  updateProfile,
} from "@react-native-firebase/auth";
import { doc, serverTimestamp, setDoc } from "@react-native-firebase/firestore";

import { authentication, database } from "../config/firebase";

export type SignInResult = "signed-in" | "otp-required";

let pendingSignIn:
  | { resolver: MultiFactorResolver; verificationId: string }
  | undefined;
let pendingEnrollmentVerificationId: string | undefined;

export async function signIn(email: string, password: string): Promise<SignInResult> {
  try {
    await signInWithEmailAndPassword(authentication, email.trim(), password);
    return "signed-in";
  } catch (error) {
    if (getErrorCode(error) !== "auth/multi-factor-auth-required") {
      throw error;
    }

    const resolver = getMultiFactorResolver(authentication, error as MultiFactorError);
    const phoneFactor = resolver.hints.find(
      (factor) => factor.factorId === PhoneMultiFactorGenerator.FACTOR_ID,
    );

    if (!phoneFactor) {
      throw new Error("Tài khoản chưa có phương thức OTP điện thoại phù hợp.");
    }

    const verificationId = await new PhoneAuthProvider(
      authentication,
    ).verifyPhoneNumber({
      multiFactorHint: phoneFactor,
      session: resolver.session,
    });

    pendingSignIn = { resolver, verificationId };
    return "otp-required";
  }
}

export async function signUp(name: string, email: string, password: string) {
  const result = await createUserWithEmailAndPassword(
    authentication,
    email.trim(),
    password,
  );

  await updateProfile(result.user, { displayName: name.trim() });
  await setDoc(doc(database, "users", result.user.uid), {
    displayName: name.trim(),
    email: email.trim(),
    mfaEnabled: false,
    createdAt: serverTimestamp(),
  });
  await sendEmailVerification(result.user);

  return result.user;
}

export async function resendVerificationEmail() {
  const user = requireCurrentUser();
  await sendEmailVerification(user);
}

export async function refreshCurrentUser() {
  const user = requireCurrentUser();
  await reload(user);
  return authentication.currentUser;
}

export function hasPhoneMfa(user: User | null) {
  if (!user) {
    return false;
  }

  return multiFactor(user).enrolledFactors.some(
    (factor) => factor.factorId === PhoneMultiFactorGenerator.FACTOR_ID,
  );
}

export async function sendEnrollmentOtp(phoneNumber: string, password: string) {
  const user = requireCurrentUser();

  if (!user.emailVerified) {
    throw new Error("Bạn cần xác minh email trước khi thêm số điện thoại.");
  }

  if (!user.email) {
    throw new Error("Tài khoản không có email để xác thực lại.");
  }

  const credential = EmailAuthProvider.credential(user.email, password);
  await reauthenticateWithCredential(user, credential);

  const session = await multiFactor(user).getSession();
  pendingEnrollmentVerificationId = await new PhoneAuthProvider(
    authentication,
  ).verifyPhoneNumber({ phoneNumber, session });
}

export async function confirmEnrollmentOtp(code: string) {
  const user = requireCurrentUser();

  if (!pendingEnrollmentVerificationId) {
    throw new Error("Phiên gửi OTP đã hết hạn. Vui lòng gửi mã mới.");
  }

  const credential = PhoneAuthProvider.credential(
    pendingEnrollmentVerificationId,
    code,
  );
  const assertion = PhoneMultiFactorGenerator.assertion(credential);

  await multiFactor(user).enroll(assertion, "Số điện thoại chính");
  await setDoc(
    doc(database, "users", user.uid),
    { mfaEnabled: true, updatedAt: serverTimestamp() },
    { merge: true },
  );
  pendingEnrollmentVerificationId = undefined;
}

export async function confirmSignInOtp(code: string) {
  if (!pendingSignIn) {
    throw new Error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
  }

  const credential = PhoneAuthProvider.credential(
    pendingSignIn.verificationId,
    code,
  );
  const assertion = PhoneMultiFactorGenerator.assertion(credential);

  await pendingSignIn.resolver.resolveSignIn(assertion);
  pendingSignIn = undefined;
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(authentication, email.trim());
}

export async function logOut() {
  pendingSignIn = undefined;
  pendingEnrollmentVerificationId = undefined;
  return signOut(authentication);
}

export function getAuthErrorMessage(error: unknown) {
  const messages: Record<string, string> = {
    "auth/email-already-in-use": "Email này đã được sử dụng.",
    "auth/invalid-credential": "Email hoặc mật khẩu không chính xác.",
    "auth/invalid-email": "Địa chỉ email không hợp lệ.",
    "auth/missing-password": "Bạn chưa nhập mật khẩu.",
    "auth/network-request-failed": "Không thể kết nối mạng. Vui lòng thử lại.",
    "auth/operation-not-allowed": "Bạn chưa bật đăng nhập Email/Password trong Firebase.",
    "auth/too-many-requests": "Bạn thử quá nhiều lần. Vui lòng đợi một lúc.",
    "auth/user-disabled": "Tài khoản này đã bị vô hiệu hóa.",
    "auth/user-not-found": "Email hoặc mật khẩu không chính xác.",
    "auth/weak-password": "Mật khẩu chưa đủ mạnh.",
    "auth/wrong-password": "Email hoặc mật khẩu không chính xác.",
    "auth/invalid-verification-code": "Mã OTP không chính xác.",
    "auth/code-expired": "Mã OTP đã hết hạn. Vui lòng gửi mã mới.",
    "auth/missing-phone-number": "Bạn chưa nhập số điện thoại.",
    "auth/invalid-phone-number": "Số điện thoại không đúng định dạng.",
    "auth/quota-exceeded": "Firebase đã hết hạn mức gửi SMS hôm nay.",
    "auth/requires-recent-login": "Vui lòng nhập lại mật khẩu để tiếp tục.",
  };

  const code = getErrorCode(error);
  return code
    ? messages[code] ?? "Không thể xác thực tài khoản. Vui lòng thử lại."
    : error instanceof Error
      ? error.message
      : "Đã có lỗi xảy ra. Vui lòng thử lại.";
}

function requireCurrentUser() {
  const user = authentication.currentUser;

  if (!user) {
    throw new Error("Bạn cần đăng nhập lại để tiếp tục.");
  }

  return user;
}

function getErrorCode(error: unknown) {
  if (typeof error !== "object" || error === null || !("code" in error)) {
    return undefined;
  }

  return String(error.code);
}
