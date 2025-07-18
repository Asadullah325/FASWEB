import { AvatarImage } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"
import CheckOutPopUp from "./CheckOutPopUp"
import { useState } from "react"
import { useCartStore } from "@/store/useCartStore"
import { CartItem } from "@/types/cartTypes"

const Cart = () => {

    const [open, setOpen] = useState<boolean>(false)
    const { cart, incrementQuantity, decrementQuantity, removeFromTheCart, clearCart } = useCartStore()

    const totalAmount = cart.reduce((acc, item) => {
        return acc + item.price * item.quantity
    }, 0)

    return (
        <>
            <div className="flex flex-col max-w-7xl mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl md:text-2xl font-bold">Your Cart</h1>
                    <Button onClick={() => clearCart()} variant={"link"} className="cursor-pointer">Clear All</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            cart.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center">Your cart is empty</TableCell>
                                </TableRow>
                            ) : (
                                cart.map((item: CartItem) => (
                                    <TableRow key={item._id}>
                                        <TableCell className="w-1/6">
                                            <Avatar className="w-10 h-10">
                                                <AvatarImage src={item.image} />
                                                <AvatarFallback>{item.name ? item.name.split(" ").map(n => n[0]).join("").toUpperCase() : "CN"}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    onClick={() => decrementQuantity(item._id)} className="cursor-pointer rounded-full"
                                                    size={"sm"}
                                                >-</Button>
                                                <span className="font-semibold">{item.quantity}</span>
                                                <Button
                                                    onClick={() => incrementQuantity(item._id)} className="cursor-pointer rounded-full"
                                                    size={"sm"}
                                                >+</Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>{item.price * item.quantity}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                onClick={() => removeFromTheCart(item._id)}
                                                variant={"destructive"}
                                                size={"sm"}
                                                className="cursor-pointer"
                                            >Remove</Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )
                        }

                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-left text-xl md:text-2xl font-semibold">Subtotal:</TableCell>
                            <TableCell colSpan={2} className="font-semibold text-xl md:text-2xl text-right">
                                {totalAmount}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
                <div className="flex justify-end mt-4">
                    {
                        cart.length > 0 && (
                            <Button onClick={() => setOpen(true)} className="cursor-pointer">Checkout</Button>
                        )
                    }
                </div>
                <CheckOutPopUp open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default Cart
