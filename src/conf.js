import { Client, Databases, ID } from 'node-appwrite'
class DatabaseService {
    client = new Client()
    database;
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('67b9e400002246aea0ce') // Your project ID
        .setKey('standard_48563a09e91f597a29ca7250f0ade7d04119492df37ed1f7138ae1a29910c5b6a8b4d7355bd50df6882bd403d572ef26965e14d135105a0614aa17f72627524d9a888b5dc7ae7bd87768fb67489b1d363400f935fea893c65d134af31e849db31c6380cea3246cba8767ae5399f6795d1f7da8194e055caa91c95a75344fd5fc'); // Your secret API key

        this.database = new Databases(this.client)
        
    }

    async createPost({event, content, draft = false, app,  providerID}){
        try {
            const response = await this.database.createDocument(
                '67c2d53c001ded03e147',
                '67c2d560002f409a777d',
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
}

const databaseService = new DatabaseService()
export default databaseService;