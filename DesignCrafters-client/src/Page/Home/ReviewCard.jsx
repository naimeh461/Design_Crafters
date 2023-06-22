
import { Swiper , SwiperSlide} from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import '@smastrom/react-rating/style.css'
import "swiper/swiper.min.css";
import "swiper/swiper-bundle.min.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Rating } from "@smastrom/react-rating";

const ReviewCard = ({reviews}) => {
  
    
    return (
        <div className="my-20 w-[80%] m-auto">
            <>
            <Swiper
                grabCursor={true}
                slidesPerView={1}
                spaceBetween={100}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable:true
                }}
                breakpoints={{
                  "@0.00": {
                    slidesPerView: 1,
                    spaceBetween: 50,
                  },
                  
                   
                    "@1.50": {
                      slidesPerView: 2,
                      spaceBetween: 100,
                    },
                  }}
                  
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                  >
                
                  {
                    reviews.map(review =><SwiperSlide key={review._id} review={review}>
                        <div>
                        <div className="card-side w-[80%] shadow-inner mx-auto gap-5 p-5 flex rounded-lg mt-4 mb-20 bg-[#1b254b] text-white dark:bg-white dark:text-[#1c254b] dark:bg-opacity-60 ">
                        <figure><img className=' h-[100px] rounded-full' src={review.picture}/></figure>
                        <div className="p-0 my-auto w-full">
                            <div className='flex gap-5 justify-between items-center'>
                                <h2 className="card-title">{review.reviewer}</h2>
                                <h2 className="text flex items-center gap-3 ">{review.review_number}<Rating style={{ maxWidth: 100 }} value={Math.round(review.review_number)}/></h2>
                            </div>
                            <p>{review.comment}</p>
                        </div>
                        </div>
                        </div>
                         </SwiperSlide>)
                  }
                  <div>
                    
                  </div>
            </Swiper>
        </>
        </div>
    );
};

export default ReviewCard;