import {render, screen, fireEvent, waitFor} from "@testing-library/react";
import LoginForm from "../LoginForm";
import userEvent from "@testing-library/user-event";

describe('LoginForm Component', () => {
    test('Should render inputs', () => {
        render(<LoginForm />);
        expect(screen.getByTestId("email-input")).toBeInTheDocument();
        expect(screen.getByTestId("password-input")).toBeInTheDocument();
        expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    });   

    test('Should show validation error', async () => {
        render(<LoginForm />);
        const emailInput = screen.getByTestId("email-input");
        await userEvent.type(emailInput, "invalid-email");
        fireEvent.blur(emailInput);
        await waitFor(() =>{
            expect(screen.getByTestId("email-error")).toHaveTextContent("Please enter a valid email");
        });
    });   

    test('Should submit the form', async () => {
        const mockSubmit = jest.fn().mockResolvedValue();
        render(<LoginForm onSubmit={mockSubmit}/>);
        await userEvent.type(screen.getByTestId("email-input"),"test@example.com");
        await userEvent.type(screen.getByTestId("password-input"),"Password123@45");
        await userEvent.click(screen.getByTestId("submit-button"), "test@example.com");

        await waitFor(() =>{
            expect(mockSubmit).toHaveBeenCalledWith(
                {
                    email: "test@example.com",
                    password: "Password123@45",
                    rememberMe: false
                }
            )
        })
    })
});