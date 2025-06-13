import React, { useContext, useState } from 'react'
import { userData } from '../constants/mockData'


type review = {
    id: string,
    reviewer: string,
    rating: number,
    comment: string,
    date: string,
}

type service = {
    id: string,
    title: string,
    category: string,
    description: string,
    price: string,
    icon: string,
}
type request = {
    id: string,
    title: string,
    category: string,
    status: 'COMPLETED' | 'PENDING' | 'DELETED' | null,
    date: string,
    provider?: string, 
    responses?: number,
}

type qualification = {
    id: string,
    name: string,
    fileUrl: string
}

type portfolio = {
    id: string,
    title: string,
    imageUrl: string,
}

interface User {
    id: string,
    name: string,
    imageUrl: string,
    rating: number,
    reviews: review[],
    verified: boolean,
    joinDate: string,
    completedJobs: number,
    requestsMade: number,
    services: service[],
    requests: request[],
    portfolio: portfolio[],
    qualifications: qualification[],
    login: ({ }: any) => void,
    logout: () => void,
    updateProfile: ({}: any) => void,
    status: string, //To update
    loggedIn: boolean,
}


const UserContext = React.createContext<User>(null)

export const useUser = function(){
    return  useContext(UserContext)
}


export default function UserProvider({ children }) {
    const [user, setUser] = useState({
        id: "",
        name: "John Doe",
        imageUrl: "https://api.a0.dev/assets/image?text=TM&aspect=1:1",
        rating: 0,
        reviews: [],
        verified: false,
        joinDate: "",
        completedJobs: 0,
        requestsMade: 0,
        services: [],
        requests: [],
        portfolio: [],
        qualifications: [],
        status: "",
        loggedIn: false,
    });

    const login = function(userData: any){
        setUser({


            ...user,
            name: 'Jay Nhlapho',
            imageUrl: 'https://cdn.download.ams.birds.cornell.edu/api/v2/asset/311635911/900',
            loggedIn: true
        })
    }

    const logout = function(){

    }

    const updateProfile = function(info: any){
        setUser({...user, ...info})
    }

    return (
        <UserContext.Provider value={{ ...user, login, logout, updateProfile } }>
            { children }
        </ UserContext.Provider>
     )
}