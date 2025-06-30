import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useWeather } from '@/context/WeatherContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ThemeToggle from '../components/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export default function HomeScreen() {
  const { data, lastSearchedCity, isLoading, error, searchCity } = useWeather();
  const { colours, theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && colours.text === '#ECEDEE');

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colours.background}]}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: colours.text }]}>
            Weather App
          </Text>

          <ThemeToggle />

          <SearchBar
            onSearch={searchCity}
            loading={isLoading}
            lastSearchedCity={lastSearchedCity}
          />

          {error ? (
            <View style={[styles.errorContainer]}>
              <Text style={styles.errorText}>{error.message}</Text>
            </View>
          ) : null}

          {data ? (
            <WeatherCard weatherData={data} />
          ) : !isLoading && !error ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyStateText, { color: colours.text }]}>
                Search for a city to see the weather
              </Text>
            </View>
          ) : null}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  errorText: {
    color: '#c62828',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  },
});
