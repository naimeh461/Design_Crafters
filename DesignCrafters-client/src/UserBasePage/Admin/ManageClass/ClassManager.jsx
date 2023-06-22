import { RiFeedbackFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAddClasses from "../../../Hooks/useAddClasses";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ClassManager = ({ course, index }) => {
    const { name, instructor, available_seats, email, price, _id, image , status} = course;
    const [,refetch] = useAddClasses();
    const [axiosSecure] = useAxiosSecure();

    const disabledPending = status === "approved" || status === "denied" 
    const disabledApproved = status === "denied" 
    const disabledDenied = status === "approved" 
    const handleUpdateCourse = (data) => {
        
        const status = {status : data.value , id: data.id}
        
        axiosSecure.patch(`/updateCourseStatus`, status)
        .then(data => {
                if(data.data.modifiedCount)
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'User Class Status is updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        )
    }

   
    return (
        <tr >
            <td>
                {index + 1}
            </td>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td><div className="font-bold">{name}</div></td>
            <td>{instructor}</td>
            <td>{email}</td>
            <td>{price}</td>
            <td>{available_seats}</td>
            <td>{status}</td>

            <td className="centered flex gap-1">
                <span className="btn bg-[#1b254b] text-white text-sm p-2 rounded-md text-xs" disabled={disabledPending} >pending</span>
                <span className="bg-[#1b254b] text-white text-sm p-2  rounded-md text-xs btn"  disabled={disabledApproved}  onClick={()=>  handleUpdateCourse ({value:"approved",id: _id})}>approved</span>
                <span className="bg-[#1b254b] text-white text-sm p-2 py-0 rounded-md text-xs btn" disabled={disabledDenied} onClick={()=>  handleUpdateCourse ({value:"denied",id: _id})}>denied</span>
                {/*  */}
            </td>
            <td>
                <Link to={`/dashboard/feedback/${_id}`}k><button className="bg-[#1b254b] text-white btn -mt-2" ><RiFeedbackFill /></button></Link>
            </td>
            
        </tr>

    );
};

export default ClassManager;