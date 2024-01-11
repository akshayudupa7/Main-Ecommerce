'use client'
import React, { useEffect,useState } from 'react'
import CommonList from "@/component/CommonListing"
import { getProduct } from '@/services/product'
import { SearchProd } from '@/services/search';
import { Box } from '@mui/material';

interface Product {
  
    id: string;
    name: string;
    price: number;

  }
  
  export default function Page() {
    const [value, setValue] = useState<Product[] | null>(null); // Provide the type here
  
    useEffect(() => {
      getProducts();
    }, []);
  
    const getProducts = async () => {
      try {
        const getAdminProduct: any = await getProduct();
        setValue(getAdminProduct && getAdminProduct.data);
      } catch (error) {
        console.error(error);
      }
    };
    const [search,setSearch]=useState("")

    useEffect(()=>{
       getSearch()
    },[search])
    const getSearch=async()=>{
      const data=await SearchProd(search)
      console.log(data)
       
    }
  
 
  
    return (
      <div style={{ backgroundColor: '#000' }}>
        <Box sx={{width:"100%"}}>
          <Box sx={{width:"30%",margin:"auto"}}>
       
          </Box>
     
      </Box>
      <Box  sx={{marginTop:"40px"}}>
      {value && <CommonList data={value} />}
      </Box>
    
      </div>
    );
  }
  