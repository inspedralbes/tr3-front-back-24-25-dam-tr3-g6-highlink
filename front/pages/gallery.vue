<template>
    <div class="min-h-screen text-white flex flex-col items-center justify-center">
        <div class="pt-5 mt-9 text-center">
            <h1 class="mt-9 text-6xl font-bold tracking-widest" style="text-shadow: 5px 3px 4px rgba(255, 255, 255, 0.9);">Art Gallery</h1>
            <p class="mt-2 text-lg mb-8">Discover the amazing art of our game</p>
        </div>
        <div class="flex flex-col items-center justify-center align-center">
            <!-- <iframe class="lg:min-w-[610px] lg:min-h-[365px] md:min-w-[410px] md:min-h-[250px] mx-7 my-4" src="https://www.youtube-nocookie.com/embed/GSCIoTOiPsc?si=cxAvB6M3amRQvpW-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-7 p-5 border bg-[#0f172a] rounded-lg">
                <div class="flex justify-center">
                    <img class="object-cover" src="public/assets/artGallery/red-player.png" alt="">
                </div>
                <div class="flex justify-center">
                    <img class="object-cover" src="public/assets/artGallery/yellow-player.png" alt="">
                </div>
                <div class="flex justify-center">
                    <img class="w-[100px] h-[100px] object-cover" src="public/assets/artGallery/crab-extra.png" alt="">
                </div>
                <div class="flex justify-center">
                    <img class="w-[350px] h-[200px] object-cover" src="public/assets/artGallery/background-1.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
// Add any additional logic here
</script>