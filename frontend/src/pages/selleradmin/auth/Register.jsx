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
import { Link } from 'react-router-dom'
import { Loader2, Store } from 'lucide-react'
import axios from 'axios'
import { api } from '@/utils/constant'
import { toast } from 'sonner'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const RegisterHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${api}/sa/register`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      if (response.data.success) {
        toast.success(`${response.data.message} 👍`);
        setCredentials({
          fullName: "",
          email: "",
          password: ""
        })
      }
    } catch (error) {
      toast.error(`${error.response.data.message} 👎`)
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
                <CardTitle className="text-xl capitalize">Register an Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={RegisterHandler}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="fullname">Full Name</Label>
                        <Input
                          id="fullname"
                          type="text"
                          placeholder="Full Name"
                          required
                          value={credentials.fullName}
                          onChange={(e) => { setCredentials({ ...credentials, fullName: e.target.value }) }}
                        />
                      </div>
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="password"
                          required
                          value={credentials.password}
                          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        />
                      </div>
                      {
                        loading ?
                          <Button className="w-full" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait...
                          </Button> :
                          <Button type="submit" className="w-full">
                            Register
                          </Button>
                      }
                    </div>
                    <div className="text-center text-sm">
                      Already have an account?{" "}
                      <Link to="/auth/sa/login" className="underline underline-offset-4">
                        Login
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

export default Register