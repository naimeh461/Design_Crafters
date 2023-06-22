import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetInfo = () => {
    const {user,loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const {data:userInfo=[] , refetch}= useQuery({
        queryKey: ['userInfo'],
        enabled: !loading,
        queryFn: async() => {
            const res = await axiosSecure(`/userInfo?email=${user.email}`);
            return res.data;
        }
    })
    return[userInfo , refetch]
};

export default useGetInfo;