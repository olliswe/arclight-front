import { createStackNavigator } from 'react-navigation-stack'
import RecVideo from '../screens/RecVideo'
import RecVideoFlow from "../screens/RecVideoFlow";

const AppNavigation = createStackNavigator(
    {
        Home: { screen: RecVideo },
        RecVideoFlow: {screen:RecVideoFlow}
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none'
    }
)

export default AppNavigation