<template>
  <div>
    <nav class="navbar">
      <router-link :to="{ name: 'Home'}">
        <a class="navbar-brand">MyBookShelf</a>
      </router-link>
    </nav>
  </div>
</template>

<script>

</script>

<style scoped>
  nav.navbar {
    background-color: #000;
    padding: 3rem 4rem 0 3rem;
  }

  nav.navbar .navbar-brand {
    color: #00ff7f;
    font-size: 2.5rem;
  }
</style>
