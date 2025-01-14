import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { api } from "@/utils/constant"
import axios from "axios"
import { useState } from "react"
import { toast } from "sonner"

const UpdateSellerStatus = ({ data, onUpdateSellerStatus }) => {
    const [status, setStatus] = useState(data.status);
    const updateSellerStatus = async (value) => {
        try {
            const response = await axios.post(`${api}/admin/updatesellerstatus/${data.SellerId}`, { status: value }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (response.data.success) {
                toast.success(`${response.data.message} 👍`)
                onUpdateSellerStatus?.(value);
            }
        } catch (error) {
            toast.error(`${error.response.data.message} 😒`)
        }
    }
    return (
        <>
            <Select onValueChange={updateSellerStatus}>
                <SelectTrigger className="w-[150px] rounded-lg">
                    <SelectValue placeholder={data.Status} className="capitalize" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Suspended" className="capitalize">Suspended</SelectItem>
                        <SelectItem value="Banned" className="capitalize">Banned</SelectItem>
                        <SelectItem value="Warned" className="capitalize">Warned</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}

export default UpdateSellerStatus