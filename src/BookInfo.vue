<template>
  <div>
    <div class="top-link">
      <button class="btn btn-outline-info my-2 my-sm-0" type="button" @click="logout">Log Out</button>
    </div>
    <div class="book-info-block">
      <router-link :to="{path: '/home'}"><i class="fas fa-long-arrow-alt-left"></i></router-link>
      <h2 class="text-center">{{title}}</h2>
      <table class="table table-responsive">
        <thead>
        <tr>
          <th scope="col">Status</th>
          <th scope="col">Rating</th>
          <th scope="col">Author</th>
          <th scope="col">Genre</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th><i v-if="selected === 'Read'" class="fas fa-check"></i>
            <i v-if="selected === 'Plan'" class="fas fa-clipboard-list"></i>
             {{selected}}</th>
          <td>{{value}} <i class="fas fa-star" :class="[
          {red: value==='5'},
          {orangered: value==='4'},
          {orange: value==='3'},
          {yellow: value==='2'},
          {white: value==='1'},
          ]"></i>
          </td>
          <td>{{author}}</td>
          <td>{{genre}}</td>
        </tr>
        </tbody>
      </table>
      <div class="button-group">
        <button class="btn btn-outline-warning my-2 my-sm-0" @click="openEditBook = !openEditBook">Edit</button>
      </div>
      <div class="edit-book-block" v-if="openEditBook">
        <b-form-group>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="title">Title:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="title"
                size="sm"
                type="text"
                placeholder="Book Title..."
                name="title"
                v-model="title"/>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="author">Author:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="author"
                size="sm"
                type="text"
                placeholder="Author..."
                name="author"
                v-model="author"/>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="2">
              <label for="genre">Genre:</label>
            </b-col>
            <b-col sm="10">
              <b-form-input
                id="genre"
                size="sm"
                type="text"
                placeholder="Genre..."
                name="genre"
                v-model="genre"/>
            </b-col>
          </b-row>
          <br>
          <hr>
          <br>
          <b-form-radio-group
            id="btnradios1"
            buttons
            v-model="selected"
            :options="options"
            name="radiosBtnDefault"
          />
          <br>
          <br>
          <div class="range" v-if="selected === 'Read'">
            <label for="range-1">Rate your impression of this book</label>
            <b-form-input type="range"
                          id="range-1"
                          v-model="value"
                          min="1" max="5"></b-form-input>
            <div class="mt-2">{{ value }} <i class="fas fa-star" :class="[
          {red: value==='5'},
          {orangered: value==='4'},
          {orange: value==='3'},
          {yellow: value==='2'},
          {white: value==='1'},
          ]"></i></div>
          </div>
        </b-form-group>
        <div class="text-right">
          <button class="btn btn-outline-info" @click="editBook()">Save Changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {eventBus} from "./main";
  import firebase from 'firebase';

  export default {
    data: function () {
      return {
        openEditBook: false,
        options: [
          {text: 'Read', value: 'Read'},
          {text: 'Plan', value: 'Plan'}
        ],
        title: '',
        author: '',
        genre: '',
        selected: '',
        value: 5,
        n: 0
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      },
      editBook() {
        let userId = localStorage.getItem('id');
        let book_id = localStorage.getItem('book_id');
        firebase.database().ref('users/' + userId + '/books/' + book_id).set({
          title: this.title,
          author: this.author,
          genre: this.genre,
          value: this.value,
          selected: this.selected,
          uuid: book_id
        });
        this.$router.push('/home');
      }
    },
    created() {
      let id = localStorage.getItem('book_id');
      if (id) {
        this.$router.push('/home');
      }
      eventBus.$on('sendingBook', data => {
        if (data) {
          this.title = data.title;
          this.author = data.author;
          this.genre = data.genre;
          this.selected = data.selected;
          this.value = data.value;
        }
      })
    },
  }
</script>

<style scoped>
  a:hover {
    color: #ccc;
  }
  h2 {
    margin-bottom: 2rem;
  }
  table {
    color: #fff;
  }
  .edit-book-block {
    margin-top: 2rem;
  }
  .book-info-block {
    background-color: rgba(204, 204, 204, .3);
    margin: 2rem auto;
    width: 70%;
    padding: 2rem;
    margin-bottom: 4rem;
    color: #fff;
    text-transform: uppercase;
  }
  .red {
    color: red;
  }

  .orangered {
    color: orangered;
  }

  .orange {
    color: orange;
  }

  .yellow {
    color: yellow;
  }

  .white {
    color: grey;
  }

  .top-link {
    position: absolute;
    top: 5rem;
    right: 1rem;
  }
  .button-group {
    text-align: right;
  }

  .btn-outline-info {
    margin-right: 1rem;
    background-color: transparent;
    color: #00ff7f !important;
    text-transform: uppercase;
    font-weight: 700;
    border: none;
  }

  .btn.btn-outline-info:focus {
    outline: none !important;
    box-shadow: none;
  }

  .btn-outline-info:hover {
    color: #00ff7f;
    text-decoration: none;
  }

  .btn.btn-outline-info:hover {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    box-shadow: none;
  }
  .btn.btn-outline-warning {
    background-color: transparent;
    padding: .5rem 2rem;
    width: 40%;
    text-transform: uppercase;
    font-weight: 700;
  }

   button:focus {
    outline: none;
    box-shadow: none;
  }
  .btn.btn-outline-warning:focus {
    outline: none;
    background-color: transparent;
    box-shadow: none !important;
  }
  .btn-outline-warning:hover {
    color: #00ff7f;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid transparent;
  }

  .btn-outline-warning {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
  }

  .btn.btn-outline-warning:active {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    box-shadow: none;
  }
  @media screen and (max-width: 990px) {
    .top-link {
      top: 2.8rem;
    }
    .top-link button {
      font-size: .8rem;
    }
  }
</style>
