"use client";
import { Box, Typography, Stack } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { deleteCart, getCart } from "@/services/cart";
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

interface CartItem {
  _id: string;
  productID: {
    imageUrl: string;
    price: number;
  };
}

export default function Page() {
  const [val, setVal] = useState<CartItem[]>([]);
  const {
    user,
    cartItem,
    setCartItem: setCartItemContext,
  } = useContext(GlobalContext) ?? { user: null, setCartItem: () => {} }; // Provide default values

  useEffect(() => {
    if (user && user.id) getCarts();
  }, [user]);


  const router=useRouter()
  console.log(cartItem, "ku");

  const getCarts = async () => {
    console.log(user?.id);
    const data = await getCart(user?.id ?? "");
    setCartItemContext(data.message);
    localStorage.setItem("cartitem", JSON.stringify(data.message));
  };

  console.log(val, "ooo");

  const onDelete = async (id: any) => {
    const data = await deleteCart(id);
    console.log(data);
  };

  return (
    <div
      style={{
        backgroundColor: "#07273c",
        paddingTop: "40px",
        paddingLeft: "30px",
        paddingRight: "30px",
        paddingBottom:"30px"
      }}
    >
      <Box
        sx={{
          width: "70%",
          margin: "auto",
          boxShadow: "12px 2px 12px 12px #10334a",
          backgroundColor: "#10334a",
          paddingTop: 2,
        }}
      >
        {cartItem?.map((item) => (
          <React.Fragment key={item._id}>
            <Stack
              direction="row"
              sx={{ marginTop: 3 }}
              justifyContent="space-between"
            >
              <Box sx={{ display: "flex", gap: 4 }}>
                <Image
                  src={item.productID.imageUrl}
                  style={{ marginLeft: "20px" }}
                  width={120}
                  height={80}
                  alt="this is image"
                />
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  {item.productID.name}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 4 }}>
                <Typography sx={{ fontWeight: "bold", color: "#fff" }}>
                  {item.productID.price}
                </Typography>
                <Link
                  style={{ color: "red", textDecoration: "none" }}
                  href="#"
                  onClick={() => onDelete(item._id)}
                >
                  Remove
                </Link>
              </Box>
            </Stack>
          </React.Fragment>
        ))}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            paddingLeft: 4,
            marginTop: 4,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <Typography>Subtotal:</Typography>
          <Typography>
            {cartItem
              ? cartItem.reduce(
                  (total, item) => item?.productID?.price + total,
                  0
                )
              : null}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            paddingLeft: 4,
            marginTop: 4,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <Typography>Shipping:</Typography>
          <Typography>Free</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            paddingLeft: 4,
            marginTop: 4,
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <Typography>Total :</Typography>
          <Typography>
            {cartItem
              ? cartItem.reduce(
                  (total, item) => item?.productID?.price + total,
                  0
                )
              : null}
          </Typography>
        </Stack>
        <Box>
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
          onClick={()=>router.push('/checkout')}
        >
          Checkout
        </button>
      </Box>
      </Box>

    
    </div>
  );
}
