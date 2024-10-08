<template>
  <button
    @click="toggleDarkMode"
    class="vt-switch vt-switch-appearance"
    type="button"
    role="switch"
    aria-label="Toggle dark mode"
    :aria-checked="darkMode ? 'true' : 'false'"
  >
    <span class="vt-switch-check">
      <span class="vt-switch-icon">
        <!-- Sun Icon -->
        <template v-if="!darkMode">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            class="vt-switch-appearance-moon"
          >
            <!-- Moon SVG Path Here -->
            <path
              fill="currentColor"
              d="M12.1,22c-0.3,0-0.6,0-0.9,0c-5.5-0.5-9.5-5.4-9-10.9c0.4-4.8,4.2-8.6,9-9c0.4,0,0.8,0.2,1,0.5c0.2,0.3,0.2,0.8-0.1,1.1c-2,2.7-1.4,6.4,1.3,8.4c2.1,1.6,5,1.6,7.1,0c0.3-0.2,0.7-0.3,1.1-0.1c0.3,0.2,0.5,0.6,0.5,1c-0.2,2.7-1.5,5.1-3.6,6.8C16.6,21.2,14.4,22,12.1,22zM9.3,4.4c-2.9,1-5,3.6-5.2,6.8c-0.4,4.4,2.8,8.3,7.2,8.7c2.1,0.2,4.2-0.4,5.8-1.8c1.1-0.9,1.9-2.1,2.4-3.4c-2.5,0.9-5.3,0.5-7.5-1.1C9.2,11.4,8.1,7.7,9.3,4.4z"
            ></path>
          </svg>
        </template>
        <!-- Moon Icon -->
        <template v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            class="vt-switch-appearance-sun"
          >
            <g fill="currentColor">
              <!-- Sun SVG Path Here -->
              <path
                d="M12,18c-3.3,0-6-2.7-6-6s2.7-6,6-6s6,2.7,6,6S15.3,18,12,18zM12,8c-2.2,0-4,1.8-4,4c0,2.2,1.8,4,4,4c2.2,0,4-1.8,4-4C16,9.8,14.2,8,12,8z"
              ></path>
              <path
                d="M12,4c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,3.6,12.6,4,12,4z"
              ></path>
              <path
                d="M12,24c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1s1,0.4,1,1v2C13,23.6,12.6,24,12,24z"
              ></path>
              <path
                d="M5.6,6.6c-0.3,0-0.5-0.1-0.7-0.3L3.5,4.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C6.2,6.5,5.9,6.6,5.6,6.6z"
              ></path>
              <path
                d="M19.8,20.8c-0.3,0-0.5-0.1-0.7-0.3l-1.4-1.4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l1.4,1.4c0.4,0.4,0.4,1,0,1.4C20.3,20.7,20,20.8,19.8,20.8z"
              ></path>
              <path d="M3,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S3.6,13,3,13z"></path>
              <path
                d="M23,13h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              ></path>
              <path
                d="M4.2,20.8c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C4.7,20.7,4.5,20.8,4.2,20.8z"
              ></path>
              <path
                d="M18.4,6.6c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l1.4-1.4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-1.4,1.4C18.9,6.5,18.6,6.6,18.4,6.6z"
              ></path>
            </g>
          </svg>
        </template>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useDark, usePreferredDark } from '@vueuse/core'
import { ref, watch, defineEmits, onMounted } from 'vue'

const emit = defineEmits<{
  (e: 'toggle-dark-mode', value: boolean): void
}>()

const isDark = useDark()
const preferredDark = usePreferredDark()
const darkMode = ref(isDark.value)

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  emit('toggle-dark-mode', darkMode.value)
}

watch(darkMode, (value) => {
  document.body.classList.toggle('dark', value)
})

watch(preferredDark, (value) => {
  if (!darkMode.value) {
    darkMode.value = value
  }
})

onMounted(() => {
  document.body.classList.toggle('dark', darkMode.value)
})
</script>

<style scoped>
/* css button toggle */
/* Estilo para o botão de alternância */
.vt-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--dc-g-divider);
  background-color: var(--dc-g-bg-mute);
  transition:
    border-color 0.25s,
    background-color 0.25s;
}

/* Efeito ao passar o mouse */
.vt-switch:hover {
  border-color: var(--dc-g-gray);
}

/* Estilo para o controle deslizante dentro do botão */
.vt-switch-check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--dc-g-white);
  box-shadow: var(--vt-shadow-1);
  transition:
    background-color 0.25s,
    transform 0.25s;
}

/* Estilo para o botão em modo escuro */
.dark .vt-switch-check {
  background-color: var(--dc-g-black);
}

/* Contêiner para os ícones */
.vt-switch-icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

/* Estilo para os ícones SVG */
.vt-switch-icon svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: var(--dc-g-text-2);
}

/* Estilo para o ícone do sol e lua */
.dark .vt-switch-icon svg {
  fill: var(--dc-g-text-1);
  transition: opacity 0.25s;
}

/* Opacidade dos ícones dependendo do estado */
.vt-switch-appearance-sun {
  opacity: 0;
}

.dark .vt-switch-appearance-sun {
  opacity: 1;
}

/* .vt-switch-appearance-moon, */
.vt-switch-appearance-moon {
  opacity: 0;
}

.dark .vt-switch-appearance-moon {
  opacity: 1;
}

/* Transformação do controle deslizante para modo escuro */
.dark .vt-switch-appearance .vt-switch-check {
  transform: translate(18px);
}

/* Estilo para o contêiner de switch */
.vt-switch[data-v-43d49699] {
  margin-right: 5px;
  transform: scale(0.8);
}

/* Estilo para o rótulo do switch */
.switch-container label[data-v-43d49699] {
  transition: color 0.5s;
  cursor: pointer;
}

/* Largura do rótulo do primeiro switch */
.switch-container label[data-v-43d49699]:first-child {
  width: 50px;
}

/* Estilo para links de switch */
.switch-link[data-v-43d49699] {
  margin-left: 8px;
  font-size: 11px;
  min-width: 14px;
  height: 14px;
  line-height: 13px;
  text-align: center;
  color: var(--dc-g-green);
  border: 1px solid var(--dc-g-green);
  border-radius: 50%;
}

/* Estilos responsivos */
@media (max-width: 1439px) {
  #preference-switches[data-v-43d49699] {
    font-size: 11px;
    padding: 8px 4px;
  }

  .vt-switch[data-v-43d49699] {
    margin: auto;
  }

  .switch-link[data-v-43d49699] {
    margin-left: auto;
  }

  .switch-container label[data-v-43d49699]:first-child {
    width: 46px;
  }
}

/* Estilo para inputs de checkbox e rádio */
[type='checkbox'],
[type='radio'] {
  box-sizing: border-box;
  padding: 0;
}

svg path {
  fill: var(--color-text);
}
</style>
