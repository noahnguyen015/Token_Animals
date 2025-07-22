import { refreshLoginToken } from '../items/items'

export async function UpdateWallet({updatedBalance}){

    console.log(updatedBalance);

    let accesstoken = localStorage.getItem("access");

    const response = await fetch("http://localhost:8000/api/wallet/",
    {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
                  "Authorization": `Bearer ${accesstoken}`,
                },
        body : JSON.stringify({balance: updatedBalance}),
    });

    if(response.status === 401) {

        accesstoken = await refreshLoginToken();

        try {
            const retry_response = await fetch("http://localhost:8000/api/wallet/",
            {
                method: "PATCH",
                headers: {"Content-Type": "application/json",
                        "Authorization": `Bearer ${accesstoken}`,},
                body : JSON.stringify({balance: updatedBalance}),
            });

            const retry_reply = await retry_response.json();

            if(retry_response.ok)
                return retry_reply["message"];
            else
                console.log("Failed to obtain Wallet from refresh attempt");
        }
        catch(error){
            console.log("Refresh Failed");
            throw error
        }
    }

    const reply = await response.json();

    if(response.ok)
        return reply["message"];
    else
        console.log("Failed to obtain Wallet");

}

export async function GetWallet(){

    let accesstoken = localStorage.getItem("access");

    const response = await fetch("http://localhost:8000/api/wallet/",
    {
        headers: {"Authorization": `Bearer ${accesstoken}`,},
    });

    if(response.status === 401) {
        try {
            accesstoken = await refreshLoginToken();

            const retry_response = await fetch("http://localhost:8000/api/wallet/",
            {
                headers: {"Authorization": `Bearer ${accesstoken}`},
            });

            const retry_reply = await retry_response.json();

            if(retry_response.ok)
                return retry_reply;
            else
                console.log("Failed to obtain Wallet from refresh attempt");
        }
        catch(error){
            console.log("Refresh Failed");
            throw error
        }
    }

    const reply = await response.json();

    if(response.ok)
        return reply;
    else
        console.log("Failed to obtain Wallet");

}