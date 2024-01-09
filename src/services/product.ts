import Cookies from "js-cookie"
export const addProduct=async(formData:any)=>{
    console.log(formData,"bb")
    try{
      const res=await fetch('http://localhost:3000/api/admin/add_product',{
        method:"POST",
        headers:{
            "content-type":"application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body:JSON.stringify(formData)

      })
      const finaldata=await res.json()
      return finaldata
    }catch(error){
        console.log(error)
    }
}

export const getProduct=async()=>{

    try{
      const res=await fetch('http://localhost:3000/api/admin/get_product',{
        method:"GET",
      })
      const finaldata=await res.json()
      console.log(finaldata)
      return finaldata
    }catch(error){
        console.log(error)
    }
}


export const updatetProduct=async(formData:any)=>{

    try{
      const res=await fetch('http://localhost:3000/api/admin/update_product',{
        method:"PUT",
        headers:{
            "content-type":"application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
        body:JSON.stringify(formData)

      })
      const finaldata=await res.json()
      return finaldata
    }catch(error){
        console.log(error)
    }
}

export const deletetProduct=async(id:any)=>{

    try{
      const res=await fetch(`http://localhost:3000/api/admin/delete_product?id=${id}`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json",
            Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      const finaldata=await res.json()
      return finaldata
    }catch(error){
        console.log(error)
    }
}

export const productByCategory=async(id:string)=>{

    try{
      const res=await fetch(`http://localhost:3000/api/admin/product-by-category?id=${id}`,{
        method:"GET"
      })
      const finaldata=await res.json()
      return finaldata
    }catch(error){
        console.log(error)
    }
}



export const productById = async (id:number) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/product-by-id?id=${id}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );
  
      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };