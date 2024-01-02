'use client'
import React, { useEffect,useState } from 'react'
import CommonList from "@/component/CommonListing"
import { getProduct } from '@/services/product'



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
        setValue(getAdminProduct && getAdminProduct.message);
      } catch (error) {
        console.error(error);
      }
    };
  
    console.log(value, 'jjjj');
  
    return (
      <div style={{ backgroundColor: '#000' }}>
        {value && <CommonList data={value} />}
      </div>
    );
  }
  