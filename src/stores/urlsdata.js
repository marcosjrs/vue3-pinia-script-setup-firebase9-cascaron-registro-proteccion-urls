import { reactive, ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { collection, query, where, getDocs, doc, addDoc, deleteDoc, getDoc, setDoc } from "firebase/firestore";
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
      const docRef = await doc(db, "urls", urlData.id)   
      const document = await getDoc(docRef); // solo puede obtener los doc de el user. Tiene regla en firestore.
      if(!document.exists()) return;

      await deleteDoc(docRef) 
      urlsData.splice(urlsData.indexOf(urlData), 1);
    } catch (error) {
      console.warn(error);
    } finally {      
      loaderStore.inAction = false; 
    }
  }

  
  const updateUrlData = async (urlData) => {
    const loaderStore = useLoaderStore();
    try {  
      if(!auth.currentUser.uid) return;
      loaderStore.inAction = true; 

      const docRef = await doc(db, "urls", urlData.id)   
      const document = await getDoc(docRef); // solo puede obtener los doc de el user. Tiene regla en firestore.
      if(!document.exists()) return;

      setDoc(docRef, urlData, { merge:true }); 
      // Una forma:
      // let founded = urlsData.find( el => el.id === urlData.id);
      // founded.name = urlData.name;
      // Otra forma, abreviando la anterior:
      //urlsData.find( el => el.id === urlData.id).name = urlData.name;
      // Otra forma:
      // urlsData = urlsData.map( 
      //   data => {
      //     if(data.id == urlData.id){
      //       data.name = urlData.name; //no funcionaría: data = {...data, ...urlData}
      //     }
      //     return data; // no funcionaría: {...data}
      //   }
      // );
      // Otra forma
      const position = urlsData.findIndex( el => el.id === urlData.id);
      urlsData.splice( position, 1, urlData);

    } catch (error) {
      console.warn(error);
    } finally {      
      loaderStore.inAction = false; 
    }
  }
  return {urlsData, loadingDocs, fetchUrlsData, addUrlData, deleteUrlData, updateUrlData}
});