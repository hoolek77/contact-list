import type { CSSProperties } from 'react'

import type { Person } from '../types/common'

import styled from 'styled-components'

type Props = {
  data: Omit<Person, 'id'>
  isLast?: boolean
  style?: CSSProperties
}

function PersonInfo({
  data: { firstNameLastName, emailAddress, jobTitle },
  isLast = false,
  style,
}: Props) {
  return (
    <PersonInfoGapWrapper style={style} isLast={isLast}>
      <PersonInfoWrapper>
        <PersonName>{firstNameLastName}</PersonName>
        <PersonJobTitle>{jobTitle}</PersonJobTitle>
        <PersonEmail>{emailAddress}</PersonEmail>
      </PersonInfoWrapper>
    </PersonInfoGapWrapper>
  )
}

export default PersonInfo

const PersonInfoGapWrapper = styled.div<{ isLast: boolean }>`
  padding-bottom: ${({ isLast }) => (isLast ? '0' : '16px')};
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
`

const PersonInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  width: 448px;
  height: 172px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  margin: 10px 0;
  background: #fff;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    padding: 30px;
    border: 2px solid pink;
  }
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
