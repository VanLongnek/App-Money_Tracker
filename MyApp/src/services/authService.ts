import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { authentication, database } from "../config/firebase";

export async function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(authentication, email.trim(), password);
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
  });

  return result.user;
}

export async function resetPassword(email: string) {
  return sendPasswordResetEmail(authentication, email.trim());
}

export async function logOut() {
  return signOut(authentication);
}

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Đã có lỗi xảy ra. Vui lòng thử lại.";
  }

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
  };

  return messages[error.code] ?? "Không thể xác thực tài khoản. Vui lòng thử lại.";
}
