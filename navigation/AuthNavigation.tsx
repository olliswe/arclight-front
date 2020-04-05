import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";
import React from "react";

export type AuthNavigationParams = {
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

const Auth = createStackNavigator();

function AuthNavigation() {
  return (
    <Auth.Navigator initialRouteName="Login" headerMode="none">
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
      <Auth.Screen
        name="ResetPassword"
        component={ResetPassword}
        initialParams={{ token: undefined }}
      />
    </Auth.Navigator>
  );
}

export default AuthNavigation;

export const authRouteConfig = {
  Login: {
    path: "login",
  },
  ForgotPassword: {
    path: "forgot_password",
  },
  ResetPassword: {
    path: "password_reset/:token",
    parse: {
      token: String,
    },
  },
};
