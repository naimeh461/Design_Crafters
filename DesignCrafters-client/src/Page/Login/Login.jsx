import { Form, Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/Other/login.png"
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import Swal from "sweetalert2";
import { FaRegEye } from "react-icons/fa";
import SocialMedia from "../../Share/SocialMedia";


const Login = () => {
    const navigate = useNavigate();
    const [fbError,setFbError] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const {signIn} = useContext(AuthContext)
    const { register, handleSubmit,  formState: { errors } , reset} = useForm();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/"
    const onSubmit = data => {
        signIn(data.email,data.password)
        .then(result => {
            const user = result.user;
            console.log(user)
            Swal.fire({
                icon: 'success',
                title: 'Login Success Fully',
                showConfirmButton: false,
                timer: 1500
              })
            reset();
            navigate(from,{replace: true})
          })
          .catch(error => setFbError(error.message))
    }

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    return (
        <div>
          <p>-</p>
            <div className="w-[80%] mx-auto blue-primary rounded-2xl ">
        <Helmet><title>DC | Login</title></Helmet>
        <div className="  hover-bordered my-20 w-full shadow-2xl p-20 rounded-2xl bg-blue text-black"  >
            <h1 className="text-5xl font-bold  text-center text-white mb-10">Log in</h1>
        <div className="md:flex items-center justify-center">
          <div className="text-center lg:text-left bg md:w-[50%] mt-20 lg:mt-0">      
            <img src={loginImg} alt=""  />
          </div>
          <div className="lg:w-[50%]">
          <Form  onSubmit={handleSubmit(onSubmit)}   className="lg:py-20 px-10">
            <div className="">
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" {...register("email" , {required: true})}name="email" className="input input-bordered w-full" />
                {errors.email && <span className="text-red-600">email is required</span>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex items-center gap-5">
                  <input type={showPassword ? 'text' : 'password'}  placeholder="password" {...register("password" ,{required: true})} name="password" className="input input-bordered text-black ml-auto flex-grow" />
                  <span onClick={togglePassword} className="inline-block btn bg-white p-4 rounded-lg"><FaRegEye></FaRegEye></span>
                </div>
              </div>
                <p className="mt-2 text-white">Create a new account ?<Link to="/register" className="text-blue-500 "> Register</Link></p>
              <div className="form-control mt-6">
                <input className="btn btn-white w-full -mb-20" type="submit" value="Log in"></input> 
                <p className="text-red-600 mt-2">{fbError}</p>
              </div>
            </div>
          </Form>
          <SocialMedia></SocialMedia>
          </div>
        </div>
      </div>
      </div>
        </div>
    );
};

export default Login;