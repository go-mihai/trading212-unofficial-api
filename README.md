### Unofficial Trading212 API - Data Fetching
<img src="/Trading212-logo.webp">


### How to use ?

#### Companies/Tickers API

The `trading212.getCompanies` method is used to retrieve a list of companies available for trading on the Trading 212 platform.

```js
import trading212 from 'trading212-unofficial-api';

export default async function Companies(){
    return await trading212.companies().select();
}
```

#### Candles API


```js
import trading212 from 'trading212-unofficial-api';

export default async function Candles(){
    // getCandles accept an array of inputs 
    const data = await trading212.from(['MSFT','AAPL']).candles().select();
    const data2 = await trading212.from(['MSFT','AAPL']).candles().limit(100).select();
    const data3 = await trading212.from(['MSFT','AAPL']).candles().timeframe('ONE_DAY').limit(50).select()
}
```


#### Current Candle API


`showPreviousPrice` (***optional***) :  boolean

The showPreviousPrice property is a boolean that indicates whether the previous price for the financial instrument should be included in the returned data. The default value for this property is false.


##### Returns

The method returns a Promise that resolves to an object containing the current candle data for each financial instrument specified in the input array.


```js
import trading212 from 'trading212-unofficial-api';

export default async function CurrentPricesAPI(){
    // getCurrentPrices accept an array of inputs 
    const data = await trading212.from(['EURUSD','USDJPY']).currentCandle().select();
}
```

### Get Current Weekly Price Candles 
###### `getCurrentWeeklyCandles`

Setting up timeframe is optional, default is Daily.

```js
const data = await trading212.from(['EURUSD','USDJPY']).currentWeekCandles().timeframe('FIFTEEN_MINUTES').select()
```


### SVG 

We are currently working to improve this method.

<img src="/example_svg.webp">

```js
const data = await trading212.from('MSFT']).currentWeekCandles().timeframe('ONE_HOUR').svg();
//or 
const data = await trading212.from(['MSFT','AAPL']).currentWeekCandles().timeframe('ONE_HOUR').svg();
//or
const data = await trading212.from(['MSFT','AAPL']).candles().svg();
```


--- 
#####  Disclaimer

This code is work in progress. I am in no way affiliated with trading212 and trading212 does not endorse this project.
Use this code at your own risk. I afford no guarantee that the code is stable or error free.
