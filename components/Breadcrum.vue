<script setup>
defineProps({
  pages: {
    type: Array,
    required: true
  }
})
</script>
<template>
  <nav
    class="flex"
    aria-label="Breadcrumb"
  >
    <ol
      role="list"
      class="flex items-center pl-4 md:pl-0 md:space-x-4 flex-wrap"
    >
      <li
        v-for="(page, index) in pages"
        :key="page.name"
        class="w-full sm:w-auto"
      >
        <div class="flex items-center">
          <span
            v-if="index > 0"
            class="material-symbols-outlined"
            aria-hidden="true"
          >chevron_right</span>
          <span
            v-if="index === 0"
            class="material-symbols-outlined"
            aria-hidden="true"
          >home</span>
          <button
            v-if="page.name"
            class="ml-2 text-xs md:text-sm font-medium text-gray-500 hover:text-gray-700"
            :aria-current="page.current ? 'page' : undefined"
            @click="() => {if (index !== pages.length - 1) { $router.push(page.route) }}"
          >
            {{ page.name }}
          </button>
          <div v-else class="w-24">
            <ListItemSkeleton class="w-24 h-3"/>
          </div>
        </div>
      </li>
    </ol>
  </nav>
</template>
