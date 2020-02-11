import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Image, Text} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker, Callout} from 'react-native-maps';

export default function Main() {
  const [currentRegion, setcurrentRegion] = useState(null);

  useEffect(() => {
    (async () => {
      Geolocation.getCurrentPosition(
        position => {
          const {
            coords: {latitude, longitude},
          } = position;

          setcurrentRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => Alert.alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 3000,
          // maximumAge: 2000,
        },
      );
    })();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <View accessible={true} style={styles.container}>
      <MapView style={styles.map} initialRegion={currentRegion}>
        <Marker coordinate={{latitude: -17.3702412, longitude: -40.2215351}}>
          <Image
            style={styles.avatar}
            source={{
              uri: 'https://avatars1.githubusercontent.com/u/1062248?s=460&v=4',
            }}
          />
          <Callout onPress={()=> {
            //navegação
          }}>
            <View style={styles.callout}>
              <Text style={styles.devName}>Diego Rodrigues</Text>
              <Text style={styles.devBio}>Frontend developer</Text>
              <Text style={styles.devTechs}>React,Angular</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  fadeIn: {
    width: 250,
    height: 50,
    backgroundColor: '#bdc3c7',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  callout: {
    width: 260,
  },

  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },
});
