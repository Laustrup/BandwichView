<script setup>
import { BCard, BButton, BCarousel, BCarouselSlide } from 'bootstrap-vue-next'

import image1 from '@/assets/image1.jpg'
import image2 from '@/assets/image2.jpg'
import image3 from '@/assets/image3.jpg'

</script>

<template>
  <BCarousel controls ride="carousel" :interval="5000" imgHeight="300px">
    <BCarouselSlide class=carousel-image :img-src="image1" />
    <BCarouselSlide :img-src="image2" />
    <BCarouselSlide :img-src="image3" />
  </BCarousel>
  <div>
    <h1 class="mb-4">Welcome to Bandwich</h1>
    <BCard title="Getting Started" class="mb-4">
      <BCard-text>
        This is a simple app using Bootstrap Vue Next components.
      </BCard-text>
      <BButton variant="primary">Get Started</BButton>
    </BCard>
  </div>
</template>

<style scoped>
.carousel-image {
  width: 1150px;
  height: 300px;
  object-fit: cover;
}

.image-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

/* Add responsive behavior for smaller screens */
@media (max-width: 1296px) {
  .carousel-image,
  .image-container {
    width: 100%;
    height: 300px;
  }
}
</style>
