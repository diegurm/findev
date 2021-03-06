import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Callout } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { connect, disconnect, subcribleToNewDevs } from '../../services/socket';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setcurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    (async () => {
      Geolocation.getCurrentPosition(
        position => {
          const {
            coords: { latitude, longitude },
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

  useEffect(() => {
    subcribleToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function handleRegionChanged(region) {
    setcurrentRegion(region);
  }

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;
    connect({ latitude, longitude, techs });
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });

    setDevs(response.data);
    setupWebsocket();
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <View accessible={true} style={styles.container}>
      <MapView
        style={styles.map}
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}>
            <Image
              style={styles.avatar}
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}>
              <View style={styles.callout}>
                <Text style={styles.devName}>{dev.name}</Text>
                <Text style={styles.devBio}>{dev.bio}</Text>
                <Text style={styles.devTechs}>{dev.techs.join(',')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchForm}>
        <TextInput
          style={styles.searchInput}
          placeholder="Busca devs por techs.."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <TouchableOpacity style={styles.loadButton} onPress={() => loadDevs()}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
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
  searchForm: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row',
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    color: '#333',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    elevation: 2,
  },

  loadButton: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
});
