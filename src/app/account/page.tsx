"use client";
import InputComp from "@/component/Form/inputComp";
import { GlobalContext,GlobalStateContextProps,User } from "@/context";
import {
  addNewAddress,
  deleteAddress,
  fetchAllAddresses,
  updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { Box, Typography, Paper } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";

// Define the interface for the form data
interface AddressForm {
  fullName: string;
  address: string;
  country: string;
  city: string;
  postalCode: string;
}


export default function Page() {
  const { user } = useContext(GlobalContext) as GlobalStateContextProps ;

  // Use the AddressForm interface for the formAddress state
  const [formAddress, setFormAddress] = useState<AddressForm>({
    fullName: "",
    address: "",
    country: "",
    city: "",
    postalCode: "",
  });

  const [data, setData] = useState<any>();
  const [editedId, setEditedId] = useState<string | undefined>();

  const onSave = async () => {
    const result = editedId
      ? await updateAddress({ ...formAddress, _id: editedId })
      : await addNewAddress({ ...formAddress, userID: user?.id });

    console.log(result, "result");
  };

  const onUpdate = (getItem: any) => {
    setFormAddress({
      fullName: getItem.fullName,
      address: getItem.address,
      country: getItem.country,
      city: getItem.city,
      postalCode: getItem.postalCode,
    });
    setEditedId(getItem._id);
  };

  const onDelete = async (item: any) => {
    const result = await deleteAddress(item._id);
    console.log(result, "result");
  };

  const getAddresses = async () => {
    const result = await fetchAllAddresses(user?.id);
    console.log(result, "result");
    setData(result.data);
  };

  useEffect(() => {
    if (user !== null) getAddresses();
  }, [user]);
  return (
    <div style={{ backgroundColor: "#07273c",paddingBottom:"50px" }}>
      <Box sx={{ width: "100%", paddingTop: 4 }}>
        <Box
          sx={{
            backgroundColor: "#10334a",
            width: "30%",
            boxShadow: "12px 2px 12px 12px #10334a",
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#ff7010" }}
          >
            {" "}
            User Info
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Email : {user?.email}
          </Typography>
          <Typography sx={{ textAlign: "center", color: "#fff" }}>
            Role : {user?.role}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%", paddingTop: 4 }}>
        <Box
          sx={{
            backgroundColor: "#10334a",
            width: "30%",
            boxShadow: "12px 2px 12px 12px #10334a",
            margin: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: "#ff7010" }}
          >
            Your Addresses
          </Typography>

          {data ? (
            data &&
            data.map((item:AddressForm) => (
              <Box>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  Address 
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  <span style={{ fontWeight: "bold", color: "#fff" }}>
                    FullName :{" "}
                  </span>{" "}
                  {item?.fullName}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Address : </span>
                  {item?.address}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  <span style={{ fontWeight: "bold" }}>Country : </span>{" "}
                  {item?.country}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  <span style={{ fontWeight: "bold" }}>City : </span>{" "}
                  {item?.city}
                </Typography>
                <Typography sx={{ textAlign: "center", color: "#fff" }}>
                  <span style={{ fontWeight: "bold" }}>postalCode : </span>{" "}
                  {item?.postalCode}
                </Typography>
                <Box sx={{ width: "100%", margin: "auto" }}>
                  <Box sx={{ width: "40%", margin: "auto" }}>
                    <button
                      onClick={() => onUpdate(item)}
                      style={{
                        width: "100%",
                        height: "40px",
                        outline: "none",
                        border: "none",
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "30px",
                        background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
                      }}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      style={{
                        width: "100%",
                        height: "40px",
                        outline: "none",
                        border: "none",
                        color: "#000",
                        fontWeight: "bold",
                        marginTop: "30px",
                        background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
                      }}
                    >
                      Delete
                    </button>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <Typography>No Address Found</Typography>
          )}
        </Box>
      </Box>
   
      <Box sx={{ width: "100%",paddingTop:"50px"}}>
        <Box sx={{ width: "60%", margin: "auto" }}>
          <Typography sx={{color:"#fff",fontSize:"22px"}}>Add Address</Typography>
          {addNewAddressFormControls.map((item) => (
            <>
              <Typography sx={{ marginTop: 2,color:"#fff" }}>{item?.label}</Typography>
              <InputComp
                type={item?.type}
                placeholder={item?.placeholder}
                value={formAddress[item.id as keyof AddressForm]} 
                onChange={(event) =>
                  setFormAddress({
                    ...formAddress,
                    [item.id]: event.target.value,
                  })
                }
              />
            </>
          ))}
          <button
            onClick={onSave}
            style={{
              width: "100%",
              height: "40px",
              outline: "none",
              border: "none",
              color: "#000",
              fontWeight: "bold",
              marginTop: "30px",
              background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
            }}
          >
            Save
          </button>
        </Box>
      </Box>
    </div>
  );
}
