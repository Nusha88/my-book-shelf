<template>
  <div>
    <h2 class="text-center">Book Info</h2>
    <div class="row">
      <div class="col-md-6 offset-3">
        <div class="card">
          <div class="card-header">{{selected}}</div>
          <div class="card-body">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">Author: {{author}}</p>
            <p class="card-text">Genre: {{genre}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { eventBus } from "./main";

  export default {
    props: ['title'],

    data: function() {
      return {
        author: '',
        genre: '',
        selected: '',
        value: 0,
      }
    },
    created() {
       eventBus.$on('sendingBook', data => {
         console.log(data);
         this.author = data.author;
         this.genre = data.genre;
         this.selected = data.selected;
         this.value = data.value;
       })
    },
  }
</script>

<style scoped>
</style>
