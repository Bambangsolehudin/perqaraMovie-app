<template>
  <DefaultLayout :bgImage="detail?.Poster">
    <div class="h-200 text-center text-xl" v-if="load">Loading...</div>
    <!-- Discover Movies -->
     <div v-else class="">
       <div class="mt-[-256px] xl:mt-[-216px] lg:mt-[-216px] md:mt-[-216px] flex justify-center w-full my-16">
         <div class="flex gap-2 xl:gap-20 lg:gap-20 md:gap-20 w-11/12 xl:w-10/12 lg:w-10/12 ">
           <div class="img w-full xl:w-auto lg:w-auto md:w-auto z-40">
             <img :src="detail?.Poster" class="h-46 xl:h-[330px] lg:h-[330px] md:h-[330px] rounded-xl bg-white" alt="">
           </div>
           <div class="desc">
             <div class="base">
               <p class="text-md">{{ detail?.Year }}</p>
               <h6 class="text-white text-xl xl:text-4xl lg:text-4xl md:text-4xl">{{ detail?.Title }}</h6>
               <p class="text-white">
                 {{ detail?.Type }}
               </p>
             </div>
             <div class="complex gap-10 mt-16 hidden xl:flex lg:flex md:flex">
               <div class="flex gap-x-4 pr-10 border-r-[2px] border-gray-600">
                 <div class="text-4xl">⭐ {{ detail?.imdbRating }}</div>
                 <div class="flex flex-col">
                   <h6 class="text-sm text-gray-500">USER SCORE</h6>
                   <h6 class="text-white">{{ detail?.imdbVotes }} VOTES</h6>
                 </div>
               </div>
               <div class="flex flex-col pr-10 border-r-[2px] border-gray-600">
                 <h6 class="text-sm text-white/50 font-semibold">STATUS</h6>
                 <h6 class="text-white">{{ detail?.Released ? 'RELEASED' : '-'}}</h6>
               </div>
               <div class="flex flex-col pr-10 border-r-[2px] border-gray-600">
                 <h6 class="text-sm text-white/50 font-semibold">LANGUAGE</h6>
                 <h6 class="text-white">{{ detail?.Language }}</h6>
               </div>
               <div class="flex flex-col">
                 <h6 class="text-sm text-white/50 font-semibold">BUDGET</h6>
                 <h6 class="text-white">{{ detail?.BoxOffice }}</h6>
               </div>
             </div>
             <div class="overview ">
               <p class="text-sm text-red-400 xl:mt-6 lg:mt-6 md:mt-6 pt-4">OVERVIEW</p>
               <p class="max-w-xl text-sm text-white xl:text-gray-800 lg:text-gray-800 md:text-gray-800 xl:mt-4 lg:mt-4 md:mt-4">
                 {{ detail?.Plot }}
               </p>
             </div>
           </div>
         </div>
       </div>
       <div  class="flex justify-center ">
         <div class="w-11/12 xl:w-10/12 lg:w-10/12">
           <h1 class="text-red-600 text-2xl font-semibold">Reviews</h1>
         </div>
       </div>
       <div class=" w-11/12 xl:w-10/12 lg:w-10/12 mx-auto">
         <swiper 
           :slides-per-view="2" 
           :space-between="20"
           :centered-slides="true" 
           :autoplay="{ delay: 3000 }" 
           :pagination="{ clickable: true }"
           :breakpoints="{
             0: { slidesPerView: 1, spaceBetween: 10 },
             768: { slidesPerView: 2, spaceBetween: 80 }
           }"
           class="w-full">
           <swiper-slide v-for="review in reviews" :key="review.id" class="bg-gray-100 text-gray-800  shadow-md">
               <div class="p-8">
                 <div class="flex">
                   <img :src="review.avatar" alt="User avatar" class="w-10 h-10 rounded-full mr-3" width="40" height="40">
                   <div class="flex flex-col">
                     <h2 class="font-bold">{{ review.username }}</h2>
                     <p class="text-gray-500 text-sm">{{ review.date }}</p>
                   </div>
                   <div class="ml-auto flex items-center bg-white p-2 rounded-lg shadow">
                     <i class="fas fa-star text-yellow-500 mr-1"></i>
                     <span class="font-bold text-lg flex items-center">
                       ⭐ <span class="font-bold text-4xl">{{ review.rating }}</span>
                     </span> 
                   </div>
                 </div>
                 <p class="text-sm" v-html="review.content"></p>
               </div>
           </swiper-slide>
         </swiper>
       </div>
       <div class="flex justify-center gap-6 w-full mt-16 bg-[#1E232B]">
         <div class="w-11/12 xl:w-10/12 lg:w-10/12">
           <h6 class="my-6 text-xl font-bold py-6">RECOMMENDATION MOVIES</h6>
           <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-10 justify-center">
               <div v-for="(movie, i) in movies" :key="i" class="bg-[#1E232B] rounded overflow-hidden relative">
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import CardFilm from '../../components/CardFilm.vue'

