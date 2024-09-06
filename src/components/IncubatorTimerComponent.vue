<template>
  <h1>{{ title }}</h1>
  <article>
    <section>
      <h2>Tempo de incubadora</h2>
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
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          Próxima
        </button>
      </nav>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTimerEggsStore } from '@/stores/timerEggs'
import { useHead } from '@vueuse/head'

// Utilizando a store do Pinia
const timerEggsStore = useTimerEggsStore()

const title = ref('Tempo de incubação dos dragões no Dragon City')

const searchDragon = ref<string>('')

// Computed property para filtrar e paginar os dragões com base na pesquisa e página atual
const currentPage = ref(1)
const itemsPerPage = 20

const paginatedDataResults = computed(() => {
  const query = searchDragon.value.toLowerCase()
  const filteredResults = timerEggsStore.dataResults.filter((dragon) =>
    dragon.name.toLowerCase().includes(query)
  )
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredResults.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(
    timerEggsStore.dataResults.filter((dragon) =>
      dragon.name.toLowerCase().includes(searchDragon.value.toLowerCase())
    ).length / itemsPerPage
  )
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

useHead({
  title: () => title.value,
  meta: [
    {
      name: 'description',
      content: 'Tempo de incubação dos dragões no Dragon City'
    },
    {
      name: 'keywords',
      content:
        'Dragon City, incubação de dragões, guia de dragões, tempo de incubação, tempo ovos Dragon City'
    }
  ]
})
</script>

<style scoped>
input {
  max-width: 300px;
}

.imgs-dragon img {
  border: #333 solid 1px;
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0.3125rem;
  width: 170px;
}

.dragon-incubator {
  display: flex;
  flex-flow: column wrap;
  gap: 20px;
  justify-content: center;
  place-items: center;
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
