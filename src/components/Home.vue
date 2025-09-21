<template>
  <div class="relative min-h-screen w-full flex items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
    <div
      class="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-6 sm:px-12 lg:px-24 py-16"
    >
      <!-- Left side: Text -->
      <div class="text-center md:text-left space-y-6 animate-fadeIn">
        <!-- Hero heading -->
        <h1
          class="text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 leading-tight"
        >
          Welcome to WealthTrack
        </h1>

        <!-- Subtitle -->
        <p class="text-lg text-slate-600 max-w-xl mx-auto md:mx-0">
          Track and manage your investments with ease — a modern dashboard for
          smarter financial decisions.
        </p>

        <!-- Key benefits -->
        <div
          class="flex flex-wrap justify-center md:justify-start gap-6 text-slate-700 text-sm font-medium mt-6"
        >
          <div class="flex items-center gap-2">
            <span class="text-blue-600 text-xl">📈</span> Track Growth
          </div>
          <div class="flex items-center gap-2">
            <span class="text-blue-600 text-xl">👥</span> Manage Clients
          </div>
          <div class="flex items-center gap-2">
            <span class="text-blue-600 text-xl">🔒</span> Secure Investments
          </div>
        </div>

        <!-- Call to action -->
        <router-link
          to="/portfolios"
          class="inline-flex items-center gap-2 px-6 py-3 mt-6 rounded-full text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer"
          aria-label="Get Started with WealthTrack"
        >
          🚀 Get Started
        </router-link>
      </div>

      <!-- Right side: Illustration -->
      <div class="flex flex-col items-center md:items-end space-y-6 animate-float">
        <img
          src="@/assets/WealthHomeImage.png"
          alt="WealthTrack illustration"
          class="w-full max-w-sm sm:max-w-md lg:max-w-lg object-contain drop-shadow-lg"
        />

        <!-- Trusted badge only -->
        <div class="flex justify-center md:justify-end">
          <span
            class="px-4 py-2 bg-white rounded-lg shadow text-slate-500 text-xs uppercase tracking-wide"
          >
            Trusted by Investors Worldwide
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure UI component, no logic needed
</script>

<style scoped>
/* Subtle fade-in animation */
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

/* Floating effect for illustration */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}
</style>
