import { ChangeEvent, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { setAuthUser } from "@/redux/userSlice"


const SignIn = () => {

    interface SignInType {
        email: string,
        password: string
    }
    const [input, setInput] = useState<SignInType>({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const config: AxiosRequestConfig = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const sendData: SignInType = {
                email: input.email,
                password: input.password
            }
            const { data } = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/signin`, sendData, config);

            if (data?.success) {
                toast.success(data?.message);
                localStorage.setItem('token', data?.token);
                dispatch(setAuthUser(data?.newUser));
                navigate('/')
            }

        } catch (error) {
            console.log(error);
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message);
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-96 border border-gray-200 shadow-2xl rounded-md p-6">
                <h1 className="text-center text-3xl font-bold">SignIn</h1>
                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">Email</Label>
                    <Input onChange={changeEventHandler} placeholder="john@example.com" type="email" name="email" />
                </div>
                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">Password</Label>
                    <Input onChange={changeEventHandler} placeholder="Enter your password" type="password" name="password" />
                </div>
                {
                    loading ? <Button className='w-full my-4 cursor-pointer'><Loader2 className="w-4 h-4 animate-spin" />Please wait</Button> : <Button type='submit' className='w-full my-4 cursor-pointer'>SignIn</Button>
                }
                <div className="font-medium text-sm text-center">Don't have an account? <Link to={'/signup'} className="text-blue-600 font-medium underline" >Signup</Link></div>
            </form>
        </div>
    )
}

export default SignIn