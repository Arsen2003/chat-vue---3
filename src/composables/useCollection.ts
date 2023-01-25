import { firestore } from '../firebase/config';
import { doc, setDoc } from "firebase/firestore";
import { ref, onUnmounted } from 'vue';

const useCollection = () => {
  const addToCollection = async (collectionName: string, id: string, data: any) => {

    const docRef = doc(firestore, collectionName, id);

    await setDoc(docRef, data)
  }


  return { addToCollection }
}

export default useCollection