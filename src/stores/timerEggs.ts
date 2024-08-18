import { defineStore } from "pinia"

import  results  from '../../tools/webscraping-js/json/dataResults.json';

export interface TimerEggsState {
    dataResults: {
        id: number;
        name: {
            code: string;
            name: string;
            url: string;
        };
        hatchingTimes: string;
        imageUrls: string[];
    }[],
    title: string
}

export const useTimerEggsStore = defineStore('timerEggs', {
    state: (): TimerEggsState => ({
        dataResults: results.map(result => ({
            id: result.id,
            name: result.name,
            hatchingTimes: result.hatchingTimes,
            imageUrls: result.imageUrls
        })),
        title: 'Tempo incubadora'
    })
})
