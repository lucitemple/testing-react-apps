// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import Counter from '../../components/counter'
import '@testing-library/jest-dom'

test('counter increments and decrements when the buttons are clicked', () => {
  render(<Counter />)

  const [decrementButton, incrementButton] = screen.getAllByRole('button')

  expect(screen.getByText('Current count: 0')).toBeInTheDocument()

  fireEvent.click(incrementButton)
  expect(screen.getByText('Current count: 1')).toBeInTheDocument()

  fireEvent.click(decrementButton)
  expect(screen.getByText('Current count: 0')).toBeInTheDocument()
})
