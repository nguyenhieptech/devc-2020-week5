import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { CITIES } from './utils';
import styles from './styles/styles';

const CitySelectionButtons = (props) => (
  <View style={styles.cityContainer}>
    <TouchableOpacity
      key='currentLocation'
      style={styles.currentLocation}
      onPress={() => props.onChooseCity('')}
    >
      <Text style={styles.cityName}>Current Location</Text>
    </TouchableOpacity>
    {CITIES.map((city) => {
      return (
        <TouchableOpacity
          key={city.name}
          style={styles.cityButton}
          onPress={() => props.onChooseCity(city.name)}
        >
          <Text style={styles.cityName}>{city.name}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default CitySelectionButtons;
