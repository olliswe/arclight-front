import React, { useContext, useEffect, useState } from "react";
import { Button, Spinner, Text } from "native-base";
import { UserContext } from "../context/userContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../App";
import { useNavigation } from "@react-navigation/native";

const LogoutButton: React.FC = () => {
  let userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    userContext.dispatch({ type: "logout" });
  };

  return (
    <Button
      onPress={handleLogout}
      bordered
      danger
      style={{ justifyContent: "center" }}
      disabled={loading}
    >
      {loading ? (
        <Spinner size="small" />
      ) : (
        <Text style={{ color: "red" }}>Logout</Text>
      )}
    </Button>
  );
};

export default LogoutButton;
