# Weather App

## Getting Started

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add your OpenWeatherMap API key:

   Open `services/weatherService.ts` and replace `YOUR_API_KEY` with your actual API key from [OpenWeatherMap](https://openweathermap.org/api).

3. Run the app:

   ```bash
   npm run ios
   npm run android
   ```

Note: this opens the app in Expo Go.

## Running Tests

To run the unit tests:

```bash
npm test
```

## Architecture

I used the Expo starter to create the project and left most of it in place, with a few deletions of components I didn't need.
I kept the folder structure largely the same as it already groups pretty logically to me i.e. components, context, hooks, etc in their own folder with the app itself adhering to the expo-router file-based routing structure.  

### State Management

For state management, I chose to house the weather API calls the theme inside React context.

I'm using AsyncStorage directly for storing the city, upon validating the city is valid; I felt this was enough for a simple app. 

However, for a more scalable solution I would ensure that the mutation into the persistence layer was decoupled from the query.


### UI Components

I created a few simple components to render in the UI for the desired functionality:

- **SearchBar**: Allows users to input a city name and trigger a search
- **WeatherCard**: Displays the weather information in a card format
- **ThemeToggle**: Allows users to toggle between light and dark modes

### Testing

I added unit tests for the components using jest and react native testing library. I chose queries such as `getByRole` so that I could test the accessibility for free.

I also added tests for the weather service to make sure that the data was retrieved, stored and any errors caught.

Lastly, I added home screen tests to test the full integration, with the weather context mocked. This way, the underlying implementation can change for fetching/storing without affecting this test.
