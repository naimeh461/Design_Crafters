import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Manager from "./Manager";


const ManageUser = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = []} = useQuery(
        ['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;

    })
    
    return (
        <div>
             <Helmet>
                <title>Dashboard | Manage User</title>
            </Helmet>
            <h2 className="bg-[#1b254b] text-white text-center rounded-t-lg uppercase p-2">manage user</h2>
            <div className="overflow-x-auto  mx-auto shadow-2xl p-6 rounded-b-2xl mb-10">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            
                            <th>Course</th>
                            <th>email</th>
                            <th>Current Role</th>
                            <th>Role Update</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <Manager key={user._id} index={index} user={user}></Manager>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageUser;