<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="introduction">
            <div class="introduction_block">
              read
              <br>
              <br>
              <span><i class="fas fa-book-reader"></i></span>
            </div>
            <div class="arrow">
              <i class="fas fa-arrows-alt-h"></i>
            </div>
            <div class="introduction_block">
              rate
              <br>
              <br>
              <span><i class="fas fa-star"></i></span>
            </div>
            <div class="arrow">
              <i class="fas fa-arrows-alt-h"></i>
            </div>
            <div class="introduction_block">
              plan
              <br>
              <br>
              <span><i class="fas fa-book-open"></i></span>
            </div>
          </div>
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
  .introduction {
    text-align: center;
  }
  .introduction div {
    display: inline-block;
    width: 19%;
    padding: 2rem;
    font-size: 1.5rem;
    text-transform: uppercase;
  }
  .introduction_block {
    border-top: 2px solid #00ff7f;
  }
  .introduction_block i {
    font-size: 2.5rem;
  }
  .arrow {
    color: #00ff7f;
  }

  @media all and (max-width: 390px) {
    .introduction {
      margin-bottom: 1rem;
    }
    .introduction div {
      width: 100%;
      padding: 1rem;
      font-size: 1rem;
    }
  }


</style>
