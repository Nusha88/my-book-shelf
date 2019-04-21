<template>
  <div>
    <b-button v-b-modal.modal1>Add Book</b-button>
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
        genre: '',
        books1Arr: [],
        books2Arr: [],
        books3Arr: [],
        books4Arr: []
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

        this.checkBooksLenght();

        this.books.push(this.book);
        if (this.books1Arr.length < 7) {
          this.$http.post('https://mybookshelf-2ad19.firebaseio.com/data/books1.json', this.book).then(response => {
              console.log(response);
            },
            error => {
              console.log(error)
            });
        } else if (this.books2Arr.length < 3) {
          this.$http.post('https://mybookshelf-2ad19.firebaseio.com/data/books2.json', this.book).then(response => {
              console.log(response);
            },
            error => {
              console.log(error)
            });
        } else if (this.books3Arr.length < 8) {
          this.$http.post('https://mybookshelf-2ad19.firebaseio.com/data/books3.json', this.book).then(response => {
              console.log(response);
            },
            error => {
              console.log(error)
            });
        } else if (this.books4Arr.length < 5) {
          this.$http.post('https://mybookshelf-2ad19.firebaseio.com/data/books4.json', this.book).then(response => {
              console.log(response);
            },
            error => {
              console.log(error)
            });
        } else {
          alert("Your bookshelf is full! Delete something!")
        }

        this.title = '';
        this.author = '';
        this.genre = '';
        this.value = '5';
        this.$root.$emit('addBook', this.book);
        this.hidePopup();
      },
      checkBooksLenght() {
        this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books1.json').then(response => {
          return response.json();
        })
          .then(data => {
            const books1Arr = [];
            for (let i in data) {
              books1Arr.push(data[i]);
              this.books1Arr = books1Arr;
              console.log(books1Arr.length + '1');
            }
          });
        if (this.books1Arr.length = 7) {
          this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books2.json').then(response => {
            return response.json();
          })
            .then(data2 => {
              const books2Arr = [];
              for (let i in data2) {
                books2Arr.push(data2[i]);
                this.books2Arr = books2Arr;
                console.log(books2Arr.length + '2')
              }
            })
        } else if (this.books2Arr.length = 3) {
          this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books3.json').then(response => {
            return response.json();
          })
            .then(data3 => {
              const books3Arr = [];
              for (let i in data3) {
                books3Arr.push(data3[i]);
                this.books3Arr = books3Arr;
                console.log(books3Arr.length + '3')
              }
            })
        } else if (this.books3Arr.length = 8) {
          this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books4.json').then(response => {
            return response.json();
          })
            .then(data4 => {
              const books4Arr = [];
              for (let i in data4) {
                books4Arr.push(data4[i]);
                this.books4Arr = books4Arr;
                console.log(books4Arr.length + '4')
              }
            })
        }
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
</style>
