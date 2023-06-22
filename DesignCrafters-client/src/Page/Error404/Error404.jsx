import { Link, useRouteError } from "react-router-dom";
import bgImg  from "../../assets/Other/background404.png"
const Error404 = () => {
    const { error } = useRouteError()
    return (
        <div>
            <div className="hero min-h-screen bg-local"  >
                <img src={bgImg} alt="" className="h-screen"/>
                
                <div className="hero-content text-center text-neutral-content ">
                    <div className="max-w-md text-center ">
                        <h1 className="-mt-20 ml-11 w-full  text-2xl font-bold bg-[#1b254b] text-White p-4 rounded-2xl"> {error?.message} <br /> <hr className="my-2" /> PAGE NOT FOUND</h1>
                        <Link to="/"><button className="btn btn-white mt-[700px] text-2xl bg-[#1b254b] text-white">Go Back To Home</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error404;