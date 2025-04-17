import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Plus } from "lucide-react"
import EditMenu from "./EditMenu"
import { ChangeEvent, FormEvent, useState } from "react"
import { menuSchema, type Menu } from "@/schemas/menuSchema"
import { useMenuStore } from "@/store/useMenuStore"
import { useResturantStore } from "@/store/useResturantStore"

const Menu = () => {

  const [data, setData] = useState<Menu>({
    name: "",
    description: "",
    price: 0,
    image: null
  })

  const [selectedMenu, setSelectedMenu] = useState<Menu>()
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [error, setError] = useState<Partial<Menu>>({})

  const { createMenu, loading } = useMenuStore()
  const { resturant } = useResturantStore()


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    setData({ ...data, [name]: type === "number" ? Number(value) : value })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined
    if (file) {
      setData({ ...data, image: file })
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    const result = menuSchema.safeParse(data)
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setError(fieldError as Partial<Menu>)
      return
    }
    console.log(data)


    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price.toString());
      if (data.image) {
        formData.append("image", data.image);
      }
      await createMenu(formData);
      setOpen(false)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="p-2 mt-2">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold">Available Menu</h1>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition duration-200 cursor-pointer">
                  <Plus className=" h-4 w-4" />
                  Add Menu
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">Add New Menu</DialogTitle>
                    <DialogDescription>
                      Add a new menu item to the restaurant.
                      You can add a name, description, and price for the menu item.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="md:grid md:grid-cols-2 space-y-3 md:space-y-0 gap-4" >
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
                      <Input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        placeholder="Menu Name"
                        id="name"
                        className="border border-gray-300 p-2 rounded-md" />
                      {error?.name && <span className="text-red-500 text-sm">{error.name}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Menu Description"
                        id="description"
                        className="border border-gray-300 p-2 rounded-md" />
                      {error?.description && <span className="text-red-500 text-sm">{error.description}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="price" className="text-sm font-semibold">Price in (Rupees)</Label>
                      <Input
                        type="number"
                        name="price"
                        value={data.price}
                        placeholder="Menu Price"
                        onChange={handleChange}
                        id="price"
                        className="border border-gray-300 p-2 rounded-md" />
                      {error?.price && <span className="text-red-500 text-sm">{error.price}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="image" className="text-sm font-semibold">Upload Menu Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleFileChange}
                        id="image"
                        className="border border-gray-300 p-2 rounded-md" />
                      {error?.image && <span className="text-red-500 text-sm">{error.image}</span>}
                    </div>
                    <DialogFooter>
                      {
                        loading ? (
                          <Button className="cursor-pointer w-full" disabled={loading}>
                            <Loader2 className="animate-spin mr-2 h-4 w-4" />
                            Please Wait...
                          </Button>
                        ) : (
                          <Button className="cursor-pointer w-full">
                            Submit
                          </Button>
                        )
                      }
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {
                resturant.menus && resturant.menus.map((item: Menu, index: number) => (
                  <Card key={index} className="flex flex-col gap-2 p-0 hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative">
                      <AspectRatio ratio={16 / 9} className="rounded-tl-lg rounded-tr-lg overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
                      </AspectRatio>
                      <span className="absolute top-2 left-2 bg-red-500 font-bold text-primary-foreground text-xs px-2 py-0.5 rounded">Featured</span>
                    </div>
                    <CardContent>
                      <div className="flex flex-col gap-2 py-2">
                        <h2 className="text-lg font-bold">{item.name}</h2>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <div className="flex items-center">
                          <span className="text-sm font-bold">Price: {item.price}</span>
                        </div>
                        <CardFooter className="p-0 border-t border-t-slate-500">
                          <Button onClick={() => {
                            setSelectedMenu(item)
                            setEditOpen(true)
                          }
                          } className="w-full cursor-pointer">Edit Menu</Button>
                        </CardFooter>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
