
import jwt from "jsonwebtoken"
export const AuthUser=(req:Request)=>{
    const token=req.headers.get('Authorization')?.split(" ")[1]
     console.log(token,'l')
    if(!token) return false

    try{
        const extractAuthInfo=jwt.verify(token,'default_secret_key')
        console.log(extractAuthInfo)
      if(extractAuthInfo) return extractAuthInfo
    }catch(error){
    console.log(error,'kk')
    return false
    }
}

export default AuthUser