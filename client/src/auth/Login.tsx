import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Loader, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { UserLogin, userLoginSchema } from "@/schemas/userSchema"
import { useUserStore } from "@/store/useUserStore"

const Login = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [data, setData] = useState<UserLogin>({
        email: "",
        password: ""
    })
    const { login, loading } = useUserStore()
    const [errors, setErrors] = useState<Partial<UserLogin>>({})

    const hadlepasswrdVisible = () => {
        setPasswordVisible(!passwordVisible)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        const result = userLoginSchema.safeParse(data)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<UserLogin>)
            return
        }

        await login(data)
        setErrors({})
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
                <form className="bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 w-90 md:w-100 dark:bg-gray-900" >
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <div className="mb-4 relative">
                        <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100">
                            Email
                        </Label>
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            id="email"
                            onChange={handleChange}
                            name="email"
                            value={data.email} />
                        <Mail className="absolute top-9 right-3 transform " size={20} />
                        {
                            errors.email && (
                                <p className="text-red-500 text-xs italic">{errors.email}</p>
                            )
                        }
                    </div>
                    <div className="mb-4 relative" >
                        <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100">
                            Password
                        </Label>
                        <Input
                            placeholder="Enter your password"
                            type={passwordVisible ? "text" : "password"}
                            onChange={handleChange}
                            id="password"
                            name="password"
                            value={data.password}
                        />
                        {
                            passwordVisible ? (
                                <>
                                    <EyeOff className="absolute top-9 right-3 transform cursor-pointer" size={20} onClick={hadlepasswrdVisible} />
                                </>
                            ) : (
                                <>
                                    <Eye className="absolute top-9 right-3 transform cursor-pointer" size={20} onClick={hadlepasswrdVisible} />

                                </>
                            )
                        }
                        {
                            errors.password && (
                                <p className="text-red-500 text-xs italic">{errors.password}</p>
                            )
                        }
                    </div>
                    <div className="flex items-center justify-between my-2">
                        <Link to="/forgot-password" className="text-sm text-emerald-500 hover:text-emerald-700 font-bold">Forgot Password?</Link>
                    </div>
                    <div className="flex items-center justify-end">
                        {
                            loading ? (
                                <Button disabled className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    <Loader className="animate-spin" size={20} />
                                    Please Wait...
                                </Button>
                            ) : (
                                <Button className="w-full md:w-1/2 bg-emerald-500 hover:bg-emerald-700 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                            )
                        }
                    </div>

                    <Separator className="my-4 bg-emerald-400" orientation="horizontal" />
                    <div className="flex items-center justify-center">
                        <p className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? <Link to="/signup" className="text-emerald-500 hover:text-emerald-700 font-bold">Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
