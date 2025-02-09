<template>
  <div class="text-white w-12/12 min-h-screen font-sans" :class="bgImage ? 'bg-white' : 'bg-[#1E232B]'">
    <!-- Navbar -->
    <div class="bg-[#1E232B]">
      <nav class="xl:px-36 lg:px-36 md:px-36" :class="!bgImage ? 'flex items-center justify-between px-8  py-4 bg-white/5' : 'absolute top-0 left-0 w-full z-10 flex items-center justify-between px-8 py-4 bg-white/5'">
          <!-- Logo Section -->
      <div class="text-xl font-bold flex items-center space-x-2 cursor-pointer" @click.prevent="$router.push('/');">
        <img src="/MoovieTime-Logo.svg" alt="Logo">
      </div>


      <div class="flex gap-2 justify-center items-center">
        <!-- Mobile Hamburger Button -->
        <button @click="showModal = true" class="text-white lg:hidden">
          <!-- 🔍 -->
          <img class="w-6" src="/search.svg" alt="">
        </button>
        <button @click="menuOpen = !menuOpen" class="lg:hidden text-white focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Desktop Nav Links -->
      <div class="hidden lg:flex xl:flex md:flex items-center space-x-6">
        <div class="relative w-full">
          <input v-model="searchQuery" type="text" placeholder="Find movie" @focus="showDropdown = true" @blur="hideDropdown" @input="filterResults" class="px-4 py-2 rounded w-full text-white outline-none placeholder-gray-400 bg-[#1E232B]">
          <!-- <span class="absolute right-3 top-3 text-gray-400">🔍</span> -->
          <ul v-if="showDropdown && filteredResults.length" class="absolute left-0 w-full bg-[#1E232B] shadow-lg z-10 rounded mt-1">
            <li v-for="(result, index) in filteredResults" :key="index" @mousedown="selectResult(result)" class="px-4 py-2 text-white hover:bg-[#3A3F47] cursor-pointer">
              {{ result?.Title }}
            </li>
          </ul>
        </div>
        <div class="flex items-center gap-4 space-x-6 text-gray-300">
          <div class="relative group inline-block">
            <button class="flex gap-1 items-center">
              <img src="/category.svg" alt="Category Icon">
              <h6 class="text-sm" style="font-size: 14px;">CATEGORIES</h6>
            </button>
            <div class="absolute left-0 mt-2 w-40 bg-white text-gray-800 shadow-md rounded-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-10">
              <ul>
                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectCategory('movie')">Movies</li>
                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectCategory('series')">Series</li>
                <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectCategory('episode')">Episode</li>
              </ul>
            </div>
          </div>
          <button class="cursor-pointer" @click="$router.push('/movies?id=movie')">
            <h6 class="text-sm" style="font-size: 14px;">MOVIES</h6>
          </button>
          <!-- <button class="cursor-pointer">
            <h6 class="text-sm" style="font-size: 14px;">TV SHOWS</h6>
          </button>
          <button class="cursor-pointer">
            <h6 class="text-sm" style="font-size: 14px;">LOGIN</h6>
          </button> -->
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="lg:hidden absolute top-16 left-0 w-full  bg-[#1E232B] text-white z-20">
        <ul class="flex flex-col space-y-4 p-4">
            <li @click="$router.push('/')">Home</li>
            <li @click="$router.push('/movies?id=movie')">Movies</li>
            <!-- <li @click="$router.push('/series')">TV Shows</li> -->
            <!-- <li @click="$router.push('/login')">Login</li> -->
          </ul>
        </div>
    </nav>
       <slot name="section1"></slot>
       <div v-if="!bgImage" class="h-76  bg-white/5"></div>
       <div v-else :style="{ backgroundImage: bgImage ? `url(${bgImage})` : '' }" class="h-136 opacity-20 bg-cover  bg-no-repeat w-full flex flex-col-reverse">
         <div class="w-full h-20 bg-black/60 p-6 "></div>
       </div>
     </div>
    <slot></slot>
    <!-- Footer -->
     <div class="bg-[#1E232B] w-full">
       <footer class="px-4 xl:px-40 lg:px-40 py-12  bg-black/29 text-gray-400 flex flex-col xl:flex-row lg:flex-row gap-4 justify-center xl:justify-between lg:justify-between">
         <p class="text-sm" style="font-size: small;">© 2021 MoovieTime. All rights reserved.</p>
         <img src="/logo-footer.svg" alt="" class="w-20">
         <p class="text-sm" style="font-size: small;">Made with &lt;INSERT_FRAMEWORK&gt;</p>
       </footer>
     </div>

     <!-- Modal Search -->
      <div v-if="showModal" class="fixed inset-0 bg-gray-900 z-50 flex justify-center items-center">
        <div class="bg-black/20 p-6 rounded-lg shadow-xl w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-white text-xl">Search Movie</h2>
            <button @click="showModal = false" class="text-white">✖</button>
          </div>

          <!-- Search Input -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Find movie"
              @focus="showDropdown = true"
              @blur="hideDropdown"
              @input="filterResults"
              class="px-4 py-2 rounded w-full text-white outline-none placeholder-gray-400 bg-[#1E232B]"
            />
            <ul v-if="showDropdown && filteredResults.length" class="absolute left-0 w-full bg-[#1E232B] shadow-lg z-10 rounded mt-1">
              <li
                v-for="(result, index) in filteredResults"
                :key="index"
                @mousedown="selectResult(result)"
                class="px-4 py-2 text-white hover:bg-[#3A3F47] cursor-pointer"
              >
                {{ result?.Title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
  </div>
  
</template>

<script>
import 'swiper/css';

export default {
  props: ["bgImage"],
  data() {
    return {
      searchQuery: '',
      showDropdown: false,
      results: ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Fantasy', 'Thriller'], 
      menuOpen: false,
      filteredResults: [],
      showModal: false,
    };
  },
  methods:{
    async filterResults() {
        if (this.searchQuery.length > 0) {
            const apiKey = import.meta.env.VITE_OMDB_API_KEY;
            const apiUrl = import.meta.env.VITE_OMDB_URL;

            try {
              const response = await fetch(`${apiUrl}?s=${this.searchQuery}&apikey=${apiKey}`);
              const data = await response.json();
              console.log('movie', data?.Search );

              this.filteredResults = data.Search.map((movie) => ({
                ...movie,
                rating: Math.floor(Math.random() * 3) + 7, // Rating random karena API tidak menyediakannya
              }));
            } catch (error) {
              console.error("Failed to fetch movies:", error);
            }
        } else {
          this.filteredResults = [];
        }
      },
      selectResult(result) {
        this.searchQuery = result;
        this.showDropdown = false;
        console.log('result', result);
        
        this.$router.push(`/about?id=${result?.imdbID}`)
      },

      
      selectCategory(result) {
        this.$router.push(`/movies?id=${result}`)
      },

      hideDropdown() {
        setTimeout(() => {

          this.showDropdown = false;
        }, 200); // Small delay to allow click events on dropdown
      }
  },

  
};
</script>

<style>

</style>
