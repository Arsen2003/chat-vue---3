import { createStore } from 'vuex';
import chats from './chats/index';
import users from './users';

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		chats,
		users,
	},
});
