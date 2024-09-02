<template>
  <article>
    <h1>{{ timerEggsStore.title }}</h1>
    <section>
      <article>
        <h2>Tempo incubadora</h2>
        <h3>Existem {{ timerEggsStore.dataResults.length }} dragões no jogo</h3>
        <p>Escolha um dragão para ver o tempo de incubação:</p>
        <input
          type="text"
          placeholder="Pesquisar por dragão"
          v-model="searchDragon"
          alt="Pesquisar por dragão"
        />
        
        <div v-if="timerEggsStore.loading">Carregando...</div>
        <div v-else-if="timerEggsStore.error">{{ timerEggsStore.error }}</div>
        <ol class="dragon-incubator" v-for="dragon in paginatedDataResults" :key="dragon.id">
          <div class="imgs-dragon">
            <img :src="dragon.imageUrls[0]" :alt="`Imagem ${dragon.name} adulto`" width="100" />
            <img :src="dragon.imageUrls[2]" :alt="`Imagem ${dragon.name} ovo`" width="100" />
          </div>
          <li>{{ dragon.name }}</li>
          <li>Tempo de incubação: {{ dragon.hatchingTimes }}</li>
        </ol>

        <!-- Navegação de páginas -->
        <nav class="pagination">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
          <span>Página {{ currentPage }} de {{ totalPages }}</span>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Próxima</button>
        </nav>
      </article>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTimerEggsStore } from '@/stores/timerEggs'

// Utilizando a store do Pinia
const timerEggsStore = useTimerEggsStore()

const searchDragon = ref<string>('')

// Computed property para filtrar e paginar os dragões com base na pesquisa e página atual
const currentPage = ref(1)
const itemsPerPage = 20

const paginatedDataResults = computed(() => {
  const query = searchDragon.value.toLowerCase()
  const filteredResults = timerEggsStore.dataResults.filter(dragon =>
    dragon.name.toLowerCase().includes(query)
  )
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredResults.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(timerEggsStore.dataResults.filter(dragon =>
    dragon.name.toLowerCase().includes(searchDragon.value.toLowerCase())
  ).length / itemsPerPage)
})

const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Buscar os dragões ao montar o componente
onMounted(() => {
  timerEggsStore.fetchDragons()
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

.imgs-dragon img {
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
  color: var(--color-text);
  border: #333 solid 1px;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
}

/* Estilização da paginação */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: var(--color-background-soft);
  border: 1px solid #333;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  color: var(--color-text);
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.pagination span {
  font-weight: bold;
}
</style>
