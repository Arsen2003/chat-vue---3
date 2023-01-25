import getCollection from '@/composables/getCollection';
import useAuth from '@/composables/useAuth';

interface IUser {
  id: string;
  profileImgUrl: string;
  lastMessage: string;
  isOnline: boolean;
  name: string;
}

interface IUsers {
  items: IUser[];
  currentUser: IUser;
}

const users = {
  state: () => ({
    items: [],
    currentUser: null,
  }),
  getters: {
    getFilteredUsers: (state: IUsers) => (searchChat: string) => {
      return state.items.filter((user: any) => user.name.includes(searchChat));
    },
    getSelectedUser: (state: IUsers) => (id:string) => {
      return state.items.find((user: any) => user.id.includes(id))
    }
  },
  mutations: {
    GET_USERS(state: IUsers, documents: any) {
      state.items = documents;
    },
    CREATE_USER(state: IUsers, newUser: IUser) {
      state.currentUser = newUser;
    },
  },
  actions: {
    async getUsersFirebase({ commit }: any) {
      const { documents, error } = await getCollection('users');
      commit('GET_USERS', documents);
    },
    async createUser({ commit }: any, user: any) {
      const { signup } = useAuth();

      const response = await signup(user.email, user.password, user.name);

      commit('CREATE_USER', response);
    },
  },
};

export default users;
