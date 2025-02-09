<template>
<DefaultLayout>
    <div class="h-200 text-center text-xl" v-if="load">Loading...</div>
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
                                <select v-model="selectedSort" class="bg-gray-700 text-white p-2 rounded w-full">
                                    <!-- <option value="popularity-asc">Popularity Ascending</option>
                                    <option value="popularity-desc">Popularity Descending</option> -->
                                    <option value="votes-asc">Popularity Ascending</option>
                                    <option value="votes-desc">Popularity Descending</option>
                                    <option value="release-asc">Release Date Ascending</option>
                                    <option value="release-desc">Release Date Descending</option>
                                    <option value="rating-asc">Rating Ascending</option>
                                    <option value="rating-desc">Rating Descending</option>
                                </select>
                            </div>
                            <h2 class="text-lg font-semibold mb-4">Genres</h2>
                            <!-- inputan berupa radio karena OMDBAPI tidak menyediakan filter untuk banyak genre -->
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
                    <div v-if="sortedMovies.length < 1" class="load h-100 w-3/4">
                        <h6 class="text-center text-2xl mt-4">Tidak ada Data .. </h6>
                    </div>
                    <section v-else class="w-4/4 xl:w-3/4 lg:w-3/4">
                        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 justify-center">
                            <div v-for="(movie, i) in sortedMovies" :key="i" class="bg-[#1E232B] rounded overflow-hidden relative">
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
            selectedSort: 'votes-asc'
        };
    },
    methods: {
        async fetchMovies() {
        try {
            // memanggil 2 api, api 1 untuk getall yang ke dua untuk detail, karena di get tidak menyediakan data yang lengkap untuk keperluan sort manual
            this.load = true;
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_URL;

            const response = await axios.get(
            `${apiUrl}?s=movie&type=${this.selectedGenre}&page=${this.page}&apikey=${apiKey}`
            );

            if (response.data.Search) {
            let dt = response.data.Search.map((movie) => ({
                ...movie,
                // rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
            }));

            const movieDetails = await Promise.all(
                dt.map(async (movie) => {
                const detailsResponse = await fetch(`${apiUrl}/?apikey=${apiKey}&i=${movie.imdbID}`);
                return await detailsResponse.json();
                })
            );

            // Filter untuk menghindari duplikasi berdasarkan imdbID
            const newMovies = movieDetails.filter(
                (movie) => !this.movies.some((existingMovie) => existingMovie.imdbID === movie.imdbID)
            );

            this.movies = [...this.movies, ...newMovies]; // Update state tanpa duplikasi
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
    },
        
    },
    computed: {
        sortedMovies() {
        // menggunakan sorted manual karena omdbapi API tidak menyediakan sort
        return [...this.movies].sort((a, b) => {
            switch (this.selectedSort) {
            // case 'popularity-asc':
            //     return a.popularity - b.popularity;
            // case 'popularity-desc':
            //     return b.popularity - a.popularity;
            case "votes-asc":
            return parseInt(a.imdbVotes.replace(/,/g, '')) - parseInt(b.imdbVotes.replace(/,/g, ''));
            case "votes-desc":
            return parseInt(b.imdbVotes.replace(/,/g, '')) - parseInt(a.imdbVotes.replace(/,/g, ''));
            case 'release-asc':
                return new Date(a.Released) - new Date(b.Released);
            case 'release-desc':
                return new Date(b.Released) - new Date(a.Released);
            case 'rating-asc':
                return a.imdbRating - b.imdbRating;
            case 'rating-desc':
                return b.imdbRating - a.imdbRating;
            default:
                return 0;
            }
        });
        }
    },
    watch: {
    '$route.query.sort': function(newSort) {
        if (newSort) {
            this.selectedSort = newSort;
        }
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
            immediate: true 
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