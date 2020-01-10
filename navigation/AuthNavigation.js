import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default AuthNavigation