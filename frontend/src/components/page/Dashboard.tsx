import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import Mail from "../Mail";
import { accounts, mails } from "@/lib/data";
import NavBar from "../NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {

    const { authUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();

    console.log('authUser is ', authUser);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/signin')
        }
    })

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="flex">
                <Mail
                    accounts={accounts}
                    mails={mails}
                />
            </div>
        </div>
    )
}

export default Dashboard