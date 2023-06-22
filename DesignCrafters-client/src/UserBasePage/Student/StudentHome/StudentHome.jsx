import { Helmet } from "react-helmet-async";
import useGetInfo from "../../../Hooks/useGetInfo";

import userBlank from "../../../assets/Other/blank.png"
const StudentHome = () => {
    const [userInfo, refetch] = useGetInfo();
    return (
        <div>
            <Helmet>
                <title>Design | Student Dashboard</title>
            </Helmet>
             <div>
                <div className="bg-[#1b254b] text-white  p-10 rounded-2xl w-full">
                    <h2 className="uppercase text-center text-3xl font-semibold">Dashboard</h2>
                    <div className="mt-10 flex divide-x-4 justify-between gap-20">
                        <div className="tooltip tooltip-left ml-5 " data-tip={userInfo?.displayName}>
                            {userInfo?.photo ? <img className="rounded-full  w-[200px]" src={userInfo?.photo} /> : <img src={userBlank} alt="Shoes" className="rounded-full w-[200px]" />}
                        </div>
                        <div className="">
                        <div className="tooltip tooltip-left ml-5 text-left" data-tip={userInfo?.displayName}>
                            <h2 className="text-xl">Status : Student</h2>
                            {userInfo?.name && <h2 className="text-xl">Name : {userInfo?.name}</h2> }
                            <h2 className="text-xl">Email : {userInfo?.email}</h2>
                            <h2 className="text-xl mt-4">Function  :</h2>
                            <li>Select Class</li>
                            <li>Enrolled Class</li>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentHome;