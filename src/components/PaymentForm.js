import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import styled from "styled-components";


    const StyledForm = styled.form` 
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 10px;
    row-gap: 10px;

    
    > p {
        grid-column: span 2;
        color: #fa755a; 
        font-size: 12px; 
    }

    .StripeElement {
        background: white; 
        border-radius: 8px;
        border: 1px solid #CCCCCC;
        padding: 10px 12px;
    }

    .StripeElement--invalid {
        border-color: #fa755a;

    }
    `

    const Button = styled.button`
        background: #84FED5;
        border-radius: 8px;
        border: 0; 
        font-size: 20px;
        font-weight: 700;
        padding: 0 12px; 

    `



export function PaymentForm({ clientSecret }) {
    const stripe = useStripe()

    const elements = useElements()

    const [errorMessage, setErrorMessage] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        })
        if(error){
            setErrorMessage(error.message)
        } else {
            window.location = "http://localhost:3000"
        }
    }


    return (
        <form>
            <StyledForm onSubmit={handleSubmit}>
            <CardElement/>
            <Button>Pay Now</Button>
            {errorMessage && <p>{errorMessage}</p>}
            </StyledForm>
        </form>
    )
}