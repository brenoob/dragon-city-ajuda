import { defineStore } from "pinia";
import { supabase } from "@/utils/supabase";

export interface TimerEggsState {
  dataResults: {
    id: number;
    name: string;
    hatchingTimes: string;
    imageUrls: string[];
  }[];
  title: string;
  loading: boolean;
  error: string | null;
}

export const useTimerEggsStore = defineStore("timerEggs", {
  state: (): TimerEggsState => ({
    dataResults: [],
    title: "Tempo incubadora",
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDragons() {
        // Tenta recuperar os dados do localStorage
        const cachedData = localStorage.getItem('dragonsData');
        if (cachedData) {
            this.dataResults = JSON.parse(cachedData);
            return;
        }

        this.loading = true;
        this.error = null;
        const pageSize = 200;
        let start = 0;
        let hasMoreData = true;

        try {
            while (hasMoreData) {
                const { data, error } = await supabase
                    .from("dragons")
                    .select("id, name, hatchingTimes, imageUrls0, imageUrls2")
                    .range(start, start + pageSize - 1);

                if (error) {
                    throw error;
                }

                if (data.length < pageSize) {
                    hasMoreData = false;
                }

                const formattedData = data.map((result: any) => ({
                    id: result.id,
                    name: result.name,
                    hatchingTimes: result.hatchingTimes,
                    imageUrls: [result.imageUrls0, result.imageUrls1, result.imageUrls2],
                }));

                this.dataResults.push(...formattedData);
                start += pageSize;
            }

            // Armazena os dados no localStorage após o carregamento completo
            localStorage.setItem('dragonsData', JSON.stringify(this.dataResults));

        } catch (error: any) {
            console.error("Erro ao buscar dragões:", error);
            this.error = error.message || "Erro ao buscar dragões";
        } finally {
            this.loading = false;
        }
    },

    // Função para limpar o cache, caso necessário
    clearCache() {
      localStorage.removeItem('dragonsData');
    }
  },
});
