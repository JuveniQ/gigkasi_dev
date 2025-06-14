import React, { useContext, useState } from 'react'
import { userData } from '../constants/mockData'
import { User } from '../constants/types'





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