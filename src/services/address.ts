import Cookies from "js-cookie";

export const addNewAddress = async (formData:any) => {
  try {
    const res = await fetch("http://localhost:3000/api/address/create_address", {
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

export const fetchAllAddresses = async (id:any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/address/get_address?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateAddress = async (formData:any) => {
  try {
    const res = await fetch("http://localhost:3000/api/address/update_address", {
      method: "PUT",
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

export const deleteAddress = async (id:any) => {
  try {
    const res = await fetch(`http://localhost:3000/api/address/delete_address?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};