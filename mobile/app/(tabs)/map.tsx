import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { StyleSheet, View, Platform, PermissionsAndroid } from "react-native";
import * as Location from "expo-location";
import { useLocalSearchParams } from "expo-router";

// ⚠️ Replace this with your Google Maps API Key (enable Directions API)
const GOOGLE_MAPS_APIKEY = "YOUR_GOOGLE_MAPS_API_KEY";

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

  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

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

  // ✅ Get user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation={true} followsUserLocation={true}>
        {/* Business Marker */}
        {!isNaN(lat) && !isNaN(lng) && (
          <Marker
            coordinate={{ latitude: lat, longitude: lng }}
            title={title as string}
            description={description as string}
          />
        )}

        {/* Directions Line */}
        {userLocation && !isNaN(lat) && !isNaN(lng) && (
          <MapViewDirections
            origin={userLocation}
            destination={{ latitude: lat, longitude: lng }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={4}
            strokeColor="blue"
          />
        )}
      </MapView>
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
