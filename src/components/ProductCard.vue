<script setup>
  import Image from 'primevue/image'

  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
  })

  const { product } = props
</script>

<template>
  <div
    class="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all relative"
  >
    <figure
      class="h-[300px] w-full flex items-center justify-center bg-white overflow-hidden"
    >
      <Image
        v-if="product.coverImage"
        :src="product.coverImage"
        alt="Product Cover"
        preview
        :pt="{
          root: 'h-full w-full flex items-center justify-center',
          image: 'h-full w-auto object-contain',
        }"
      />
      <img
        v-else
        src="/placeholder-image.png"
        alt="Placeholder"
        class="h-full w-auto object-contain"
      />
    </figure>

    <div class="p-4">
      <p
        class="text-sm sm:text-base font-medium line-clamp-2 min-h-[3.5em] leading-tight"
      >
        {{ product.name }}
      </p>
      <p class="text-lg sm:text-xl font-bold mt-2 text-black">
        ${{ product.price }}
      </p>
    </div>

    <button
      class="absolute bottom-2 right-2 w-10 h-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
    >
      <i class="pi pi-shopping-cart" />
    </button>
  </div>
</template>
