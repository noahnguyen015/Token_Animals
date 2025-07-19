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

import common_goose from '../assets/geese_bank/common_goose.JPG'
import tie_goose from '../assets/geese_bank/tie_goose.JPG'
import hat_goose from '../assets/geese_bank/hat_goose.JPG'
import fisher_goose from '../assets/geese_bank/fisher_goose.JPG'
import chef_goose from '../assets/geese_bank/chef_goose.JPG'
import viking_goose from '../assets/geese_bank/viking_goose.JPG'
import pilot_goose from '../assets/geese_bank/pilot_goose.JPG'
import samurai_goose from '../assets/geese_bank/samurai_goose.JPG'

import bear_banner from '../assets/icon_bank/bear_banner.png' 
import goose_banner from '../assets/icon_bank/goose_banner.png' 

import './inventory.css'

function Count_Inventory(inventory, choice){
    
    const set1Counter = {"White Bear": {count: 0, image: common_bear}, 
                            "Tie Bear": {count: 0, image: tie_bear}, "Glasses Bear": {count: 0, image: glasses_bear}, 
                            "Detective Bear": {count: 0, image: detective_bear}, "Delinquent Bear": {count: 0, image: delinquent_bear}, 
                            "Princess Bear": {count: 0, image: princess_bear}, "Sleepy Bear": {count: 0, image: sleepy_bear}, 
                            "Boba Bear": {count: 0, image: boba_bear},};

    const set2Counter  = {"White Goose": {count: 0, image: common_goose}, 
                            "Tie Goose": {count: 0, image: tie_goose}, "Hat Goose": {count: 0, image: hat_goose}, 
                            "Fisher Goose": {count: 0, image: fisher_goose}, "Chef Goose": {count: 0, image: chef_goose}, 
                            "viking_goose": {count: 0, image: viking_goose}, "Pilot Goose": {count: 0, image: pilot_goose}, 
                            "Samurai Goose": {count: 0, image: samurai_goose},};

    let inventoryCounter = {};

    if(choice === "set2") {
        inventoryCounter = set2Counter;
    }
    else {
        inventoryCounter = set1Counter;
    }

    for(let i = 0; i < inventory.length; i++){

        const card_name = inventory[i]["item_name"];

        if(card_name in inventoryCounter)
            inventoryCounter[card_name]["count"] += 1;
    }

    return inventoryCounter;
}

function Choose_Collection({inventory}){

    const [choice, setChoice] = useState("set1");
    let inventory_count = {};

    inventory_count = Count_Inventory(inventory, choice);


    return (
    <>
        <h3>Inventory</h3>
        <div className="row">
            <div className="col-3">
                <h3>Collection</h3>
                <button className="w-100 h-25 collection-button" onClick={() => setChoice("set1")}><h4>Bear Collection <img className="banner-img ms-3" src={bear_banner}/></h4></button>
                <button className="w-100 h-25 collection-button" onClick={() => setChoice("set2")}><h4>Goose Collection <img className="banner-img ms-3" src={goose_banner}/></h4></button>
                <button className="w-100 h-25 collection-button"><h4>Coming Soon...</h4></button>
            </div>
            <div className="col-6 d-flex align-items-start collection-book flex-wrap">
                {inventory? <Collection choice={choice} inventory_count={inventory_count}/>: <h3>Loading...</h3>}
            </div>
            <div className="col-3"></div>
        </div>
    </>
    )
}

function Collection({choice, inventory_count}){

    return(
    <>
        {
            Object.entries(inventory_count).map(([key, value]) => (
                <div className="collection-card" key={key}>
                    <img className={value["count"] > 0? "img-fluid collection-card-image": "collection-card-image-missing"}  src={value["image"]}/><br/>
                    <div className="d-flex justify-content-between">
                        <div className="collection-card-text">{key}</div>
                        <div className="collection-card-text">{value["count"]}x</div>
                    </div>
                </div>
            ))
        }   
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

    return (
    <>
        <h2>GAMBLING WEBSITE WITHOUT A NAME</h2>
        <NavBar/>
        <div>
        {inventory? <Choose_Collection inventory={inventory}/>: <h3>Loading...</h3>}
        </div>
    </>
    )
}

export default Inventory