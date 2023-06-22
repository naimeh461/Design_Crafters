import { createBrowserRouter } from "react-router-dom";
import Error404 from "../Page/Error404/Error404";
import Home from "../Page/Home/Home";
import Main from "../Layout/Main";
import Instructor from "../Page/Instructor/Instructor";
import Classes from "../Page/Classes/Classes";
import Login from "../Page/Login/Login";
import Register from "../Page/Register/Register";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminHome from "../UserBasePage/Admin/AdminHome/AdminHome";
import AdminRoute from "./AdminRoute";
import ManageUser from "../UserBasePage/Admin/ManageUser/ManageUser";
import ManageClass from "../UserBasePage/Admin/ManageClass/ManageClass";
import InstructorRoute from "./InstructorRoute";
import MyClasses from "../UserBasePage/Instructor/My Classes/MyClasses";
import InstructorHome from "../UserBasePage/Instructor/InstructorHome/InstructorHome";
import StudentRoute from "./StudentRoute";
import StudentHome from "../UserBasePage/Student/StudentHome/StudentHome";
import SelectedClass from "../UserBasePage/Student/Selected Classes/SelectedClass";
import EnrollClass from "../UserBasePage/Student/Enrolled Classes/EnrollClass";
import Payment from "../Payment/Payment";
import AddAClass from "../UserBasePage/Instructor/Add a Class/AddAClass";
import FeedBack from "../UserBasePage/Admin/ManageClass/FeedBack";
import PaymentHistory from "../UserBasePage/Student/Payment/PaymentHistory";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <Error404></Error404>,
        children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
            path: "/instructor",
            element: <Instructor/>,
        },
        {
            path: "/classes",
            element: <Classes/>,
        },
        {
            path: "/login",
            element: <Login/>,
        },
        {
            path: "/register",
            element: <Register/>,
        },
    ]},
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <Error404></Error404>,
        children: [
        {
            path: "adminHome",
            element: <AdminRoute><AdminHome></AdminHome></AdminRoute>,
        },
        {
            path: "manageUser",
            element: <AdminRoute><ManageUser></ManageUser></AdminRoute>,
        },
        {
            path: "feedback/:id",
            element: <AdminRoute><FeedBack></FeedBack></AdminRoute>,
        },
        {
            path: "manageClasses",
            element: <AdminRoute><ManageClass></ManageClass></AdminRoute>,
        },
        {
            path: "addClass",
            element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>,
        },
        {
            path: "myClass",
            element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>,
        },
        {
            path: "instructorHome",
            element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>,
        },
        {
            path: "studentHome",
            element: <StudentRoute><StudentHome></StudentHome></StudentRoute>,
        },
        {
            path: "selectedClass",
            element: <StudentRoute><SelectedClass></SelectedClass></StudentRoute>,
        },
        {
            path: "paymentHistory",
            element: <StudentRoute><PaymentHistory></PaymentHistory></StudentRoute>,
        },
        {
            path: "enrollClass",
            element: <StudentRoute><EnrollClass></EnrollClass></StudentRoute>,
        },
        {
            path: "payment/:id",
            element: <StudentRoute><Payment></Payment></StudentRoute>,
        },
    ]
    }
]);
export default router;