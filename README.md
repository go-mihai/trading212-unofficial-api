### Unofficial Trading212 API - Data Fetching
<img src="/Trading212-logo.webp">

### How to use ?

### Docs

| Name      | Function | Status     |
| :---        |    :----:   |          ---: |
| Candles      |   getCandles     | Finished   |
| Companies/Tickers   | getCompanies        | Finished      |




#### Companies/Tickers API

```js
import trading212 from 'trading212-unofficial-api';

export default async function Companies(){
    return await trading212.getCompanies();
}
```

#### Candles API

```js
import trading212 from 'trading212-unofficial-api';

export default async function Candles(){
    // getCandles accept an array of inputs 
    const data = await trading212.getCandles([{
        period : 'FIFTEEN_MINUTES',
        size : 10,
        ticker :  "EURUSD",
        useAskPrice: false
    },{
        period: 'THIRTY_MINUTES',
        size : 10,
        ticker :  "USDJPY",
        useAskPrice: false
    }])
    // or only a single input object.
    const data2 =  await trading212.getCandles({
        period : 'FIFTEEN_MINUTES',
        size : 10,
        ticker :  "EURUSD",
        useAskPrice: false
    });
    // ...
    // ...
}
```

#####  Disclaimer

This code is work in progress. I am in no way affiliated with trading212 and trading212 does not endorse this project.
Use this code at your own risk. I afford no guarantee that the code is stable or error free.