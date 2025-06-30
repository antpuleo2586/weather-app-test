import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { toggleTheme, theme, colours } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.toggle, { backgroundColor: colours.secondaryBackground }]}
        onPress={toggleTheme}
        accessibilityLabel="Toggle dark mode"
        accessibilityRole="switch"
        accessibilityState={{ checked: theme === 'dark' }}
      >
        <Ionicons
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={24}
          color={colours.text}
        />
        <Text style={[styles.text, { color: colours.text }]}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.modeText, { color: colours.text }]}>
        Current theme: {theme}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  text: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  modeText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default ThemeToggle;
