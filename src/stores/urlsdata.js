import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig"
import { useLoaderStore } from "./loader";


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
        urlsData.push(doc.data())
      });
    } 
    catch (error) {
      console.warn(error);
    }finally{      
      loaderStore.inAction = false; 
    }
  }
  return {urlsData, loadingDocs, fetchUrlsData}
});