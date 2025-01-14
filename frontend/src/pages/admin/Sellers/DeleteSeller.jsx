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
import { data } from "react-router-dom"
import { toast } from "sonner"

const DeleteSeller = ({ data, onDeleteSeller }) => {
    const deleteSeller = async () => {
        try {
            const response = await axios.delete(`${api}/admin/deleteseller/${data.SellerId}`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (response.data.success) {
                toast.success(`${response.data.message} 👍`)
                onDeleteSeller();
            }
        } catch (error) {
            console.log(error)
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
                            This action cannot be undone. This will permanently delete the seller
                            and remove all the data associated with it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => { deleteSeller(data) }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DeleteSeller