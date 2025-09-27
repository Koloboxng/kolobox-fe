<template>
  <div class="loader ma-5 py-5">
    <div class="text-xs-center mt-4">
      <img
        src="../assets/images/logo-kolobox.png"
        alt="KoloBox"
        style="width:50%;"
      />
    </div>
    <v-progress-linear
      v-bind:indeterminate="true"
      height="2"
      color="light-blue accent-4"
    ></v-progress-linear>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  h3 {
    font-weight: 700;
  }
}
</style>
