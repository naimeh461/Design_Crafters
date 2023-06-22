import ShowCourse from "../../Share/ShowCourse";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

const Classes = () => {
    const[allClasses , setAllClasses] = useState([])
    useEffect(()=>{
        fetch("https://design-crafters-server.vercel.app/allClasses")
        .then(req => req.json())
        .then(data =>  setAllClasses(data));
       },[])
    return (    
    <div>
        <Helmet>
                <title>Design | Classes</title>
        </Helmet>
        <p>-</p>
        <div className="mx-auto text-center mt-32 mb-20  md:w-3/12 border rounded-full shadow-xl bg-[#1c254b] w-[80%]">
        <div className="w-full">
            <h3 className="text-3xl font-semibold text-white uppercase  p-4 ">Our classes</h3>
        </div>
    </div>
        <div className="grid lg:grid-cols-3 w-[80%] mx-auto gap-5 mb-20">
            {
                allClasses.map(course => <ShowCourse key={course._id} course={course}></ShowCourse>)
                    
            }
        </div>

    </div>
    );
};

export default Classes;