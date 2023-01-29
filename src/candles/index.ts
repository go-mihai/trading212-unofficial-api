import { InputGetCandles } from "../types";


export default async function getCandles(input : InputGetCandles[] | InputGetCandles ){
    
    // Check if there are multiple inputs.
    const candles = Array.isArray(input) ? input : [input];

    const data = await fetch('https://live.trading212.com/charting/v3/candles', {
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify({
            candles
        }),
        "method": "PUT"
    }).then(d => d.json()).catch(err => err);
    return data;
}
