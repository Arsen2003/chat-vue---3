<template>
	<div class="search">
		<img :src="searchIcon" alt="Search" />
		<input
			@input="handleChange"
			v-model="searchText"
			type="text"
			placeholder="Search in messages"
		/>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	setup(props, context) {
		const searchText = ref("");

		const handleChange = () => {
			context.emit("searchText", searchText.value);
		};

		return {
			handleChange,
			searchText,
			searchIcon: require("../assets/search.svg"),
		};
	},
};
</script>

<style lang="scss">
@import "@/assets/scss/index.scss";
.search {
	display: flex;
	align-items: center;
	padding: 0 vw(20) vw(30) vw(20);
	input {
		@include font(vw(13), 700);
		color: $greyBlue80;
		margin-left: vw(25);
		border: none;
	}
}
</style>