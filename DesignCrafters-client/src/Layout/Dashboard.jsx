import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import useStudent from "../Hooks/useStudent";
import useInstructor from "../Hooks/useInstructor";
import { Helmet } from "react-helmet-async";


const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isStudent] = useStudent();
    const [isInstructor] = useInstructor();
    return (
        <div>
            <Helmet>
                <title>Design | Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle " />
                <div className="drawer-content flex flex-col items-center justify-center ">

                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 w-80 h-full -mt-4 blue-primary ">
                        {isAdmin &&
                            <li>
                                <>
                                    <li><NavLink to="/dashboard/adminHome" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Dashboard</NavLink></li>
                                    <li><NavLink to="/dashboard/manageClasses" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Manage Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/manageUser" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Manage Users</NavLink></li>
                                </>
                            </li>
                        }
                        {isStudent &&
                            <li>
                                <>
                                    <li><NavLink to="/dashboard/studentHome" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Dashboard</NavLink></li>
                                    <li><NavLink to="/dashboard/selectedClass" className={({ isActive }) => (isActive ? "active-das" : "default-das")} >Selected Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/enrollClass" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Enrolled Classes</NavLink></li>
                                    <li><NavLink to="/dashboard/paymentHistory" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Payment History</NavLink></li>
                                </>
                            </li>
                        }
                        {isInstructor &&
                            <li>
                                <>
                                    <li><NavLink to="/dashboard/instructorHome" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Dashboard</NavLink></li>
                                    <li><NavLink to="/dashboard/addClass" className={({ isActive }) => (isActive ? "active-das" : "default-das")} >Add a Class</NavLink></li>
                                    <li><NavLink to="/dashboard/myClass" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>My Classes</NavLink></li>
                                </>
                            </li>
                        }
                        <hr className="my-7"/>
                        <li > <NavLink to="/" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Home</NavLink></li>
                        <li > <NavLink to="/instructor" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Instructors</NavLink></li>
                        <li > <NavLink to="/classes" className={({ isActive }) => (isActive ? "active-das" : "default-das")}>Classes</NavLink></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;