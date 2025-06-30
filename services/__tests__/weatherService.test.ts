import { fetchWeatherByCity } from '../weatherService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LAST_CITY_STORAGE_KEY } from '@/constants/Storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
}));

// Mock global fetch
global.fetch = jest.fn();

describe('weatherService', () => {
  beforeEach(jest.clearAllMocks);

  describe('fetchWeatherByCity', () => {
    it('should fetch weather data successfully', async () => {
      // Mock successful API response
      const mockResponse = {
        ok: true,
        json: jest.fn().mockResolvedValue({
          name: 'London',
          main: { temp: 15.5 },
          weather: [{ main: 'Cloudy', icon: '04d' }],
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await fetchWeatherByCity('London');

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('weather?q=London')
      );
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(LAST_CITY_STORAGE_KEY, 'London');
      expect(result).toEqual({
        city: 'London',
        temperature: 15.5,
        condition: 'Cloudy',
        icon: '04d',
      });
    });

    it('should throw an error when API request fails', async () => {
      // Mock failed API response
      const mockResponse = {
        ok: false,
        json: jest.fn().mockResolvedValue({
          message: 'City not found',
        }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await expect(fetchWeatherByCity('NonExistentCity')).rejects.toThrow('City not found');
      expect(global.fetch).toHaveBeenCalled();
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });
  });
});
