'use client'
import { productById } from '@/services/product'
import React, { useEffect, useState } from 'react'
import CommonId from "@/component/CommonId"

interface ProductData {
    data: any; 
   
  }
export default function Page({params}:any) {
    const [val,setVal]=useState<ProductData | null>(null)
    console.log(params.detail,'lld')

    useEffect(()=>{
      getProduct()
    },[])


    const getProduct=async()=>{
        const data=await productById(params.detail)
        setVal(data)

    }

    console.log(val,'nna')
  return (
    <div style={{backgroundColor:"#07273c"}}>
    
    {val !== null && (
        <CommonId item={val.data} />
      )}
         
    </div>
  )
}
