
export const SearchProd=async(id:any)=>{

    try{
      const res=await fetch(`http://localhost:3000/api/search?id=${id}`,{
        method:"GET",
      })
      const finaldata=await res.json()
      console.log(finaldata)
      return finaldata
    }catch(error){
        console.log(error)
    }
}

