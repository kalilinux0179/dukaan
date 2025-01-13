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
import { SquarePen } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

    const updateCategory = async (formData) => {
        console.log({ id: data._id, ...formData });
        try {
            setLoading(true);
            // Add your API call to update the category here
            onCategoryUpdate?.(formData); 
            setOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
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
