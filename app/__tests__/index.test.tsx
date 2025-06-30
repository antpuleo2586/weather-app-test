import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../index';
import * as WeatherContextModule from '@/context/WeatherContext';

describe('<HomeScreen />', () => {
  // Mock weather context values
  const mockSearchCity = jest.fn();
  const defaultWeatherContext = {
    data: null,
    lastSearchedCity: 'London',
    isLoading: false,
    error: null,
    searchCity: mockSearchCity,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(WeatherContextModule, 'useWeather').mockReturnValue(defaultWeatherContext);
  });

  it('renders correctly with empty state when no data', () => {
    const { getByText } = render(<HomeScreen />);

    expect(getByText('Weather App')).toBeTruthy();
    expect(getByText('Search for a city to see the weather')).toBeTruthy();
  });

  it('renders WeatherCard when data is available', () => {
    const mockWeatherData = {
      city: 'London',
      temperature: 16,
      condition: 'Cloudy',
      icon: '04d',
    };

    // Mock the useWeather hook to return data
    jest.spyOn(WeatherContextModule, 'useWeather').mockReturnValue({
      ...defaultWeatherContext,
      data: mockWeatherData,
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('London')).toBeTruthy();
    expect(getByText('16°C')).toBeTruthy();
    expect(getByText('Cloudy')).toBeTruthy();
  });

  it('renders error message when there is an error', () => {
    const mockError = new Error('City not found');

    // Mock the useWeather hook to return an error
    jest.spyOn(WeatherContextModule, 'useWeather').mockReturnValue({
      ...defaultWeatherContext,
      error: mockError,
    });

    const { getByText } = render(<HomeScreen />);

    expect(getByText('City not found')).toBeTruthy();
  });
});
