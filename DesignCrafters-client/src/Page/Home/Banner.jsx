import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import img1 from "../../assets/Banner/bn1.png"
import img2 from "../../assets/Banner/bn2.png"
import img3 from "../../assets/Banner/bn3.png"
import img4 from "../../assets/Banner/bn4.png"
import img5 from "../../assets/Banner/bn5.png"

const Banner = () => {
    return (
        <Carousel className="dark:bg-[#1c254b]">
            <div><img className="" src={img1} /></div>
            <div><img className="" src={img2} /></div>
            <div><img className="" src={img3} /></div>
            <div><img className="" src={img4} /></div>
            <div><img className="" src={img5} /></div>
        </Carousel>
    );
};

export default Banner;