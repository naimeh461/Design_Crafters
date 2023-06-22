import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import {loadStripe} from '@stripe/stripe-js';
import useAddClasses from "../Hooks/useAddClasses";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const { id } = useParams();
    const [classes] = useAddClasses()
    const course = classes.find(classe => classe._id === id)
   
    return (
        <div className="w-[70%] mx-auto mb-auto">
            
            <div>
               
                <Elements stripe={stripePromise}>
                    <CheckoutForm course={course}  />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;