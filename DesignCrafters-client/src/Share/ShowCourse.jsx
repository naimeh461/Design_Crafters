import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { Zoom } from "react-reveal";
import useAdmin from "../Hooks/useAdmin";
import useInstructor from "../Hooks/useInstructor";
import useAuth from "../Hooks/useAuth";
import useAddClasses from "../Hooks/useAddClasses";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ShowCourse = ({ course }) => {
    const { price, name, instructor, available_seats, enroll } = course;
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();
    const { user } = useAuth();
    const [, refetch] = useAddClasses()
    const isButtonDisabled = isAdmin === true || isInstructor === true || available_seats === 0;
    const seats = available_seats === 0;
    const navigate = useNavigate();
    const location = useLocation();
    const [axiosSecure] = useAxiosSecure();
    const handleAddCourse = (course) => {
        const { _id, price, name, instructor, image } = course
        if (user && user?.email) {
            const courseCart = { courseId: _id, price, name, instructor, image, email: user?.email }

            axiosSecure.post('/cardCollection', courseCart)
                .then(data => {
                    if (data.data.insertedId) {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            title: 'Course is Add To Your cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            swal({
                title: 'Please login to order the food',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                button: 'Login now!'
            }).then((value) => {
                if (value) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }
    return (
        <div>
            <Zoom>
                <div className={`card w-96 mx-auto ${seats ? "bg-opacity-20 bg-[#e92a2a]" : "bg-opacity-5 bg-[#1b254b]"} dark:bg-white dark:bg-opacity-80`}>
                    <figure className="px-10 pt-10">
                        <img src={course.image} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <p className="bg-[#1b254b] text-white absolute right-10 top-10 p-2 text-lg rounded">$ {price}</p>
                    <div className="card-body  ">
                        <h2 className="card-title text-[#1b254b] ">{name}</h2>
                        <p>Instructor: {instructor}</p>
                        <p>Available seats: {available_seats}</p>
                        <div className="card-actions flex">
                            <div className="mr-auto items-center">
                                <p>Enroll {enroll}</p>
                            </div>
                            <button disabled={isButtonDisabled} className="btn bg-[#1b254b] text-white" onClick={() => handleAddCourse(course)}>Add To Cart</button>

                        </div>
                    </div>
                </div>
            </Zoom>
        </div>
    )
};

export default ShowCourse;