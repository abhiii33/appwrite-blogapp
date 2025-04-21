import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";

export class Authservice{
    client = new Client();
    account;
    constructor(){
      console.log('Endpoint:', import.meta.env.VITE_APPWRITE_URL);
console.log('Project ID:', import.meta.env.VITE_APPWRITE_PROJECT_ID);

        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
           this.account = new Account(this.client);
    }
        async createAccount ({email,password,name}){
            try {
                const useraccount = await this.account.create(ID.unique(),email,password,name)
             if(useraccount){
              return this.login({email,password})
             }else{
              return useraccount
             }
            } catch (error) {
                throw(error)
            }
        }
   async login({email,password}){
    try {
        return await this.account.createEmailSession(email,password)
    } catch (error) {
        throw(error)
    }
   }

  async getCurrentUser(){
  try {

     const user=  await this.account.get();
    console.log("User:", user);
  } 
  catch (error) {
    console.log( error);
 
  }
  return null;
  }

    async logout(){
      try {
        return this.account.deleteSessions()
      } catch (error) {
        throw(error)
      }
}
 

}

const  authService = new Authservice()
 
export default authService