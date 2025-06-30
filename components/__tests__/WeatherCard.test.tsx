import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../WeatherCard';
import { WeatherData } from '@/context/WeatherContext';


// Mock the getWeatherIconUrl function
jest.mock('@/services/weatherService', () => ({
  getWeatherIconUrl: jest.fn().mockReturnValue('https://example.com/icon.png'),
}));

const mockWeatherData: WeatherData = {
  city: 'London',
  temperature: 15.5,
  condition: 'Cloudy',
  icon: '04d',
};

describe('WeatherCard', () => {
  beforeEach(jest.clearAllMocks);

  it('renders correctly', () => {
    const { getByText } = render(<WeatherCard weatherData={mockWeatherData} />);

    expect(getByText('London')).toBeTruthy();
    expect(getByText('16°C')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
  });
});
