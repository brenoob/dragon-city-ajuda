import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import BeginnerGuideComponent from '../src/components/BeginnerGuideComponent.vue';
import { useHead } from '@vueuse/head';
import jest from 'jest'; // Importa o tipo jest corretamente

// Configura o mock
vi.mock('@vueuse/head', () => ({
  useHead: vi.fn() // Mock da função useHead
}));

describe('BeginnerGuideComponent', () => {
  beforeEach(() => {
    // Cria uma nova instância do Pinia e torna-a ativa
    setActivePinia(createPinia());
  });

  it('renderiza corretamente', () => {
    // Simula o retorno da função mockada se necessário
    //@ts-ignore
    (useHead as jest.Mock).mockReturnValueOnce({ title: 'Mock Title' });

    const wrapper = mount(BeginnerGuideComponent);
    
    // Adicione aqui as asserções necessárias
    expect(wrapper.exists()).toBe(true);

    // Verifica se useHead foi chamado
    expect(useHead).toHaveBeenCalled();
  });
});