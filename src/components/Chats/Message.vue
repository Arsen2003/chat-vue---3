<template>
	<div class="message" :class="{ me: isMe }">
		<img class="message__avatar" :src="user" alt="user" />
		<div class="message__head">
			<div class="message__user">
				<h3>{{message.author}}</h3>
				<span v-if="messageSendDate" class="message__date">{{
					moment(messageSendDate).format("LT")
				}}</span>
			</div>
			<p v-if="message.text" class="message__content">{{ message.text }}</p>
			<div v-if="message.images?.length" class="message__images">
				<div>
					<img v-for="url in message.images" :key="url" :src="url" alt="" />
				</div>
			</div>
			<!-- <Skeletor v-else width="300" height="156" pill /> -->
		</div>
	</div>
</template>

<script>
import user from "./user.jpg";
import moment from "moment";
import messageImage from "@/assets/message-image.jpg";
import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";
export default {
	props: ["isMe", "message"],
	components: { Skeletor },
	setup(props) {
		const messageSendDate = props.message.createdAt?.toDate();

		moment.locale("ru");
		return { user, messageSendDate, messageImage };
	},
	created: function () {
		this.moment = moment;
	},
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
.message {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: vw(30);
	&__images {
		width: 100%;
		padding: vw(20) 0 0;
		img {
			width: vw(275);
			height: vw(165);
			border-radius: 5px;
		}
	}
	&.me {
		flex-direction: row-reverse;
		.message__images {
			display: flex;
			justify-content: flex-end;
		}
		.message__user {
			flex-direction: row-reverse;
		}
		.message__avatar {
			margin-right: 0;
			margin-left: vw(30);
		}
	}
	&__avatar {
		margin-right: vw(30);
		width: vw(45);
		height: vw(45);
		border-radius: 50%;
	}
	&__head {
		div {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
		}
		h3 {
			@include font(vw(13), 700);
			color: $greyBlue50;
			margin: vw(5) 0 vw(5);
		}
	}
	&__date {
		@include font(vw(12), 600, vw(20));
		color: $greyBlue80;
		margin-top: vw(5);
	}
	&__content {
		@include font(vw(12), 600, vw(20));
		color: $greyBlue60;
		background: $bg-white;
		border-radius: vw(10);
		padding: vw(20);
		max-width: vw(370);
	}
}
</style>