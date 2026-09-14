import styled from "styled-components/native";

import { colors, radius } from "../theme/tokens";

export function ProgressBar({
  value,
  color = String(colors.primary),
  height = 8,
}) {
  const percentage = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <Track $height={height}>
      <Fill $color={color} $percentage={percentage} />
    </Track>
  );
}

const Track = styled.View`
  width: 100%;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  border-radius: ${radius.pill}px;
  background-color: ${colors.surfaceMuted};
`;

const Fill = styled.View`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: ${radius.pill}px;
  background-color: ${({ $color }) => $color};
`;
