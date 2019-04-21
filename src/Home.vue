<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1 class="text-center">My Book Shelf</h1>
          <book-popup></book-popup>
          <book-shelf></book-shelf>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import BookShelf from './BookShelf'
  import BookPopup from './BookPopup'

  export default {
    components: {
      'book-shelf': BookShelf,
      'book-popup': BookPopup,
    }
  }
</script>

<style scoped>
  .container {
    margin: 1rem auto;
  }
</style>
