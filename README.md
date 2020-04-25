# Arclight Front End

React Native Application for the Arclight Mobile Application, using Expo. Currently under development.

The Arclight App is developed together with volunteers from the University of St Andrews Medical School, and is to be used to trial the Arclight Scope [http://arclightscope.com/](http://arclightscope.com/) in rural communities in India at the end of 2020.

## Run locally

1. Clone the repository
2. Install dependencies using `yarn install`
3. Start the Metro Bundler using `expo start`


## Project Structure

`/assets` 
contains images and icons

`/components`
contains smaller components, which are used on one or several screens

`/context`
contains any flux stores, such as user context

`/higher_order_components`
contains higher order components - a user context provider, and a header provider

`/navigation`
contains two files: `AppNavigation.tsx` which contains all the navigators for the authenticsated user ; `AuthNavigation.tsx` which contains the navigation for non-authenticated users. For navigation, this project uses React Navigation 5.


`/screens`
contains all the screens rendered by the navigators

`/types`
contains types which are used across multiple components

`/utils`
contains any helper functions


`App.tsx` is the top level component. 


## CI/CD

All new commits to master are automatically published to Expo using a GitHub Action.





