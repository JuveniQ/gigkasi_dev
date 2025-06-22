import { Client, Storage, ID } from "react-native-appwrite";

const awc = {
    bucket_id: '6851ea670001286ca7ec',
    poject_id: '6851ea2a0006cdc67827',
    endpoint: 'https://fra.cloud.appwrite.io/v1'
}


const client = new Client().setEndpoint(awc.endpoint).setProject(awc.poject_id)
const storage = new Storage(client)


export function getDefaultImageUrl(fileID: string){
    const url =  storage.getFileView(awc.bucket_id,fileID)
    return url.href as string
}

export async function saveFile(fileData){
    let promise;
        try{
            await getFile(fileData)
            try{
                await storage.deleteFile(awc.bucket_id, fileData.uid)
                promise = await storage.createFile(awc.bucket_id, fileData.uid ,fileData)
            } catch(error){
                console.log('Error occured on deletion and creation')
            }

        } catch(getFileError){
            if(getFileError.code == 404){
                promise = await storage.createFile(awc.bucket_id, fileData.uid ,fileData)
            }
        }
    return promise
}


async function getFile(fileData) {
    const file = await storage.getFile(awc.bucket_id, fileData.uid)
}