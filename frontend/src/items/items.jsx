async function refreshLoginToken() {
    const refreshtoken = localStorage.getItem('refresh');

    if (!refreshtoken) {
    throw new Error("No refresh token found in localStorage.");
    }

    const response = await fetch('http://localhost:8000/api/token/refresh/', 
    {
        method: 'POST',      
        body: JSON.stringify({ refresh: refreshtoken }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error("Failed to refresh token. Possibly expired.");
    }

    const data = await response.json();
    localStorage.setItem('access', data.access); 
    return data.access;
}

export async function postItems(new_item){

    console.log(new_item);

    let accesstoken = localStorage.getItem("access");
    const refreshtoken = localStorage.getItem("refresh");

    const response = await fetch("http://localhost:8000/api/inventory/", 
    {
        method: "POST",
        body: JSON.stringify({
            item_name: new_item["animal"]["name"],     
            tier: new_item["tier"],
        }),
        headers: { "Content-Type": "application/json",
                   "Authorization": `Bearer ${accesstoken}`    
                 }
    });

    if(response.status === 401) {
        try {
            accesstoken = await refreshLoginToken();

            const retry_response = await fetch('http://localhost:8000/api/inventory/', 
            {
                method: "POST",
                body: JSON.stringify({
                    item_name: new_item["animal"]["name"],
                    tier: new_item["tier"],
                }),
                headers: { "Content-Type": "application/json",
                            "Authorization": `Bearer ${accesstoken}`,  
                },
            });

            const retry_reply = await retry_response.json();

            if(retry_response.ok){
                return retry_reply["message"];
            }
        }catch(err) {
            console.error("Failed refresh");
            throw err;
        }
    }

    const reply = await response.json();

    if(response.ok){
        return reply["message"];
    }else{
        console.log("Submission to Inventory Failed");
    }
}

export async function getItems(){

    let accesstoken = localStorage.getItem("access");

    const response = await fetch("http://localhost:8000/api/inventory/", 
    {
        //no content type or method, fetch by default is a GET request
        headers: {"Authorization": `Bearer ${accesstoken}`}
    });

    if(response.status === 401) {
        try {
            accesstoken = await refreshLoginToken();

            const retry_response = await fetch("http://localhost:8000/api/inventory/",
            {  
                headers: {"Authorization": `Bearer ${accesstoken}`}
            });

            const retry_reply = await retry_response.json();

            if(retry_response.ok){
                return retry_reply;
            }

        }catch(err) {
            console.error("Failed refresh");
            throw err;
        }
    }

    const reply = await response.json();

    if(response.ok){
        return reply;
    }

}
