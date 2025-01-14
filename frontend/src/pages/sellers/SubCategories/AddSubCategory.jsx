import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BadgePlus, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";

const AddSubCategory = ({ onSubCategoryAdded }) => {
    const { register, handleSubmit, setValue, watch, reset } = useForm();
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchAllCategories = async () => {
            try {
                const response = await axios.get(`${api}/seller/getallcateogriesforsellers`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    reset();
                    setCategoryData(response.data.data);
                    setOpen(false);
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchAllCategories();
    }, []);

    const addSubCategory = async (formData) => {
        try {
            setLoading(true);
            const form = new FormData();
            form.append("categoryId", formData.categoryId);
            form.append("subCategoryName", formData.name);
            form.append("subCategoryDescription", formData.description);
            form.append("subCategoryImage", formData.image[0]);
            const response = await axios.post(`${api}/seller/addsubcategory`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            }
            )
            if (response.data.success) {
                toast.success(`${response.data.message} 👍`);
                onSubCategoryAdded();
                setOpen(false);

            }
            console.log(response);
        } catch (error) {
            toast.error(`${error.response.data.message} 😒`);
        } finally {
            setLoading(false);
        }
    };

    const selectedCategory = watch("categoryId");

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button>
                        <BadgePlus className="mr-2" /> Add SubCategory
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Sub Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(addSubCategory)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Select
                                    onValueChange={(value) => setValue("categoryId", value)}
                                    required
                                >
                                    <SelectTrigger className="w-full col-span-3">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {categoryData.map((item) => (
                                                <SelectItem key={item._id} value={item._id}>
                                                    {item.categoryName}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            {/* SubCategory Name */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    placeholder="SubCategory Name"
                                    required
                                    {...register("name", { required: "Name is required" })}
                                />
                            </div>
                            {/* Image Upload */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                    Image
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    className="col-span-3"
                                    accept="image/*"
                                    required
                                    {...register("image", { required: "Image is required" })}
                                />
                            </div>
                            {/* Description */}
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Descriptions
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Type your description here."
                                    className="col-span-3"
                                    required
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>Add</>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddSubCategory;
