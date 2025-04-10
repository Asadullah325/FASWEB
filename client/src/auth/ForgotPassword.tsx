import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { forgotPasssword, forgotPasswordSchema } from "@/schemas/userSchema"
import { Loader, Mail } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

const ForgotPassword = () => {

    const [data, setData] = useState<forgotPasssword>({
        email: ""
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Partial<{ email: string }>>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        // Perform login logic here
        const result = forgotPasswordSchema.safeParse(data)
        if (!result.success) {
            const fieldError = result.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<forgotPasssword>)
            setLoading(false)
            return
        }
        // After login, you can redirect the user or show a success message
        console.log(data)
        setLoading(false)
        setErrors({})
        setData({
            email: "",
        })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
                <p className="mb-4">Please enter your email address to reset your password.</p>
                <form className="bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 w-90 md:w-100">
                    <div className="mb-4 relative">
                        <Label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
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
                    <div className="flex items-center justify-end">
                        {
                            loading ? (
                                <Button disabled className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                    <Loader className="animate-spin" size={20} />
                                    Please Wait...
                                </Button>
                            ) : (
                                <Button className="w-full md:w-1/2 bg-emerald-500 hover:bg-emerald-700 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                                    Send Reset Link
                                </Button>
                            )
                        }
                    </div>

                </form>
                <p className="mt-4">Remembered your password? <Link to="/login" className="text-emerald-500 hover:text-emerald-700 font-bold">Login</Link></p>
                <p className="mt-4">Don't have an account? <Link to="/signup" className="text-emerald-500 hover:text-emerald-700 font-bold">Sign Up</Link></p>
            </div>
        </>
    )
}

export default ForgotPassword
