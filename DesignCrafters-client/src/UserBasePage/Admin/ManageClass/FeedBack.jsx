
import { Form, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const FeedBack = () => {
    const { id } = useParams();
    const [axiosSecure] = useAxiosSecure();
    const handleFeedback = (event) =>{
        event.preventDefault();
        const form = event.target;
        const feedback = { feedback : form.feedback.value , id: id}
        console.log(feedback);
        axiosSecure.patch(`/updateFeedBack`,feedback)
        .then(data => {
            if(data.data.modifiedCount > 0){
                Swal.fire({
                    icon: 'success',
                    title: 'User Feedback is updated',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    return (
        <Form onSubmit={handleFeedback} className="bg-[#1b254b] text-white  p-20 rounded-2xl w-full">
            <h2 className="uppercase text-center text-3xl font-semibold">Class Feedback</h2>
            <div >
                <label className="label">
                    <span className="label-text">Review</span>
                </label>
                <textarea placeholder="Your valuable feedback" name="feedback" className="textarea textarea-bordered textarea-lg w-full text-black" ></textarea>
            </div>
            <div className="form-control mt-6">
                <input className="bg-white p-3 rounded-lg w-full" type="submit" value="Submit Feedback" />
            </div>
        </Form>
    );
};

export default FeedBack;