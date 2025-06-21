import { createContext, useContext, useEffect, useState } from "react";
import { request, service } from "../constants/types";
import { collection, onSnapshot, } from "firebase/firestore";
import { db } from "../firebase";



const DataContext = createContext(null)

export const useData = () => useContext(DataContext);


export const DataProvider = ({ children }) => {
    const [requests, setRequests] = useState<request[]>([])
    const [services, setServices] = useState<service[]>([])

    useEffect(() => {
        //Getting request and setting them

        const unsubscribe = onSnapshot(collection(db, "requests"), (snapshot) => {
            let reqs = []
            snapshot.forEach((req) => {
                reqs.push(req.data())
            })
            setRequests(reqs)
        })

        const unsubscribe2 = onSnapshot(collection(db, "services"), (snapshot) => {
            let servs = []
            snapshot.forEach((serv) => {
                servs.push(serv.data())
            })
            setServices(servs)
        })

        return () => {
            unsubscribe(); unsubscribe2()
        }
    }, []) 


    return (
        <DataContext.Provider value={{ requests, services }}>
            {children}
        </DataContext.Provider>
    )

}