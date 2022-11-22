// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import '@testing-library/jest-dom'
// jest.mock('react-use-geolocation');

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

// 💰 I'm going to give you this handy utility function
// it allows you to create a promise that you can resolve/reject on demand.
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const latitude = 35
  const longitude = 139
  const fakePosition = {
    coords: {
      latitude,
      longitude,
    },
  }

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()
  
 await act(async () => {
   resolve()
   await promise
 })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${longitude}`)
})

/*
eslint
  no-unused-vars: "off",
*/
