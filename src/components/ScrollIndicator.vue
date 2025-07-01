<template>
  <div
    class="flex flex-col items-center text-gray-500 opacity-70 transition-opacity duration-700 delay-1000 animate-fade-in"
  >
    <div class="md:hidden flex flex-col items-center animate-bounce mt-20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2a1 1 0 011 1v6a1 1 0 11-2 0V3a1 1 0 011-1zM6.343 4.929a1 1 0 011.414 0L12 9.172l4.243-4.243a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z"
        />
      </svg>
      <span class="text-sm mt-1">向下滑動</span>
    </div>

    <div class="hidden md:flex flex-col items-center animate-bounce">
      <svg
        width="24"
        height="40"
        viewBox="0 0 24 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="22"
          height="38"
          rx="11"
          stroke="#666"
          stroke-width="2"
        />
        <circle cx="12" cy="10" r="2" fill="#666" />
      </svg>
      <span class="text-sm mt-1">Scroll</span>
    </div>
  </div>
</template>
