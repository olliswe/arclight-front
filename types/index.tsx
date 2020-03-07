import {NavigationStackProp} from "react-navigation-stack";
import {NavigationInjectedProps} from "react-navigation";
import {NavigationDrawerProp} from "react-navigation-drawer";
import {NavigationTabProp} from "react-navigation-tabs";

export type Facility = {
    id:number,
    facility_name:string
}



export type User = {
    id:number,
    email:string,
    facility:Facility,
    date_added:string,
}




export type Patient = {
    fullName:string,
    uid:string,
    gender:"Male"|"Female"
}

export type StackNavigationProp = NavigationStackProp & NavigationInjectedProps

export type DrawerNavigationProp = NavigationDrawerProp & NavigationInjectedProps

export type TabNavigationProp = NavigationTabProp & NavigationInjectedProps