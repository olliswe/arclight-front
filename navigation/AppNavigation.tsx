import {
  createStackNavigator,
  NavigationStackProp,
} from "react-navigation-stack";
import {
  createBottomTabNavigator,
  BottomTabBar,
  BottomTabBarProps,
} from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import RecVideoPage from "../screens/RecVideoPage";
import RecVideoFlow from "../screens/RecVideoFlow";
import React from "react";
import Home from "../screens/Home";
import Diagnosis from "../screens/Diagnosis";
import PatientInfo from "../screens/PatientInfo";
import { Ionicons } from "@expo/vector-icons";
import Surveys from "../screens/Surveys";
import Profile from "../screens/Profile";
import About from "../screens/About";
import Help from "../screens/Help";
import DrawerContent from "../components/DrawerContent";
import ViewCase from "../screens/ViewCase";
import {
  NavigationRoute,
  NavigationScreenProp,
  SupportedThemes,
} from "react-navigation";

"react-native-navigation";

// Navigator for the Home Screen, where video is recorded
const ScreeningStackNavigator = createStackNavigator(
  {
    HomeScreen: { screen: RecVideoPage, path: "screening/landing" },
    RecVideoFlow: { screen: RecVideoFlow, path: "screening/record" },
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
  }
);

ScreeningStackNavigator.navigationOptions = (navigation: {
  navigation: NavigationScreenProp<NavigationRoute<any>>;
  screenProps: unknown | null;
  theme: SupportedThemes;
}) => {
  let tabBarVisible = true;
  if (navigation.navigation.state && navigation.navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
  };
};

const TabBarComponent: React.FC<BottomTabBarProps> = (props) => (
  <BottomTabBar {...props} />
);

// Bottom tab navigator for the main app
const MainBottomTabNavigator = createBottomTabNavigator(
  {
    Home: Home,
    Diagnosis: Diagnosis,
    Screening: ScreeningStackNavigator,
    Patients: PatientInfo,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = "md-home";
        } else if (routeName === "Diagnosis") {
          iconName = "md-document";
        } else if (routeName === "Screening") {
          iconName = "md-camera";
        } else if (routeName === "Patients") {
          iconName = "md-people";
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "#bdbdbd",
    },
    initialRouteName: "Home",
    tabBarComponent: (props) => (
      <TabBarComponent
        {...props}
        style={{ backgroundColor: "#334393", color: "white", paddingTop: 5 }}
      />
    ),
  }
);

// Drawer navigator to switch between main app and profile/settings screens
const DrawerNavigator = createDrawerNavigator(
  {
    Home: { screen: MainBottomTabNavigator },
    Surveys: { screen: Surveys },
    Profile: { screen: Profile },
    About: { screen: About },
    Help: { screen: Help },
  },
  {
    initialRouteName: "Home",
    contentComponent: DrawerContent,
  }
);

const AppNavigation = createStackNavigator(
  {
    Home: { screen: DrawerNavigator, path: "/" },
    ViewCase: { screen: ViewCase, path: "/view_case/:id" },
  },
  {
    initialRouteName: "Home",
    headerMode: "none",
  }
);

export default AppNavigation;
