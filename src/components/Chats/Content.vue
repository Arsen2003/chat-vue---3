<template>
	<PerfectScrollbar ref="chatsContent">
		<div class="chats-content">
			<div v-for="message in messages" :key="message.id">
				<Message :message="message" :isMe="message.authorId === userId" />
			</div>
		</div>
	</PerfectScrollbar>
</template>

<script>
import Message from "./Message.vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { user } from "@/composables/getUser";
import { ref, onUpdated } from "@vue/runtime-core";
export default {
	props: ["messages"],
	components: { Message, PerfectScrollbar },
	setup(props) {
		const userId = user.value.uid;
		const chatsContent = ref(null);

		onUpdated(() => {
			chatsContent.value.$el.scrollTop = chatsContent.value.$el.scrollHeight;
		});

		return { userId, chatsContent };
	},
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/index.scss";
@import "~perfect-scrollbar/css/perfect-scrollbar.css";
.chats-content {
	padding: vw(30);
	max-height: vw(400);
}
.ps {
	margin: 0 vw(-30);
}
</style>