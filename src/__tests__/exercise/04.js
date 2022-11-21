// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  const user = userEvent.setup()
  const userName = 'userName'
  const userPassword = 'userPassword'

  let submittedData
  const handleSubmit = data => (submittedData = data)

  render(<Login onSubmit={handleSubmit} />)

  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)

  await user.type(username, userName)
  await user.type(password, userPassword)

  await user.click(screen.getByRole('button'))
  expect(submittedData).toStrictEqual({
    password: userPassword,
    username: userName,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
