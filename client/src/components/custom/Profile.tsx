import { Loader2, LocateIcon, Mail, MapIcon, MapPin, Phone, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"


const Profile = () => {

  const [profileData, setProfileData] = useState({
    name: "",
    image: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    country: "",
  })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<string>("")
  const loading = false

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setSelectedProfile(result)
        setProfileData((prev) => ({ ...prev, image: result }))

      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(profileData)
  }

  return (
    <>
      <form className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Avatar className="relative w-20 h-20 md:w-24 md:h-24">
              <AvatarImage src={selectedProfile} />
              <AvatarFallback>
                {profileData.name ? profileData.name.split(" ").map(n => n[0]).join("").toUpperCase() : "CN"}
              </AvatarFallback>
              <input type="file" ref={imageRef} accept="image/*" onChange={fileChangeHandler} id="file-input" className="hidden" />
              <div onClick={() => imageRef.current?.click()} className="absolute inset-0 flex items-center justify-center bg-gray-500 rounded-full opacity-0 cursor-pointer hover:opacity-100 transition-opacity duration-300">
                <Plus className="text-white h-8 w-8" />
              </div>
            </Avatar>
            <Input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Name" className="w-full max-w-xs p-5 focus-visible:ring-transparent font-bold bg-transparent text-2xl border-0 outline-0" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-2 gap-4 my-4">
          <div className="flex items-center gap-2 rounded-sm  p-2">
            <Mail className="text-gray-500 h-10 w-10" />
            <div className="w-full">
              <Label htmlFor="email" className="text-sm font-bold ml-2">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={profileData.email}
                onChange={handleChange}
                placeholder="Email" className="w-full p-2 focus-visible:ring-transparent bg-transparent border-0 outline-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-sm  p-2">
            <MapPin className="text-gray-500 h-10 w-10" />
            <div className="w-full">
              <Label htmlFor="address" className="text-sm font-bold ml-2">Address</Label>
              <Input
                type="text"
                name="address"
                id="address"
                value={profileData.address}
                onChange={handleChange}
                placeholder="Address" className="w-full p-2 focus-visible:ring-transparent bg-transparent border-0 outline-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-sm  p-2">
            <MapIcon className="text-gray-500 h-10 w-10" />
            <div className="w-full">
              <Label htmlFor="city" className="text-sm font-bold ml-2">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={profileData.city}
                onChange={handleChange}
                placeholder="City" className="w-full p-2 focus-visible:ring-transparent bg-transparent border-0 outline-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-sm  p-2">
            <LocateIcon className="text-gray-500 h-10 w-10" />
            <div className="w-full">
              <Label htmlFor="country" className="text-sm font-bold ml-2">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                value={profileData.country}
                onChange={handleChange}
                placeholder="Country" className="w-full p-2 focus-visible:ring-transparent bg-transparent border-0 outline-0" />
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-sm  p-2">
            <Phone className="text-gray-500 h-10 w-10" />
            <div className="w-full">
              <Label htmlFor="phone" className="text-sm font-bold ml-2">Phone</Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Phone" className="w-full p-2 focus-visible:ring-transparent bg-transparent border-0 outline-0" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-10">
          {
            loading ? (
              <Button disabled={loading} className="w-full md:w-1/2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 text-xs rounded focus:outline-none focus:shadow-outline" type="button">
                <Loader2 className="animate-spin" size={20} />
                Please Wait...
              </Button>
            ) : (
              <Button className="font-bold cursor-pointer w-full md:w-1/2" onClick={handleSubmit}>
                Save Changes
              </Button>
            )
          }
        </div>
      </form>
    </>
  )
}

export default Profile
