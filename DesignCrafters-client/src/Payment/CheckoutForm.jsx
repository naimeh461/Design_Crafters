import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useEffect } from 'react';
import "./CheckoutForm.css"
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const CheckoutForm = ({course}) => {

    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const [processing , setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const {price,name,_id,courseId,instructor} = course;
    useEffect(() => {
            if(price>0){
                axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
            }
    }, [price, axiosSecure])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        console.log('card',card)
        const {error} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
        if(error){
            console.log('error',error)
            setCardError(error.message);
        }
        else{
            setCardError('');
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            console.log(confirmError);
        }
        console.log('payment intent', paymentIntent)

        setProcessing(false)
        if(paymentIntent.status === 'succeeded'){
            setTransactionId(paymentIntent.id);

            const payment = {
                transactionId : paymentIntent.id,
                email: user?.email, 
                price,
                date : new Date(),
                className: name,
                instructor : instructor,
                classId : _id,
                course : courseId

            }
            axiosSecure.post('/payments',payment)
            .then(res => {
                console.log(res.data)
            })
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='bg-slate-50 p-10 rounded-xl'>
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
                <button type="submit" disabled={!stripe || !clientSecret || processing } className="btn btn-outline btn-info mt-5 btn-sm">
                    Pay
                </button>
            </form>
            <div className='text-center'>
                {cardError && <p className='text-xl text-red-600 mt-5 ml-2'>{cardError}</p>}
                {transactionId && <p className='text-xl text-green-500 mt-5 '>Transaction complete with transactionId: {transactionId}</p>}
            </div>
        </div>
    );
};

export default CheckoutForm;