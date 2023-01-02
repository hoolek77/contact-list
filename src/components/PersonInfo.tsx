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
  const [firstName, lastName] = firstNameLastName.split(' ')
  const initials = `${firstName[0]}${lastName[0]}`

  // eslint-disable-next-line no-console
  console.log('rendered')

  return (
    <PersonInfoWrapper role="listitem">
      <PersonInfoButtonWrapper
        onClick={() => onSelect(data)}
        selected={selected}
      >
        <PersonInfoDetailsWithAvatarWrapper>
          <PersonInfoAvatar>{initials}</PersonInfoAvatar>
          <PersonInfoDetailsWrapper>
            <PersonName>{firstNameLastName}</PersonName>
            <PersonJobTitle>{jobTitle}</PersonJobTitle>
          </PersonInfoDetailsWrapper>
        </PersonInfoDetailsWithAvatarWrapper>
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

const PersonInfoAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 100%;
  border: 1px solid #666666;
  font-size: 20px;
`

const PersonInfoDetailsWithAvatarWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`

const PersonInfoDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const PersonInfoButtonWrapper = styled.button<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  width: 448px;
  height: 172px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  margin: 8px 0;
  gap: 16px;
  background: #fff;
  cursor: pointer;
  outline: none;
  border: 2px solid white;
  transition: all 0.2s ease-in-out;

  &:hover {
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

const PersonName = styled.h2`
  color: #333333;
  font-size: 22px;
  font-weight: 700;
  text-align: start;
`

const PersonJobTitle = styled.div`
  color: #e74c3c;
  font-size: 16px;
  font-weight: 400;
  text-align: start;
`

const PersonEmail = styled.div`
  align-self: center;
  color: #666666;
  font-size: 14px;
  line-height: 1.8em;
`
