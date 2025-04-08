import { StyleSheet } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }: any) => (
            <FontAwesome name="registered" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invest"
        options={{
          title: "invest",
          tabBarIcon: ({ size, color }: any) => (
            <AntDesign name="linechart" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }: any) => (
            <FontAwesome name="exchange" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="crypto"
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }: any) => (
            <FontAwesome name="bitcoin" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="lifestyle"
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ size, color }: any) => (
            <FontAwesome name="th" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;

const styles = StyleSheet.create({});
