<template>
	<div
		@click="setCurrentChat"
		class="chats-item"
		:class="{ selected: activeChatItem === index }"
	>
		<div class="chats-item__avatar">
			<img
				v-if="chat?.profileImgUrl"
				:src="chat?.profileImgUrl"
				alt="Анастасия"
			/>
			<Skeletor v-else height="45" width="45" />
			<span
				v-if="chat"
				:class="{ online: chat.isOnline, offline: !chat.isOnline }"
			></span>
		</div>
		<div class="chats-item__right">
			<div class="chats-item__status">
				<template v-if="chat">
					<span v-if="chat.isOnline">Online</span>
					<span v-else>Offline</span>
				</template>
				<Skeletor v-else height="10" width="40" />
				<span v-if="chat">{{ moment(chat.date.toDate()).format("LT") }}</span>
				<Skeletor v-else height="10" width="20" />
			</div>
			<div v-if="chat" class="chats-item__name">{{ chat.sendBy }}</div>
			<div v-else class="chats-item__name">
				<Skeletor height="10" width="25" />
			</div>
			<div v-if="chat" class="chats-item__last">
				{{ chat.lastMessage }}
			</div>
			<Skeletor v-else height="40" width="100%" />
		</div>
	</div>
	<!-- <div
		@click="setCurrentChat"
		class="chats-item"
		:class="{ selected: activeChatItem === index }"
		v-else
	>
		<div class="chats-item__avatar">
			<img :src="user.profileImg" :alt="user.name" />
			<span :class="{ online: user.isOnline, offline: !user.isOnline }"></span>
		</div>
		<div class="chats-item__right">
			<div class="chats-item__status">
				<span v-if="user.isOnline">Online</span>
				<span v-else>Offline</span>
			</div>
			<div class="chats-item__name">{{ user.name }}</div>
		</div>
	</div> -->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";
import { Skeletor } from "vue-skeletor";
export default defineComponent({
	props: ["chat", "activeChatItem", "index", "user"],
	name: "Home",
	components: { Skeletor },
	setup(props) {
		const store = useStore();
		const isLoading = ref(true);

		moment.locale("ru");

		const setCurrentChat = async () => {
			if (props.chat?.id) {
				await store.dispatch("setCurrentChat", props.chat.id);
				await store.dispatch("getMessagesFromChat", props.chat.id);
			} else {
				await store.dispatch("setCurrentChat", props.user.id);
			}
		};
		return {
			isLoading,
			setCurrentChat,
			userIcon: require("@/assets/user1.png"),
			moment,
		};
	},
});
</script>
<style lang="scss">
@import "@/assets/scss/index.scss";
.chats {
	&-item {
		display: flex;
		width: vw(240);
		border-top: 2px solid $greyBlue97;
		padding: vw(20) vw(20);
		border-radius: vw(10);
		transition: 0.3s;
		cursor: pointer;
		&.selected {
			background-color: $blue;
			.chats-item__name {
				color: $white;
			}
			.chats-item__last {
				color: $white;
				opacity: 0.8;
			}
			.chats-item__status {
				color: $white;
				opacity: 0.6;
			}
		}
		&__avatar {
			position: relative;
			margin-right: vw(20);
			width: vw(45);
			height: vw(45);
			img {
				width: vw(45);
				height: vw(45);
				border-radius: 50%;
			}
			span {
				position: absolute;
				right: 0;
				top: 0;
				transform: translate(10%, -10%);
				display: inline-block;
				width: vw(10);
				height: vw(10);
				border-radius: 50%;
				border: 2px solid $bg-white;
			}
			span.online {
				background-color: $bg-green;
			}
			span.offline {
				background-color: $greyBlue85;
			}
		}
		&__status {
			@include font(vw(12));
			display: flex;
			justify-content: space-between;
			color: $greyBlue80;
			margin-bottom: vw(5);
			transition: 0.3s;
		}
		&__right {
			width: vw(165);
		}
		&__name {
			@include font(vw(12));
			color: $greyBlue50;
			margin-bottom: vw(12);
			transition: 0.3s;
		}
		&__last {
			@include font(vw(12), 600);
			color: $greyBlue80;
			transition: 0.3s;
		}
	}
}
</style>