<template>

	<div>
		<NuxtLoadingIndicator/>
    	<Header/>
		<div class="flex flex-1 overflow-hidden min-h-[90vh]">
			<!-- Sidebar -->
			<aside
				id="sidebar"
				:class="{'transform -translate-x-full': !isSidebarOpen}"
				
				class="lg:w-1/5 w-4/5 bg-gray-800 fixed top-0 left-0 bottom-0 transition-transform duration-300 z-40"
			>
				<div class="p-4">
				<h2 class="text-xl">Sidebar</h2>
				<ul>
					<li><a href="#" class="block py-2">Option 1</a></li>
					<li><a href="#" class="block py-2">Option 2</a></li>
					<li><a href="#" class="block py-2">Option 3</a></li>
				</ul>
				</div>
			</aside>

			<main 
				
				class="flex p-6 px-8 md:px-6 gap-5"
			>
				<slot/>
			</main>
		</div>

		<button 
			id="hamburger"
			class="lg:hidden p-1 text-white bg-gray-800 fixed top-14 left-12 z-50"
			@click="toggleSidebar"
		>
			<span class="material-symbols-outlined">menu</span>                        
		</button>

		<Footer/>
		<FullScreenLoader/>
	</div>

</template>
  
<script setup>
	import { ref } from 'vue';

	// Estado de si el sidebar está abierto o cerrado
	const isSidebarOpen = ref(false);

	// Función para alternar el estado del sidebar
	const toggleSidebar = () => {
		isSidebarOpen.value = !isSidebarOpen.value;
	}
</script>

  