import { firestore } from '../firebase/config';
import { collection, getDocs, Timestamp, query, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted } from 'vue';

// interface IDoc {
// 	id: string;
// 	author?: string;
// 	text?: string;
// 	createdAt?: Timestamp;
// 	updatedAt?: Timestamp;
// }

const getCollection = async (collectionName: string) => {
  const documents = ref<any[]>([]);
  const error = ref(null);

  try {
    const q = query(collection(firestore, collectionName));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        documents.value.push({ ...doc.data(), id: doc.id });
      });
    });


    onUnmounted(() => {
      unsubscribe()
    })
  } catch (err: any) {
    error.value = err.message;
  }

  return { documents, error };
};

export default getCollection;
