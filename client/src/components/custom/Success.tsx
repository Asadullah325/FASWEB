import { Card, CardContent, CardFooter } from "../ui/card"
import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../ui/button"
import { useOrderStore } from "@/store/useOrderStore"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Success = () => {

    const { orders, getOrderDetails } = useOrderStore()
    const navigate = useNavigate()

    useEffect(() => {
        getOrderDetails()
    }, [])

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-2xl font-bold text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4m0 0l2-2a9 9 0 1 1-12.728-12.728L12 9m0 0l2 2" />
                </svg>
                No order found
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {
                orders.map((order, index: number) => (
                    <Card key={index} className="flex flex-col gap-2 p-0 pb-3 hover:shadow-2xl transition-shadow duration-300">
                        <div className="relative">
                            <AspectRatio ratio={16 / 9} className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                                <img className="w-full h-full object-cover" src={order?.cartItems[0].image} alt={order.cartItems[0].name} />
                            </AspectRatio>
                        </div>
                        <CardContent>
                            <div className="flex flex-col gap-2 py-2">
                                <div className="text-lg font-semibold">{`Order ID: ${order?._id}`}</div>
                                <div className={`text-sm font-medium ${order.status === 'completed' ? 'text-green-500' : order.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                                    {`Status: ${order.status}`}
                                </div>
                                <div className="text-sm">{`Date: ${order?.createdAt}`}</div>
                                <div className="text-sm font-semibold">{`Price: $${order?.totalPrice}`}</div>
                            </div>
                            <CardFooter>
                                <Button onClick={() => navigate("/")} className="w-full cursor-pointer">Continue Shoping</Button>
                            </CardFooter>
                        </CardContent>
                    </Card>
                ))
            }
        </div>
    )
}

export default Success
