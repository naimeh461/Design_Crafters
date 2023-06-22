
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import useInstructor from '../../../Hooks/useInstructor';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token;
console.log(img_hosting_token)
const AddAClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const [isInstructor] = useInstructor()
    const onSubmit = data =>{
        
        const instructor = user.displayName;
        const email = user.email;
        const {name, price, available_seats} = data;
        const formData = new FormData()
        formData.append('image', data.image[0])
        fetch(img_hosting_url,
            {
                method: "POST",
                body : formData
            })
            .then (res => res.json())
            .then(imgResponse => {
                console.log(imgResponse)
                if(imgResponse.success){
                    const image = imgResponse.data.display_url;
                    const newCourse = {name, price: parseFloat(price), available_seats : parseFloat(available_seats),instructor,email,image , status : "Pending",enroll:0}
                    console.log(newCourse)
                    if(isInstructor){
                    axiosSecure.post('/classes', newCourse)
                    .then(data => {
                        if(data.data.insertedId){
                            reset(); 
                            Swal.fire({
                                icon: 'success',
                                title: "Item added successfully",
                                showConfirmButton: false,
                                timer: 1500
                        })
                        }
                    })
                    }
                }
            })
        
    }
   
    return (
        <div className="w-full mx-auto ">
            <form onSubmit={handleSubmit(onSubmit)} className='w-[70%] mx-auto p-10 mb-10 rounded-2xl bg-[#1b254b] text-white'>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Class Name</span>
                    </label>
                    <input type="text" placeholder="Course Name"
                        {...register("name", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold text-white">Class Image</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input-bordered w-full" />
                </div>
                <div className='flex w-full gap-12'>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Instructor Name</span>
                        </label>
                        <input readOnly {...register("instructor")} placeholder={user.displayName} className='w-72'/>
                    </div>
                    <div className="form-control ">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Instructor Email</span>
                        </label>
                        <input readOnly {...register("instructor_email")} placeholder={user.email}  className='w-72' />
                    </div>
                </div>
                
                <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Price</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full -ml-5" />
                </div>
                <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold text-white">Available Seats</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} placeholder="Type here" className="input input-bordered w-full -ml-5" />
                </div>
                <input className="btn btn-sm mt-4  w-full bg-white" type="submit" value="Add Class" />
            </form>
        </div>
    );
};

export default AddAClass;