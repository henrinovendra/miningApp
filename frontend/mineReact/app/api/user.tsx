import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "./client"

export const signIn = async(email, password)=>{
   try{
    const res = await client.post('/login',{
        email, 
        password
      })
      if(res.data.success){
        const token = res.data.token;
    } 
    return res;
   }
   catch(err){
    console.log(err)
   }
}