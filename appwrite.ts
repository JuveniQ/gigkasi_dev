import { Client, Storage, ID } from "react-native-appwrite";

const awc = {
    bucket_id: '6851ea670001286ca7ec',
    poject_id: '6851ea2a0006cdc67827',
    endpoint: 'https://fra.cloud.appwrite.io/v1'
}


const client = new Client().setEndpoint(awc.endpoint).setProject(awc.poject_id)
const storage = new Storage(client)


export function getDefaultImageUrl(){
  
    
    const url =  storage.getFileView(awc.bucket_id, '6851f24000040335c213', )
    console.log(url.href)
    return url.href as string
}