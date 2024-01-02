import mongoose from "mongoose"

const ConnectToDb=async()=>{
     const connectionSrt="mongodb+srv://akshayudupa7:kaimarakshay@cluster0.nbicwmp.mongodb.net/"
     
      mongoose.connect(connectionSrt).then(()=>console.log("mongodb connected successfully")).catch((err)=>console.log(err))

}

export default ConnectToDb