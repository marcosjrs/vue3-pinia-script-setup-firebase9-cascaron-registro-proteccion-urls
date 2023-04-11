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
  const errorCode = ref('0');
  const errorMessage = ref('');

  async function registerUser(email, password) {
    try { 
      //(auth: Auth, email: string, password: string) 
      const {user} = await createUserWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};
      return true;
      
    } catch ({code, message}) {    
      console.warn(code, message);  
      errorCode.value = code;
      errorMessage.value = message;
      return false;
    }
  }

  async function loginUser(email, password) {
    try { 
      const {user} = await signInWithEmailAndPassword(auth, email+'', password+'');
      user.value = {...user};
      return true;
      
    } catch ({code, message}) {    
      console.warn(code, message);  
      errorCode.value = code;
      errorMessage.value = message;
      return false;
    }
  }

  async function logoutUser() {
    try {      
      await signOut(auth);
    } catch (error) {
      console.warn(error);
    }
  }

  const isLogged = computed(() => {
    return user.value?.uid
  })

  onAuthStateChanged(auth, (userLogged) => {
    user.value = userLogged ? {...userLogged} : {};
    console.log(user.value)
  });


  return { user, isLogged, registerUser, loginUser, logoutUser, errorCode, errorMessage };
});
