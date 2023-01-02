import type { ComponentPropsWithoutRef } from 'react'

import Loader from './Loader'

import styled, { css } from 'styled-components'

interface Props
  extends Pick<ComponentPropsWithoutRef<'button'>, 'onClick' | 'disabled'> {
  loading: boolean
  error: string | null
}

function LoadMoreButton({ onClick, loading, disabled, error }: Props) {
  const isDisabled = loading || disabled
  const hasError = !!error

  const errorMessage = error ? `${error}. Click to try again.` : null

  return (
    <Button onClick={onClick} disabled={isDisabled} error={hasError}>
      {loading ? (
        <Loader size={32} primaryColor={hasError ? '#fbc1cc' : '#333333'} />
      ) : (
        errorMessage || 'Load More'
      )}
    </Button>
  )
}

export default LoadMoreButton

const Button = styled.button<{ error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  min-width: 112px;
  height: 48px;
  border: none;
  border-radius: 4px;
  background-color: #f4f4f4;
  padding: 0 16px;
  color: #333333;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e6e6e6;
  }

  &:disabled {
    background-color: #e6e6e6;
    cursor: not-allowed;
  }

  &:active {
    background-color: #d9d9d9;
  }

  &:focus-visible {
    box-shadow: 0px 0px 0px 2.5px #bfbeff;
  }

  ${({ error }) =>
    error &&
    css`
      background-color: #eb5757;
      border: 1px solid #eb5757;
      color: #f4f4f4;

      &:hover:not(:disabled) {
        background-color: #fff;
        color: #eb5757;
        border: 1px solid #eb5757;
      }

      &:active:not(:disabled) {
        background-color: #d9d9d9;
      }

      &:disabled {
        background-color: #eb5757;
        cursor: not-allowed;
      }

      &:focus-visible {
        box-shadow: 0px 0px 0px 2.5px #fbc1cc;
      }
    `}
`
