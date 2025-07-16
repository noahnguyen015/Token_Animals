import { useEffect, useState } from 'react'
import {getItems} from '../items/items'
import {NavBar} from '../navbar/navbar'
import common_bear from '../assets/bear_bank/common_bear.JPG'

import tie_bear from '../assets/bear_bank/tie_bear.JPG'
import glasses_bear from '../assets/bear_bank/glasses_bear.JPG'
import detective_bear from '../assets/bear_bank/detective_bear.JPG'
import delinquent_bear from '../assets/bear_bank/delinquent_bear.JPG'
import princess_bear from '../assets/bear_bank/princess_bear.JPG'
import sleepy_bear from '../assets/bear_bank/sleepy_bear.JPG'
import boba_bear from '../assets/bear_bank/boba_bear.JPG'

import './inventory.css'


function Choose_Collection(){

    return (
    <>
        <h3>Collection</h3>
        <button className="w-100 h-25"><h4>Collection Set 1</h4></button>
        <button className="w-100 h-25"><h4>Collection Set 2</h4></button>
        <button className="w-100 h-25"><h4>Collection Set 3</h4></button>
        <button className="w-100 h-25"><h4>Collection Set 4</h4></button>
    </>
    )
}


function Collection(choice){

    let chosen_set = [];

    const set1 = [common_bear, tie_bear, glasses_bear, detective_bear, 
                  delinquent_bear, princess_bear, sleepy_bear, boba_bear];

    //if(choice === "set1")
        chosen_set = set1;

    console.log(common_bear);

    return(
    <>
        <div className="row">
            <h4>Inventory</h4>
            <div className="col-3"><Choose_Collection/></div>
            <div className="col-6 d-flex align-items-start collection-book flex-wrap">
                {
                chosen_set.map((card, i) => (<img className="img-fluid collection-card" src={card}/>))
                }
            </div>
            <div className="col-3"></div>
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
        <Collection/>
        </div>
    </>
    )
}

export default Inventory