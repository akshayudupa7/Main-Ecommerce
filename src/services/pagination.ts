
export const addPagination=async(formData:any)=>{
    console.log(formData,"bb")
    try{
      const res=await fetch('http://localhost:3000/api/pagination',{
        method:"POST",
        headers:{
            "content-type":"application/json",
        
        },
        body:JSON.stringify(formData)

      })
      const finaldata=await res.json()
      return finaldata
    }catch(error){
        console.log(error)
    }
}