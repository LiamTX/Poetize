<template>
  <div class="center">
    <div class="con-form">
      <vs-input icon-after dark v-model="user.email" placeholder="E-mail">
        <template #icon>
          <i class="bx bx-user"></i>
        </template>
      </vs-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
};
</script>