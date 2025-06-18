import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { service } from "../constants/types";



//Fetching services 
const servicesRef = collection(db, 'services')
const services: service[] = []
onSnapshot(servicesRef, (snapShot) => {
    snapShot.forEach((doc) => services.push(doc.data() as service))
})