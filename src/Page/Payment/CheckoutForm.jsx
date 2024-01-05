/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ menuItems }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate()

    const cafeId = menuItems?.cafeId;
    const order = menuItems?.order;
    const owner_email = menuItems?.owner_email;
    const productId = menuItems?.productId;
    const productImage = menuItems?.productImage;
    const productName = menuItems?.productName;
    const productPrice = menuItems?.productPrice;
    const productType = menuItems?.productType;
    const totalPrice = menuItems?.totalPrice;
    const user_email = menuItems?.user_email;
    const cartId = menuItems?._id;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ totalPrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [totalPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user_email,
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            setTransactionId(paymentIntent.id)
            // console.log('card info', card);
            // store payment info in the database
            const payment = {
                cafeId,
                order,
                user_email,
                productId,
                productImage,
                owner_email,
                productName,
                productPrice,
                productType,
                cartId,
                totalPrice,
                transactionId: paymentIntent.id,
                payment_type: 'Online'
            }
            fetch('http://localhost:5000/booking', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.statusCode === 200 && data.success === true) {
                        toast.success('Payment successfully');
                        setSuccess(paymentIntent.id);
                        navigate('/purchase-history')
                    } else {
                        toast.error("Something went wrong");
                    }
                })
        }
        setProcessing(false);


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn mt-4 bg-sky-400 px-4 border rounded-lg text-white cursor-pointer'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </>
    );
};

export default CheckoutForm;