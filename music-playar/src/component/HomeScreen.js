
const HomeScreen = {
    load: () => {
        return `

        <div class="w-[25vw] flex flex-col h-[100vh] px-4 py-8 bg-white border-r dark:bg-gray-800 dark:border-gray-600">
        <h2 class="text-3xl font-semibold text-gray-800 dark:text-white text-center">Music</h2>
    
        <div class="relative mt-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>
    
            <input type="text"
                class="search w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
                placeholder="Search Song with lyric" />
        </div>
    
        <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>


<div class="space-y-4">

  <details class="group">
    <summary
      class="flex items-center justify-between p-3 rounded-lg cursor-pointer bg-gray-300"
    >
      <h5 class="font-small font-medium ml-2 text-gray-900">
        Collection
      </h5>

      <svg
        class="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </summary> 

    <p class="playlist overflow-x-scroll px-4 mt-4 leading-relaxed text-blue-700 bg-slate-50 rounded-lg p-2 flex flex-col h-[50vh]">
  </details>
</div>

    
                <hr class="my-3 border-gray-200 dark:border-gray-600" />
              <a class="flex items-center mb-4 ml-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    <span class="mx-2 font-medium aside-btn">Logout</span>
                </a>
            </nav>
    
        </div>


    </div>

    `
    }
}


export default HomeScreen