import conf from '..conf/conf'
import { Client, Account, ID } from "appwrite";

export class Authservice{
    client = new Client();
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
           this.account = new Account(this.client);
    }
        async createAccount ({email,password,name}){
            try {
                const useraccount = await this.account.create(ID.unique(),email,password,name)
             if(useraccount){}
            } catch (error) {
                throw(error)
            }
        }
   async login({email,password}){
    try {
        const session = await this.account.createEmailPasswordSession(email,password)
    } catch (error) {
        throw(error)
    }
   }

  async getCurrentUser(){
  try {
      await this.account.get()
  } 
  catch (error) {
    throw(error)
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