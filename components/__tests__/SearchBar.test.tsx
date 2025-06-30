import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SearchBar from '../SearchBar';

const mockOnSearch = jest.fn();
const defaultProps = {
  onSearch: mockOnSearch,
  loading: false,
  lastSearchedCity: 'London',
};

describe('SearchBar', () => {
  beforeEach(jest.clearAllMocks);

  it('renders correctly with last searched city', () => {
    const { getByPlaceholderText, getByText } = render(<SearchBar {...defaultProps} />);

    const input = getByPlaceholderText('Enter city name');

    expect(input.props.value).toBe('London');
    expect(getByText('Search')).toBeTruthy();
  });

  it('updates input value when text is entered', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);

    const input = getByPlaceholderText('Enter city name');

    fireEvent.changeText(input, 'Paris');

    expect(input.props.value).toBe('Paris');
  });

  it('calls onSearch when search button is pressed', () => {
    const { getByRole, getByPlaceholderText } = render(<SearchBar {...defaultProps} />);

    const input = getByPlaceholderText('Enter city name');
    fireEvent.changeText(input, 'Paris');

    const searchButton = getByRole('button', { name: 'Search' });
    fireEvent.press(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });

  it('calls onSearch when submit button is pressed on keyboard', () => {
    const { getByPlaceholderText } = render(<SearchBar {...defaultProps} />);

    const input = getByPlaceholderText('Enter city name');
    fireEvent.changeText(input, 'Paris');

    fireEvent(input, 'submitEditing');

    expect(mockOnSearch).toHaveBeenCalledWith('Paris');
  });

  it('disables search button when loading', () => {
    const { getByRole } = render(<SearchBar {...defaultProps} loading={true} />);

    const searchButton = getByRole('button', { name: 'Search', disabled: true });

    expect(searchButton).toBeTruthy();
  });

  it('disables search button when input is empty', () => {
    const { getByPlaceholderText, getByRole } = render(<SearchBar {...defaultProps} />);

    // Get the input field and clear its value
    const input = getByPlaceholderText('Enter city name');
    fireEvent.changeText(input, '');

    const searchButton = getByRole('button', { name: 'Search', disabled: true });

    expect(searchButton).toBeTruthy();
  });
});
