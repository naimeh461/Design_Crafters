import Zoom from 'react-reveal/Zoom';
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
const Instructor = () => {


    const [instructors, setInstructors] = useState([]);
    useEffect(() => {
        fetch("https://design-crafters-server.vercel.app/instructor")
            .then(req => req.json())
            .then(data => setInstructors(data));
    }, [])
    return (
        <div>
            <div className="mx-auto text-center mt-60 mb-20 w-[80%] lg:w-1/3  border rounded-full shadow-xl bg-[#1c254b] ">
                <h3 className="text-3xl font-semibold text-white uppercase  pt-4">Popular Instructor</h3>
                <p className="text-white my-0 py-0">-------------------------------------------------------</p>
                <p className=" text-blue-200 mb-4 text-sm uppercase mt-2">A Good Instructors can change a student life</p>
            </div>
            <div className="grid lg:grid-cols-3 w-[80%] mx-auto gap-5 mb-20">
                {
                    instructors.map(instructor =>
                        <div key={instructor._id}>
                            <Zoom>

                                <div className="card w-96 h-300 mx-auto bg-opacity-5 bg-[#1b254b] text-center dark:bg-white dark:bg-opacity-80">
                                    <figure className="px-10 pt-10">
                                        <img src={instructor.photo} alt="Shoes" className="rounded-xl" />
                                    </figure>

                                    <div className="card-body">
                                        <p className="bg-[#1b254b] text-white absolute right-10 bottom-20 left-10 p-2 text-lg rounded "><span className="text-lg font-medium b">email :</span> {instructor.email}</p>
                                        <h2 className="text-[#1b254b] text-2xl font-bold mt-2">{instructor.name}</h2>
                                        <p className="bg-[#1b254b] text-white absolute right-10 top-10 p-2 text-lg rounded flex gap-2 justify-center items-center"><BsPersonCircle></BsPersonCircle>{instructor.student}</p>
                                    </div>
                                </div>
                            </Zoom>
                        </div>

                    )
                }
            </div>

        </div>
    );
};

export default Instructor;