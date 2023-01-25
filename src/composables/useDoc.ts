import { firestore } from '../firebase/config';
import {
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  onSnapshot,
  getDoc,
  addDoc,
  collection,
} from 'firebase/firestore';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { user } from './getUser';

const useDoc = () => {
  const getDocument = async (collectionName: string, id: string) => {
    const document = ref<any>(null);
    const error = ref<string>('');
    try {
      if (!id) error.value = 'There is no id to get document';
      else {
        const unsub = onSnapshot(doc(firestore, collectionName, id), (doc) => {
          document.value = { ...doc.data(), id: doc.id };
        });
      }
    } catch (err: any) {
      error.value = err.message;
    }

    return { document, error };
  };

  const getMessagesFromChat = async (collectionName: string, chatId: string) => {
    const messages = ref<any>([]);
    const error = ref<string>('');
    try {
      if (!chatId) throw new Error('There is no chat with this ID');
      const unsub = onSnapshot(doc(firestore, collectionName, chatId), (doc) => {
        messages.value = doc.data()?.messages;
      });
    } catch (err: any) {
      error.value = err.message;
    }

    return { messages, error };
  };

  const addNewMessageToCollection = async (newData: any, collectionName: string, id: string) => {
    const chatsDoc = doc(firestore, collectionName, id);
    const chat = await getDoc(chatsDoc);

    const newMessage = {
      id: uuidv4(),
      author: user.value?.displayName,
      authorId: user.value?.uid,
      text: newData,
      createdAt: Timestamp.fromDate(new Date()),
    };

    if (!chat.data()) {
      const collectionRef = collection(firestore, collectionName);
      return await addDoc(collectionRef, {
        isOnline: false,
        lastMessage: newData,
        membersId: [user.value?.uid, id],
        messages: [newMessage],
        sendBy: user.value?.displayName,
        date: Timestamp.fromDate(new Date()),
      });
    }

    try {
      if (chat.data()?.messages?.length > 0) {
        await updateDoc(chatsDoc, {
          ...chat.data(),
          messages: [...chat.data()?.messages, newMessage],
          date: Timestamp.fromDate(new Date()),
        });
      } else {
        await setDoc(chatsDoc, {
          ...chat.data(),
          messages: [newMessage],
          date: Timestamp.fromDate(new Date()),
        });
      }
    } catch (err: any) {
      return err.message;
    }
  };
  const uploadImageInMessage = async (newImageUrl: any, documentId: string, messageId: string) => {
    const messagesDoc = doc(firestore, 'messages', documentId);

    const messages = await getDoc(messagesDoc);

    const oldMessages = messages.data()?.message;

    const newDataToAdd = {
      id: messageId,
      author: user.value?.displayName,
      authorId: user.value?.uid,
      text: '',
      createdAt: Timestamp.fromDate(new Date()),
      images: [newImageUrl],
    };

    await updateDoc(messagesDoc, {
      message: [...oldMessages, newDataToAdd],
    });
  };

  return { addNewMessageToCollection, getDocument, uploadImageInMessage, getMessagesFromChat };
};

export default useDoc;
