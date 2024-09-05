<template>
  <h1>{{ title }}</h1>
  <article>
    <section>
      <h2>Raridades dos Dragões</h2>
      <p>Os dragões no jogo têm {{ rarities.length }} raridades distintas:</p>
      <ol class="rarities">
        <li v-for="rarity in rarities" :key="rarity.name">
          <img :src="rarity.imageUrl" :alt="rarity.name" width="50" height="50" />
          {{ rarity.name }}
        </li>
      </ol>
      <p>Essas raridades impactam significativamente:</p>
      <ul>
        <li v-for="impact in rarityImpacts" :key="impact">{{ impact }}</li>
      </ul>
    </section>

    <section>
      <h2>Funcionalidades dos Dragões</h2>
      <p>Os dragões no jogo têm múltiplas funções:</p>
      <ul>
        <li v-for="functionality in functionalities" :key="functionality">{{ functionality }}</li>
      </ul>
    </section>

    <section>
      <h2>Elementos dos Dragões</h2>
      <p>Cada dragão possui características elementares únicas:</p>
      <ul>
        <li v-for="characteristic in elementCharacteristics" :key="characteristic">
          {{ characteristic }}
        </li>
      </ul>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useDragonStore } from '@/stores/dragon'
import { useHead } from '@vueuse/head'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const dragonStore = useDragonStore()
const { rarities, rarityImpacts, functionalities, elementCharacteristics } =
  storeToRefs(dragonStore)
const title = ref('Raridades e Características dos Dragões em Jogo')

// SEO optimization
useHead({
  title: () => title.value,
  meta: [
    {
      name: 'description',
      content: () =>
        `Conheça as ${rarities.value.length} raridades dos dragões, seus elementos e características no jogo. Descubra como os dragões produzem ouro, batalham e se tornam mais fortes.`
    },
    {
      name: 'keywords',
      content:
        'jogo de dragão, raridades de dragão, elementos de dragão, características de dragão, mecânicas do jogo'
    }
  ]
})
</script>

<style scoped>
article {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
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

img {
  border: #333 solid 1px;
  border-radius: 10px;
}

ol li {
  border: #333 solid 1px;
  border-radius: 10px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 100px;
}

li {
  padding: 0.4rem;
}

section {
  display: flex;
  flex-flow: column;
  gap: var(--section-gap);
}

.rarities {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  place-items: center;
  align-items: center;
}

.rarities li {
  padding: 10px;
  width: 6.25rem;
}
</style>
