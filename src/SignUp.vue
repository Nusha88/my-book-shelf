<template>
  <div class="sign-up">
    <div class="top-link">
      <router-link class="btn btn-outline-info my-2 my-sm-0" :to="{ name: 'Login'}">Log In
      </router-link>
    </div>
    <h3>Create a new account</h3>
    <div class="inputs">
      <input
        v-model="email"
        type="text"
        class="input"
        placeholder="Email"
        required>
      <br>
      <input
        v-model="password"
        type="password"
        class="input"
        placeholder="Password"
        required>
    </div>
    <div class="button">
      <button @click="signUp">Sign Up!</button>
    </div>
  </div>
</template>
<script>
  import firebase from 'firebase';

  export default {
    name: 'signup',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
          let id = user.user.uid;
          this.$router.replace('home');
          localStorage.setItem('logged', 'true');
          localStorage.setItem('id', id);
          this.writeUserData(id, this.email);
        }).catch((err) => {
          alert(err.message)
        });
      },
      writeUserData(userId, email) {
        firebase.database().ref('users/' + userId).set({
          email: email,
        });
      },
    }
  }
</script>
<style>
  .sign-up {
    position: relative;
    text-transform: uppercase;
  }
  .sign-up h3 {
    text-align: center;
    padding-top: 4rem;
    font-size: 2.5rem;
    margin-bottom: 5rem;
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
    font-weight: 700;
  }
  .button button:focus {
    outline: none;
    box-shadow: none;
  }
  .top-link {
    position: absolute;
    top: -3rem;
    right: 2rem;
  }
  .btn-outline-info {
    margin-right: 1rem;
    background-color: #00ff7f;
    color: #000;
    font-weight: 700;
  }

  .top-link .btn.btn-outline-info:focus {
    outline: none;
    box-shadow: none !important;
  }

  .btn.btn-outline-info {
    color: #000;
  }

  .top-link .btn.btn-outline-info:hover{
    color: #00ff7f;
    background-color: transparent;
    text-decoration: none;
    box-shadow: none;
    border-color: #00ff7f;
  }
</style>
