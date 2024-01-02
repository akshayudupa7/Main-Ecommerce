

export const newRegister=async(formData:any)=>{
    try{
        const response=await fetch('http://localhost:3000/api/register',{
            method:'POST',
            headers:{
                "content-type":"application/json",

            },
            body:JSON.stringify(formData)

        })
         const finalData=await response.json()
         return finalData


    }catch(error){
        console.log(error)
    }
}

export const newLogin=async(formData:any)=>{
  try{
    const response=await fetch('http://localhost:3000/api/login',{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })

   const finalData=await response.json()
   return finalData
  }catch(error){
    console.log(error)
  }
}