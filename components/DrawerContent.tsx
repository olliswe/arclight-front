import React from "react";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import LogoutButton from "./LogoutButton";
import { Image, StyleSheet, View } from "react-native";

const DrawerContent: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps
) => (
  <DrawerContentScrollView {...props}>
    <View>
      <Image
        source={require("../assets/arclight_logo.png")}
        style={styles.image}
      />
    </View>
    <DrawerItemList {...props} />
    <View style={styles.logoutbutton}>
      <LogoutButton />
    </View>
  </DrawerContentScrollView>
);

const styles = StyleSheet.create({
  logoutbutton: {
    width: "50%",
    marginLeft: 10,
    marginTop: "90%",
  },
  image: {
    width: "80%",
    height: 50,
    resizeMode: "contain",
    marginTop: 20,
  },
});

export default DrawerContent;
