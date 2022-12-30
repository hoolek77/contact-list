import { useEffect, useState } from 'react'

import GlobalStyles from '@/styles/Global'
import type { Person } from '@/types/common'

import apiData from './api'
import PersonInfo from './PersonInfo'

import styled from 'styled-components'

function App() {
  const [data, setData] = useState<Person[]>([])
  const [selected, setSelected] = useState([])

  const fetchData = async () => {
    try {
      const data = await apiData()

      setData((prev) => [...prev, ...data])
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <SelectedCounter>Selected contacts: {selected.length}</SelectedCounter>
        <div className="list">
          {data.map((personInfo) => (
            <PersonInfo key={personInfo.id} data={personInfo} />
          ))}
          <button onClick={fetchData}>Fetch More</button>
        </div>
      </AppWrapper>
    </>
  )
}

export default App

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: space-between;
  margin: 20px 0;
`

const SelectedCounter = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  margin: 10px 20px 0 0;
`
