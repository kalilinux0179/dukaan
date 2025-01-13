import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { api } from '@/utils/constant'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'

const UpdateCategoryStatus = ({ data, onCategoryStatusUpdated }) => {
    const updateCategoryStatus = async (id, status) => {
        try {
            const repsonse = await axios.post(`${api}/admin/updatecategorystatus/${id}`, { status }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (repsonse.data.success) {
                toast.success(`${repsonse.data.message} 👍`)
                onCategoryStatusUpdated();
            }
        } catch (error) {
            toast.error(`${error.response.data.message} 😒`)
        }


    }
    return (
        <>
            <Switch id="status"
                checked={data.categoryStatus}
                onCheckedChange={() => updateCategoryStatus(data._id, !data.categoryStatus)}
            />
            <Label htmlFor="status">
                <Badge variant={data.categoryStatus ? "default" : "destructive"} className="w-20 flex justify-center items-center font-medium">
                    {data.categoryStatus ? "Active" : "Inactive"}
                </Badge>
            </Label>
        </>
    )
}

export default UpdateCategoryStatus