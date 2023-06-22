import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAddClasses = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data:classes=[] , refetch}= useQuery({
        queryKey: ['classes'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure(`/cardCollection?email=${user.email}`);
            return res.data;
        }
    })
    return[classes , refetch]
};

export default useAddClasses;