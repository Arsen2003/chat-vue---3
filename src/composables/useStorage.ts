import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase/config';

export const useStorage = () => {
  const uploadImageAndGetImageUrl = async (file: any, chatId: string, messageId: string) => {
    const imageRef = ref(storage, `messages/${chatId}/${messageId}/` + file.name);
    const imageUrl = await uploadBytesResumable(imageRef, file);
    return await getDownloadURL(imageUrl.ref);
  };

  return { uploadImageAndGetImageUrl };
};
