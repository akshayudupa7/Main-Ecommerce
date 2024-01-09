import Cookies from "js-cookie";
export const addCart = async (val:any) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart/add_product`,
        {
            method: "POST",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(val),
          })

      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  export const  getCart = async (id:string) => {
    console.log(id,'getcart')
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart/get_product?id=${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
          })

      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  
  export const  deleteCart = async (id:string) => {
 
    try {
      const res = await fetch(
        `http://localhost:3000/api/cart/delete_product?id=${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
          })

      const data = await res.json();
  
      return data;
    } catch (e) {
      console.log(e);
    }
  };