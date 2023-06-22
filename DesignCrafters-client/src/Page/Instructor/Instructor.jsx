import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BsPersonCircle } from "react-icons/bs";
import instructorImage from "./../../assets/Other/blank.png"
const Instructor = () => {
    
    const[allInstructor, setAllInstructor] = useState([])
    useEffect(()=>{
        fetch("https://design-crafters-server.vercel.app/allInstructor")
        .then(req => req.json())
        .then(data =>  setAllInstructor(data));
       },[])
       console.log(allInstructor)

       console.log(allInstructor);
    return (
        <div className="mb-40">
            <Helmet>
                <title>Design | Instructor</title>
            </Helmet>
            <div className="mb-20">
                <p>-</p>
            </div>
            <div className="mx-auto text-center  mb-20 md:w-3/12 border rounded-full shadow-xl bg-[#1c254b] w-[80%] mt-36 lg:mt-10">
                <h3 className="text-3xl font-semibold text-white uppercase  p-4">Our Instructor</h3>
            </div>
            <div className="grid lg:grid-cols-3 w-[80%] mx-auto gap-5 mb-20">
                {
                    allInstructor.map(instructor =>
                        <div key={instructor._id}>
                            <div className="card w-96 h-300 mx-auto bg-opacity-5 bg-[#1b254b] text-center dark:bg-white dark:bg-opacity-80">
                                <figure className="px-10 pt-10">
                                    {
                                        instructor.photo ?  <img src={instructor?.photo} alt="Shoes" className="rounded-xl" /> : <img src={instructorImage} alt="Shoes" className="rounded-xl" />
                                    }
                                   
                                </figure>

                                <div className="card-body">
                                    <p className="bg-[#1b254b] text-white p-2 text-lg rounded -mt-16 w-[95%] mx-auto"><span className="text-lg font-medium b">email :</span> {instructor.email}</p>
                                    <h2 className="text-[#1b254b] text-2xl font-bold mt-2">{instructor.name}</h2>
                                    <p className="bg-[#1b254b] text-white absolute right-10 top-10 p-2 text-lg rounded flex gap-2 justify-center items-center"><BsPersonCircle></BsPersonCircle>{instructor.student}</p>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Instructor;