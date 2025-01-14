import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { api } from '@/utils/constant'
import axios from 'axios'
import React from 'react'
import { toast } from 'sonner'

const UpdateSubCateogryStatus = ({ data, onSubCategoryUpdatedStatus }) => {
  const subCategoryStatusUpdate = async (id, status) => {
    try {
      const response = await axios.post(`${api}/seller/updatesubcategorystatus/${id}`, { status }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      })
      if (response.data.success) {
        toast.success(`${response.data.message} 👍`)
        onSubCategoryUpdatedStatus();
      }
    } catch (error) {
      toast.error(`${error.response.data.message} 😒`)
    }
  }
  return (
    <>
      <Switch
        id="status"
        checked={data.status}
        onCheckedChange={() => { subCategoryStatusUpdate(data._id, !data.status) }}
      />
      <Badge
        variant={data.status ? "default" : "destructive"}
        className="w-20 flex justify-center items-center font-medium">
        {data.status ? "Active" : "Inactive"}
      </Badge>
    </>
  )
}

export default UpdateSubCateogryStatus