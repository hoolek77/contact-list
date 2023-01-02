import { waitFor } from '@testing-library/react'

import { DELAY } from '../api'

import { vi } from 'vitest'

export const mockResponse = (type: 'success' | 'error') =>
  vi
    .spyOn(global.Math, 'random')
    .mockReturnValue(type === 'success' ? 0.2 : 0.8)

export const waitForWithApiDelay = async (waitCallback: () => void) => {
  await waitFor(() => waitCallback(), {
    timeout: DELAY + 500,
  })
}
