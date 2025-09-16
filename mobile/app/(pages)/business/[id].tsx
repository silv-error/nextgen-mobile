import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

const BusinessPage = () => {
  const { id, reviewId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View>
      <Text>BusinessPage</Text>
    </View>
  );
};

export default BusinessPage;
