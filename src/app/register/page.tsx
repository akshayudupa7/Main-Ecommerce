"use client";
import React, { useState, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { registrationFormControls } from "@/utils";
import { Raleway } from "next/font/google";
import InputComp from "@/component/Form/inputComp";
import SelectComp from "@/component/Form/selectComp";
import { newRegister } from "@/services/user";

const Ral = Raleway({
  weight: "400",
  subsets: ["latin"],
});
interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  [key: string]: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const onSubmit = async () => {
    try {
      const data = await newRegister(formData);
      console.log(data, "hh");
      if (data.success) {
      }
      setFormData(initialFormData);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={Ral.className}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        <Box
          sx={{
            width: "30%",
            backgroundColor: "rgb(28,20, 20)",
            padding: "50px 40px",
            marginTop: 3,
            marginBottom: 3,
            boxShadow: "0 4px 8px rgba(190, 40, 220, 0.1)",
          }}
        >
          <Typography sx={{ color: "#fff", fontSize: "24px" }}>
            Register
          </Typography>
          {registrationFormControls.map((controlItem) =>
            controlItem.componentType === "input" ? (
              <InputComp
                key={controlItem.id}
                type={controlItem.type}
                placeholder={controlItem.placeholder}
                label={controlItem.label}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
                value={formData[controlItem.id]}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComp
                options={controlItem.options}
                label={controlItem.label}
                value={formData[controlItem.id]}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    [controlItem.id]: event.target.value,
                  });
                }}
              />
            ) : null
          )}

          <button
            style={{
              width: "180px",
              height: "40px",
              outline: "none",
              border: "none",
              color: "#fff",
              fontWeight: "bold",
              marginTop: "30px",
              background: `linear-gradient(to right, rgb(248, 187, 90) 0%, rgb(246, 215, 165) 25%, rgb(250, 222, 176) 45%, rgb(248, 187, 90) 100%)`,
            }}
            onClick={onSubmit}
          >
            Sign Up
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
