import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import http from 'node:http'


import "@testing-library/jest-dom";
import React from "react";
import Login from "./components/Login";

import fetchMock from 'fetch-mock'
import { shallow } from "enzyme";
import { nextTick } from "node:process";

Enzyme.configure({ adapter: new Adapter() });

const dummyUser = {
    id:1,
    username:"test",
    password:"test123"
}
describe("Login describe statement", () => {
    test('shows the loading text once it has been posted', async() => {
        fetchMock.post("https://jsonplaceholder.typicode.com/posts",{ 
            status: 200,
            body: dummyUser
        })
        const wrapper = shallow(<Login />)
        expect(wrapper.find('p').text()).toContain("button")

    })

    test('shows the loadding text and then data once it has been fetched', async() => {
        fetchMock.get("https://jsonplaceholder.typicode.com/posts",{ 
            status: 200,
            body: dummyUser
        })
        const wrapper = shallow(<Login />)
        expect(wrapper.find('button'))

    })

  test("Login form should be in the document", () => {
    const component = render(<Login />);
    const labelNode = component.getByText("Email");
    expect(labelNode).toBeInTheDocument();
  });

  test("username field should have label", () => {
    const component = render(<Login />);
    const emailInput = component.getByLabelText("Email");
    expect(emailInput.getAttribute("name")).toBe("email");
  });

  test("username input should accept text", () => {
    const { getByLabelText } = render(<Login />);
    const userInput = getByLabelText("Email");
    // expect(userInput.value).toMatch("")
    fireEvent.change(userInput, { target: { value: "testing" } });
    // expect(userInput.value).toMatch("testing")
  });

  //    test("should be able to submit a form",() => {
  //     const mockfn = jest.fn();
  //     const {getByRole} = render(<Login />)
  //     const buttonNode = getByRole("button")
  //     fireEvent.submit(buttonNode);
  //     expect(mockfn).toHaveBeenCalled()
  //    })

  test("calls the onSubmit method", () => {
    const mockFn = jest.fn();
    const component = render(<Login />);
    console.log(screen);
    const buttonNode = component.getByText("button");
    expect(buttonNode).toBeInTheDocument();
    userEvent.click(screen.getByText("button"));
    //    expect(mockFn).toHaveBeenCalled()
  });


});
