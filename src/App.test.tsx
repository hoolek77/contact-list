import { render, screen } from '@testing-library/react'

import { PAGE_SIZE } from './api'
import App from './App'
import { ViewportListMock } from './tests/mocks'
import { mockResponse, waitForWithApiDelay } from './tests/test-utils'

import user from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

vi.mock('react-viewport-list', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ViewportList: (props: any) => <ViewportListMock {...props} />,
}))

describe('App', () => {
  test('App renders correctly with api data', async () => {
    mockResponse('success')
    render(<App />)

    const selectedContacts = screen.getByText(/Selected contacts/i)

    expect(selectedContacts).toHaveTextContent('Selected contacts: 0')

    const loadMoreButton = screen.queryByText(/Loading/i)

    expect(loadMoreButton).toBeInTheDocument()

    await waitForWithApiDelay(() =>
      expect(loadMoreButton).not.toHaveTextContent(/Loading/i)
    )

    const listItems = screen.getAllByRole('listitem')

    expect(listItems).toHaveLength(PAGE_SIZE)
  })

  test('App displays error handling when api fails', async () => {
    mockResponse('error')
    render(<App />)

    const loadMoreButton = screen.queryByText(/Loading/i)

    expect(loadMoreButton).toBeInTheDocument()

    await waitForWithApiDelay(() =>
      expect(loadMoreButton).not.toHaveTextContent(/Loading/i)
    )

    const errorMessage = screen.getByText(/Something went wrong/i)

    expect(errorMessage).toBeInTheDocument()
  })

  test('Selected contacts should increment the counter', async () => {
    mockResponse('success')
    render(<App />)

    const loadMoreButton = screen.queryByText(/Loading/i)

    expect(loadMoreButton).toBeInTheDocument()

    await waitForWithApiDelay(() =>
      expect(loadMoreButton).not.toHaveTextContent(/Loading/i)
    )

    const [firstItem, secondItem] = screen.getAllByRole('button')

    const selectedContacts = screen.getByText(/Selected contacts/i)

    await user.click(firstItem)

    expect(selectedContacts).toHaveTextContent('Selected contacts: 1')

    await user.click(secondItem)

    expect(selectedContacts).toHaveTextContent('Selected contacts: 2')
  })

  test('Selected contact should always be appended to the top of the list', async () => {
    vi.resetModules()
    mockResponse('success')
    render(<App />)

    const loadMoreButton = screen.queryByText(/Loading/i)

    expect(loadMoreButton).toBeInTheDocument()

    await waitForWithApiDelay(() =>
      expect(loadMoreButton).not.toHaveTextContent(/Loading/i)
    )

    const [initialFirstItem, initialSecondItem] = screen.getAllByRole(
      'heading',
      {
        level: 2,
      }
    )

    await user.click(initialFirstItem)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: initialFirstItem.textContent || '',
      })
    ).toBeInTheDocument()

    await user.click(initialSecondItem)

    expect(
      screen.getByRole('heading', {
        level: 2,
        name: initialSecondItem.textContent || '',
      })
    ).toBeInTheDocument()
  })
})
