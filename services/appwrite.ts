// track the changes made by the user
const DATABSE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
.setEndpoint('http://cloud.appwrite.io/v1')
.setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID
    // const database = new DatabaseSync(client)
)
export const updateSearchCount = async (query:string,movie:Movie)=>{
    // check if a record of that search has already been stored
    // if a document is found increment the searchCount field
}