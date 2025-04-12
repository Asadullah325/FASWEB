import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import Image from "@/assets/images.jpeg"

const Cart = () => {
    return (
        <>
            <div className="flex flex-col max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl md:text-2xl font-bold">Your Cart</h1>
                    <Button variant={"link"} className="cursor-pointer">Clear All</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="w-1/6">
                                <Avatar className="w-10 h-10">
                                    <AvatarImage src={Image} alt="Product Image" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>Product A</TableCell>
                            <TableCell>$10.00</TableCell>
                            <TableCell>
                                <div className="flex items-center space-x-2">
                                    <Button  className="cursor-pointer rounded-full" size={"sm"}>-</Button>
                                    <span className="font-semibold">1</span>
                                    <Button  className="cursor-pointer rounded-full" size={"sm"}>+</Button>
                                </div>
                            </TableCell>
                            <TableCell>$10.00</TableCell>
                            <TableCell>
                                <Button variant={"destructive"} size={"sm"} className="cursor-pointe">Remove</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}  className="text-left text-xl md:text-2xl font-semibold">Subtotal:</TableCell>
                            <TableCell colSpan={2}  className="font-semibold text-xl md:text-2xl text-right">$10.00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div className="flex justify-end mt-4">
                    <Button className="cursor-pointer">Proceed to Checkout</Button>
                </div>
            </div>
        </>
    )
}

export default Cart
