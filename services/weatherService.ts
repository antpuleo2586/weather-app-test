import { WeatherData } from '@/context/WeatherContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LAST_CITY_STORAGE_KEY} from '@/constants/Storage';

const API_KEY = 'YOUR_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch weather data');
    }

    const data = await response.json();

    // Only store the city if it's a valid city
    await AsyncStorage.setItem(LAST_CITY_STORAGE_KEY, city);

    return {
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    };
};

export const getWeatherIconUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
