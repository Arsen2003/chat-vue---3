<template>
	<router-view />
</template>

<script>
export default {
};
</script>


<style lang="scss">
@import "@/assets/scss/index.scss";
#app {
	font-family: "San Francisco Pro", Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
body {
	margin: 0;
}
a {
	text-decoration: none;
}
/* #nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
} */
</style>
