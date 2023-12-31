import Cookies from "js-cookie";

export const callStripeSession = async (formData:any) => {
  try {
    const res = await fetch("http://localhost:3000/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};