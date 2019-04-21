<template>
  <div>
    <nav class="navbar navbar-light bg-light">
      <router-link :to="{ name: 'Home'}">
      <a class="navbar-brand">MyBookShelf</a>
      </router-link>
      <form class="form-inline">
        <button class="btn btn-outline-info my-2 my-sm-0" type="button">Log In</button>
        <button class="btn btn-outline-warning my-2 my-sm-0" type="button">Register</button>
      </form>
    </nav>
  </div>
</template>

<script>

</script>

<style>
  button {
    margin-right: 1rem;
  }
  nav.navbar-light .navbar-brand {
    color: #17a2b8;
  }
</style>
