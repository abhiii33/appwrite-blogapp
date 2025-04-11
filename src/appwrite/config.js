import conf from '..conf/conf'
import { Client, Databases, ID ,Storage,Query} from "appwrite";

export class Dbservice{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)
       this.databases= new Databases(this.client)
       this.bucket = new Storage(this.client)
    }
    async createPost({title,slug,featuredImage,content,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,
                         slug, {
                            title,
                            content,
                            status,
                            userId,
                            featuredImage
                         }
            )
        } catch (error) {
            throw(error)
        }
    }

    async updatePost(slug,{title,featuredImage,content,status}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                content,
                featuredImage,
                status
            })
        } catch (error) {
            throw(error)
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
        } catch (error) {
            throw(Error)
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async getPosts(queries=[ Query.equal("status","active")]){
   try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries)
 } 
 catch (error) {
             throw(error)
   }
}
  async uploadFile(file){
try {
     return await this.bucket.createFile(conf.appwriteBucketId,ID.unique,file)
} catch (error) {
    console.log("Appwrite serive :: uploadFile :: error", error);
}
  }

  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketId,
            fileId
        )
        return true
    } catch (error) {
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false
    }
}
getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}
}

const  dbservice = new Dbservice()
 
export default dbservice