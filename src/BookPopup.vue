<template>
  <div class="text-center modal-box">
    <b-button class="popup-button" v-b-modal.modal1>Add Book</b-button>
    <!-- Modal Component -->
    <b-modal id="modal1" title="Add Book" ref="modal">
      <b-form-group id="mod">
        <b-row class="my-1">
          <b-col sm="12">
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
          <b-col sm="12">
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
          <b-col sm="12">
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
      <div style="height: 3rem">
        <b-btn variant="btn btn-outline-warning-popup" @click="hidePopup">Cancel</b-btn>
        <b-btn variant="btn btn-outline-info-popup" @click="sendTheForm">Save</b-btn>
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

<style>
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
  .popup-button:hover {
    background-color: transparent;
    border-color: #00ff7f;
  }
  .popup-button:focus {
    box-shadow: none !important;
    border-color: #00ff7f !important;
    background-color: transparent !important;
  }

  .modal-box  .modal-content {
    background-color: #333;
  }

  #mod input {
    background-color: transparent;
    border: none;
    border-bottom: 3px solid #00ff7f;
    outline: none;
    padding: 1.5rem 5px;
    color: #fff;
  }
  #mod input:focus {
    outline: none;
    box-shadow: none;
  }
  #mod #range-1 {
    border: none;
  }
  .modal-box .modal-content .close {
    color: red;
    text-shadow: none;
  }
  #btnradios1 .btn.btn-secondary.active {
    background-color: #00ff7f;
    color: #000;
  }
  #btnradios1 .btn.btn-secondary.active:focus {
    outline: none;
    box-shadow: none;
  }

  .btn-outline-info-popup {
    margin-right: 1rem;
    background-color: #00ff7f;
    color: #000;
    font-weight: 700;
    position: absolute;
    right: 0;
  }

  .btn.btn-outline-info-popup:focus {
    outline: none;
    box-shadow: none;
  }

  .btn.btn-outline-info-popup {
    color: #000;
  }

  .btn.btn-outline-info-popup:hover{
    color: #00ff7f;
    background-color: transparent;
    text-decoration: none;
    box-shadow: none;
    border-color: #00ff7f;
  }
  .btn.btn-outline-warning-popup:focus {
    outline: none;
    background-color: transparent;
    box-shadow: none;
    border-color: #00ff7f;
    color: #00ff7f;
  }
  .btn-outline-warning-popup:hover {
    color: #00ff7f;
    background-color: transparent;
    text-decoration: none;
    border: 1px solid transparent;
  }

  .btn-outline-warning-popup {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    position: absolute;
    left: 1rem;
  }

  .btn.btn-outline-warning-popup:active {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    box-shadow: none;
  }
</style>
