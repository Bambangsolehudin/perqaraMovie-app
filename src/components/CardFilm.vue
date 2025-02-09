<template>
  <div>
    <div class="relative group"  @click.prevent="$router.push(`about?id=${movie?.imdbID}`)">
      <img :src="movie.Poster" alt="movie.title" class="w-full h-60 xl:h-82 lg:h-82 object-cover shadow-md" />
  
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-colors duration-300"></div>
  
      <p class="absolute top-0 right-0 bg-black/70 text-white font-bold text-2xl px-2 py-1 rounded">
        {{ movie.rating }}
      </p>
  
      <!-- Button View -->
      <div class="absolute inset-0 flex flex-col gap-10 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h6 class="text-2xl">⭐ {{  movie.rating }}</h6>
        <h6 class="text-white text-xl">{{ movie.Type }}</h6>
        <button 
          @click.prevent="$router.push(`about?id=${movie?.imdbID}`)"
          class="bg-red-600 text-white px-10 py-1 font-bold rounded-full hover:bg-red-800 cursor-pointer">
          View
        </button>
      </div>
  
     
    </div>
     <!-- Movie Info -->
    <div class="py-4 relative z-10">
      <h3 class="text-lg font-bold">{{ movie.Title }}</h3>
      <p class="text-gray-400 text-md">{{ movie.Year }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["movie"],
  methods: {
    goToDetail() {
      this.$router.push(`/movie/${this.movie.id}`);
    }
  },
  mouunted() {}
}
</script>
