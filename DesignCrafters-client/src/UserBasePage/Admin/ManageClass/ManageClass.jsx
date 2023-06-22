import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import ClassManager from "./ClassManager";

const ManageClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: courses = [] } = useQuery(
        ['courses'], async () => {
        const res = await axiosSecure.get('/courses')
        return res.data;

    })
    
    console.log(courses)
    return (
        <div>
             <Helmet>
                <title>Dashboard | Manage Classes</title>
            </Helmet>
            <div className="overflow-x-auto mx-auto shadow-2xl p-6 rounded-b-2xl mb-10 w-full">
                <table className="table table-xs table-pin-rows table-pin-cols">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Instructor</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Class Enroll</th>
                            <th>Available_seats</th>
                            <th>Class Status</th>
                            <th>feedback</th>
                            
                        </tr>
                    </thead>
                    <tbody >
                        {
                            courses.map((course, index) => <ClassManager key={course._id} index={index} course={course}></ClassManager> )
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ManageClass;