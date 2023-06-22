import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import HmClass from "./HmClass";
import Instructor from "./Instructor";
import Review from "./review";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Design | HOME</title>
            </Helmet>
            <Banner></Banner>
            <HmClass></HmClass>
            <Instructor></Instructor>
            <Review></Review>
        </div>
    );
};

export default Home;