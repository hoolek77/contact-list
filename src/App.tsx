import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRef } from 'react'
import { ViewportList } from 'react-viewport-list'

import apiData from './api'
import LoadMoreButton from './components/LoadMoreButton'
import PersonInfo from './components/PersonInfo'
import GlobalStyles from './styles/Global'
import type { Person } from './types/common'

import styled from 'styled-components'

const LOAD_MORE_BUTTON_KEY = 'load-more-button'

const isPerson = (item: unknown): item is Person =>
  typeof item === 'object' && item !== null && 'id' in item

function App() {
  const [data, setData] = useState<Person[]>([])
  const [selected, setSelected] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)

  const orderedData = useMemo(() => {
    const dataWithoutSelected = data.filter(
      (person) => !selected.find((p) => p.id === person.id)
    )

    return [...selected, ...dataWithoutSelected, LOAD_MORE_BUTTON_KEY]
  }, [data, selected])

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

  const handleSelect = useCallback((person: Person) => {
    setSelected((prev) => {
      const isSelected = prev.find((p) => p.id === person.id)

      if (isSelected) {
        return prev.filter((p) => p.id !== person.id)
      }

      return [person, ...prev]
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <SelectedCounter>Selected contacts: {selected.length} </SelectedCounter>
        <ListWrapper ref={viewportRef}>
          <ViewportList
            viewportRef={viewportRef}
            items={orderedData}
            itemMinSize={172}
            margin={16}
            overscan={3}
          >
            {(item) =>
              item !== LOAD_MORE_BUTTON_KEY && isPerson(item) ? (
                <PersonInfo
                  key={item.id}
                  data={item}
                  onSelect={handleSelect}
                  selected={!!selected.find((p) => p.id === item.id)}
                />
              ) : (
                <LoadMoreButtonWrapper>
                  <LoadMoreButton
                    onClick={fetchData}
                    loading={isLoading}
                    error={error}
                  />
                </LoadMoreButtonWrapper>
              )
            }
          </ViewportList>
        </ListWrapper>
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
  padding-top: 20px;
`

const SelectedCounter = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  height: 30px;
`

const ListWrapper = styled.div`
  // compensate for the height of the header, padding and margins of the list
  height: calc(100vh - 30px - 32px - 20px);
  width: 100%;
  padding-bottom: 20px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
`

const LoadMoreButtonWrapper = styled.div`
  margin-top: 8px;
`
