import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function MapScreen() {
  const { latitude, longitude, title, description } = useLocalSearchParams();

  // Convert string params to numbers
  const lat = parseFloat(latitude as string);
  const lng = parseFloat(longitude as string);

  return (
    <View style={styles.container}>
      {latitude && longitude ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title={title as string}
            description={description as string}
          />
        </MapView>
      ) : (
        <MapView style={styles.map} />
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
