"use client";
import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { fetchAllAddresses } from "@/services/address";
import { GlobalContext, GlobalStateContextProps } from "@/context";
import { loadStripe } from "@stripe/stripe-js";
import { callStripeSession } from "@/services/stripe";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createNewOrder } from "@/services/order";

interface AddressItem {
  _id: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export default function Page() {
  const { user, checkform, setCheckform, cartItem, setCartItem } = useContext(
    GlobalContext
  ) as GlobalStateContextProps;

  const [data, setData] = useState<any>(null);
  const [address, setAddress] = useState<AddressItem[]>([]);
  const [selectId, setSelectId] = useState<string | null>(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [carts, setCarts] = useState();
  useEffect(() => {
    getCarts();
    if (user) getAddress();
  }, [user]);

  const params = useSearchParams();

  useEffect(() => {
    async function createFinalOrder() {
      const isStripe = JSON.parse(localStorage.getItem("stripe") || "null");
      const cartItems = JSON.parse(localStorage.getItem("cartitem") || "null");

      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData") || "null"
        );
        const users = JSON.parse(localStorage.getItem("user") || "null");
        const createFinalCheckoutFormData = {
          user: users?.id,
          shippingAddress: getCheckoutFormData.shipping,
          orderItems: cartItems.map((item: any) => ({
            qty: 1,
            product: item.productID,
          })),
          paymentMethod: "Stripe",

          totalPrice: cartItems.reduce(
            (total: any, item: any) => item.productID.price + total,
            0
          ),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };
        console.log(createFinalCheckoutFormData, "o");
        const res = await createNewOrder(createFinalCheckoutFormData);
        console.log(res);
        if (res.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          console.log("success ");
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          console.log("ss ");
        }
      }
    }
    createFinalOrder();
  }, [params.get("status"), cartItem]);
  // Fetch cart items from local storage

  const getCarts = () => {
    const val = JSON.parse(localStorage.getItem("cartitem") || "null");

    setData(val);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const store = JSON.parse(localStorage.getItem("cartitem") || "null");
    setCarts(store);
  };

  // Fetch user addresses
  const getAddress = async () => {
    try {
      const addr = await fetchAllAddresses(user?.id);
      setAddress(addr.data as AddressItem[]);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // Stripe publishable key
  const publishableKey =
    "pk_test_51OD4GHSBvAzN6i3oS6uTxX9erTSC4T621Ru1k5iYYH73OMWx0h6fMLEKZnGtUBSsMo6cObn5bo8DiufhYqhNN2nW00IkttiLwr";

  // Load Stripe
  const stripePromise = loadStripe(publishableKey);

  // Handle address selection
  const onSelectAddress = (getItem: any) => {
    if (getItem._id === selectId) {
      setSelectId(null);
      setCheckform({
        ...checkform,
        shipping: {},
      });
    }
    setSelectId(getItem._id);
    setCheckform({
      ...checkform,
      shipping: {
        ...checkform?.shipping,
        fullName: getItem.fullName,
        city: getItem.city,
        country: getItem.country,
        postalCode: getItem.postalCode,
        address: getItem.address,
      },
    });
  };
  console.log(checkform, "check");
  // Handle checkout
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const createLineItems = data.map((item: any) => ({
      price_data: {
        currency: "inr",
        product_data: {
          images: [item.productID.imageUrl],
          name: item.productID.name,
        },
        unit_amount: item.productID.price * 100,
      },
      quantity: 1,
    }));

    try {
      // Call Stripe session and get session ID
      const res = await callStripeSession(createLineItems);

      setIsOrderProcessing(true);
      localStorage.setItem("stripe", "true");
      localStorage.setItem("checkoutFormData", JSON.stringify(checkform));

      const stripeError = await stripe?.redirectToCheckout({
        sessionId: res.id,
      });

      if (stripeError) {
        console.error("Stripe redirect error:", stripeError);
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        setOrderSuccess(true);
      }, 2000);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return <Typography>your payment is succesful</Typography>;
  }
  return (
    <div style={{ backgroundColor: "#07273c", paddingBottom: "50px" }}>
      <Box
        sx={{
          backgroundColor: "#10334a",
          width: "70%",
          boxShadow: "2px 2px 2px 2px #10334a",
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "red", fontSize: "30px" }}
        >
          {" "}
          Cart Summay
        </Typography>
        {data &&
          data?.map((item: any) => (
            <React.Fragment key={item.productID.id}>
              <Box
                sx={{
                  marginTop: 4,
                  marginBottom: 4,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Image
                  src={item?.productID?.imageUrl}
                  width={180}
                  height={100}
                  alt="Product Image"
                  style={{ margin: "auto" }}
                />
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", textAlign: "center", marginTop: 1 }}
                >
                  {item.productID.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#fff", textAlign: "center", marginTop: 1 }}
                >
                  {item.productID.price}
                </Typography>
              </Box>
            </React.Fragment>
          ))}
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            margin: "auto",
            backgroundColor: "#10334a",
            width: "70%",
            boxShadow: "2px 2px 2px 2px #10334a",
          }}
        >
          {address &&
            address?.map((item) => (
              <Box key={item._id}>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "24px",
                    marginBottom: 2,
                  }}
                >
                  Shipping Address Details
                </Typography>
                <Typography
                  sx={{
                    textAlign: "center",
                    color: "red",
                    fontSize: "14px",
                    marginBottom: 2,
                  }}
                >
                  Complete your order by selecting address
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  FullName: {item?.fullName}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  Address: {item?.address}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  City: {item?.city}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  Country: {item?.country}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  PostalCode: {item?.postalCode}
                </Typography>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ width: "40%", margin: "auto" }}>
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
                      onClick={() => onSelectAddress(item)}
                    >
                      {item._id === selectId ? (
                        <Typography>Selected Address</Typography>
                      ) : (
                        <Typography>Select Address</Typography>
                      )}
                    </button>
                  </Box>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ width: "30%", margin: "auto" }}>
          <button
            style={{
              width: "180px",
              height: "40px",
              outline: "none",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              marginTop: "30px",
              background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
            }}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </Box>
      </Box>
    </div>
  );
}
