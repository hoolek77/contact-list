import { useEffect, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'

import apiData from './api'
import LoadMoreButton from './components/LoadMoreButton'
import PersonInfo from './components/PersonInfo'
import GlobalStyles from './styles/Global'
import type { Person } from './types/common'

import styled from 'styled-components'

function App() {
  const [data, setData] = useState<Person[]>([])
  const [selected, setSelected] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)

      const data = await apiData()

      setError(null)
      setData((prev) => [...prev, ...data])
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <SelectedCounter>Selected contacts: {selected.length} </SelectedCounter>
        <ListWrapper>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={data.length}
                itemSize={172 + 16}
                overscanCount={3}
              >
                {({ index, style }) => {
                  const person = data[index]

                  return (
                    <PersonInfo
                      key={person.id}
                      data={person}
                      style={style}
                      isLast={index === data.length}
                    />
                  )
                }}
              </FixedSizeList>
            )}
          </AutoSizer>
        </ListWrapper>
        <LoadMoreButton onClick={fetchData} loading={isLoading} error={error} />
      </AppWrapper>
    </>
  )
}

export default App

const AppWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  min-height: 100vh;
  padding: 20px 0;
`

const SelectedCounter = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  height: 30px;
`

const ListWrapper = styled.div`
  // compensate for the height of the header and the load more button and the gap between them
  height: calc(100vh - 30px - 64px - 40px - 48px);
  width: 100%;
`
