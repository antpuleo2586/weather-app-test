import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface SearchBarProps {
  onSearch: (city: string) => void;
  loading: boolean;
  lastSearchedCity?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading, lastSearchedCity }) => {
  const [city, setCity] = useState<string>(lastSearchedCity || '');
  const { colours, theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && colours.text === '#ECEDEE');

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colours.background,
            borderColor: isDark ? '#555' : '#ddd',
            color: colours.text
          }
        ]}
        placeholder="Enter city name"
        placeholderTextColor={isDark ? '#aaa' : '#777'}
        value={city}
        onChangeText={setCity}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: isDark ? '#0A84FF' : '#007AFF' }]}
        onPress={handleSearch}
        disabled={loading || !city.trim()}
        accessibilityLabel="Search"
        accessibilityRole="button"
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Search</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 15,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    marginLeft: 10,
    height: 50,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchBar;
