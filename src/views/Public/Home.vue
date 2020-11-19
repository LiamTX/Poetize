<template>
  <v-carousel height="100%">
    <div  class="alg-txt-e">
      <v-btn to="/Login" class="mt-1 mr-1" depressed>
        Skip
        <v-icon>
          mdi-arrow-right
        </v-icon>
      </v-btn>
    </div>

    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        class="ac mt-20"
        lazy-src="../../images/teste.svg"
        max-height="220"
        max-width="250"
        src="../../images/teste.svg"
      ></v-img>

      <div>
        <h3 color="black" class="alg-txt-c">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
          et quia tempora animi reprehenderit nobis magnam ipsa? Quae voluptate
          reiciendis velit earum exercitationem suscipit, doloremque consequatur
          perferendis voluptates possimus id.
        </h3>
      </div>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste2.svg"
        max-height="200"
        max-width="250"
        src="../../images/teste2.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste3.svg"
        max-height="270"
        max-width="250"
        src="../../images/teste3.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste4.svg"
        max-height="500"
        max-width="250"
        src="../../images/teste4.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste5.svg"
        max-height="250"
        max-width="250"
        src="../../images/teste5.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste6.svg"
        max-height="250"
        max-width="250"
        src="../../images/teste6.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste7.svg"
        max-height="200"
        max-width="250"
        src="../../images/teste7.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste8.svg"
        max-height="200"
        max-width="250"
        src="../../images/teste8.svg"
      ></v-img>
    </v-carousel-item>
    <v-carousel-item
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
      <v-img
        lazy-src="../../images/teste9.svg"
        max-height="200"
        max-width="250"
        src="../../images/teste9.svg"
      ></v-img>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
    };
  },
};
</script>
<style>
h3 {
  color: black;
}
</style>