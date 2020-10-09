import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, ImageBackground } from 'react-native';
import styles from './styles/styles';
import { CITIES, getWeatherBackgroundImage } from './utils';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import CitySelectionButtons from './CitySelectionButtons';
import WeatherCard from './WeatherCard';

// const Loading = () => (
//   <View style={styles.loading}>
//     <ActivityIndicator />
//   </View>
// );

export default function Lab() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState({
    name: '',
    main: { temp: '' },
    wind: { speed: '' },
    weather: [{ main: '', description: '' }],
  });

  const getWeather = async (latitude, longitude, imgUrl = '') => {
    setLoading(true);
    const API_KEY = '3de6162d3745365b168ade2bbe4e1d66';
    const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    try {
      const response = await fetch(api);
      const jsonData = await response.json();
      setLocation({ ...jsonData, imgUrl });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      return;
    }
    const location = await Location.getCurrentPositionAsync();
    getWeather(location.coords.latitude, location.coords.longitude);
  };

  const onChooseCity = (name) => {
    let randImg = '';
    if (name !== '') {
      const city = CITIES.find((city) => city.name === name);
      randImg = city.imgUrl[Math.floor(Math.random() * city.imgUrl.length)];
      getWeather(city.latitude, city.longitude, randImg);
    } else {
      getLocationAsync();
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const bgImage = {
    uri: location.imgUrl || getWeatherBackgroundImage(location.weather[0].main),
  };

  return (
    <ImageBackground source={bgImage} style={styles.bg}>
      <WeatherCard location={location} error={error} loading={loading} />
      <CitySelectionButtons onChooseCity={onChooseCity} />
    </ImageBackground>
  );
}
