import React from "react";
import { View } from "react-native";

const Divider = (props: any) => {
  return (
    <View
      style={{
        height: 0,
        borderColor: "lightgray",
        borderBottomWidth: 0.75,
        ...props.style,
      }}
    />
  );
};

export default Divider;
