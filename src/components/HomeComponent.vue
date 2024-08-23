<template>
  <article>
    <header>
      <h1>Bem-vindo ao Dragon City!</h1>
      <p>Explore o mundo mágico de Dragon City, onde você pode colecionar e batalhar com dragões incríveis!</p>
    </header>

    <section>
      <h2>Introdução ao Jogo</h2>
      <p>Dragon City é um emocionante jogo de simulação onde você cria, treina e combate dragões em uma ilha encantada. Com uma vasta coleção de dragões únicos, você pode colecionar, evoluir e batalhar com essas criaturas fantásticas em batalhas emocionantes. Mergulhe em um mundo mágico onde suas habilidades de estratégia e gerenciamento serão testadas enquanto você constrói a cidade dos dragões dos seus sonhos.</p>
    </section>

    <section>
      <h2>Destaques e Recursos</h2>

      <h3>Principais Funcionalidades</h3>
      <ul>
        <li><strong>Dragões Diversos:</strong> Colecione e evolua uma variedade de dragões, cada um com habilidades e características únicas.</li>
        <li><strong>Modos de Jogo:</strong> Participe de batalhas emocionantes, conquiste novas ilhas e descubra eventos especiais.</li>
        <li><strong>Construção e Personalização:</strong> Construa e personalize sua cidade dos dragões com edifícios e decorações exclusivas.</li>
        <li><strong>Eventos e Desafios:</strong> Participe de eventos sazonais e desafios para ganhar recompensas especiais.</li>
      </ul>
      
      <h3>Dragões Populares</h3>
      <p>Conheça alguns dos dragões mais impressionantes do Dragon City:</p>
      <div class="featured-dragons">
        <figure v-for="dragon in popularDragons" :key="dragon.id" class="dragon-card">
          <img :src="dragon.imageUrl" :alt="dragon.name" width="150" />
          <figcaption>
            <h4>{{ dragon.name }}</h4>
            <p>{{ dragon.description }}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Dados fictícios para a página inicial
const popularDragons = ref([
  { id: 1, name: 'Dragão Fogo', imageUrl: '@/assets/dragon-fire.jpg', description: 'Um dragão poderoso que controla o fogo, conhecido por sua força em batalhas.' },
  { id: 2, name: 'Dragão Gelo', imageUrl: '@/assets/dragon-ice.jpg', description: 'Um dragão gelado com habilidades de congelamento, perfeito para climas frios.' },
  { id: 3, name: 'Dragão Terra', imageUrl: '@/assets/dragon-earth.jpg', description: 'Um dragão robusto que domina o elemento terra, ideal para defesa.' },
  // Mais dragões...
]);
</script>

<style scoped>
article {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5rem;
  color: var(--color-text-green-soft);
}

h2 {
  color: var(--color-text-green);
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 40px;
}

h3 {
  color: var(--color-text-green-dark);
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.featured-dragons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.dragon-card {
  border: 1px solid #333;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

img {
  border: 1px solid #333;
  border-radius: 10px;
}

figcaption {
  margin-top: 10px;
}
</style>
