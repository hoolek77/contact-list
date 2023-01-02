import { memo } from 'react'

import type { Person } from '@/types/common'

import styled, { css } from 'styled-components'

type Props = {
  data: Person
  onSelect: (person: Person) => void
  selected: boolean
}

function PersonInfo({ data, onSelect, selected }: Props) {
  const { firstNameLastName, emailAddress, jobTitle } = data

  // eslint-disable-next-line no-console
  console.log('rendered')

  return (
    <PersonInfoWrapper>
      <PersonInfoButtonWrapper
        onClick={() => onSelect(data)}
        selected={selected}
      >
        <PersonName>{firstNameLastName}</PersonName>
        <PersonJobTitle>{jobTitle}</PersonJobTitle>
        <PersonEmail>{emailAddress}</PersonEmail>
      </PersonInfoButtonWrapper>
    </PersonInfoWrapper>
  )
}

export default memo(PersonInfo)

const PersonInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`

const PersonInfoButtonWrapper = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px;
  width: 448px;
  height: 172px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  margin: 8px 0;
  background: #fff;
  cursor: pointer;
  outline: none;
  border: 2px solid white;
  transition: all 0.2s ease-in-out;

  &:hover {
    padding: 30px;
    border: 2px solid pink;
  }

  &:focus-visible {
    box-shadow: 0px 0px 0px 2.5px #bfbeff;
  }

  ${({ selected }) =>
    selected &&
    css`
      outline: 2px solid #4f46e5;
    `}
`

const PersonName = styled.div`
  padding: 0 0 10px;
  color: #333333;
  font-size: 26px;
  font-weight: 700;
`

const PersonJobTitle = styled.div`
  padding: 0 0 20px;
  color: #e74c3c;
  font-size: 20px;
  font-weight: 400;
`

const PersonEmail = styled.div`
  color: #666666;
  font-size: 14px;
  line-height: 1.8em;
`
