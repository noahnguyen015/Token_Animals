import { useEffect, useState } from 'react'
import {getItems} from '../items/items'
import {NavBar} from '../navbar/navbar'

export function Inventory() {

    const [inventory, SetInventory] = useState(null);

    useEffect(() =>
    {

        async function callItems(){
            const backendItems = await getItems();
            SetInventory(backendItems);
        }

        callItems();

    },[])

    if(inventory)
        console.log(inventory);

    return (
    <>
        <h3>GAMBLING WEBSITE WITHOUT A NAME</h3>
        <NavBar/>
    </>
    )
}

export default Inventory