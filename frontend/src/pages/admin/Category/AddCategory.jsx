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
import { api } from "@/utils/constant"
import axios from "axios"
import { BadgePlus, Loader2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const AddCategory = ({ onCategoryAdded }) => {
    const { register, handleSubmit } = useForm();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const addCategory = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("categoryImage", data.image[0]);
            formData.append("categoryName", data.name);
            formData.append("categoryDescription", data.description);

            const response = await axios.post(`${api}/admin/addcategory`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(`${response.data.message} 👍`);
                setOpen(false);
                onCategoryAdded();
            }
        } catch (error) {
            console.error("Error adding category:", error);
            toast.error(`${error.response?.data?.message || "Error adding category"} 👎`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button><BadgePlus /> Add Category</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(addCategory)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    className="col-span-3"
                                    placeholder="Category Name"
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
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ?
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
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddCategory;
