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


const DeleteCategory = ({ data, onCategoryDelete }) => {
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`${api}/admin/deletcategory/${id}`, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(`${response.data.message} 👍`)
        onCategoryDelete();
      }
      console.log(response)
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
              This action cannot be undone. This will permanently delete this
              category and remove all the data associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteCategory(data._id)
              }}
            >Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteCategory