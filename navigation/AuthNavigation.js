import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/Login'
import ForgotPassword from "../screens/ForgotPassword";
import ResetPassword from "../screens/ResetPassword";

const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login , path:'login'},
        ForgotPassword:{screen:ForgotPassword, path:'forgot_password'},
        PasswordReset:{screen:ResetPassword, path:'password_reset/:token'}

    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default AuthNavigation