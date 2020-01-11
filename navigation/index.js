import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import AuthLoadingScreen from "./AuthLoadingScreen";

const SwitchNavigator = createSwitchNavigator(
    {
        AuthLoading:AuthLoadingScreen,
        Auth: AuthNavigation,
        App: AppNavigation
    },
    {
        initialRouteName: 'AuthLoading'
    }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer