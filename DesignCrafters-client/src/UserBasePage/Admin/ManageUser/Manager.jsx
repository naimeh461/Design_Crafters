import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import usePayment from "../../../Hooks/usePayment";


const Manager = ({user, index}) => {
    const {name,email,role,_id} = user;
    const [,refetch] =  usePayment();
    const [axiosSecure] = useAxiosSecure();
    const adminDisable = role === "instructor"
    const instructorDisable = role === "admin"
    const handleUserUpdate = (data,user) => {
        const instructor = { name: user?.name , email: user?.email , photo:user?.photo, student: 0}
        const value = {role : data.value , id: user._id}
        const fullData = {value, instructor}
        console.log(fullData)
        axiosSecure.patch('/updateUser',  fullData )
        .then(data => {
            console.log(data)
            if(data.data.setRole.modifiedCount)
            {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
            
    }
       

    return (
        <tr>
            <td>
                {index + 1}
            </td>

            <td><div className="font-bold">{name}</div></td>
            <td>{email}</td>
            <td>{role}</td>
            <td className="centered flex gap-2">
                <span disabled={adminDisable} className="btn bg-[#1b254b] text-white  rounded-md text-xs" onClick={()=>  handleUserUpdate({value:"admin"},user)}>Admin</span>
                <span disabled={instructorDisable} className="bg-[#1b254b] text-white  rounded-md text-xs btn" onClick={()=>  handleUserUpdate({value:"instructor"},user)}>Instructor</span>

            </td>

        </tr>
    );
};

export default Manager;