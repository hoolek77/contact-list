import React, { useEffect, useState } from 'react'

import apiData from './api'
import PersonInfo from './PersonInfo'

type Person = {
  id: string
  jobTitle: string
  emailAddress: string
  firstNameLastName: string
}

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
    <div className="App">
      <div className="selected">Selected contacts: {selected.length}</div>
      <div className="list">
        {data.map((personInfo) => (
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
        <button onClick={fetchData}>Fetch More</button>
      </div>
    </div>
  )
}

export default App
