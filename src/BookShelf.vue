<template>
  <div>
    <div class="shelf-container">
      <ul class="markup">
        <li v-for="n in 7" class="book book_markup"
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
            {big_width: n===7},
            {big_height: n===7},
            ]">
        </li>
      </ul>

      <ul>
        <li v-for="(book, n) in books"
            class="book"
            @click="sendBook(book)"
            :class="[{straight : n===0},
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
                     {big_width: n===6},
                     {big_height: n===6},
                     {planRead: book.selected==='Plan'},
                     {fiveStars: book.value==='5'},
                     {fourStars: book.value==='4'},
                     {threeStars: book.value==='3'},
                     {twoStars: book.value==='2'},
                     {oneStars: book.value==='1'},
                     ]">
          <router-link :to="{ name: 'BookInfo', params: { title: book.title }}">
            <span>{{book.title}}</span>
          </router-link>
          <p class="close" @click="deleteBook(n,book)">X</p>
        </li>
      </ul>

      <ul class="horizontal_ul markup">
        <li v-for="n in 3" class="book book_markup"
            :class="[
         {big_hor_width: n===1},
         {big_hor_width: n===2},
         {big_hor_width: n===3},
        ]"></li>
      </ul>

      <ul class="horizontal_ul">
        <li v-for="(book2, n) in books2" class="book"
            :class="[
         {big_hor_width: n===0},
         {big_hor_width: n===1},
         {big_hor_width: n===2},
         {planRead: book2.selected==='Plan'},
         {fiveStars: book2.value==='5'},
         {fourStars: book2.value==='4'},
         {threeStars: book2.value==='3'},
         {twoStars: book2.value==='2'},
         {oneStars: book2.value==='1'},
        ]">
          <router-link :to="{ name: 'BookInfo', params: { title: book2.title } }">
            <span>{{book2.title}}</span>
          </router-link>
          <p class="close" @click="deleteBook2(n)">X</p>
        </li>
      </ul>

      <ul class="straight_ul markup">
        <li v-for="n in 8" class="book book_markup"
            :class="[
                      {right_incline : n===1},
                      {ml: n===1},
                      {mr: n===1},
                      {straight: n===2},
                      {straight: n===3},
                      {small_width: n===2},
                      {small_width: n===3},
                      {middle_height: n===3},
                      {middle_height: n===4},
                      {big_width: n===4},
                      {straight: n===4},
                      {straight: n===5},
                      {straight: n===6},
                      {straight: n===7},
                      {left_incline: n===8},
                      {middle_height: n===8},
                      {ml: n===8},
                      {mr: n===8},
                     ]"></li>
      </ul>

      <ul class="straight_ul">
        <li v-for="(book3, n) in books3" class="book"
            :class="[
                      {right_incline : n===0},
                      {ml: n===0},
                      {mr: n===0},
                      {straight: n===1},
                      {straight: n===2},
                      {small_width: n===1},
                      {small_width: n===2},
                      {middle_height: n===2},
                      {middle_height: n===3},
                      {big_width: n===3},
                      {straight: n===3},
                      {straight: n===4},
                      {straight: n===5},
                      {straight: n===6},
                      {left_incline: n===7},
                      {middle_height: n===7},
                      {ml: n===7},
                      {mr: n===7},
                      {planRead: book3.selected==='Plan'},
                     {fiveStars: book3.value==='5'},
                     {fourStars: book3.value==='4'},
                     {threeStars: book3.value==='3'},
                     {twoStars: book3.value==='2'},
                     {oneStars: book3.value==='1'},

                     ]">
          <router-link :to="{ name: 'BookInfo', params: { title: book3.title } }">
            <span>{{book3.title}}</span>
          </router-link>
          <p class="close" @click="deleteBook3(n)">X</p>
        </li>
      </ul>

      <ul class="horizontal_ul last_horizontal_ul markup">
        <li v-for="n in 5" class="book book_markup"
            :class="[
                      {horizontal: n===1},
                      {horizontal: n===2},
                      {horizontal: n===3},
                      {small_hor_width: n===4},
                      {big_hor_width: n===2},
                      {big_hor_width: n===5}
            ]"></li>
      </ul>

      <ul class="horizontal_ul last_horizontal_ul">
        <li v-for="(book4, n) in books4" class="book"
            :class="[
                      {horizontal: n===0},
                      {horizontal: n===1},
                      {horizontal: n===2},
                      {small_hor_width: n===3},
                      {big_hor_width: n===1},
                      {big_hor_width: n===4},
                      {planRead: book4.selected==='Plan'},
                     {fiveStars: book4.value==='5'},
                     {fourStars: book4.value==='4'},
                     {threeStars: book4.value==='3'},
                     {twoStars: book4.value==='2'},
                     {oneStars: book4.value==='1'},
            ]">
          <router-link :to="{ name: 'BookInfo', params: { title: book4.title }, query: {book: book4 }}">
            <span>{{book4.title}}</span>
          </router-link>
          <p class="close" @click="deleteBook4(n)">X</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {eventBus} from './main'

  export default {
    data: function () {
      return {
        books: [],
        books2: [],
        books3: [],
        books4: [],
        full: false,
      }
    },
    methods: {
      sendBook(book) {
        eventBus.$emit('sendingBook', {
          author: book.author,
          genre: book.genre,
          selected: book.selected,
          value: book.value
        })
      },
      deleteBook(n, key) {
        console.log(key)
        this.books.splice(n, 1);
        this.$http.get('https://mybookshelf-2ad19.firebaseio.com').ref('data').then(r => {
          console.log(r);
        })

      }
    },
    mounted() {
      this.$root.$on('addBook', data => {
        if (this.books.length < 7) {
          this.books.push(data);
        } else if ((this.books.length = 7) && (this.books2.length < 3)) {
          this.books2.push(data);
        } else if ((this.books.length = 7) && (this.books2.length = 3) && (this.books3.length < 8)) {
          this.books3.push(data);
        } else if ((this.books.length = 7) && (this.books2.length = 3) && (this.books3.length = 8) && (this.books4.length < 5)) {
          this.books4.push(data);
          this.full = false;
        }
      });
    },
    created() {
      this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books1.json').then(response => {
        return response.json();
      })
        .then(data => {
          const booksArr = [];
          for (let i in data) {
            booksArr.push(data[i]);
          }
          this.books = booksArr;
        });

      this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books2.json').then(response => {
        return response.json();
      })
        .then(data => {
          const books2Arr = [];
          for (let i in data) {
            books2Arr.push(data[i]);
          }
          this.books2 = books2Arr;
        });

      this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books3.json').then(response => {
        return response.json();
      })
        .then(data => {
          const books3Arr = [];
          for (let i in data) {
            books3Arr.push(data[i]);
          }
          this.books3 = books3Arr;
        });

      this.$http.get('https://mybookshelf-2ad19.firebaseio.com/data/books4.json').then(response => {
        return response.json();
      })
        .then(data => {
          const books4Arr = [];
          for (let i in data) {
            books4Arr.push(data[i]);
          }
          this.books4 = books4Arr;
        });
    }
  }
