import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { RootState } from "@/redux/store"
import { Button } from "./ui/button"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { setAuthUser } from "@/redux/userSlice"

const NavBar = () => {

    const { authUser } = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = async () => {
        try {

            const token = localStorage.getItem('token');
            const config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout`, config);

            if (data?.success) {
                toast.success(data?.message);
                navigate('/signin');
                dispatch(setAuthUser({
                    firstName: '',
                    lastName: '',
                    email: '',
                }))
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.log(error)
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message)
            }
        }
    }
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between py-2">
                <h1 className="text-2xl font-bold">ExamAtlas</h1>
                <div className="flex items-center gap-4 font-medium">
                    <Avatar>
                        <AvatarImage alt={authUser?.firstName} />
                        <AvatarFallback>
                            {authUser?.firstName[0] + authUser?.lastName[0]}
                        </AvatarFallback>
                    </Avatar>
                    <h1>Welcome, {authUser?.firstName}</h1>
                    <Button onClick={logOutHandler} variant={'outline'} className="cursor-pointer">LogOut</Button>
                </div>
            </div>
        </div>
    )
}

export default NavBar