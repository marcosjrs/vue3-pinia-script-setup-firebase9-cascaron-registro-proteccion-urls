import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useLoaderStore } from "./loader";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive({});
  const errorCode = ref('0');
  const errorMessage = ref('');

  async function registerUser(email, password) {
    const loaderStore = useLoaderStore();
    loaderStore.inAction = true;
    try {     
      const {user} = await createUserWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};    
    } catch (error) {    
      handleLoginOrRegisterError(error) 
      return false;
    } finally{
      loaderStore.inAction = false; 
    }
    return true;  
  }

  async function loginUser(email, password) {
    const loaderStore = useLoaderStore();
    loaderStore.inAction = true;
    try { 
      const {user} = await signInWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};     
    } catch (error) {    
      handleLoginOrRegisterError(error)  
      return false;
    } finally{
      loaderStore.inAction = false; 
    }    
    return true; 
  }

  async function logoutUser() {
    const loaderStore = useLoaderStore();
    loaderStore.inAction = true;
    try {  
      await signOut(auth);  
    } catch (error) {
      console.warn(error);   
    } finally{
      loaderStore.inAction = false; 
    }
  }

  const isLogged = computed(() => {
    return !!user.value?.uid
  })

  onAuthStateChanged(auth, (userLogged) => {
    user.value = userLogged ? {...userLogged} : {};
  });

  const handleLoginOrRegisterError = ({code, message}) => {   
    errorCode.value = code;
    errorMessage.value = message;
  }


  return { user, isLogged, registerUser, loginUser, logoutUser, errorCode, errorMessage };
});
