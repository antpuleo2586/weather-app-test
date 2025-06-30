import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ThemeToggle from '../ThemeToggle';
import * as ThemeContextModule from '@/context/ThemeContext';
import {Colors} from '@/constants/Colors';

const mockToggleTheme = jest.fn();
const defaultThemeContext = {
  theme: 'light',
  colours: Colors['light'],
  toggleTheme: mockToggleTheme,
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ThemeContextModule, 'useTheme').mockReturnValue(defaultThemeContext);
  });

  it('renders correctly in light mode by default', () => {
    const { getByRole, getByText } = render(<ThemeToggle />);

    expect(getByRole('switch', { name: 'Dark Mode' })).toBeTruthy();
    expect(getByText('Current theme: light')).toBeTruthy();
  });

  it('calls toggleTheme when the toggle button is pressed', () => {
    const { getByText } = render(<ThemeToggle />);

    const toggleButton = getByText('Dark Mode').parent;
    fireEvent.press(toggleButton);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
