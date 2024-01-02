// Import necessary dependencies and components
'use client'
import React, { useState, ChangeEvent, useEffect, useContext } from "react";
import { Box, Typography } from "@mui/material";
import { adminAddProductformControls } from "@/utils";
import { Raleway } from "next/font/google";
import InputComp from "@/component/Form/inputComp";
import SelectComp from "@/component/Form/selectComp";
import { initializeApp } from "firebase/app";
import { firebaseConfig, firebaseStroageURL } from "@/utils";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { addProduct, updatetProduct } from "@/services/product";
import toast from 'react-hot-toast';
import { GlobalContext } from "@/context";
import { useRouter } from "next/navigation";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL);

// Helper function for uploading image to Firebase
async function helperForUPloadingImageToFirebase(file: File): Promise<string> {
  const createUniqueFileName = (getFile: File): string => {
    const timeStamp = Date.now();
    const randomStringValue = Math.random().toString(36).substring(2, 12);

    return `${getFile.name}-${timeStamp}-${randomStringValue}`;
  }

  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `ecommerce/${getFileName}`);
  const uploadImage = uploadBytesResumable(storageReference, file);

  return new Promise<string>((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((downloadUrl) => resolve(downloadUrl))
          .catch((error) => reject(error));
      }
    );
  });
}

// Define the FormData interface
interface FormData {
  name: string;
  price: number;
  description: string;
  category: string;
  deliveryInfo: string;
  onSale: string;
  imageUrl: string;
  priceDrop: number;
  [key: string]: string | number;
}

// Initial form data
const initialFormData: FormData = {
  name: "",
  price: 0,
  description: "",
  category: "men",
  deliveryInfo: "",
  onSale: "no",
  imageUrl: "",
  priceDrop: 0,
};

const Ral = Raleway({
  weight: "400",
  subsets: ["latin"],
});

// Component
const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const contextValue = useContext(GlobalContext);
 const router=useRouter()
  useEffect(() => {
    if (contextValue !== null && contextValue.currentUpdated !== null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...contextValue.currentUpdated, // Spread the properties of currentUpdated
      }));
    }
  }, [contextValue]);

  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] as File;

    if (file) { 
      try {
        const extractImageUrl = await helperForUPloadingImageToFirebase(file);

        setFormData((prevFormData) => ({
          ...prevFormData,
          imageUrl: extractImageUrl,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  const onSubmit = async () => {
    console.log(formData);
    try {
      const data = contextValue?.currentUpdated!==null?await updatetProduct(formData):await addProduct(formData);
      if (data.success) {
        toast.success(data.message);
        contextValue?.setCurrentUpdated(null)
        router.push('/admin-view/manage-product')
      }
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // ... (other useEffect logic)
  }, [])

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
            Add Product
          </Typography>
          <Box sx={{backgroundColor:"#fff"}}>
            <input
              accept="image/*"
              max="1000000"
              type="file"
              onChange={handleImage}
            />
          </Box>
          {adminAddProductformControls.map((controlItem) =>
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
                value={formData[controlItem.id] as string}
              />
            ) : controlItem.componentType === "select" ? (
              <SelectComp
                options={controlItem.options}
                label={controlItem.label}
                value={formData[controlItem.id] as string}
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
            {
               contextValue?.currentUpdated !=null ? 'Update Product':'Add Product'
            }
          </button>
        </Box>
      </Box>
    </div>
  );
};

export default Page;
