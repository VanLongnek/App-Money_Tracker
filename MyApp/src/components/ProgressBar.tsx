import styled from "styled-components/native";

import { colors, radius } from "../theme/tokens";

type ProgressBarProps = {
  value: number;
  color?: string;
  height?: number;
};

export function ProgressBar({
  value,
  color = colors.primary,
  height = 8,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max(value, 0), 1) * 100;

  return (
    <Track $height={height}>
      <Fill $color={color} $percentage={percentage} />
    </Track>
  );
}

const Track = styled.View<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => $height}px;
  overflow: hidden;
  border-radius: ${radius.pill}px;
  background-color: ${colors.surfaceMuted};
`;

const Fill = styled.View<{ $color: string; $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: ${radius.pill}px;
  background-color: ${({ $color }) => $color};
`;
