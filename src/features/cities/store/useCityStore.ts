import { create } from 'zustand';
import type { City } from '../type';
import { createJSONStorage, persist } from 'zustand/middleware';
import { storage } from '../../../shared/lib/storage';

type CityState = {
  selectedCity: City | null;
  savedCities: City[];
  selectCity: (city: City) => void;
  saveCity: (city: City) => void;
  removeCity: (city: City) => void;
};

export const useCityStore = create<CityState>()(
  persist(
    set => ({
      selectedCity: null,
      savedCities: [],

      selectCity: city => set({ selectedCity: city }),

      saveCity: city =>
        set(state =>
          state.savedCities.some(saved => saved.id === city.id)
            ? state
            : { savedCities: [...state.savedCities, city] },
        ),

      removeCity: city =>
        set(state => ({
          savedCities: state.savedCities.filter(saved => saved.id !== city.id),
        })),
    }),
    {
      name: 'cities',
      storage: createJSONStorage(() => storage),
      partialize: state => ({
        savedCities: state.savedCities,
        selectedCity: state.selectedCity,
      }),
      version: 1,
    },
  ),
);
