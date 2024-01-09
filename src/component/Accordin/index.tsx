"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useState,useContext } from "react";
import { Box,Stack} from "@mui/material";
import { CgMenuLeft } from "react-icons/cg";
import { AiOutlineMinus } from "react-icons/ai";
import { adminNavOptions, navOptions } from "@/utils";
import Image from "next/image";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import { usePathname, useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

function Nav({ isAdmin }: { isAdmin: boolean }) {
    return (
   
      <Box>
        <Stack>
          <Box>
            {isAdmin
              ? adminNavOptions.map((item, i) => (
                  <Box key={i} >
              
                      <Link  key={item.id} href={item.path} style={{color:"#fff",textDecoration:"none !important",marginBottom:"30px"}}>{item.label}</Link>
                   
                  </Box>
                ))
              : navOptions.map((item, i) => (
                  <Stack key={i}>
                      <Link key={item.id}  href={item.path} style={{color:"#fff",textDecoration:"none !important",marginBottom:"30px"}}>{item.label}</Link> 
                  </Stack>
                ))}
          </Box>
        </Stack>
      </Box>
    );
  }

export default function BasicAccordion() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { user, setUser, authuser, setAuthUser } =useContext(GlobalContext) || {};
const onLogout = () => {
  console.log("sss");
  if (setAuthUser) {
    setAuthUser(false);
  }
  if (setUser) {
    setUser(null);
  }
  Cookies.remove("token");
  localStorage.clear();
};
const pathName = usePathname();
const isAdmin = pathName.includes("admin-view");
console.log(isAdmin, "ll");
const router = useRouter();
const users = {
  role: "admin",
};
  return (
    <div>
      <Accordion
        sx={{ color: "#fff", backgroundColor: "black", width: "90vw" }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ lineHeight: "3rem" }}>
            <Link href="#" style={{ textDecoration: "none", color: "#fff" }}>
             
            </Link>
          </Typography>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={handleExpandClick}
            sx={{
              fontSize: 40,
              "&.Mui-expanded": {
                minHeight: 50,
                maxHeight: 50,
                "&:hover": { color: "orange" },
              },
            }}
          >
            {expanded == true ? (
              <CgMenuLeft
                sx={{ minHeight: "0px", "&:hover": { color: "orange" } }}
              />
            ) : (
              <AiOutlineMinus
                sx={{ minHeight: 0, "&:hover": { color: "orange" } }}
              />
            )}
          </AccordionSummary>
        </Box>
        <AccordionDetails sx={{ marginTop: 1 }}>
        <Box sx={{width:"90%",margin:"auto"}}>
        <Stack>
        
         
          <Box>
              <Nav isAdmin={isAdmin} />
            </Box>
          <Stack gap={2} sx={{borderTop:"2px solid #fff",paddingTop:2}} >
            <Box  >
              {!isAdmin && authuser ? (
                <Box>
                  <Typography sx={{marginBottom:"20px"}}>
                    <Link href="/account" style={{color:"#fff",fontSize:"16px"}}>Account</Link>
                  </Typography>
                  <Typography >
                    <Link href="/cart"  style={{color:"#fff",fontSize:"16px"}}>Cart</Link>
                  </Typography>
                </Box>
              ) : null}
            </Box>
          
            <Box>
              {users && users?.role === "admin" ? (
                isAdmin ? (
                  <Link  style={{color:"#fff",textDecoration:"none",fontSize:"16px"}} href="/admin-view">Client</Link>
                ) : (
                  <Link style={{color:"#fff",textDecoration:"none",fontSize:"16px"}} href="/admin-view">
                    Admin 
                  </Link>
                )
              ) : null}
            </Box>
            <Box>
              {authuser ? (
                <button onClick={onLogout} style={{}}><IoMdLogOut /></button>
              ) : (
                <button onClick={() => router.push("/login")} ><IoMdLogIn/></button>
              )}
            </Box>
          </Stack>
       
        </Stack>
     
      </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}