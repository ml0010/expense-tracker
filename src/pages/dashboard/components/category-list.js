import { AirplayIcon, BusIcon, CalculatorIcon, CatIcon, CherriesIcon, CoffeeBeanIcon, GasPumpIcon, GuitarIcon, HandCoinsIcon, HouseLineIcon, PiggyBankIcon, PizzaIcon, PlugChargingIcon, ShoppingCartIcon } from '@phosphor-icons/react';
import React from 'react'
import { redirect } from 'react-router-dom';

export const CategoryList = [
    "Grocery",
    "Rent",
    "Mortgage",
    "Entertaintment",
    "Pet",
    "Eating-Out",
    "Coffee",
    "Transportation",
    "Fuel",
    "Home",
    "Utility",
    "Shopping",
    "Subscription",
    "Other"
];

export const CategoryIcons = [
    {
        title: "Grocery",
        icon: CherriesIcon,
        color: "#f2f18c"
    },{
        title: "Rent",
        icon: HouseLineIcon,
        color: "#f2c68cff"
    },{
        title: "Mortgage",
        icon: HandCoinsIcon,
        color: "#f2988cff"
    },{
        title: "Entertaintment",
        icon: GuitarIcon,
        color: "#8cf2baff"
    },{
        title: "Pet",
        icon: CatIcon,
        color: "#8ca4f2ff"
    },{
        title: "Eating-Out",
        icon: PizzaIcon,
        color: "#f2b58cff"
    },{
        title: "Coffee",
        icon: CoffeeBeanIcon,
        color: "#c19693ff"
    },{
        title: "Transportation",
        icon: BusIcon,
        color: "#c1f28cff"
    },{
        title: "Fuel",
        icon: GasPumpIcon,
        color: "#f28cd3ff"
    },{
        title: "Utility",
        icon: PlugChargingIcon,
        color: "#8cc2f2ff"
    },{
        title: "Shopping",
        icon: ShoppingCartIcon,
        color: "#d5e9c2ff"
    },{
        title: "Subscription",
        icon: AirplayIcon,
        color: "#93bcaeff"
    },{
        title: "Other",
        icon: CalculatorIcon,
        color: "#ddc9e9ff"
    },{
        title: "Income",
        icon: PiggyBankIcon,
        color: "#acf2f9ff"
    },{
        title: "Home",
        icon: HouseLineIcon,
        color: "#d4c1ffff"
    }
];
