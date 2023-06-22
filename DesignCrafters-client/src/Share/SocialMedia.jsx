import { useLocation, useNavigate } from "react-router-dom";
import useAuth from '../Hooks/useAuth';
import {  FaGoogle } from 'react-icons/fa';
import Swal from "sweetalert2";

const SocialMedia = () => {
    const{googleSignIn} = useAuth()
    const location  = useLocation();
    const navigate = useNavigate();
    const from= location.state?.from?.pathname || "/"
    const handleGoogle = () => {
        googleSignIn()
        .then(result => {
            const loggedInUser = result.user;
            console.log(loggedInUser)
            const saveUser = {name : loggedInUser.displayName, email : loggedInUser.email , role : "student"}
            fetch('https://design-crafters-server.vercel.app/users',{
              method: "POST",
              headers :{
                "content-type" :  "application/json",
              },
              body: JSON.stringify(saveUser)
            })
        })
        .then(data => {
            console.log(data)
            Swal.fire({
              icon: 'success',
              title: 'Login Success Fully',
              showConfirmButton: false,
              timer: 1500
            })
            navigate(from,{replace: true})

        })
        
        
        
    }
    
    return (
        <div >
             <div>
            <hr />
            <div className="text-center my-4 text-white gap-10 flex justify-center">
                <button onClick={handleGoogle} className="btn btn-circle btn-outline bg-white hover:bg-slate-500">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    
        </div>
    );
};

export default SocialMedia;