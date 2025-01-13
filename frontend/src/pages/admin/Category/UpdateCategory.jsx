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
import { api } from "@/utils/constant";
import axios from "axios";
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const UpdateCategory = ({ data, onCategoryUpdate }) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            name: data?.categoryName || "",
            description: data?.categoryDescription || "",
        },
    });

    // Pre-fill form when dialog opens
    const handleDialogOpenChange = (isOpen) => {
        setOpen(isOpen);
        if (isOpen && data) {
            setValue("name", data.categoryName);
            setValue("description", data.categoryDescription);
        }
    };

    const updateCategory = async (formdata) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("categoryName", formdata.name);
            formData.append("categoryDescription", formdata.description);
            formData.append("categoryImage", formdata.image[0]);
            const response = await axios.post(`${api}/admin/updatecategory/${data._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }, withCredentials: true
            })
            if (response.data.success) {
                toast.success(`${response.data.message} 👍`);
                onCategoryUpdate?.(formData);
                setOpen(false);
            }
        } catch (error) {
            console.error("Update failed:", error);
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleDialogOpenChange}>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <SquarePen />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(updateCategory)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    placeholder="Category Name"
                                    {...register("name", { required: true })}
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
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Type your Description here."
                                    className="col-span-3"
                                    {...register("description", { required: true })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Updating..." : "Update"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateCategory;
