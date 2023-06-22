
import { useState } from 'react';
import { useEffect } from 'react';
import ShowCourse from '../../Share/ShowCourse';

const HmClass = () => {
    
    const[courses , setCourses] = useState([])
    useEffect(()=>{
        fetch("https://design-crafters-server.vercel.app/classes")
        .then(req => req.json())
        .then(data =>  setCourses(data));
       },[])
    
    return (
        <div className=''>
            <div className="mx-auto text-center mt-32 mb-20 w-[80%] lg:w-1/4  border rounded-full shadow-xl bg-[#1c254b]">

                <h3 className="text-3xl font-semibold text-white uppercase  pt-4 ">Popular classes</h3>
                <p className="text-white my-0 py-0 ">-----------------------------------------</p>
                <p className=" text-blue-200 mb-4 text-sm uppercase mt-2">Best classes for your</p>


            </div>
            
            <div className="some-class">
            </div>
                <div className="grid lg:grid-cols-3 w-[80%]  mx-auto gap-5 mb-20">
        
                    {
                        courses.map(course => <ShowCourse key={course._id} course={course}></ShowCourse>)
                    }
                </div>
                <div>
            </div>
        </div>
    );
};

export default HmClass;