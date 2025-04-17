import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resturantSchema, type Resturant } from "@/schemas/resturantSchema"
import { useResturantStore } from "@/store/useResturantStore"
import { Loader2 } from "lucide-react"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"

const Resturant = () => {

    const [data, setData] = useState<Resturant>({
        name: "",
        city: "",
        country: "",
        time: 0,
        tags: [],
        image: undefined,
    })

    const [errors, setErrors] = useState<Partial<Resturant>>()

    const { loading, resturant, createResturant, updateResturant, getResturant } = useResturantStore()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target
        setData({ ...data, [name]: type === "number" ? Number(value) : value })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setData({ ...data, image: file })
        }
    }


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = resturantSchema.safeParse(data)
        if (!result.success) {
            console.log(result.error.formErrors.fieldErrors)
            const fieldErrors = result.error.formErrors.fieldErrors
            setErrors(fieldErrors as Partial<Resturant>)
            return
        }

        try {
            const formData = new FormData()
            formData.append("name", data.name);
            formData.append("city", data.city);
            formData.append("country", data.country);
            formData.append("delivaryTime", data.time.toString());
            formData.append("tags", JSON.stringify(data.tags));
            if (data.image) {
                formData.append("image", data.image);
            }

            if (resturant) {
                await updateResturant(formData)
            } else {
                await createResturant(formData)
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        const fetchRestaurant = async () => {
            await getResturant();
            if (resturant) {
                setData({
                    name: resturant.name || "",
                    city: resturant.city || "",
                    country: resturant.country || "",
                    time: resturant.delivaryTime || 0,
                    tags: resturant.tags
                        ? resturant.tags.map((tag: string) => tag)
                        : [],
                    image: undefined,
                });
            };
        }
        fetchRestaurant();
    })

    return (
        <>
            <div className="max-w-6xl mx-auto">
                <div className="p-2">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl md:text-3xl font-bold">Resturant</h1>
                        <form onSubmit={handleSubmit} className="md:grid md:grid-cols-2 space-y-2 md:space-y-0 gap-4" >
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-sm font-semibold">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    value={data.name}
                                    placeholder="Resturant Name"
                                    id="name"
                                    className="border border-gray-300 p-2 rounded-md" />
                                {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="city" className="text-sm font-semibold">City</Label>
                                <Input
                                    name="city"
                                    onChange={handleChange}
                                    value={data.city}
                                    type="text"
                                    placeholder="Resturant City"
                                    id="city"
                                    className="border border-gray-300 p-2 rounded-md" />
                                {errors?.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="country" className="text-sm font-semibold">Country</Label>
                                <Input
                                    name="country"
                                    onChange={handleChange}
                                    value={data.country}
                                    placeholder="Resturant Country"
                                    type="text"
                                    id="country"
                                    className="border border-gray-300 p-2 rounded-md"
                                />
                                {errors?.country && <p className="text-red-500 text-sm">{errors.country}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="time" className="text-sm font-semibold">Estimated Delivary (in minutes)</Label>
                                <Input
                                    name="time"
                                    onChange={handleChange}
                                    placeholder="Resturant Delivary Time"
                                    value={data.time}
                                    type="number"
                                    id="time"
                                    className="border border-gray-300 p-2 rounded-md" />
                                {errors?.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="tags" className="text-sm font-semibold">Tags</Label>
                                <Input
                                    name="tags"
                                    onChange={(e) => setData({ ...data, tags: e.target.value.split(",") })}
                                    value={data.tags}
                                    placeholder="Resturant Tags (comma separated)"
                                    type="text"
                                    id="tags"
                                    className="border border-gray-300 p-2 rounded-md" />
                                {errors?.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="image" className="text-sm font-semibold">Upload Banner Image</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="border border-gray-300 p-2 rounded-md" />
                                {errors?.image && (
                                    <p className="text-red-500 text-sm">{errors.image}</p>
                                )}

                            </div>
                            <div className="flex justify-end">
                                {
                                    loading ? (
                                        <Button className="w-full mt-4 cursor-pointer" disabled={loading}>
                                            <Loader2 className="animate-spin ml-2" size={16} />
                                            Please wait...
                                        </Button>
                                    ) : (
                                        <Button className="w-full mt-4 cursor-pointer">
                                            {resturant ? "Update Resturant" : "Add Resturant"}
                                        </Button>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Resturant
