import { useEffect, useState } from "react";
import reviewImg from "../../assets/Other/review.png"
import { Form } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Review = () => {
    const [reviews, setReviews] = useState([])
    const { user } = useAuth()

    const handleReview = event => {
        event.preventDefault();
        const form = event.target;
        const reviewer = form.name.value;
        const picture = user?.photoURL;
        const comment = form.reviewComment.value;
        const review_number = form.reviewNumber.value
        const review = { reviewer, picture, comment, review_number }
        console.log(review)
        fetch("https://design-crafters-server.vercel.app/review", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You for your review',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })

    }

    useEffect(() => {
        fetch("https://design-crafters-server.vercel.app/review")
            .then(req => req.json())
            .then(data => setReviews(data));
    }, [])

    return (

        <div>
                <div className="mx-auto text-center mt-60 mb-20 md:w-3/12 border rounded-full shadow-xl bg-[#1c254b] w-[80%] ">
                    <h3 className="text-3xl font-semibold text-white uppercase  p-4">Review Section</h3>
                </div>

                <ReviewCard reviews={reviews}></ReviewCard>

                <div className="w-[80%]  m-auto s my-20 p-10  bg-[#1b254b] text-white  rounded-2xl dark:bg-white dark:bg-opacity-80 dark:text-[#1c254b] ">
                    <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase dark:text-[#1c254b]">Please Give Your Valuable review<br /></h2>
                    <div className="lg:flex justify-center items-center gap-20 p-10">
                        <img className="lg:w-[40%] lg:h-[40%] " src={reviewImg} />
                        <div className="divider lg:divider-horizontal bg-white dark:bg-[#1c254b] rounded-lg"></div>
                        <div className="w-full dark:shadow-2xl dark:p-7 dark:rounded-2xl">
                            <Form onSubmit={handleReview} >
                                <div >
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <textarea placeholder="Name" defaultValue={user?.displayName} name="name" className="textarea textarea-bordered textarea-xs w-full text-black" ></textarea>
                                </div>
                                <div >
                                    <label className="label">
                                        <span className="label-text">Rating</span>
                                    </label>
                                    <textarea placeholder="Please Give float number under 5" name="reviewNumber" className="textarea textarea-bordered textarea-xs w-full text-black" ></textarea>

                                </div>
                                <div >
                                    <label className="label">
                                        <span className="label-text">Review</span>
                                    </label>
                                    <textarea placeholder="Your valuable feedback" name="reviewComment" className="textarea textarea-bordered textarea-lg w-full text-black" ></textarea>
                                </div>
                                <div className="form-control mt-6">
                                    <input className="bg-white p-3 rounded-lg w-full dark:bg-[#1c254b] dark:text-white" type="submit" value="Submit Review" />
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>

            );
};

            export default Review;