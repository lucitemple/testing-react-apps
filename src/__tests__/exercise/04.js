// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import {faker} from '@faker-js/faker'
import '@testing-library/jest-dom'

const buildLoginForm = overrides => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()
  const {username, password} = buildLoginForm()

  const handleSubmitMock = jest.fn().mockName('handleSubmit')

  render(<Login onSubmit={handleSubmitMock} />)

  const usernameInput = screen.getByRole('textbox', {name: /username/i})
  const passwordInput = screen.getByLabelText(/password/i)

  await user.type(usernameInput, username)
  await user.type(passwordInput, password)

  await user.click(screen.getByRole('button', {name: /submit/i}))
  expect(handleSubmitMock).toHaveBeenCalledWith({
    password,
    username,
  })
  expect(handleSubmitMock).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
