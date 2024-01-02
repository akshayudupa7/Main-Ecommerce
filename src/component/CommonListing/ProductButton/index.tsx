import React, { useContext } from "react";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { deletetProduct } from "@/services/product";
import { toast } from "react-toastify";
export default function Index({ item }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const contextValue = useContext(GlobalContext);

  let setCurrentUpdated: React.Dispatch<React.SetStateAction<any>> | undefined;

  if (contextValue !== null) {
    const { currentUpdated, setCurrentUpdated: setCurrentUpdatedContext, /* other properties */ } = contextValue;
    setCurrentUpdated = setCurrentUpdatedContext;
  } else {
    return null;
  }

  const onUpdate = () => {
    if (setCurrentUpdated) {
      setCurrentUpdated(item);
    }
    router.push("/admin-view/add-product");
  };


  const onDelete=async(id:any)=>{

    const data=await deletetProduct(id)

     if(data.success){
        toast.success(data.message)
     }
  }

  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        {pathname.includes("admin-view") ? (
          <>
            <button
              style={{
                width: "100%",
                height: "40px",
                outline: "none",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "30px",
                background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
              }}
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              style={{
                width: "100%",
                height: "40px",
                outline: "none",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "30px",
                background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
              }}

              onClick={()=>onDelete(item._id)}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              style={{
                width: "100%",
                height: "40px",
                outline: "none",
                border: "none",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "30px",
                background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
              }}
            >
              Add To Cart
            </button>
          </>
        )}
      </Box>
    </div>
  );
}
