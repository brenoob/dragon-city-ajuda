<template>
  <article>
    <h1>{{ title }}</h1>
    <section>
      <article>
        <h2>Tempo incubadora</h2>
        <h3>existem {{ dataResults.length }} dragões no jogo</h3>
        <p>Escolha um dragão para ver o tempo de incubação:</p>
        <input type="text" placeholder="Pesquisar por dragão" v-model="searchDragon" alt="Pesquisar por dragão">
        <ol class="dragon-incubator" v-for="dragon in filteredDataResults" :key="dragon.id">
          <div class="imgs-dragon">
            <img :src="dragon.imageUrls[0]" :alt="`imagem${dragon.name}adulto `" width="100">
            <img :src="dragon.imageUrls[2]" :alt="`imagem ${dragon.name} ovo `" width="100">
          </div>
          <li>{{ dragon.name.name}}</li>
          <li>Tempo de incubação: {{ dragon.hatchingTimes }}</li>
        </ol>
      </article>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useTimerEggsStore } from '@/stores/timerEggs';
import { useHead } from '@vueuse/head';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

// Acessa o store e desestrutura os dados
const { dataResults, title } = storeToRefs(useTimerEggsStore());

// Variável para o campo de pesquisa
const searchDragon = ref<string>('');

// Computed property para filtrar os dragões com base na pesquisa
const filteredDataResults = computed(() => {
  const query = searchDragon.value.toLowerCase();
  return dataResults.value.map(dragon => {
    const { id, name, hatchingTimes, imageUrls } = dragon;
    return {
      id,
      name,
      hatchingTimes,
      imageUrls
    };
  }).filter(dragon =>
    dragon.name.name.toLowerCase().includes(query)
  );
});

// SEO optimization
useHead({
  title: () => title.value
})
</script>

<style scoped>
article {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: var(--color-text-green-soft);
}

h2 {
  color: var(--color-text-green);
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 60px;
}

ul,
ol {
  list-style-type: none;
  margin-left: 20px;
}

.imgs-dragon img{
  border: #333 solid 1px;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.3125rem;
  width: 170px;
  
}

ol li {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-content: center;
  place-items: center;
  align-items: center;
  gap: 10px;
}

li {
  padding: 0.4rem;
}

section {
  display: flex;
  flex-flow: column;
  gap: var(--section-gap);
}

.dragon-incubator {
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  place-items: center;
  align-items: center;
  background: var(--color-background-soft);
  border: #333 solid 1px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
}

</style>
