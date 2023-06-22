import { Helmet } from "react-helmet-async";
import usePayment from "../../../Hooks/usePayment";

const PaymentHistory = () => {
    const [payment ] = usePayment();
    console.log(payment);
    return (
        <div className="w-full">
            <Helmet>
                <title>Design | Selected Class</title>
            </Helmet>

            <div className="overflow-x-auto lg:w-[70%] mx-auto shadow-2xl p-6 rounded-2xl mb-10">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            
                            <th>Course</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Date</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payment.map((payment, index) => <tr key={payment._id}>
                                <td>
                                    {index + 1}
                                </td>
                                
                                <td><div className="font-bold">{payment.className}</div></td>
                                <td>${payment.price}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.date}</td>
                                
                            </tr>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default PaymentHistory;