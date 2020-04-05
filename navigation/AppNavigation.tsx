import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import {
  BottomTabBar,
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import AddComment from "../screens/AddComment";

// Navigator for the Home Screen, where video is recorded

export type ScreeningStackParamList = {
  HomeScreen: undefined;
  RecVideo: undefined;
};

const ScreeningStack = createStackNavigator<ScreeningStackParamList>();

function ScreeningStackNavigator() {
  return (
    <ScreeningStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ gestureEnabled: false }}
      headerMode="none"
    >
      <ScreeningStack.Screen name="HomeScreen" component={RecVideoPage} />
      <ScreeningStack.Screen name="RecVideo" component={RecVideoFlow} />
    </ScreeningStack.Navigator>
  );
}

ScreeningStackNavigator.navigationOptions = (navigation: any) => {
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

export type BottomTabParamList = {
  Home: undefined;
  Diagnosis: undefined;
  Screening: undefined;
  Patients: undefined;
};

const MainBottomTab = createBottomTabNavigator<BottomTabParamList>();

// todo: Make RecVideo sit in the top level stack navigator, such that it cannot access the Drawer and Bottom Tab
function getTabBarVisibility(route: any) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "";
  if (routeName === "RecVideo") {
    return false;
  }
  return true;
}

function MainBottomTabNavigator() {
  return (
    <MainBottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const routeName = route.name;
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
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#bdbdbd",
      }}
      initialRouteName="Home"
      tabBar={(props) => (
        <TabBarComponent
          {...props}
          style={{ backgroundColor: "#334393", paddingTop: 5 }}
        />
      )}
    >
      <MainBottomTab.Screen name="Home" component={Home} />
      <MainBottomTab.Screen name="Diagnosis" component={Diagnosis} />
      <MainBottomTab.Screen
        name="Screening"
        component={ScreeningStackNavigator}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <MainBottomTab.Screen name="Patients" component={PatientInfo} />
    </MainBottomTab.Navigator>
  );
}

export type DrawerParamList = {
  Home: undefined;
  Surveys: undefined;
  Profile: undefined;
  Patients: undefined;
  About: undefined;
  Help: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={MainBottomTabNavigator} />
      <Drawer.Screen name="Surveys" component={Surveys} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
}

export type AppParamList = {
  Home: undefined;
  ViewCase: { id: number };
  AddComment: { id: number };
};

const App = createStackNavigator<AppParamList>();

function AppNavigation() {
  return (
    <App.Navigator initialRouteName="Home" headerMode="none">
      <App.Screen name="Home" component={DrawerNavigator} />
      <App.Screen
        name="ViewCase"
        component={ViewCase}
        initialParams={{ id: undefined }}
      />
      <App.Screen
        name="AddComment"
        component={AddComment}
        initialParams={{ id: undefined }}
      />
    </App.Navigator>
  );
}

export default AppNavigation;

export const appRouteConfig = {
  Home: {
    path: "home",
  },
  ViewCase: {
    path: "view_case/:id",
    parse: {
      id: Number,
    },
  },
  AddComment: {
    path: "add_comment/:id",
    parse: {
      id: Number,
    },
  },
};
