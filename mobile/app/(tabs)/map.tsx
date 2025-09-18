import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MapScreen() {
  const { latitude, longitude, title, description } = useLocalSearchParams();

  let lat = parseFloat(latitude as string);
  let lng = parseFloat(longitude as string);

  const [region, setRegion] = useState({
    latitude: lat || 0,
    longitude: lng || 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      setRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [lat, lng]);

  return (
    <View style={styles.container}>
      {!isNaN(lat) && !isNaN(lng) ? (
        <MapView style={styles.map} region={region}>
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title={title as string}
            description={description as string}
          />
        </MapView>
      ) : (
        <MapView style={styles.map}></MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
