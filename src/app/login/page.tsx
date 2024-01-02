"use client";
import React, { useState, ChangeEvent,useContext,useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { loginFormControls } from "@/utils";
import { Raleway } from "next/font/google";
import InputComp from "@/component/Form/inputComp";
import SelectComp from "@/component/Form/selectComp";
import { newLogin } from "@/services/user";

import { useRouter } from "next/navigation";
import { GlobalContext } from "@/context";
import Cookies from "js-cookie";
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
  const router = useRouter();

  const {user,setUser,authuser,setAuthUser}=useContext(GlobalContext) || {}
  const onSubmit = async () => {
    try {
      const data = await newLogin(formData);
      if (data.success) {
    
       if(setAuthUser){
        setAuthUser(true)
       }
       if(setUser){
        setUser(data?.finalData?.user)
       }
     setFormData(initialFormData)
     Cookies.set("token",data?.finalData?.token)
     localStorage.setItem("user",JSON.stringify(data?.finalData?.user))
      }
      setFormData(initialFormData);
      console.log(formData);
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    if (authuser) router.push("/");
  }, [authuser]);
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
            Log In
          </Typography>
          {loginFormControls.map((controlItem) =>
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
            Login In
          </button>

          <Typography sx={{ color: "#fff", fontSize: "14px", marginTop: 4 }}>
            New To Website?
          </Typography>
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
            onClick={() => router.push("register")}
          >
            Register
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
