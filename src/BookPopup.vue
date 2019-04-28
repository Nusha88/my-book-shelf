<template>
  <div class="text-center">
    <b-button class="popup-button" v-b-modal.modal1>Add Book</b-button>
    <!-- Modal Component -->
    <b-modal id="modal1" title="Add Book" ref="modal">
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
      <div slot="modal-footer">
        <b-btn variant="link" @click="hidePopup">Cancel</b-btn>
        <b-btn variant="primary" @click="sendTheForm">Save</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {uuid} from 'vue-uuid';
  import firebase from 'firebase';

  export default {

    data: function () {
      return {
        book: {
          title: '',
          author: '',
          genre: '',
          selected: '',
          value: ''
        },
        books: [],
        selected: 'Read',
        value: '5',
        options: [
          {text: 'Read', value: 'Read'},
          {text: 'Plan', value: 'Plan'}
        ],
        title: '',
        author: '',
        genre: ''
      }
    },
    methods: {
      sendTheForm: function () {
        if (this.selected === 'Plan') {
          this.value = '';
        }
        this.book = {
          title: this.title,
          author: this.author,
          genre: this.genre,
          selected: this.selected,
          value: this.value
        };
        this.books.push(this.book);
        this.writeNewPost();

        this.title = '';
        this.author = '';
        this.genre = '';
        this.value = '5';
        this.$root.$emit('addBook', this.book);
        this.hidePopup();
      },
      writeNewPost() {
        let uuidBook = uuid.v1();
        let userId = localStorage.getItem('id');
        firebase.database().ref('users/' + userId + '/books/' + uuidBook).set({
          title: this.title,
          author: this.author,
          genre: this.genre,
          value: this.value,
          selected: this.selected,
          uuid: uuidBook
        });
      },
      hidePopup: function () {
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    }
  }
</script>

<style scoped>
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

  .modal-footer {
    display: none;
  }
  .popup-button {
    background-color: transparent;
    color: #00ff7f !important;
    text-transform: uppercase;
    font-weight: 700;
    border-color: #00ff7f;
    padding: .5rem 3rem;
  }
  .popup {
    background-color: #ccc !important;
    color: #00ff7f;
  }
</style>
