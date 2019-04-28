<template>
  <div>
    <div class="top-link">
      <button class="btn btn-outline-info my-2 my-sm-0" type="button" @click="logout">Log Out</button>
    </div>
    <div class="shelf-container">
      <ul class="books">
        <li v-for="(book, n) in books"
            class="book"
            @click="sendBook(book)"
            :class="[
            {planRead: book.selected==='Plan'},
      {fiveStars: book.value==='5'},
      {fourStars: book.value==='4'},
      {threeStars: book.value==='3'},
      {twoStars: book.value==='2'},
      {oneStars: book.value==='1'},
      {straight : n===0},
      {ml: n===1},
      {big_width: n===0},
      {right_incline: n===1},
      {right_incline: n===2},
      {mr: n===2},
      {middle_height: n===2},
      {straight: n===3},
      {small_width: n===3},
      {big_height: n===3},
      {straight: n===4},
      {straight: n===5},
      {middle_height: n===5},
      {straight: n===6},
      {small_width: n===6},
      {big_height: n===6},
      {straight : n===7},
      {ml: n===8},
      {small_width: n===7},
      {left_incline: n===8},
      {ml: n===9},
      {big_width: n===9},
      {big_height: n===9},
      {straight: n===10},
      {small_width: n===10},
      {big_height: n===10},
      {straight: n===11},
      {big_width: n===11},
      {straight: n===12},
      {middle_height: n===12},
      {straight: n===13},
      {big_width: n===13},
      {big_height: n===13},
      {left_incline: n===14},
      {ml: n===14},
      {mr: n===15},
      {left_incline: n===15},
      {big_height: n===15},
      {middle_height: n===15},
      {middle_height: n===16},
      {small_width: n===16},
      {big_hor_width: n===22},
        ]">
          <router-link class="book-link" :to="{ name: 'BookInfo', params: { id: book.uuid }}">
             <span>{{book.title}}</span>
          </router-link>
          <p class="close" @click="deleteBook(n)"><i class="far fa-times-circle"></i></p>
        </li>
      </ul>
      <ul class="markup">
        <li v-for="n in 23" class="book book_markup"
            :class="[{straight : n===1},
      {ml: n===2},
      {big_width: n===1},
      {right_incline: n===2},
      {right_incline: n===3},
      {mr: n===3},
      {middle_height: n===3},
      {straight: n===4},
      {small_width: n===4},
      {big_height: n===4},
      {straight: n===5},
      {straight: n===6},
      {middle_height: n===6},
      {straight: n===7},
      {small_width: n===7},
      {big_height: n===7},
      {straight : n===8},
      {ml: n===9},
      {small_width: n===8},
      {left_incline: n===9},
      {ml: n===10},
      {big_width: n===10},
      {big_height: n===10},
      {straight: n===11},
      {small_width: n===11},
      {big_height: n===11},
      {straight: n===12},
      {big_width: n===12},
      {straight: n===13},
      {middle_height: n===13},
      {straight: n===14},
      {big_width: n===14},
      {big_height: n===14},
      {left_incline: n===15},
      {ml: n===15},
      {mr: n===16},
      {left_incline: n===16},
      {big_height: n===16},
      {middle_height: n===16},
      {middle_height: n===17},
      {small_width: n===17},
      {big_hor_width: n===23},
      ]">{{n}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {eventBus} from './main';
  import firebase from 'firebase';

  export default {
    data: function () {
      return {
        books: [],
        full: false,
      }
    },
    methods: {
      sendBook(book) {
        console.log(book);
        eventBus.$emit('sendingBook', {
          author: book.author,
          genre: book.genre,
          selected: book.selected,
          value: book.value
        })
      },
      deleteBook(n) {
        this.books.splice(n, 1);
        let userId = localStorage.getItem('id');
        let bookId;
        let bookArr = [];
        var leadsRef = firebase.database().ref('users/' + userId + '/books');
        leadsRef.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            bookArr.push(childSnapshot.val());
          });
          let selectedBook = bookArr[n];
          bookId = selectedBook.uuid;
          firebase.database().ref('users/' + userId + '/books/' + bookId).remove();
        });
        leadsRef.once('value').then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            bookArr.push(childSnapshot.val());
          });
          this.books = bookArr;
        });
      },
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    },
    mounted() {
      this.$root.$on('addBook', data => {
        this.books.push(data);
      });
    },
    created() {
      let userId = localStorage.getItem('id');
      let bookArr = [];
      var leadsRef = firebase.database().ref('users/' + userId + '/books');
      leadsRef.once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          bookArr.push(childSnapshot.val());
        });

      });
      this.books = bookArr;
    }
  }
