import { PackageCheck, ShoppingCart } from "lucide-react"
import { AspectRatio } from "../ui/aspect-ratio"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useResturantStore } from "@/store/useResturantStore"
import { MenuItem } from "@/types/resturantTypes"
import { useCartStore } from "@/store/useCartStore"
import { useNavigate } from "react-router-dom"

const AvailableManu = () => {

  const { loading: isLoading, singleResturant } = useResturantStore()
  const { addToCart } = useCartStore()
  const navigate = useNavigate()

  return isLoading ? <AvailableManuSkeleton /> : (
    <div className="md:p-3">
      <h1 className="text-xl md:text-2xl font-bold">Available Manu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          singleResturant?.menus.map((item: MenuItem) => (
            <Card key={item._id} className="flex flex-col gap-2 p-0 hover:shadow-2xl transition-shadow duration-300">
              <div className="relative">
                <AspectRatio ratio={16 / 9} className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                  <img className="w-full h-full object-cover" src={item.image} alt="" />
                </AspectRatio>
                <span className="absolute top-2 left-2 bg-red-500 font-bold text-primary-foreground text-xs px-2 py-0.5 rounded">Featured</span>
              </div>
              <CardContent>
                <div className="flex flex-col gap-2 py-2">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <div className="flex items-center">
                    <PackageCheck className="h-4 w-4  inline-block mr-1" />
                    <span className="text-sm font-bold">Description: {item.description}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-bold">Price: ${item.price}</span>
                  </div>
                  <CardFooter className="p-0 border-t border-t-slate-500">
                    <Button onClick={() => {
                      addToCart(item)
                      navigate("/cart")
                    }} className="w-full cursor-pointer"><ShoppingCart className="mr-2 h-4 w-4" /> Add To Cart</Button>
                  </CardFooter>
                </div>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default AvailableManu


const AvailableManuSkeleton = () => {
  return (
    <div className="md:p-3">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Available Manu</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="flex flex-col gap-2 p-0">
            <div className="relative">
              <Skeleton className="w-full h-40 rounded-tl-lg rounded-tr-lg" />
              <span className="absolute top-2 left-2">
                <Skeleton className="h-5 w-16 rounded" />
              </span>
            </div>
            <CardContent className="flex flex-col gap-2 py-2">
              <Skeleton className="h-5 w-3/4 rounded" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-4 w-1/4 rounded" />
            </CardContent>
            <CardFooter className="p-0 border-t border-t-slate-500">
              <Skeleton className="h-10 w-full rounded-b-lg" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
