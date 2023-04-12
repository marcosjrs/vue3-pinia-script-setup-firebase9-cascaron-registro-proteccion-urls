import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut} from "firebase/auth";
import { auth } from "../../firebaseConfig";

export const useUserStore = defineStore("userStore", () => {
  const user = reactive({});
  const inAction = ref(false);
  const errorCode = ref('0');
  const errorMessage = ref('');

  async function registerUser(email, password) {
    inAction.value = true;
    try {     
      const {user} = await createUserWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};    
    } catch (error) {    
      handleLoginOrRegisterError(error) 
      return false;
    } finally{
      inAction.value = false; 
    }
    return true;  
  }

  async function loginUser(email, password) {
    inAction.value = true;
    try { 
      const {user} = await signInWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};     
    } catch (error) {    
      handleLoginOrRegisterError(error)  
      return false;
    } finally{
      inAction.value = false; 
    }    
    return true; 
  }

  async function logoutUser() {
    try {  
      inAction.value = true;    
      await signOut(auth);  
    } catch (error) {
      console.warn(error);   
    } finally{
      inAction.value = false; 
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


  return { user, isLogged, inAction, registerUser, loginUser, logoutUser, errorCode, errorMessage };
});
