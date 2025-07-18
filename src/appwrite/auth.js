import config from "../conf/conf"
import { Client, Account, ID } from "appwrite";

const client = new Client()
      .setEndpoint(config.appwriteurl) 
      .setProject(config.appwriteProjectId)
    //   .setCookieFallback(true);
      console.log('Endpoint:', import.meta.env.VITE_APPWRITE_URL);
      console.log('Project ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);
const account = new Account(client)


const createAccount = async (email, password,name) => {
    try {
        const userId = ID.unique()
        const response = await account.create(userId, email, password,name);
     if(response) {
        console.log("Account created successfully", response);
         return login(email, password)
     }else{
        return response
     }
    } catch (error) {
        console.error(error);
        throw error;
    
    }
}
const logout = async () => {
   try {
     const res = await account.deleteSession('current')
     console.log(res);
   } catch (error) {
        console.error(error);
    
   }
}
const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);   
        console.log(response);
        return response;        
    }          catch (error) {
        throw error;
      
    }
}

const currentuser = async()=>{
    try {
        // const session= await login(email, password)
    //   const user = await account.getSession('current');
  
            const user = await account.get();
        console.log("Current user:", user);
        return user;
    
}catch (error) {
        console.error(error);
        return null;
    }
}
 export  {createAccount,login,currentuser,logout}