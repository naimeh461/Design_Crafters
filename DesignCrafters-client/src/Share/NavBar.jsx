import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo/logo-2.png"
import darklogo from "../assets/logo/logo.png"
import useAuth from "../Hooks/useAuth";
import useStudent from "../Hooks/useStudent";
import { FaOpencart } from "react-icons/fa";
import useAddClasses from "../Hooks/useAddClasses";
import { useEffect, useState } from "react";
import instructorImage from "../assets/Other/blank.png"
import useAdmin from "../Hooks/useAdmin";
import useInstructor from "../Hooks/useInstructor";
const NavBar = () => {
    const { user, logOut } = useAuth()
    const [isStudent] = useStudent();
    const [isAdmin] = useAdmin();
    const [isInstructor]= useInstructor();
    const [classes]= useAddClasses();
    const [theme, setTheme] = useState("light");

    useEffect(()=>{
        if(theme === "dark"){
            document.documentElement.classList.add("dark");
        }
        else{
            document.documentElement.classList.remove("dark");
        }
    },[theme]);


    const handleThemeSwitch =() => {
        setTheme(theme === "dark" ? "light" : "dark"); 
    }
    const handleLogOut = () => {
        logOut()
    }

    const option = <>
        <li > <NavLink to="/" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Home</NavLink></li>
        <li > <NavLink to="/instructor" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Instructors</NavLink></li>
        <li > <NavLink to="/classes" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Classes</NavLink></li>
        {!user&&  <li > <NavLink to="/register" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Register</NavLink></li>}
        {user&& 
            isAdmin ? <li > <NavLink to="/dashboard/adminHome" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Dashboard</NavLink></li> :<></>
        }
        {user&& 
            isInstructor ? <li > <NavLink to="/dashboard/instructorHome" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Dashboard</NavLink></li> :<></>
        }
        {user&& 
            isStudent ? <li > <NavLink to="/dashboard/studentHome" className={({ isActive }) => (isActive ? "active-nav" : "default-nav")}>Dashboard</NavLink></li> :<></>
        }
       
        <li><input type="checkbox" onClick={handleThemeSwitch} className="toggle dark:text-black -mt-[0px] " checked /></li>
    </>
    return (
        <div>
            <div className="navbar  bg-opacity-80 bg-[#1b254b]  fixed z-10 dark:bg-white dark:bg-opacity-60 ">
                <div className="navbar-start p-3">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black">
                            {option}
                        </ul>
                    </div>
                    <Link to="/"><img className="w-32 ml-4 dark:hidden" src={logo} alt="" /></Link>
                    <Link to="/"><img className="w-32 ml-4 hidden dark:list-item" src={darklogo} alt="" /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="px-1 flex gap-5 lg:text-white ">
                        {option}
                    </ul>
                </div>
                <div className="navbar-end">
                    {user ? <>
                        <div className="tooltip tooltip-left ml-5" data-tip={user?.displayName}>
                             {user?.photoURL ?  <img className="rounded-full w-10 mr-3" src={user?.photoURL} /> : <img src={instructorImage} alt="Shoes" className="rounded-full w-10 mr-3"/>}
                                   
                        </div>
                       
                    </> : <></>}
                    {isStudent &&
                        <li><NavLink to="/dashboard/selectedClass" >
                            <div className="indicator ">
                                <span className="indicator-item badge  bg-[#1b254b] text-white">{classes.length}</span>
                                <button className="bg-white p-2 rounded-lg text-2xl dark:bg-[#1b254b] dark:text-white"><FaOpencart></FaOpencart></button>
                            </div>
                        </NavLink></li>
                    }
                    {user ? <>
                        <div onClick={handleLogOut} className="active-nav mx-5 ">Log Out</div>
                    </> : <div className="active-nav mr-2"><Link to="/login">Log in</Link></div>}

                </div>
            </div>
        </div>
    );
};

export default NavBar;