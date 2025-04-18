import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useResturantStore } from "@/store/useResturantStore"
import { useEffect } from "react"

const Orders = () => {

    const { resturantOrders, getResturantOrders, updateResturantOrder } = useResturantStore();

    const handleStatusChange = async (orderId: string, status: string) => {
        await updateResturantOrder(orderId, status);
    }

    useEffect(() => {
        getResturantOrders()
    }, [])

    return (
        <div className="max-w-6xl mx-auto">
            <div className="p-2">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold">Orders Overview</h1>
                    {
                        resturantOrders.map((order) => (
                            <div key={order._id} className="flex flex-col md:flex-row sm:items-center gap-4 justify-between shadow-lg rounded-md p-4 mt-2">
                                <div className="flex-1 space-y-4 md:space-y-2 flex flex-col">
                                    <h1 className="text-lg font-bold">{order.delivaryDetails.name}</h1>
                                    <p className="font-semibold text-sm text-gray-500">
                                        <span>Address: </span>
                                        {order.delivaryDetails.address}
                                    </p>
                                    <p className="font-semibold text-sm text-gray-500">
                                        <span>Total Amount: </span>
                                        {order.totalPrice}
                                    </p>
                                </div>
                                <div className="w-full sm:w-1/3 flex flex-col gap-2">
                                    <Label htmlFor="status" className="px-2 text-sm font-semibold">Order Status</Label>
                                    <Select
                                        onValueChange={(newStatus) =>
                                            handleStatusChange(order._id, newStatus)
                                        }
                                        defaultValue={order.status}
                                    >
                                        <SelectTrigger className="w-full cursor-pointer" id="status">
                                            <SelectValue placeholder="Select Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    ["Pending", "Processing", "Out for Delivery", "Completed", "Cancelled"].map((status, index: number) => (
                                                        <SelectItem className="cursor-pointer uppercase" key={index} value={status.toLowerCase()}>
                                                            {status}
                                                        </SelectItem>
                                                    ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default Orders
