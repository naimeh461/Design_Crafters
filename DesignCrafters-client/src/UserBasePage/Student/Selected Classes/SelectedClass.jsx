import { FaTrashAlt } from "react-icons/fa";
import useAddClasses from "../../../Hooks/useAddClasses";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const SelectedClass = () => {
    const [classes,refetch] = useAddClasses();
    const [axiosSecure] = useAxiosSecure();
    const handleDelete = _id => {
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {
            axiosSecure.delete(`/cardDelete/${_id}`)
             .then(data => {
                if(data.data.deletedCount>0){
                    refetch();  
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                        )
                    }})
                }
        })

    }
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
                            <th>Photo</th>
                            <th>Course</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Payment button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((course, index) => <tr key={course._id}>
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
                                <td>${course.price}</td>
                                <td>{course.instructor}</td>
                                <td>
                                    <button onClick={() => handleDelete(course._id)} className="btn btn-ghost bg-[#1b254b]  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                                <td>
                                    <Link to={`/dashboard/payment/${course._id}`}  ><button className="btn">Payment</button></Link>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default SelectedClass;