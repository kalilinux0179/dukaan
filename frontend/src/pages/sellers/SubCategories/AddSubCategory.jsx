import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BadgePlus, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const AddSubCategory = ({ category, data }) => {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button><BadgePlus /> Add SubCategory</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Sub Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <form onSubmit={handleSubmit((data) => console.log(data))}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Select>
                                        <Label htmlFor="name" className="text-right">

                                        </Label>
                                        <SelectTrigger className="w-[276px]">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    data.map((item) => {
                                                        return (
                                                            <SelectItem key={item._id} value={item._id}>{item.categoryName}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        placeholder="SubCategory Name"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="image" className="text-right">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        className="col-span-3"
                                        accept="image/*"
                                        {...register("image")}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="description" className="text-right">
                                        Descriptions
                                    </Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Type your Description here."
                                        className="col-span-3"
                                        {...register("description")}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {
                                loading ?
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                    :
                                    <>
                                        Add
                                    </>
                            }
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AddSubCategory