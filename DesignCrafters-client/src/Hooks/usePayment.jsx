import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePayment = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data:payment=[] , refetch}= useQuery({
        queryKey: ['payment'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure(`/paymentCollection?email=${user.email}`);
            return res.data;
        }
    })
    return[payment , refetch]
};

export default usePayment;