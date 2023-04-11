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
    try { 
      //(auth: Auth, email: string, password: string) 
      
      inAction.value = true;
      const {user} = await createUserWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};
      inAction.value = false;
      return true;      
    } catch ({code, message}) {    
      console.warn(code, message);  
      errorCode.value = code;
      errorMessage.value = message;
      inAction.value = false;    
      return false;
    }
  }

  async function loginUser(email, password) {
    try { 
      inAction.value = true;
      const {user} = await signInWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};
      inAction.value = false;
      return true;
      
    } catch ({code, message}) {    
      console.warn(code, message);  
      errorCode.value = code;
      errorMessage.value = message;
      inAction.value = false;    
      return false;
    }
  }

  async function logoutUser() {
    try {  
      inAction.value = true;    
      await signOut(auth);
      inAction.value = false;    
    } catch (error) {
      console.warn(error);
      inAction.value = false;    
    }
  }

  const isLogged = computed(() => {
    return !!user.value?.uid
  })

  onAuthStateChanged(auth, (userLogged) => {
    user.value = userLogged ? {...userLogged} : {};
  });


  return { user, isLogged, inAction, registerUser, loginUser, logoutUser, errorCode, errorMessage };
});
