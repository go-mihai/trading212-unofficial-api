### Unofficial Trading212 API - Data Fetching
<img src="/Trading212-logo.webp">



### Status



| Name      | Function | Status     |
| :---        |    :----:   |          ---: |
| Companies/Tickers   | .getCompanies        | Finished      |
| Current Price      |   .getCurrentPrice     | To Do   |
| Current Candle     |   .getCurrentCandle     | Finished   |
| Candles      |   .getCandles     | Finished   |
| Current Weekly Candles      |   .getCurrentWeeklyCandles     | Finished   |


### How to use ?

#### Companies/Tickers API

The `trading212.getCompanies` method is used to retrieve a list of companies available for trading on the Trading 212 platform.

```js
import trading212 from 'trading212-unofficial-api';

export default async function Companies(){
    return await trading212.getCompanies();
}
```

#### Candles API

The `trading212.getCandles` method is used to retrieve historical candle data for one or more financial instruments.

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


#### Current Candle API

The `trading212.getCurrentCandle` method is used to retrieve current candle data for one or more financial instruments.

##### Parameters

The method takes an array as its parameter, where each element of the array is an object with the following properties:

`@period`

The period property specifies the time interval for the candle. The possible values for this property are:


```ts
export type TIME_PERIOD =
  | 'ONE_MINUTE'
  | 'FIVE_MINUTES'
  | 'TEN_MINUTES'
  | 'FIFTEEN_MINUTES'
  | 'THIRTY_MINUTES'
  | 'ONE_HOUR'
  | 'FOUR_HOURS'
  | 'ONE_DAY'
  | 'ONE_WEEK'
  | 'ONE_MONTH'
```

`ticker`

The ticker property is a string that specifies the financial instrument for which the current candle data will be retrieved.


`showPreviousPrice` (***optional***)

The showPreviousPrice property is a boolean that indicates whether the previous price for the financial instrument should be included in the returned data. The default value for this property is false.


##### Returns

The method returns a Promise that resolves to an object containing the current candle data for each financial instrument specified in the input array.


```js
import trading212 from 'trading212-unofficial-api';

export default async function CurrentPricesAPI(){
    // getCurrentPrices accept an array of inputs 
    const data = await trading212.getCurrentCandle([{
        period : 'FIFTEEN_MINUTES',
        ticker :  "EURUSD",
        showPreviousPrice : false
    },{
        period: 'THIRTY_MINUTES',
        ticker :  "USDJPY",
    }])
    // or only a single input object.
    const data2 = await trading212.getCurrentCandle({
        period: 'THIRTY_MINUTES',
        ticker :  "USDJPY",
    })
    // ...
    // ...
}
```

### Get Current Weekly Price Candles 
###### `getCurrentWeeklyCandles`

The `trading212.getCurrentWeeklyCandles` method is used to retrieve weekly candles data for one or more financial instruments.

@`period`

The period property specifies the time interval for each candle. The possible values for this property are:

```ts
export type TIME_PERIOD =
  | 'ONE_MINUTE'
  | 'FIVE_MINUTES'
  | 'TEN_MINUTES'
  | 'FIFTEEN_MINUTES'
  | 'THIRTY_MINUTES'
  | 'ONE_HOUR'
  | 'FOUR_HOURS'
  | 'ONE_DAY'
  | 'ONE_WEEK'
  | 'ONE_MONTH'
```

@`ticker`

The ticker property is an array of strings that specifies the financial instruments for which the weekly candles data will be retrieved.

### Returns

The method returns a Promise that resolves to an object containing the weekly candles data for each financial instrument specified in the ticker property.


```js
const data = await trading212.getWeeklyCandles({
    period : 'ONE_DAY',
    ticker : ['EURUSD','USDJPY']
})  
```

--- 
#####  Disclaimer

This code is work in progress. I am in no way affiliated with trading212 and trading212 does not endorse this project.
Use this code at your own risk. I afford no guarantee that the code is stable or error free.
