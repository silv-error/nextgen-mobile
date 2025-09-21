import { View, Text } from "react-native";
import React from "react";
import CustomerScreen from "@/components/customerScreen";
import BusinessOwnerPage from "@/components/businessOwnerScreen";

const profile = () => {
  const isCustomer = false;

  return isCustomer ? <CustomerScreen /> : <BusinessOwnerPage />;
};

export default profile;
