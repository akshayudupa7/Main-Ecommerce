'use client'
import React, { useContext } from "react";
import { Box } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import { deletetProduct } from "@/services/product";
import { toast } from "react-toastify";
import { addCart } from "@/services/cart";

interface ItemProps {
  item: any;
}

interface User {
  _id: string;
 
}

export default function Index({ item }: ItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const contextValue = useContext(GlobalContext);

  let setCurrentUpdated: React.Dispatch<React.SetStateAction<any>> | undefined;
  let user: User | null = null;

  if (contextValue !== null) {
    const { currentUpdated, setCurrentUpdated: setCurrentUpdatedContext, user: contextUser } = contextValue;
    setCurrentUpdated = setCurrentUpdatedContext;
    console.log(contextValue.user,'lv')
    
    if (contextUser && typeof contextUser === "object" && "_id" in contextUser) {
      user = contextUser as User; // Cast contextUser to User
    }
  } else {
    return false;
  }

  const onUpdate = () => {
    if (setCurrentUpdated) {
      setCurrentUpdated(item);
    }
    router.push("/admin-view/add-product");
  };

  const onDelete = async (id: any) => {
    const data = await deletetProduct(id);

    if (data.success) {
      toast.success(data.message);
    }
  };
  
  const onCart = async (val: any) => {
    console.log(val,'i')
      console.log(user,'kkkk')
      console.log(contextValue?.user?.id,'lvx')
      const data = await addCart({ productID: val._id, userID: contextValue?.user?.id });
      console.log(data,'mm')
    
  };

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
              onClick={() => onDelete(item._id)}
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
              onClick={() => onCart(item)}
            >
              Add To Cart
            </button>
          </>
        )}
      </Box>
    </div>
  );
}
