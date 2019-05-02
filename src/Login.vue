<template>
  <div class="login">
    <div class="top-link">
      <router-link class="btn btn-outline-warning my-2 my-sm-0" :to="{ name: 'SignUp'}">
        Register
      </router-link>
    </div>
    <h3>Login</h3>
    <div class="inputs">
      <input
        type="text"
        v-model="email"
        placeholder="Email address"
        class="input"
        required>
      <br/>
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="input"
        required>
    </div>
    <div class="button">
      <button v-on:click="login">login</button>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase';

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((user) => {
          let id = user.user.uid;
          localStorage.setItem('id', id);
          this.$router.replace('home');
          localStorage.setItem('logged', 'true');
        }).catch((err) => {
          alert(err.message)
        })
      },

    }
  }
</script>
<style>
  .login {
    position: relative;
    text-transform: uppercase;
  }
  .login h3 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 5rem;
    padding-top: 4rem;
  }
  .inputs {
    text-align: center;
  }
  .inputs input {
    background-color: transparent;
    border: none;
    border-bottom: 3px solid #00ff7f;
    padding: .5rem .2rem;
    width: 50%;
    margin-bottom: 2rem;
    color: #c2c2c2;
  }
  .inputs input:focus {
    outline: none;
    box-shadow: none;
    color: #c2c2c2;
  }
  .button {
    text-align: center;
  }

  .button button {
    background-color: #00ff7f;
    color: #000;
    padding: .5rem 2rem;
    border: none;
    width: 30%;
    text-transform: uppercase;
    font-weight: 700;
  }

  .button button:focus {
    outline: none;
    box-shadow: none;
  }
  .top-link .btn.btn-outline-warning:focus {
    outline: none;
    background-color: transparent;
    box-shadow: none !important;
  }
  .top-link .btn-outline-warning:hover {
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

  .top-link .btn.btn-outline-warning:active {
    background-color: transparent;
    border-color: #00ff7f;
    color: #00ff7f;
    box-shadow: none;
  }
  .top-link {
    position: absolute;
    top: -3rem;
    right: 2rem;
  }
</style>
