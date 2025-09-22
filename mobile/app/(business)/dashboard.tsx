import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, Dimensions, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function DashboardPage() {
  const [businesses, setBusinesses] = useState([
    {
      id: "1",
      name: "Tokyo Tower",
      description: "Iconic landmark in the heart of Tokyo.",
      image: "https://picsum.photos/id/1015/400/200",
      visitors: 1200,
    },
    {
      id: "2",
      name: "Colosseum",
      description: "Historic amphitheater in Rome.",
      image: "https://picsum.photos/id/1022/400/200",
      visitors: 950,
    },
    {
      id: "3",
      name: "Statue of Liberty",
      description: "Symbol of freedom in New York City.",
      image: "https://picsum.photos/id/1036/400/200",
      visitors: 780,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newImage, setNewImage] = useState("");

  const handleCreate = () => {
    if (!newName || !newDesc || !newImage) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setBusinesses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newName,
        description: newDesc,
        image: newImage,
        visitors: 0,
      },
    ]);

    setNewName("");
    setNewDesc("");
    setNewImage("");
    setModalVisible(false);
  };

  // Calculate total stats
  const totalBusinesses = businesses.length;
  const totalVisitors = businesses.reduce((sum, b) => sum + (b.visitors || 0), 0);

  return (
    <SafeAreaView className="flex-1 bg-[#F7FDFF]" style={{ paddingTop: 20 }}>
      {/* Dashboard Stats */}
      <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 26, fontWeight: "bold", color: "#131B62" }}>Dashboard</Text>
        <Text style={{ color: "#555", marginTop: 4 }}>Overview of your businesses</Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
            justifyContent: "space-between",
          }}
        >
          {/* Stats Card */}
          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              marginRight: 8,
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              elevation: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#3754ED" }}>{totalBusinesses}</Text>
            <Text style={{ color: "#555", marginTop: 4 }}>Businesses</Text>
          </View>

          <View
            style={{
              backgroundColor: "#fff",
              flex: 1,
              marginLeft: 8,
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 8,
              elevation: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#3754ED" }}>{totalVisitors}</Text>
            <Text style={{ color: "#555", marginTop: 4 }}>Visitors</Text>
          </View>
        </View>
      </View>

      {/* Business List */}
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 140 }}>
        {businesses.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              marginBottom: 16,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Image source={{ uri: item.image }} style={{ width: 120, height: 120 }} />
            <View style={{ flex: 1, padding: 12, justifyContent: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "#131B62" }}>{item.name}</Text>
              <Text style={{ marginTop: 4, fontSize: 14, color: "#555" }}>{item.description}</Text>
              <Text style={{ marginTop: 8, fontSize: 12, color: "#888" }}>Visitors: {item.visitors}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Add new business button */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: "#3754ED",
          paddingVertical: 14,
          marginHorizontal: 16,
          borderRadius: 25,
          alignItems: "center",
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>Add New Business</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>Create Business</Text>

            <TextInput
              placeholder="Name"
              value={newName}
              onChangeText={setNewName}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
              }}
            />
            <TextInput
              placeholder="Description"
              value={newDesc}
              onChangeText={setNewDesc}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 12,
              }}
            />
            <TextInput
              placeholder="Image URL"
              value={newImage}
              onChangeText={setNewImage}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 12,
                paddingHorizontal: 12,
                paddingVertical: 10,
                marginBottom: 20,
              }}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 12 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#555", fontWeight: "600" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreate}>
                <Text style={{ color: "#3754ED", fontWeight: "bold" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
