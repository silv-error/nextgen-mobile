import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const BusinessPage = () => {
  const { id, reviewId } = useLocalSearchParams();
  const router = useRouter();

  return (
    <SafeAreaView>
      <Text>BusinessPage</Text>
    </SafeAreaView>
  );
};

export default BusinessPage;
