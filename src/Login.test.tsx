import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from './components/Login';

type Props = {
    handleSubmit:()=>void
}

describe("Login",() => {
   test("Login form should be in the document", ()=>{
    const component = render(<Login />);
    const labelNode = component.getByText("Email");
    expect(labelNode).toBeInTheDocument();
   });

   test("username field should have label", ()=>{
    const component = render(<Login />);
    const emailInput = component.getByLabelText("Email");
    expect(emailInput.getAttribute("name")).toBe("email");
   });

   test("email input should accept text", () => {
    const {getByLabelText} = render(<Login />);
    const emailInput = getByLabelText("Email");
    expect(emailInput.value).toMatch("")
    fireEvent.change(emailInput,{target: {value: 'testing'}})
    expect(emailInput.value).toMatch("testing")
   })

   test("should be able to click button", () => {
    const mockfn = jest.fn();
    const { getByTestId } = render(<Login />);
    const buttonNode = getByTestId('submit-button');
    fireEvent.click(buttonNode);
    console.log(buttonNode)
    expect(buttonNode.children).toBe("continue"); 
   })
})