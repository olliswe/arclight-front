import {NavigationStackProp} from "react-navigation-stack";
import {NavigationInjectedProps} from "react-navigation";
import {NavigationDrawerProp} from "react-navigation-drawer";
import {NavigationTabProp} from "react-navigation-tabs";

export interface Facility {
    id:number,
    facility_name:string
}



export interface User {
    id:number,
    email:string,
    facility:Facility,
    date_added:string,
}


interface GQLDataBase {
    __typename:string
}

export interface PatientData extends GQLDataBase   {
    full_name:string,
    id:string,
    gender?:string,
    dob?:string,
    telephone_number?:string,
    age?:string
}



export interface PatientQueryObject {
    my_patients:PatientData[]
}

export type StackNavigationProp = NavigationStackProp & NavigationInjectedProps

export type DrawerNavigationProp = NavigationDrawerProp & NavigationInjectedProps

export type TabNavigationProp = NavigationTabProp & NavigationInjectedProps