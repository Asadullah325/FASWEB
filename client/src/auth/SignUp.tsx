import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Loader, Mail, PhoneIcon, User2 } from "lucide-react"
import { Link } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { UserSignUp, userSignUpSchema } from "@/schemas/userSchema"

const SignUp = () => {

  const [loading, setLoading] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [data, setData] = useState<UserSignUp>({
    email: "",
    password: "",
    contact: "",
    name: ""
  })

  const [errors, setErrors] = useState<Partial<UserSignUp>>({})

  const hadlepasswrdVisible = () => {
    setPasswordVisible(!passwordVisible)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Perform login logic here

    const result = userSignUpSchema.safeParse(data)
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setErrors(fieldError as Partial<UserSignUp>)
      setLoading(false)
      return
    }

    // After login, you can redirect the user or show a success message
    console.log(data)
    setLoading(false)
    setErrors({})
    setData({
      email: "",
      password: "",
      contact: "",
      name: ""
    })
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <form className="bg-emerald-100 shadow-md rounded px-8 pt-6 pb-8 w-90 md:w-100" >
          <h2 className="text-2xl font-bold mb-6 text-center">Create an account</h2>
          <div className="mb-4 relative">
            <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </Label>
            <Input
              placeholder="Enter your name"
              type="text"
              id="name"
              onChange={handleChange}
              name="name"
              value={data.name} />
            <User2 className="absolute top-9 right-3 transform " size={20} />
            {
              errors.name && (
                <p className="text-red-500 text-xs italic">{errors.name}</p>
              )
            }
          </div>
          <div className="mb-4 relative">
            <Label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
              Contact Number
            </Label>
            <Input
              placeholder="Enter your contact number"
              type="number"
              className="no-spinner"
              id="number"
              onChange={handleChange}
              name="contact"
              value={data.contact} />
            <PhoneIcon className="absolute top-9 right-3 transform " size={20} />
            {
              errors.contact && (
                <p className="text-red-500 text-xs italic">{errors.contact}</p>
              )
            }
          </div>
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
          <div className="mb-4 relative" >
            <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
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
          <div className="flex items-center justify-end">
            {
              loading ? (
                <Button disabled className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <Loader className="animate-spin" size={20} />
                  Please Wait...
                </Button>
              ) : (
                <Button className="w-full md:w-1/2 bg-emerald-500 hover:bg-emerald-700 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                  Sign Up
                </Button>
              )
            }
          </div>
          <Separator className="my-4 bg-emerald-400" orientation="horizontal" />
          <div className="flex items-center justify-center">
            <p className="text-sm text-gray-600">Already have an account? <Link to="/login" className="text-emerald-500 hover:text-emerald-700 font-bold">Login</Link></p>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignUp
