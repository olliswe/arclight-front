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
    fullName:string,
    id:string,
    gender?:string,
    dob?:string,
    telephoneNumber?:string,
    age?:string
}



export interface PatientQueryObject {
    myPatients:PatientData[]
}

export type StackNavigationProp = NavigationStackProp & NavigationInjectedProps

export type DrawerNavigationProp = NavigationDrawerProp & NavigationInjectedProps

export type TabNavigationProp = NavigationTabProp & NavigationInjectedProps