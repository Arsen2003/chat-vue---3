<template>
	<section class="auth section">
		<div class="container">
			<div class="row">
				<div class="auth__wrapper">
					<h1>The Avocadiki <b>Messanger</b></h1>
					<p>
						Welcome Back! We glad to see you again! We hope that our products
						makes you happy. We always work to improve our product. Now you can
						login and see our news.
					</p>
					<form @submit.prevent="handleSubmit">
						<label>Name</label>
						<div>
							<input
								type="name"
								placeholder="Alexandra"
								required
								v-model="name"
							/>
							<img :src="userIcon" alt="Type your Email" />
						</div>
						<label>Email</label>
						<div>
							<input
								type="email"
								placeholder="tromp.velda@russel.biz"
								required
								v-model="email"
							/>
							<img :src="emailIcon" alt="Type your Email" />
						</div>
						<label>
							Password
							<span> Forgot Password? <a href="">Restore</a> </span>
						</label>
						<div>
							<input
								type="password"
								placeholder="tromp.velda@russel.biz"
								required
								v-model="password"
							/>
							<img :src="passwordIcon" alt="Type your Password" />
						</div>
						<button>Sign Up</button>
						<span class="auth__have-account">
							Already have an account?
							<router-link to="/auth/login">Login</router-link>
						</span>
					</form>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import emailIcon from "./email.svg";
import userIcon from "./user.svg";
import passwordIcon from "./password.svg";
import { computed, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useCollection from "@/composables/useCollection";
export default {
	setup() {
		const email = ref();
		const password = ref();
		const name = ref();
		const router = useRouter();
		const store = useStore();
		const { addToCollection } = useCollection();

		const currentUser = computed(() => store.state.users.currentUser);

		const handleSubmit = async () => {
			try {
				await store.dispatch("createUser", {
					email: email.value,
					password: password.value,
					name: name.value,
				});

				const { user } = await currentUser.value;

				await addToCollection("users", user.uid, {
					id: user.uid,
					lastMessage: "",
					email: email.value,
					password: password.value,
					name: name.value,
					isOnline: false,
					profileImg: "",
					chats: [],
					lastVisit: "",
					phone: "",
				});

				router.push("/");
			} catch (err) {
				console.log(err.message)
			}
		};

		return {
			name,
			password,
			email,
			handleSubmit,
			emailIcon,
			userIcon,
			passwordIcon,
		};
	},
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/index.scss";

.auth {
	display: flex;
	justify-content: center;
	flex-direction: column;
	&__wrapper {
		padding-top: vw(100);
		max-width: vw(500);
	}
	.container {
		max-width: 1110px;
		margin: 0 auto;
	}
	h1 {
		@include font(vw(42), 400);
		color: $greyBlue50;
		text-align: center;
	}
	p {
		@include font(vw(13), 700);
		color: $greyBlue50;
		text-align: center;
		margin: vw(18) 0;
	}
	label {
		@include font(vw(12), 700);
		color: $greyBlue60;
		margin-bottom: vw(5);
		padding-left: vw(25);
		display: flex;
		justify-content: space-between;
		span {
			color: #adb8cc;
		}
	}
	form {
		div {
			display: flex;
			align-items: center;
			margin-top: vw(5);
			background: $bg-white;
			border: 2px solid $text-light-blue;
			box-shadow: 0 2px vw(5) rgba(54, 61, 77, 0.03);
			border-radius: vw(30);
			padding: vw(15) vw(25);
			margin-bottom: vw(20);
			input {
				@include font(vw(12), 700);
				width: 100%;
				padding-right: vw(10);
				border: none;
				outline: none;
				color: #7d8fb3;
			}
		}
		button {
			@include font(vw(12), 800);
			width: 100%;
			padding: vw(15) 0;
			background: $blue;
			box-shadow: 0px 10px 30px rgba(136, 51, 255, 0.1);
			border-radius: vw(30);
			color: $white;
			outline: none;
			cursor: pointer;
			border: 2px solid $blue;
			transition: 0.3s;
			&:hover {
				background-color: #fff;
				color: $blue;
			}
		}
	}
}
.auth {
	&__have-account {
		@include font(vw(12), 700);
		margin-top: vw(5);
		display: block;
		text-align: right;
		color: #adb8cc;
		a {
			color: #8833ff;
		}
	}
}
</style>