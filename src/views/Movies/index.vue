<template>
    <DefaultLayout :load="load">
        <!-- Discover Movies -->
        
        <div class="flex justify-center">
            <div class="w-12/12 xl:w-10/12 lg:10/12 mt-[-280px]">
                <div class="relative px-8 py-8">
                    <div class="flex mb-10">
                        <h2 class="relative custom-border text-xl xl:text-2xl lg:text-2xl font-semibold">Discover Movies</h2>
                    </div>
                    <div class="flex flex-col xl:flex-row lg:flex-row gap-12">
                        <aside class="w-4/4 xl:w-1/4 lg:w-1/4">
                            <div class="rounded-xl bg-gradient-to-b from-[#0E1723] to-[#1E232A] p-6">
                                <div class="mb-6">
                                    <h2 class="text-lg font-semibold mb-4">Sort Result By</h2>
                                    <select class="bg-gray-700 text-white p-2 rounded w-full">
                                        <option>Popularity</option>
                                    </select>
                                </div>
                                <h2 class="text-lg font-semibold mb-4">Genres</h2>
                                <ul class="space-y-2">
                                    <li v-for="genre in genres" :key="genre">
                                    <div class="label flex justify-between">
                                        <h6>{{ genre }}</h6>
                                        <input 
                                        type="radio" 
                                        class="w-5 bg-gray-600 border-gray-600 accent-red-500 rounded-xl" 
                                        :value="genre"
                                        v-model="selectedGenre"
                                        @change="handleGenreChange"
                                        />
                                    </div>
                                    </li>
                                </ul>
                            </div>
                        </aside>
                        <div v-if="movies.length < 1" class="load h-100 w-3/4">
                            <h6 class="text-center text-2xl mt-4">Tidak ada Data .. </h6>
                        </div>
                        <section v-else class="w-4/4 xl:w-3/4 lg:w-3/4">
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center">
                                <div v-for="(movie, i) in movies" :key="i" class="bg-[#1E232B] rounded overflow-hidden relative">
                                    <CardFilm :movie="movie" />
                                </div>
                            </div>
                            <div class="flex justify-center mt-10">
                                <button class=" text-white px-10 py-2 rounded-full text-sm  cursor-pointer" :class="load ? 'bg-gray-600' : 'bg-red-500'" 
                                    @click.prevent="this.page+=1"
                                    :disabled="load"
                                > {{  load ? 'Loading..' : 'Load More' }}
                            
                            </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import CardFilm from '../../components/CardFilm.vue';
import 'swiper/css';
import axios from 'axios'

export default {
    components: { DefaultLayout, Swiper, SwiperSlide, CardFilm },

    data() {
        return {
            genres: ['movie', 'series', 'episode'],
            movies: [],
            selectedGenre: this?.$route?.query?.id ?? '',
            page: 1,
            load: false,
        };
    },
    methods: {
        async fetchMovies() {
        try {
            this.load = true;
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_URL;
            const response = await axios.get(
            `${apiUrl}?s=movie&type=${this.selectedGenre}&page=${this.page}&apikey=${apiKey}`
            );
            if (response.data.Search) {
            let dt = response.data.Search.map((movie) => ({
                ...movie,
                rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
            }));

            this.movies = [...this.movies, ...dt]
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        } finally {
            this.load = false;
        }
        },
        
    handleGenreChange() {
      console.log('Selected Genres:', this.selectedGenres);
      this.page = 1
      this.movies = [];
      this.fetchMovies();
      this.$router.push({ 
        path: this.$route.path, 
        query: { id: this.selectedGenre } 
      });
    }
        
    },

    watch: {
      
        page() {
            this.fetchMovies();
        },
        '$route.query.id': {
            handler(val) {
            console.log('testing', val);
                this.selectedGenre = val;
                this.handleGenreChange()
            },
            immediate: true // Untuk langsung memicu saat komponen pertama kali dimuat
        }
        
    },
    mounted() {
        this.fetchMovies();
        window.scrollTo(0, 0);
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
    background: red !important;
    width: 12px;
    height: 12px;
}

.swiper-pagination-bullet-active {
    background: red !important;
}
</style>