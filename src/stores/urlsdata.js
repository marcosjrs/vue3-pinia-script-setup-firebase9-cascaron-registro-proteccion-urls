import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { collection, query, where, getDocs, doc, addDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"
import { useLoaderStore } from "./loader";
import { nanoid } from "nanoid";


export const useUrlsDataStore = defineStore("urlsDataStore", () => {
  let urlsData = reactive([]);
  let loadingDocs = ref(false);
  const fetchUrlsData = async () => {
    const loaderStore = useLoaderStore();
    try {  
      if(!auth.currentUser.uid) return;
      loaderStore.inAction = true; 
      // Además del where, se aplican reglas en el firestore, para que no pueda devolver urls que no sean suyas
      const q = query(collection(db, "urls"), where("user", "==", auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      urlsData.splice(0);
      querySnapshot.forEach((doc) => {
        urlsData.push({...doc.data(), id: doc.id})
      });
    } catch (error) {
      console.warn(error);
    } finally {      
      loaderStore.inAction = false; 
    }
  }
  const addUrlData = async (data) => {
    const loaderStore = useLoaderStore();
    try {  
      if(!auth.currentUser.uid) return;
      loaderStore.inAction = true;      
      const dataToAdd = {...data, short: nanoid(6), user: auth.currentUser.uid};
      const newUrlData = await addDoc(collection(db, "urls"), dataToAdd); 
      urlsData.unshift({...dataToAdd, id: newUrlData.id});   
    } catch (error) {
      console.warn(error);
    } finally {      
      loaderStore.inAction = false; 
    }
  }
  const deleteUrlData = async (urlData) => {
    const loaderStore = useLoaderStore();
    try {  
      if(!auth.currentUser.uid) return;
      loaderStore.inAction = true;     
      await deleteDoc(doc(db, "urls", urlData.id)) 
      urlsData.splice(urlsData.indexOf(urlData), 1);
    } catch (error) {
      console.warn(error);
    } finally {      
      loaderStore.inAction = false; 
    }
  }
  return {urlsData, loadingDocs, fetchUrlsData, addUrlData, deleteUrlData}
});