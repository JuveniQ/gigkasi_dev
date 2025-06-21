import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { request, service } from "../constants/types";



//Fetching services 
const servicesRef = collection(db, 'requests')
const reqs: request[] = []
onSnapshot(servicesRef, (snapShot) => {
    snapShot.forEach((doc) => reqs.push(doc.data() as request))
})
console.log(reqs)
export let requests = reqs
