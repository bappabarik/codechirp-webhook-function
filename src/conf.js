import { Client, Databases, ID } from 'node-appwrite'
class DatabaseService {
    client = new Client()
    database;
    constructor(){
        this.client
        .setEndpoint(process.env.APPWRITE_URL) // Your API Endpoint
        .setProject(process.env.APPWRITE_PROJECT_ID) // Your project ID
        .setKey(process.env.APPWRITE_API_KEY); // Your secret API key

        this.database = new Databases(this.client)
        
    }

    async createPost({event, content, draft = false, app,  providerID}){
        try {
            const response = await this.database.createDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_POST_COLLECTION_ID,
                ID.unique(),
                {
                    event,
                    content,
                    draft,
                    app,
                    providerID
                }
            )
            return response
        } catch (error) {
            console.log(error);
            
        }
    }

    async storeGithubAppData(id, {installationID}){
        try {
            return await this.database.createDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_CODECHIRP_GITHUBAPP_COLLECTION_ID,
                id,
                {
                    installationID       
                }
            )
        } catch (error) {
            console.log("DbService :: storeGithubAppData ::", error)
            return null;
        }
    }

    async getGithubAppData(id){
        try {
            return await this.database.getDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_CODECHIRP_GITHUBAPP_COLLECTION_ID,
                id
            )
        } catch (error) {
            console.log("DbService :: getGithubAppData ::", error)
            return null;
        }
    }

    async deleteInstallation(id){
        try {
            return await this.database.deleteDocument(
                process.env.APPWRITE_DATABASE_ID,
                process.env.APPWRITE_CODECHIRP_GITHUBAPP_COLLECTION_ID,
                id
            )
        } catch (error) {
            console.log("DbService :: deleteInstallation ::", error)
            return null
        }
    }
}

const databaseService = new DatabaseService()
export default databaseService;