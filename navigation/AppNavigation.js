import { createStackNavigator } from 'react-navigation-stack'
import RecVideo from '../screens/RecVideo'

const AppNavigation = createStackNavigator(
    {
        Home: { screen: RecVideo }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
)

export default AppNavigation