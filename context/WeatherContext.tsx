import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useQuery,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { fetchWeatherByCity } from '@/services/weatherService';
import {LAST_CITY_STORAGE_KEY} from '@/constants/Storage';

// Define types for our weather data
export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  icon: string;
}

// Define the context state
interface WeatherContextState {
  data?: WeatherData | null;
  isLoading: boolean;
  error: Error | null;
  lastSearchedCity: string;
  searchCity: (city: string) => Promise<void>;
}

const WeatherContext = createContext<WeatherContextState>({
  data: null,
  lastSearchedCity: '',
  isLoading: false,
  error: null,
  searchCity: async () => {},
});

const queryClient = new QueryClient();

export const WeatherProviderWithQueryClient: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>{children}</WeatherProvider>
    </QueryClientProvider>
  );
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lastSearchedCity, setLastSearchedCity] = useState<string>('');

  // Load the last searched city from storage on initial render
  useEffect(() => {
    const loadLastCity = async () => {
      // try {
        const storedCity = await AsyncStorage.getItem(LAST_CITY_STORAGE_KEY);
        if (storedCity) {
          setLastSearchedCity(storedCity);
        }
      // } catch (e) {
      //   console.error('Failed to load last searched city', e);
      // }
    };

    loadLastCity();
  }, []);

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['weather', lastSearchedCity],
    queryFn: () => lastSearchedCity ? fetchWeatherByCity(lastSearchedCity) : null,
    enabled: !!lastSearchedCity,
  });

  const searchCity = async (city: string) => {
    if (!city.trim()) {
      return;
    }

    setLastSearchedCity(city);
  };

  return (
    <WeatherContext.Provider
      value={{
        data,
        isLoading,
        error,
        lastSearchedCity,
        searchCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
