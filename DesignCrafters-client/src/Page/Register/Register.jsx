import { Form, Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet-async";
import loginImg from "../../assets/Other/login.png"
import { useContext, useState } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";
import Swal from "sweetalert2";
import SocialMedia from "../../Share/SocialMedia";

const Register = () => {

  const navigate = useNavigate();
  const [fbError, setFbError] = useState("")
  const { createUser, updateUserProfile } = useContext(AuthContext)
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const onSubmit = data => {
   
    const name = data.name;
    const photo = data.photoURL
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        updateUserProfile(name, photo)
          .then(() => {
            const saveUser = { name: data.name, email: data.email, photo: data.photoURL , role : "student" }
            fetch('https://design-crafters-server.vercel.app/users', {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Create user Success Fully',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              })
            reset();
            navigate("/")
          })

      })
      .catch(error => setFbError(error.message))
  }



  return (
    <div>
      <div className="mb-20">
      <p className="mb-10">-</p>
      </div>
      <div className="w-[80%] mx-auto blue-primary rounded-2xl ">
        <Helmet><title>DC | Register</title></Helmet>
        <div className="  hover-bordered my-20 w-full shadow-2xl p-20 rounded-2xl bg-blue text-black"  >
          <h1 className="text-5xl font-bold  text-center text-white">Register now</h1>
          <div className="md:flex items-center justify-center">
            <div className="text-center lg:text-left bg md:w-[50%] mt-20 lg:mt-0">
              <img src={loginImg} alt="" />
            </div>
            <div className="lg:w-[50%]">
              <Form onSubmit={handleSubmit(onSubmit)} className="lg:py-20 px-10 -mb-20">
                <div className="">
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">name</span>
                    </label>
                    <input type="text" placeholder="name" {...register("name", { required: true })} name="name" className="input input-bordered w-full" />
                    {errors.name && <span className="text-red-600">This field is required</span>}
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Photo Url</span>
                    </label>
                    <input type="text" placeholder="photoURL" {...register("photoURL", { required: true })} className="input input-bordered w-full" />
                    {errors.name && <span className="text-red-600">PhotoURL is required</span>}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="email" {...register("email", { required: true })} name="email" className="input input-bordered w-full" />
                    {errors.email && <span className="text-red-600">email is required</span>}
                  </div>
                  <div className="form-control ">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/ })} name="password" className="input input-bordered text-black w-full" />
                    {errors.password?.type === "required" && <span className="text-red-600"> Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-600"> Password is must be 6 characters</span>}
                    {errors.password?.type === "pattern" && <span className="text-red-600"> Password is must be ona number , one upper and lower case and one lower characters</span>}
                  </div>
                  <p className="mt-2 text-white">Already have an account ? <Link to="/login" className="text-blue-500 ">login</Link></p>
                  <div className="form-control mt-6">
                    <input className="btn btn-white w-full" type="submit" value="Register"></input>
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

export default Register;