</script>

<style scoped>
  .shelf-container {
    width: 100%;
    height: 400px;
    border-bottom: 10px solid #17a2b8;
    position: relative;
  }

  ul {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-bottom: 2px;
    color: #000;
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
    top: 0;
    left: 0;
    width: 25px;
    height: 25px;
    z-index: 1000;
    background-color: #fff;
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

  .horizontal_ul {
    margin-left: 350px;
    height: 96px;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }

  .horizontal_ul li {
    display: block;
    margin-right: 0;
    width: 200px;
    height: 20px;
    margin-top: 2px;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }

  .horizontal_ul li span {
    -webkit-transform: none;
    left: 2px;
    bottom: 0;
  }

  .last_horizontal_ul {
    height: 140px;
    margin-left: 920px;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }

  .horizontal_ul.last_horizontal_ul li {
    width: 180px;
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
  }

  .horizontal_ul.last_horizontal_ul li span {
    -webkit-transform: none;
    left: 2px;
    bottom: 0;
  }

  .last_horizontal_ul li:nth-child(odd) {
    margin-left: -15px;
  }

  .horizontal_ul.last_horizontal_ul li:nth-child(even) {
    margin-left: -1px;
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

  .horizontal_ul li:nth-child(even) {
    margin-left: -10px;
  }

  .red {
    background-color: red;
  }
</style>
