<template>
  <d-card style="max-width: 300px">
    <d-card-header> Card header </d-card-header>
    <!-- <d-card-img src="https://place-hold.it/300x200" /> -->
    <d-card-body :title="data.title">
      <p>{{data.poem}}</p>
      <!-- <d-btn theme="primary">Read more &rarr;</d-btn> -->
    </d-card-body>
    <d-card-footer>
      <vs-button danger icon>
        <i class="bx bx-heart"></i>
      </vs-button>
    </d-card-footer>
  </d-card>
</template>

<script>
export default {
  props: ['data'],
};
</script>