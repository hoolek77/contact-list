import { css } from 'styled-components';

export const scrollbarStyles = css`
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a3aab5;
    border-radius: 16px;
    border: 5px solid transparent;
    background-clip: unset;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #757f8f;
  }
`;
