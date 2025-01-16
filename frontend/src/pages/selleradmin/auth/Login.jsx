import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, Store } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import { api } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setSaAuth } from '@/store/selleradmin/AuthSlice'
import { Checkbox } from "@/components/ui/checkbox"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        rememberMe: false,
    })
    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(`${api}/sa/login`, credentials, {
                headers:{
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if (response.data.success) {
                toast.success(`${response.data.message} 😎`);
                setCredentials({
                    email: "",
                    password: "",
                    rememberMe: false,
                })
                const userData = response.data.userData
                dispatch(setSaAuth(userData))
                userData.role === "admin" ? navigate("/admin") : navigate("/seller");
            }
        } catch (error) {
            console.log(error)
            toast.error(`${error.response.data.message} 😒`)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Link to="/dashboard" className="flex items-center gap-2 self-center font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md">
                            <Store size={28} />
                        </div>
                        Dukaan
                    </Link>
                    <div className="flex flex-col gap-6">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl capitalize">Login to Continue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={LoginHandler}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="johndoe@gmail.com"
                                                    required
                                                    value={credentials.email}
                                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>
                                                    <Link
                                                        to="#"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline">
                                                        Forgot your password?
                                                    </Link>
                                                </div>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    placeholder="password"
                                                    required
                                                    value={credentials.password}
                                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    id="rememberme"
                                                    className="rounded-full"
                                                    checked={credentials.rememberMe}
                                                    onCheckedChange={(checked) => setCredentials({ ...credentials, rememberMe: checked })}
                                                />
                                                <Label
                                                    htmlFor="rememberme"
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    Remember me for 2 weeks
                                                </Label>
                                            </div>
                                            {
                                                loading ?
                                                    <Button disabled className="w-full">
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Please Wait...
                                                    </Button> :
                                                    <Button className="w-full">
                                                        Login
                                                    </Button>
                                            }
                                        </div>
                                        <div className="text-center text-sm">
                                            Don&apos;t have an account?{" "}
                                            <Link to="/auth/sa/register" className="underline underline-offset-4">
                                                Register
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login