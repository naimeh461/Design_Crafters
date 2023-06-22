import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const MyClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const { data: courses = []} = useQuery(
        ['courses'], async () => {
        const res = await axiosSecure.get(`/classes/${user.email}`)
        return res.data;
    })
    
    console.log(courses)
    return (
        <div className="w-full">
            <Helmet>
                <title>Design | Instructor Class</title>
            </Helmet>

            <div className="overflow-x-auto lg:w-[70%] mx-auto shadow-2xl p-6 rounded-2xl mb-10">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Class Photo</th>
                            <th>Class Name</th>
                            <th>Enroll Student</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            courses.map((course, index) => <tr key={course._id}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={course.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td><div className="font-bold">{course.name}</div></td>
                                <td>{course.enroll}</td>
                                <td>${course.price}</td>
                                <td>{course.status}</td>
                                <td>{course?.feedback}</td>
                                
                            </tr>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyClasses;