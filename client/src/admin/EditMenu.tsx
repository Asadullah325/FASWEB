import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { menuSchema, type Menu } from "@/schemas/menuSchema"
import { useMenuStore } from "@/store/useMenuStore"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Loader2 } from "lucide-react"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

const EditMenu = (
    { selectedMenu, editOpen, setEditOpen }:
        {
            selectedMenu: Menu | undefined,
            editOpen: boolean,
            setEditOpen: Dispatch<SetStateAction<boolean>>
        }
) => {

    const [data, setData] = useState<Menu>({
        name: "",
        description: "",
        price: 0,
        image: null
    })

    const [error, setError] = useState<Partial<Menu>>({})
    const { loading, editMenu } = useMenuStore();

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
            await editMenu(selectedMenu?._id, formData);
            setEditOpen(false)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (selectedMenu) {
            setData({
                name: selectedMenu.name,
                description: selectedMenu.description,
                price: selectedMenu.price,
                image: selectedMenu.image
            })
        }
    }, [selectedMenu])

    return (
        <>
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Edit Menu</DialogTitle>
                        <DialogDescription>
                            Make changes to your menu here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="md:grid md:grid-cols-2 space-y-3 md:space-y-0 gap-4">
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
                            {error.name && <span className="text-red-500 text-sm">{error.name}</span>}
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
                            {error.description && <span className="text-red-500 text-sm">{error.description}</span>}
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
                            {error.price && <span className="text-red-500 text-sm">{error.price}</span>}
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
                            {error.image && <span className="text-red-500 text-sm">{error.image}</span>}
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
        </>
    )
}

export default EditMenu
