import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getWeatherIconUrl } from '@/services/weatherService';
import { WeatherData } from '@/context/WeatherContext';
import { useTheme } from '@/context/ThemeContext';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData }) => {
  const { colours } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: colours.secondaryBackground, shadowColor: colours.shadow }]}>
      <Text style={[styles.cityName, { color: colours.text }]}>
        {weatherData.city}
      </Text>

      <View style={styles.weatherInfo}>
        <Image
          source={{ uri: getWeatherIconUrl(weatherData.icon) }}
          style={styles.weatherIcon}
        />

        <View style={styles.temperatureContainer}>
          <Text style={[styles.temperature, { color: colours.text }]}>
            {Math.round(weatherData.temperature)}°C
          </Text>
          <Text style={[styles.condition, { color: colours.text }]}>
            {weatherData.condition}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperatureContainer: {
    alignItems: 'center',
  },
  temperature: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 18,
    marginTop: 5,
  },
});

export default WeatherCard;
