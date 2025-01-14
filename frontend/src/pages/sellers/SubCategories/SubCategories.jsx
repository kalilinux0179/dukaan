import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import AddSubCategory from './AddSubCategory'
import axios from 'axios';
import { api } from '@/utils/constant';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import noDataImg from "@/assets/nodata.svg"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import UpdateSubCateogryStatus from './UpdateSubCateogryStatus';
import UpdateSubCategory from './UpdateSubCategory';
import DeleteSubCategory from './DeleteSubCategory';
import TableSkeleton from '@/components/Common/skeletons/TableSkeleton';

const SubCategories = () => {
  const [loading, setLoading] = useState(false);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const fetchAllSubCategories = async () => {
    try {
      const response = await axios.get(`${api}/seller/getallsubcategories`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setSubCategoryData(response.data.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useState(() => {
    fetchAllSubCategories();
  }, []);


  return (
    <>
      <div className="flex justify-between items-center">
        <Input placeholder="Search" className="w-60 " />
        <AddSubCategory onSubCategoryAdded={fetchAllSubCategories} />
      </div>
      <div className="bg-muted/50 rounded-lg p-4 my-4">
        {
          loading ?
            (
              <TableSkeleton />
            ) :
            (
              subCategoryData.length <= 0 ?
                (
                  <AspectRatio ratio={13 / 6} className="flex justify-center items-center" >
                    <img
                      src={noDataImg}
                      alt="No Data"
                      className="max-h-full max-w-full rounded-md object-cover"
                    />
                  </AspectRatio>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-left">Category Name</TableHead>
                        <TableHead className="text-center">SubCategory Name</TableHead>
                        <TableHead className="text-center">SubCategory Image</TableHead>
                        <TableHead className="text-center">Category Description</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-end">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subCategoryData.map((data) => (
                        <TableRow key={data._id} id={data._id}>
                          <TableCell className="text-left capitalize">{data.categoryName}</TableCell>
                          <TableCell className="text-center capitalize">{data.subCategoryName}</TableCell>
                          <TableCell className="flex justify-center items-center">
                            <img src={data.subCategoryImage} alt={data.categoryName} width={30} />
                          </TableCell>
                          <TableCell className="text-center">{data.subCategoryDescription}</TableCell>
                          <TableCell>
                            <div className="flex justify-center items-center space-x-2">
                              <UpdateSubCateogryStatus data={data} onSubCategoryUpdatedStatus={fetchAllSubCategories} />
                            </div>
                          </TableCell>
                          <TableCell >
                            <div className="flex  justify-end items-center gap-1">
                              <UpdateSubCategory />
                              <DeleteSubCategory data={data} onSubCategoryDeleted={fetchAllSubCategories} />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
            )
        }
      </div>
    </>
  )
}

export default SubCategories