<template>
  <div class="sidebar">
    <ul>
      <li><a href="#">Panel Główny</a></li>
      <li><a href="#">Rezerwacje</a></li>
      <li><a href="#">Klienci</a></li>
      <li><a href="#">Pokoje</a></li>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
}

.sidebar a:hover {
  text-decoration: underline;
}
</style>
