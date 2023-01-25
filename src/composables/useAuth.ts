import { ref } from 'vue';
import { auth } from '@/firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const useAuth = () => {
  const signup = async (email: string, password: string, name: string) => {
    const user = ref();
    const error = ref();

    try {
      user.value = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(user.value.user, {
        displayName: name,
      });

      return user.value;
    } catch (err: any) {
      error.value = err.message;
      return error.value;
    }
  };
  const login = async (email: string, password: string) => {
    const user = ref();
    const error = ref();

    try {
      user.value = await signInWithEmailAndPassword(auth, email, password);

      return user.value;
    } catch (err: any) {
      error.value = err.message;
      return error.value;
    }
  };

  return { signup, login };
};

export default useAuth;
