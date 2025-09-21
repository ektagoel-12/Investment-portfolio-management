<template>
  <div class="max-w-7xl mx-auto py-20 grid grid-cols-1 md:grid-cols-2 items-center">
    <!-- Left side: Text -->
    <div class="text-center md:text-left">
      <h1 class="text-4xl font-bold text-blue-600 mb-4">Welcome to WealthTrack</h1>
      <p class="text-lg text-gray-600 mb-6">
        Track and manage your investments with ease.
      </p>
      <router-link
        to="/portfolios"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        Get Started
      </router-link>
    </div>

    <!-- Right side: Illustration -->
    <div class="flex justify-center md:justify-end h-full">
      <img 
        src="@/assets/WealthHomeImage.png" 
        alt="WealthTrack illustration" 
        class="w-full h-full max-h-[500px] object-contain md:max-h-[650px]" 
      />
    </div>
  </div>
</template>
