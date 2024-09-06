<template>
  <h1>{{ title }}</h1>
  <article>
    <section>
      <p>
        Explore o mundo mágico de Dragon City, onde você pode colecionar e batalhar com dragões
        incríveis!
      </p>

      <h2>Introdução ao Jogo</h2>

      <p>
        Dragon City é um emocionante jogo de simulação onde você cria, treina e combate dragões em
        uma ilha encantada. Com uma vasta coleção de dragões únicos, você pode colecionar, evoluir e
        batalhar com essas criaturas fantásticas em batalhas emocionantes. Mergulhe em um mundo
        mágico onde suas habilidades de estratégia e gerenciamento serão testadas enquanto você
        constrói a cidade dos dragões dos seus sonhos.
      </p>
    </section>

    <section>
      <h2>Destaques e Recursos</h2>

      <h3>Principais Funcionalidades</h3>
      <ul>
        <li v-for="(feature, index) in features" :key="index">
          <strong>{{ feature.title }}:</strong> {{ feature.description }}
        </li>
      </ul>

      <h3>Dragões Populares</h3>
      <p>Conheça alguns dos dragões mais faceis de se procriar do Dragon City:</p>

      <!-- Exibição de mensagens de carregamento ou erro -->
      <p v-if="loading">Carregando dragões...</p>
      <p v-if="error">{{ error }}</p>

      <div v-if="!loading && !error" class="featured-dragons">
        <figure v-for="dragon in filteredDataResults" :key="dragon.id">
          <figcaption v-if="isPopularDragon(dragon.name)">
            <img :src="dragon.imageUrls[0]" :alt="`Imagem do ${dragon.name} adulto`" width="100" />
            <h4>{{ dragon.name }}</h4>
          </figcaption>
        </figure>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useTimerEggsStore } from '@/stores/timerEggs'
import { storeToRefs } from 'pinia'
import { useHead } from '@vueuse/head'

const timerEggsStore = useTimerEggsStore()
const title = ref('Bem-vindo ao Dragon City Ajuda!')
const { dataResults, loading, error } = storeToRefs(timerEggsStore)

onMounted(() => {
  if (dataResults.value.length === 0) {
    timerEggsStore.fetchDragons()
  }
})

const filteredDataResults = computed(() => {
  return dataResults.value.map(({ id, name, hatchingTimes, imageUrls }) => ({
    id,
    name,
    hatchingTimes,
    imageUrls
  }))
})

const popularDragons = ['Dragão da Fertilidade', 'Dragão Terraformador', 'Dragão Explosão Cósmica']

const isPopularDragon = (dragonName: string) => {
  return popularDragons.includes(dragonName)
}

// SEO optimization
useHead({
  title: () => title.value,
  meta: [
    {
      name: 'description',
      content:
        'Explore o mundo mágico de Dragon City, onde você pode colecionar e batalhar com dragões incríveis!'
    },
    { name: 'keywords', content: 'Dragon City, dragões, jogo de simulação' }
  ]
})

const features = [
  {
    title: 'Dragões Diversos',
    description:
      'Colecione e evolua uma variedade de dragões, cada um com habilidades e características únicas.'
  },
  {
    title: 'Modos de Jogo',
    description:
      'Participe de batalhas emocionantes, conquiste novas ilhas e descubra eventos especiais.'
  },
  {
    title: 'Construção e Personalização',
    description:
      'Construa e personalize sua cidade dos dragões com edifícios e decorações exclusivas.'
  },
  {
    title: 'Eventos e Desafios',
    description: 'Participe de eventos sazonais e desafios para ganhar recompensas especiais.'
  }
]
</script>

<style scoped>
.featured-dragons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

figcaption {
  display: flex;
  flex-direction: column;
  place-items: center;
  align-items: center;
  background: var(--color-background-soft);
  color: var(--color-text);
  border: #333 solid 1px;
  border-radius: 10px;
  padding: 20px;
  margin: 2px;
  text-align: center;
  min-width: 215px;
}
</style>
