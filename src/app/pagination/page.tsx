"use client";
import { addPagination } from "@/services/pagination";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getProduct } from "@/services/product";
import { Box, Typography,Stack} from "@mui/material";
import CommonList from "@/component/CommonListing";
import Link from "next/link";

export default function Page({ searchParams }: any) {
  const [value, setValue] = useState();
  const [pg, setPg] = useState();
  const [store, setStore] = useState();
  let page = parseInt(searchParams.page, 10);
  page = !page || page < 0 ? 1 : page;
  const perPage = 2;

  useEffect(() => {
    getPage();
  }, [page]);

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

  const getPage = async () => {
    const data = await addPagination({ perPage, page });

    setPg(data.message.itemCount);
    setStore(data.message.items);
  };
  const totalPage = pg !== undefined ? Math.ceil(pg / perPage) : 0;

  const prevPage = page - 1 > 0 ? page - 1 : 1;

  const nextPage = page + 1;

  const pageNumber=[]
  const offset=1

  for(let i=page-offset;i<=page+offset;i++){
    if(i>=1 && i<=totalPage){
        pageNumber.push(i)
    }

  }




  return (
    <div style={{ backgroundColor: "#000" }}>
      <Box>{store && <CommonList data={store} />}</Box>
      <Stack direction="row" justifyContent="center" sx={{marginTop:"20px",gap:2}}>
        <Box>
        {page == 1 ? (
          <Typography sx={{ color: "grey" }}>Preivous</Typography>
        ) : (
          <Link  style={{color:"#fff",textDecoration:"none"}} href={`?page=${prevPage}`}>Preivous</Link>
        )}
      
        </Box>
       <Box sx={{}}>
       {
        pageNumber.map((item)=>(
                 <Link style={{marginRight:6,color:"#fff",textDecoration:"none"}} href={`?page=${item}`}>
                    {item}
                 </Link>
        ))
       }
       </Box>
       <Box>
       {page == totalPage ? (
          <Typography sx={{ color: "grey" }}>Next</Typography>
        ) : (
          <Link style={{color:"#fff",textDecoration:"none"}} href={`?page=${nextPage}`}>Next</Link>
        )}
       </Box>
       
      </Stack>
    </div>
  );
}
``;
