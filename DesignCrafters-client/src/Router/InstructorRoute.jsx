import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useInstructor from "../Hooks/useInstructor";


const InstructorRoute = ({children}) => {
    let location = useLocation();
    const {user, loading} = useAuth();
    const [isInstructor, isInstructorLoading] = useInstructor();
    if(loading || isInstructorLoading){
        return <div className="text-center "><span className="loading loading-dots loading-lg"></span></div>
    }
    if(user && isInstructor){
        return children;
    }

    return <Navigate to="/"  state={{from : location}}></Navigate>
};

export default InstructorRoute;