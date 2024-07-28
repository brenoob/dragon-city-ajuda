<template>
  <header>
    <RouterLink to="/">
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/dragon-ajuda-logo.webp"
        width="35"
        height="35"
      />
    </RouterLink>
    <nav>
      <ul>
        <li>
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink to="/tempo-ovos">Tempo ovos</RouterLink>
        </li>
        <li>
          <RouterLink to="/guia-iniciante-dragon-city">Guia iniciante</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  display: flex;
  place-items: center;
  justify-content: space-around;
  border-bottom: var(--color-border) 1px solid;
  background-color: var(--color-background-soft);
}
nav ul {
  display: flex;
  list-style: none;
  gap: 15px;
}

ul {
  height: 100%;
}
nav li {
  display: flex;
  place-items: center;
  justify-content: center;
}
nav li a {
  text-decoration: none;
  color: var(--color-text);
}
nav li a:hover {
  color: var(--color-text-green);
}
nav a.router-link-exact-active {
  width: 100%;
  height: 100%;
  display: flex;
  place-items: center;
  border-bottom: var(--color-text-green) solid;
}
</style>
