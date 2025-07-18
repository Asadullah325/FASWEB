import { Badge } from "../ui/badge"
import { Timer } from "lucide-react"
import AvailableManu from "./AvailableManu"
import { useResturantStore } from "@/store/useResturantStore"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const ResturantDetails = () => {

    const params = useParams()
    const { getSingleResturant, singleResturant } = useResturantStore()



    useEffect(() => {
        if (params.id) {
            getSingleResturant(params.id)
        }
        console.log(params.id);

        console.log(singleResturant);

    }, [params.id])


    return (
        <>
            <div className="max-w-7xl mx-2 md:mx-auto my-4">
                <div className="w-full">
                    <div className="relative w-full h-40 md:h-64 lg:h-72">
                        <img src={singleResturant?.image} alt="Hero Image" className="w-full h-full object-cover rounded-md shadow-lg" />
                    </div>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="my-2 flex flex-col gap-2">
                            <h1 className="text-2xl md:text-3xl font-bold">{singleResturant?.name}</h1>
                            <div className="flex flex-wrap gap-2">
                                {
                                    singleResturant?.tags.map((item: string, index: number) => (
                                        <div key={index} className="relative flex items-center max-w-full gap-2">
                                            <Badge className="px-3 py-1 whitespace-nowrap">
                                                {item}
                                            </Badge>
                                        </div>
                                    ))
                                }
                            </div>
                            <p className="">{singleResturant?.country}</p>
                            <p className="">{singleResturant?.city}</p>
                            <div className="flex flex-col md:flex-row gap-2">
                                <div className="flex items-center gap-2">
                                    <Timer className="" size={20} />
                                    <h1 className=" font-semibold">
                                        Delivary Time
                                        <span className=""> {singleResturant?.delivaryTime} min</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <>
                        <AvailableManu />
                    </>
                </div>
            </div>
        </>
    )
}

export default ResturantDetails
