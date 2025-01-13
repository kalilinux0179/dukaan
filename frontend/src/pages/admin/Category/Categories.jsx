import { Input } from '@/components/ui/input'
import AddCategory from './AddCategory'
import axios from 'axios';
import { useState } from 'react';
import { api } from '@/utils/constant';
import UpdateCategoryStatus from './UpdateCategoryStatus';
import DeleteCategory from './DeleteCategory';
import UpdateCategory from './UpdateCategory';
import nodata from "@/assets/nodata.svg"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const Categories = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${api}/admin/getallcateogries`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data.success) {
        setCategoryData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useState(() => {
    fetchAllCategories();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <Input placeholder="Search" className="w-60 " />
        <AddCategory onCategoryAdded={fetchAllCategories} />
      </div>
      <>
        <div className='bg-muted/50 my-4 rounded-md p-4'>
          {
            categoryData &&
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">Category Name</TableHead>
                  <TableHead className="text-center">Category Image</TableHead>
                  <TableHead className="text-center">Category Description</TableHead>
                  <TableHead className="text-center">Category Status</TableHead>
                  <TableHead className="text-end">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoryData.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell className="text-left capitalize">{data.categoryName}</TableCell>
                    <TableCell className="flex justify-center items-center">
                      <img src={data.categoryImage} alt={data.categoryName} width={30} />
                    </TableCell>
                    <TableCell className="text-center">{data.categoryDescription}</TableCell>
                    <TableCell>
                      <div className="flex justify-center items-center space-x-2">
                        <UpdateCategoryStatus data={data} onCategoryStatusUpdated={fetchAllCategories} />
                      </div>
                    </TableCell>
                    <TableCell >
                      <div className="flex  justify-end items-center gap-1">
                        <UpdateCategory data={data} onCategoryUpdate={fetchAllCategories} />
                        <DeleteCategory data={data} onCategoryDelete={fetchAllCategories} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          }
          {
            !categoryData &&
            <div className="flex justify-center items-center">
              <img src={nodata} alt="No Data" className="w-1/2" />
            </div>
          }
        </div>
      </>
    </>
  )
}

export default Categories