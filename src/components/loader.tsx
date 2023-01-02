import { useMemo } from 'react';

import styled from 'styled-components';

export interface LoaderProps {
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

function Loader({
  size = 36,
  primaryColor = '#333333',
  secondaryColor = '#f4f4f4',
  ...props
}: LoaderProps) {
  const borderSize = useMemo(() => size / 8, [size]);

  return (
    <LoaderContainer
      aria-label="loading"
      borderSize={borderSize}
      size={size}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      {...props}
    />
  );
}

export default Loader;

const LoaderContainer = styled.div<LoaderProps & { borderSize: number }>`
  border: ${({ borderSize }) => `${borderSize}px`} solid
    ${({ theme: { styles }, secondaryColor }) =>
      secondaryColor || styles.background2};
  border-top: ${({ borderSize }) => `${borderSize}px`} solid
    ${({ theme: { styles }, primaryColor }) =>
      primaryColor || styles.primary100};
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
