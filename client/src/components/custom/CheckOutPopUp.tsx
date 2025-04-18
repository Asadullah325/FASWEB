import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useUserStore } from "@/store/useUserStore"

const CheckOutPopUp = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const { user } = useUserStore()
    const [data, setData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        address: user?.address || "",
        city: user?.city || "",
        contact: user?.contact || "",
        country: user?.country || "",
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Handle form submission logic here
        console.log(data)
        setOpen(false) // Close the dialog after submission
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Review your order</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-xs text-muted-foreground">
                        Please review your order before proceeding to checkout.
                        Make sure all the details are correct, including the items and shipping information.
                    </DialogDescription>
                    <form onSubmit={handleSubmit}>
                        <div className="md:grid md:grid-cols-2 gap-2 space-y-2 md:space-y-0">
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    disabled
                                    value={data.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    disabled
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="oHn4o@example.com"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="contact">Contact</Label>
                                <Input
                                    type="number"
                                    id="contact"
                                    name="contact"
                                    disabled
                                    className="no-spinner"
                                    value={data.contact}
                                    onChange={handleChange}
                                    placeholder="123-456-7890"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={data.address}
                                    onChange={handleChange}
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={data.city}
                                    onChange={handleChange}
                                    placeholder="New York"
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={data.country}
                                    onChange={handleChange}
                                    placeholder="USA"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full cursor-pointer">Continue to checkout</Button>
                        </DialogFooter>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CheckOutPopUp
