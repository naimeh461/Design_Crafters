import { Outlet } from "react-router-dom";
import NavBar from "../Share/NavBar";
import Footer from "../Share/Footer";


const Main = () => {
    return (
        <div className="dark:bg-[#1c254b]">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;