import { AirplayIcon, BusIcon, CalculatorIcon, CatIcon, CherriesIcon, CoffeeBeanIcon, GasPumpIcon, GuitarIcon, HandCoinsIcon, HouseLineIcon, IslandIcon, PiggyBankIcon, PizzaIcon, PlugChargingIcon, ShoppingCartIcon } from '@phosphor-icons/react';

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
    "Holiday",
    "Subscription",
    "Other"
];

export const CategoryIcons = [
    {
        title: "Grocery",
        icon: CherriesIcon,
        color: "#b7b400ff"
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
        color: "#496bdeff"
    },{
        title: "Eating-Out",
        icon: PizzaIcon,
        color: "#f2b58cff"
    },{
        title: "Coffee",
        icon: CoffeeBeanIcon,
        color: "#9a3f09ff"
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
        color: "#3c9bedff"
    },{
        title: "Shopping",
        icon: ShoppingCartIcon,
        color: "#78b43fff"
    },{
        title: "Subscription",
        icon: AirplayIcon,
        color: "#55c6a0ff"
    },{
        title: "Other",
        icon: CalculatorIcon,
        color: "#ff95fbff"
    },{
        title: "Income",
        icon: PiggyBankIcon,
        color: "#2bbbc8ff"
    },{
        title: "Home",
        icon: HouseLineIcon,
        color: "#9069ebff"
    },{
        title: "Holiday",
        icon: IslandIcon,
        color: "#1c908eff"
    }
];


export const Category = () => {
  return (
    <>
        {CategoryList.map((category, index) => 
            <option key={index} value={`${category}`}>{category}</option>
        )}
    </>
  )
}
