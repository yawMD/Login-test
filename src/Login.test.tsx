import {fireEvent, render, screen} from "@testing-library/react";

import "@testing-library/jest-dom";
import React from "react";
import Login from "./components/Login";

import fetchMock from 'fetch-mock'


const dummyUser = {
  id: 1,
  email: "test@test.com",
  password: "test123"
}

describe("Login describe statement", () => {
  test('Enter form data and submit', async () => {
    const submit = jest.fn()
    render(<Login submit={submit}/>)
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitBtn = screen.getByTestId('submit')
    fireEvent.change(emailInput, {target: {value: dummyUser.email}})
    fireEvent.change(passwordInput, {target: {value: dummyUser.password}})


    expect(emailInput.value).toBe(dummyUser.email)
    expect(passwordInput.value).toBe(dummyUser.password)

    fireEvent.click(submitBtn)

    expect(submit).toBeCalled()

  })

  test('Submit called successfully and returned to the user', async () => {
    const submit = async (email: string, password: string) => {
      fetchMock.mock("https://jsonplaceholder.typicode.com/success", 200)
      const submitResponse = await fetch('https://jsonplaceholder.typicode.com/success', {
        body: JSON.stringify({email, password})
      })

      expect(email).toBe(dummyUser.email)
      expect(password).toBe(dummyUser.password)
      expect(submitResponse.status).toBe(200)
      return true
    }

    render(<Login submit={submit}/>)
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitBtn = screen.getByTestId('submit')

    fireEvent.change(emailInput, {target: {value: dummyUser.email}})
    fireEvent.change(passwordInput, {target: {value: dummyUser.password}})

    fireEvent.click(submitBtn)
  })

  test('Failed form submit', async () => {
    const submit = async (email: string, password: string) => {
      fetchMock.mock("https://jsonplaceholder.typicode.com/failed", 400)
      const submitResponse = await fetch('https://jsonplaceholder.typicode.com/failed', {
        body: JSON.stringify({email, password})
      })

      expect(email).toBe(dummyUser.email)
      expect(password).toBe(dummyUser.password)
      expect(submitResponse.status).toBe(400)
      return true
    }

    render(<Login submit={submit}/>)

    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitBtn = screen.getByTestId('submit')

    fireEvent.change(emailInput, {target: {value: dummyUser.email}})
    fireEvent.change(passwordInput, {target: {value: dummyUser.password}})

    fireEvent.click(submitBtn)
  })

});
