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

const SignUp = () => {

    interface SignUpType {
        firstName: string,
        lastName: string,
        email: string,
        password: string
    }
    const [input, setInput] = useState<SignUpType>({
        firstName: "",
        lastName: "",
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
            const sendData: SignUpType = {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                password: input.password
            }

            const { data } = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/signup`, sendData, config);

            console.log(data);
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
                <h1 className="text-center text-3xl font-bold">SignUp</h1>

                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">First Name</Label>
                    <Input onChange={changeEventHandler} placeholder="John" type="text" name="firstName" />
                </div>
                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">Last Name</Label>
                    <Input onChange={changeEventHandler} placeholder="Doe" type="text" name="lastName" />
                </div>
                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">Email</Label>
                    <Input onChange={changeEventHandler} placeholder="john@example.com" type="email" name="email" />
                </div>
                <div className="my-2 flex flex-col gap-2">
                    <Label className="font-medium">Password</Label>
                    <Input onChange={changeEventHandler} placeholder="Enter your password" type="password" name="password" />
                </div>
                {
                    loading ? <Button className='w-full my-4 cursor-pointer'><Loader2 className="w-4 h-4 animate-spin" />Please wait</Button> : <Button type='submit' className='w-full my-4 cursor-pointer'>SignUp</Button>
                }
                <div className="font-medium text-sm text-center">Already have an account? <Link to={'/signin'} className="text-blue-600 font-medium underline" >SignIn</Link></div>
            </form>
        </div>
    )
}

export default SignUp