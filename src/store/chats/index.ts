import { Istate, searchChat, Ichat } from './types';
import getCollection from '@/composables/getCollection';
import useDoc from '@/composables/useDoc';
import { v4 as uuidv4 } from 'uuid';
import { useStorage } from '@/composables/useStorage';

const chats = {
  state: () => ({
    items: [],
    currentChat: null,
    messages: [],
    isChatsLoading: true,
  }),
  getters: {
    getIsChatsLoading(state: Istate) {
      return state.items.length ? false : true;
    },
  },
  mutations: {
    GET_CHATS(state: Istate, chats: Ichat[]) {
      state.items = chats;
    },
    SET_CURRENT_CHAT(state: Istate, currentChat: Ichat) {
      state.currentChat = currentChat;
    },
    SET_CHAT_MESSAGES(state: Istate, messages: any) {
      state.messages = messages;
    },
  },
  actions: {
    async getChats({ commit, state }: any) {
      const { documents } = await getCollection('chats');
      await commit('GET_CHATS', documents);
    },
    async getMessagesFromChat({ commit }: any, chatId: any) {
      const { getMessagesFromChat } = useDoc();
      const { messages } = await getMessagesFromChat('chats', chatId);
      commit('SET_CHAT_MESSAGES', messages);
    },
    async setCurrentChat({ commit }: any, chatId: string) {
      const { getDocument } = useDoc();

      const { document, error } = await getDocument('chats', chatId);

      if (error.value) throw new Error(error.value);

      commit('SET_CURRENT_CHAT', document);
    },
    async uploadImageToChat({ state }: any, files: any) {
      const { uploadImageAndGetImageUrl } = useStorage();
      const { uploadImageInMessage } = useDoc();

      const uniqId = uuidv4();

      const file = files[0];
      const uploadedImageUrl = await uploadImageAndGetImageUrl(file, state.currentChat.id, uniqId);

      await uploadImageInMessage(uploadedImageUrl, state.currentChat.id, uniqId);
    },
    async addNewMessageToChat({ state }: any, messageText: string) {
      const { addNewMessageToCollection } = useDoc();
      await addNewMessageToCollection(messageText, 'chats', state.currentChat.id);
    },
  },
};

export default chats;