</script>

<style scoped>
  .shelf-container {
    width: 100%;
    height: 280px;
    border-bottom: 10px solid #00ff7f;
    position: relative;
  }

  ul {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 2px;
    color: #000;
  }

  .books {
    margin-bottom: -4px;
    z-index: 100;
  }
  .markup {
    z-index: 0;
  }

  li {
    width: 30px;
    height: 200px;
    margin-right: 2px;
    margin-left: 0;
    display: inline-block;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    z-index: 1;
  }

  .close {
    position: absolute;
    top: 3px;
    left: 4px;
    font-size: 1.3rem;
    z-index: 1000;
    color: #000;
  }
  .big_width .close{
    left: 13px;
  }

  .small_width .close {
    left: 0;
  }
  li.book_added {
    background-color: #FDC02F;
  }

  li.planRead {
    background-color: aqua;
  }

  li.fiveStars {
    background-color: red;
  }

  li.fourStars {
    background-color: orangered;
  }

  li.threeStars {
    background-color: orange;
  }

  li.twoStars {
    background-color: yellow;
  }

  li.oneStars {
    background-color: darkkhaki;
  }

  li span {
    min-width: 180px;
    display: inline-block;
    position: absolute;
    left: -79px;
    bottom: 81px;
    -webkit-transform: rotate(-90deg);
  }

  .straight_ul {
    margin-left: 517px;
  }

  .straight_ul li {
    margin-right: 4px;
  }

  .straight_ul li.right_incline {
    margin-right: 35px;
  }

  .book_markup {
    border: 1px solid grey;
    cursor: default;
  }

  .straight {
  }

  .right_incline {
    -ms-transform: rotate(-20deg); /* IE 9 */
    -webkit-transform: rotate(-20deg); /* Safari 3-8 */
    transform: rotate(-20deg);
  }

  .left_incline {
    -ms-transform: rotate(20deg); /* IE 9 */
    -webkit-transform: rotate(20deg); /* Safari 3-8 */
    transform: rotate(20deg);
  }

  .ml {
    margin-left: 33px;
  }

  .mr {
    margin-right: 35px;
  }

  li.big_width {
    width: 45px !important;
  }

  .big_hor_width {
    height: 35px !important;
    width: 170px;
    position: absolute;
    bottom: 0;

  }

  .small_hor_width {
    width: 170px !important;
  }

  .small_width {
    width: 20px;
  }

  .big_height {
    height: 185px;
    vertical-align: bottom;
  }

  .middle_height {
    height: 165px;
    vertical-align: bottom;
  }

  .book.right_incline.mr.middle_height {
    margin-left: 8px;
    margin-right: 30px;
  }


  .red {
    background-color: red;
  }
  .top-link {
    position: absolute;
    top: -5rem;
    right: -1rem;
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
    outline: none;
    box-shadow: none;
  }

  .btn-outline-info:hover{
    color: #00ff7f;
    text-decoration: none;
  }
  .btn.btn-outline-info:hover {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    box-shadow: none;
  }
  .book-link {
    display: block;
    min-width: 20px;
    min-height: 180px;
  }
</style>
