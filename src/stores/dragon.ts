import { defineStore } from 'pinia'
import Common from '../assets/images/common.png'
import Rare from '../assets/images/rare.png'
import VeryRare from '../assets/images/very-rare.png'
import Epic from '../assets/images/epic.png'
import Legendary from '../assets/images/legendary.png'
import Mythic from '../assets/images/mythical.png'
import Heroic from '../assets/images/heroic.png'

interface DragonState {
  rarities: { name: string; imageUrl: string }[]
  rarityImpacts: string[]
  functionalities: string[]
  elementCharacteristics: string[]
}

export const useDragonStore = defineStore('dragon', {
  state: (): DragonState => ({
    rarities: [
      { name: 'Comum', imageUrl: Common },
      { name: 'Raro', imageUrl: Rare },
      { name: 'Muito Raro', imageUrl: VeryRare },
      { name: 'Epico', imageUrl: Epic },
      { name: 'Lendario', imageUrl: Legendary },
      { name: 'Mitico', imageUrl: Mythic },
      { name: 'Heroico', imageUrl: Heroic }
    ],
    rarityImpacts: [
      'A dificuldade de obter o dragão',
      'As estatísticas gerais do dragão',
      'A utilidade do dragão no jogo'
    ],
    functionalities: [
      'Eles geram ouro ao longo do tempo',
      'Podem ser fortalecidos com comida para aumentar a produção de ouro',
      'Participam de batalhas contra outros dragões'
    ],
    elementCharacteristics: [
      'Dragões podem ter até 4 elementos',
      'Esses elementos determinam os tipos de movimentos que um dragão pode aprender',
      'O elemento principal (primeiro) do dragão indica sua fraqueza em batalha'
    ]
  })
})
