const vides = {
    load: () => {
        return `
    <aside class="antialiased bg-gray-100 text-gray-600 flex flex-row ">
    <div id="player" class="ml-2 mt-4 pr-4" width="560" height="315"></div>
    <button class="addPlaylist absolute top-[75vh] left-[56vw] border-2 p-2 bg-slate-300 font-bold">Add to Collection</button
<section class=" bg-gray-100 text-gray-600  h-screen">
    <div class="flex flex-col justify-center w-[26vw] overflow-auto">
        <div class="w-[26vw] h-[95vh] mt-3 mx-auto bg-white shadow-lg rounded-sm border border-gray-200 overflow-auto">
            <header class="px-5 py-4 border-b border-gray-100">
                <h2 class="font-semibold text-gray-800 text-center text-2xl">Lyric</h2>
            </header>
            <div class="p-3">
                <div class="overflow-x-auto">
                    <table class="table-auto w-[26vw">
                        <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Time</div>
                                </th>
                                <th class="p-2 whitespace-nowrap">
                                    <div class="font-semibold text-left">Lyric</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="text-sm divide-y divide-gray-100 w-[13vw] ">
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
</aside>
    `

    }
}

export { vides }