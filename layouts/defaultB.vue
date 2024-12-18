  
<script setup>
	
	import { ref, onMounted, onUnmounted } from 'vue'

	const isSidebarCollapsed = ref(false)
	const isSmallScreen = ref(false);
	const mediaQuery = window.matchMedia('(max-width: 1200px)')

	const toggleSidebar = () => {
		isSidebarCollapsed.value = !isSidebarCollapsed.value
	}

	const handleMediaQueryChange = () => {
		isSmallScreen.value = mediaQuery.matches;
		if (isSmallScreen.value) {
			isSidebarCollapsed.value = true; 
		} else {
			isSidebarCollapsed.value = false; 
		}
	}

	onMounted(() => {
		handleMediaQueryChange(); // Ejecutar una vez al montarse
		mediaQuery.addEventListener('change', handleMediaQueryChange)
	})

	onUnmounted(() => {
		mediaQuery.removeEventListener('change', handleMediaQueryChange);
	})

</script>

<template>

	<div>
		<NuxtLoadingIndicator/>
    	<Header/>
		
		<div class="grid-container">
			<div :class="['sidebar', { sidebar_small: isSidebarCollapsed }]">
				<button
					@click="toggleSidebar"
					:class="{'collapsed': isSidebarCollapsed}"
				>
					<span class="material-symbols-outlined">menu</span>
				</button>
				<AgencySidebar/>

			</div>
			<div :class="['main-content', { main_content_large: isSidebarCollapsed }]">
				<slot/>
			</div>
		</div>

		<Footer/>
		<FullScreenLoader/>
	</div>

</template>


<style scoped>
	.grid-container {
		width: 80vw;
		margin: 0 auto;
		height: 90vh;
		display: flex;		
		transition: 1s ease;
	}

	.sidebar {
		width: 25%;
		height: 100%;
		background-color: transparent;
		transition: 1s ease;
		position: relative;
	}

	.main-content {
		width: 75%;
		height: 100%;		
		transition: 1s ease;
		padding: 1rem 2rem;
	}

	.main_content_large {
		width: 100%;
	}

	.sidebar_small {
		width: 0%;
	}

	button {
		position: absolute;
		border: none;
		height: 35px;
		width: 35px;
		box-shadow: 0px 1px 4px 1px rgba(0, 0, 0, 0.3);		
		top: 0.5rem;
		transform: translateX(-50%);
		cursor: pointer;
		display: flex; 
		align-items: center; 
		justify-content: center; 
		background-color: transparent;
		transition: 1s ease;

	}

	button:not(.collapsed) {
		left: 92%; 
	}
	button.collapsed {
		left: -30px; 
	}

	button .material-symbols-outlined {
		font-size: 20px; 
		color: #000; 
	}

	
</style>

  