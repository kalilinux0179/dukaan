import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import AddSubCategory from './AddSubCategory'
import axios from 'axios';
import { api } from '@/utils/constant';

const SubCategories = () => {
  const [categoryData, setCategoryData] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(`${api}/seller/getallcateogriesforsellers`, {
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
        <AddSubCategory data={categoryData} category={fetchAllCategories}/>
      </div>
    </>
  )
}

export default SubCategories