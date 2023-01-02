import mockData from './mockData.json'
import type { Person } from './types/common'

let cursor = -1
export const PAGE_SIZE = 10
export const DELAY = 1000

function delay(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(() => resolve(), time))
}

export default async function apiData(): Promise<Person[]> {
  await delay(DELAY)

  if (Math.random() > 0.7) {
    throw new Error('Something went wrong')
  }

  cursor += 1

  const start = cursor * PAGE_SIZE
  const end = cursor * PAGE_SIZE + PAGE_SIZE

  return mockData.slice(start, end)
}
