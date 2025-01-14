import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { api } from "@/utils/constant"
import axios from "axios"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"


const DeleteSubCategory = ({ data, onSubCategoryDeleted }) => {
    const deleteSubCategory = async (id) => {
        try {
            const response = await axios.delete(`${api}/seller/deletesubcategory/${id}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (response.data.success) {
                toast.success(`${response.data.message} 👍`)
                onSubCategoryDeleted();
            }
        } catch (error) {
            toast.error(`${error.response.data.message} 😒`)
        }
    }
    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">
                        <Trash2 />
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete this subcategory and remove all the data associated with this subcategory.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { deleteSubCategory(data._id) }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteSubCategory