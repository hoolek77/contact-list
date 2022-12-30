import React from 'react'

import styled from 'styled-components'

type Props = {
  data: {
    firstNameLastName: string
    jobTitle: string
    emailAddress: string
  }
}

function PersonInfo(props: Props) {
  const { data } = props

  return (
    <PersonInfoWrapper>
      <PersonName>{data.firstNameLastName}</PersonName>
      <PersonJobTitle>{data.jobTitle}</PersonJobTitle>
      <PersonEmail>{data.emailAddress}</PersonEmail>
    </PersonInfoWrapper>
  )
}

export default PersonInfo

const PersonInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  margin: 10px 0;
  background: #fff;
  cursor: pointer;

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