import 'swiper/css';
import axios from 'axios';

export default {
  components: { DefaultLayout, Swiper, SwiperSlide, CardFilm },
  data() {
    return {
      genres: ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror'],
      movies: [],
      reviews: [
          {
            id: 1,
            username: 'SWITCH.',
            date: 'December 18, 2020',
            rating: '7.0',
            avatar: 'https://storage.googleapis.com/a1aa/image/_axdmE-V606Anq3joi5_LJlaM5iB8I6OiUTf78BBFdA.jpg',
            content: `It isn't as easy as saying 'Wonder Woman 1984' is a good or bad movie. The pieces are there, and there are moments I adore, but it does come across as a bit of a mess, even though the action sequences are breathtaking. If you're a fan of the original film, you'll be more willing to take the ride, but for those more indifferent, it may be a bit of a blander sit. If you can and are planning to watch it, the theatrical experience is the way to go - there is nothing like seeing these stunning sets, fun action scenes and hearing Zimmer's jaw-dropping score like on the big screen. - Chris das Santos... <a class="text-red-500" href="#">read the rest</a>.`
          },
          {
            id: 2,
            username: 'msbreviews',
            date: 'December 18, 2020',
            rating: '8.0',
            avatar: 'https://storage.googleapis.com/a1aa/image/_axdmE-V606Anq3joi5_LJlaM5iB8I6OiUTf78BBFdA.jpg',
            content: `If you enjoy reading my Spoiler-Free reviews, please follow my blog @ <a class="text-red-500" href="https://www.msbreviews.com">https://www.msbreviews.com</a><br>The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only.`
          },
          {
            id: 3,
            username: 'msbreviews',
            date: 'December 18, 2020',
            rating: '8.0',
            avatar: 'https://storage.googleapis.com/a1aa/image/_axdmE-V606Anq3joi5_LJlaM5iB8I6OiUTf78BBFdA.jpg',
            content: `If you enjoy reading my Spoiler-Free reviews, please follow my blog @ <a class="text-red-500" href="https://www.msbreviews.com">https://www.msbreviews.com</a><br>The superhero genre has been growing exponentially during the last decade, so it's bizarre to go through an entire year with only Birds of Prey and The New Mutants instead of literally dozens of films from both Marvel and DC. Thankfully, Warner Bros. decided to release Wonder Woman 1984 before the year's end, but not without a catch. Most people will only have the possibility of watching one of the few blockbusters of 2020 through HBO Max, a streaming service only.`
          }
        ],
      detail: {},
      load: false,
    };
  },
  methods: {
    async fetchMovies() {
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;
        const apiUrl = import.meta.env.VITE_OMDB_URL;
        const response = await axios.get(
          `${apiUrl}?s=movie&type=movie&apikey=${apiKey}`
        );
        if (response.data.Search) {
          this.movies = response.data.Search.map((movie) => ({
            ...movie,
            rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
          }));
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },

    async fetchDetail() {
      const apiKey = import.meta.env.VITE_OMDB_API_KEY;
      const apiUrl = import.meta.env.VITE_OMDB_URL;
      try {
        this.load = true;
        const response = await axios.get(
          `${apiUrl}?i=${this.$route?.query?.id}&apikey=${apiKey}`
        );
        if (response.data) {
            console.log('detail', response.data);
            
          this.detail = response.data
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        this.load = false
      }
    },
  },
  watch: {
    '$route.query': {
      handler() {
        this.fetchDetail(); 
        this.fetchMovies();
        window.scrollTo(0, 0);
      },
      immediate: true,
    }
  },
  mounted() {
    console.log('query', this.$route.query.id);
    
    this.fetchMovies();
    this.fetchDetail();
    window.scrollTo(0, 0);
  }

};
</script>

<style>

</style>
