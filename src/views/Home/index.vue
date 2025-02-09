<template>
  <DefaultLayout>
    <div class="h-200 text-center text-xl" v-if="load">Loading...</div>
    <template v-if="!load" #section1>
      <div class="my-8 flex justify-center ">
        <div class="w-11/12 xl:w-10/12 lg:w-10/12 md:w-10/12 px-4">
          <swiper 
            :slides-per-view="2.3" 
            :space-between="80" 
            :loop="true" 
            :centered-slides="true" 
            :autoplay="{ delay: 3000 }" 
            :pagination="{ clickable: true }" 
            :breakpoints="{
              0: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2.3, spaceBetween: 80 }
            }"
            class="w-full"
          >
            <swiper-slide 
              v-for="movie in featuredMovies" 
              :key="movie.id" 
              class="cursor-pointer flex rounded-lg overflow-hidden" 
              @click.prevent="$router.push(`about?id=${movie?.imdbID}`)"
            >
              <!-- Movie Image -->
              <div class="w-5/12">
                <img :src="movie.Poster" alt="movie.title" class="w-full h-52 xl:h-76 lg:h-52 md:h-98 object-cover rounded-l-lg" />
              </div>
              <!-- Movie Info -->
              <div class="w-7/12 p-6 flex flex-col justify-center bg-black/20 h-48 xl:h-70 lg:h-70 md:h-94 rounded-md">
                <p class="text-yellow-400 font-bold text-sm">⭐ {{ movie.rating }}</p>
                <h2 class="text-lg xl:text-3xl lg:text-3xl font-semibold">{{ movie.Title }}</h2>
                <p class="text-gray-300 text-sm xl:text-lg lg:text-lg md:text-lg">{{ movie.Year }} • {{ movie.Type }}</p>
                <p class="mt-2 text-gray-300 text-sm md:text-sm">{{ movie.description }}</p>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </template>
    <div v-if="!load" class="relative flex justify-center mt-[-240px]">
      <div class="w-12/12 xl:w-10/12 lg:w-10/12">
        <div class="absolute inset-0 h-1/3"></div>
        <div class="relative px-8 py-8 ">
          <!-- <div class="absolute top-0 left-8 w-26 h-1 bg-red-600"></div> -->
          <div class="flex flex-col gap-4 xl:flex-row lg:flex-row justify-between items-center ">
            <h2 class="relative custom-border text-xl font-semibold">Discover Movies</h2>
            <div class="space-x-4">
              <button class="bg-red-600 px-4 py-1 rounded-full shadow-md">Popularity</button>
              <button class="bg-gray-700 px-4 py-1 rounded-full shadow-md">Release Date</button>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6 justify-center">
            <div v-for="movie in movies" :key="movie.id" class="bg-[#1E232B] rounded overflow-hidden relative">
              <CardFilm :movie="movie" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import CardFilm from '../../components/CardFilm.vue'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';

export default {
  components: { DefaultLayout, Swiper, SwiperSlide, CardFilm },

  data() {
    return {
      movies: [],
      featuredMovies: [],
      load: false,
    };
  },
  methods: {
    async fetchMovie () {
      this.load = true;
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const apiUrl = import.meta.env.VITE_OMDB_URL;

      try {
        const response = await fetch(`${apiUrl}?s=movie&type=movie&apikey=${apiKey}`);
        const data = await response.json();
        console.log('movie', data?.Search );

        this.movies = data.Search.map((movie) => ({
          ...movie,
          rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
        }));
        this.movies.rating = await Math.floor(Math.random() * 3) + 7
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        this.load = false;
      }
    },
    async fetchfeaturedMovies () {
      this.load = true
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const apiUrl = import.meta.env.VITE_OMDB_URL;

      try {
        const response = await fetch(`${apiUrl}?s=movie&apikey=${apiKey}`);
        const data = await response.json();
        console.log('movie', data?.Search );

        this.featuredMovies = data.Search.map((movie) => ({
          ...movie,
          rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
        }));
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        this.load = false;
      }
    },

    async _init() {
      await this.fetchMovie()
      await this.fetchfeaturedMovies()

    }
  },

  mounted() {
    this._init()
  }
};
</script>

<style>
  .swiper-slide {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .swiper-pagination-bullet {
    background:red !important;
    width: 12px;
    height: 12px;
  }

  .swiper-pagination-bullet-active {
    background: red !important;
  }

  .custom-border {
    display: inline-block;
    position: relative;
  }

  .custom-border::before {
    content: '';
    display: block;
    width: 80%; /* Panjang border 80% dari teks */
    height: 4px; /* Tebal border */
    background-color: red;
    margin-bottom: 8px; /* Jarak dengan teks */
  }
</style>
