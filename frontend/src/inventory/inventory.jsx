import { useEffect, useState } from 'react'
import {getItems} from '../items/items'
import {NavBar} from '../navbar/navbar'
import common_bear from '../assets/bear_bank/common_bear.JPG'
import './inventory.css'


function Collection(){

    console.log(common_bear);

    return(
    <>
        <div className="row">
            <div className="col-3"><h4>Collections</h4></div>
            <div className="col-9 d-flex align-items-start collection-book">
                <div class="row">
                <div className="col-4"><img className="img-fluid" src={common_bear}/></div>
                <div className="col-4"><img className="img-fluid" src={common_bear}/></div>
                <div className="col-4"><img className="img-fluid" src={common_bear}/></div>
                </div>
            </div>

        </div>
    </>
    )
}

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
        <div>
        <h4>Inventory</h4>
        <Collection/>
        </div>
    </>
    )
}

export default Inventory