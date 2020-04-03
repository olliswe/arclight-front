import React, {
  useEffect,
  useState,
  Fragment,
  useContext,
  useRef,
} from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import withUserContext from "./higher_order_components/UserContextWrapper";
import { Linking } from "expo";
import { API_URL } from "./constants";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { UserContext, UserContextProps } from "./context/userContext";
import PageLoading from "./components/loadingSpinners/PageLoading";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useLinking } from "@react-navigation/native";
import AppNavigation, { appRouteConfig } from "./navigation/AppNavigation";
import AuthNavigation, { authRouteConfig } from "./navigation/AuthNavigation";
import { InitialState } from "@react-navigation/routers/src/types";

console.disableYellowBox = true;

export type RootStackParams = {
  App: undefined;
  Auth: undefined;
};

const RootStack = createStackNavigator<RootStackParams>();
const prefix = Linking.makeUrl("/");

const App = () => {
  const [fontLoading, setFontLoading] = useState(true);
  const [deepLinkLoading, setDeepLinkLoading] = useState(true);
  const [initialState, setInitialState] = React.useState<
    InitialState | undefined
  >();

  let userContext: UserContextProps = useContext(UserContext);
  const ref = useRef();

  const { getInitialState } = useLinking(ref, {
    prefixes: [prefix],
    config: {
      ResetPassword: "auth/password_reset/:token",
    },
  });

  const client = new ApolloClient({
    uri: API_URL + "graphql/", // your GraphQL Server
    request: (operation) => {
      const token = userContext.state.token;
      operation.setContext({
        headers: {
          authorization: token ? `Token ${token}` : "",
        },
      });
    },
  });

  const getUserData = async () => {
    const userToken = await SecureStore.getItemAsync("token");
    if (!!userToken) {
      let headers = { Authorization: "Token " + userToken };
      axios
        .get(API_URL + "accounts/current_user/", { headers: headers })
        .then((res) => {
          console.log("user can be logged in!");
          userContext.dispatch({
            type: "login",
            payload: { user: res.data, token: userToken },
          });
        })
        .catch((error) => {
          alert("An error occurred, please try again!");
          userContext.dispatch({ type: "loaded" });
        });
    } else {
      userContext.dispatch({ type: "loaded" });
    }
  };

  const loadFont = async () => {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
  };

  useEffect(() => {
    getUserData();
    loadFont().then((res) => {
      setFontLoading(false);
    });
  }, []);

  useEffect(() => {
    setDeepLinkLoading(true);
    getInitialState()
      .catch(() => {})
      .then((state) => {
        console.log("state is ", state);
        if (state !== undefined) {
          setInitialState(state);
        }
        setDeepLinkLoading(false);
      });
  }, [getInitialState]);

  return fontLoading || userContext.state.loading || deepLinkLoading ? (
    <PageLoading />
  ) : (
    <ApolloProvider client={client}>
      <NavigationContainer initialState={initialState} ref={ref}>
        <RootStack.Navigator headerMode="none">
          {userContext.state.isAuthenticated ? (
            <>
              <RootStack.Screen name="App" component={AppNavigation} />
            </>
          ) : (
            <RootStack.Screen name="Auth" component={AuthNavigation} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default withUserContext(App);
