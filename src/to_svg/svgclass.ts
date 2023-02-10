import { CandlesticksDataset } from "../types"
import { Axes, MetaData } from "./type"

class BuildSvg {
    width : number
    height : number
    axes : Axes
    data : CandlesticksDataset
    barPlotWidth : number
    meta : MetaData
    constructor(data : CandlesticksDataset){
        this.width = 324
        this.height = 180
        this.barPlotWidth = 10
        this.data = data;
        
        this.meta = {
            pnl : {
                nominal : 0,
                percentage : 0
            },
            title : 'N/A'
        }
        this.axes = {
            x : {
                margin : 30,
                min : 60,
                max : this.width - 60 + 30
            },
            y : {
                max : 0,
                min : 1,
                margin : 30,
                scale : 1
            }
        }

        // calculate min & max values.
        this.setMaxMin();
        // calculate y scale
        this.setYScale();
        // calculate barPlotWidth
        this.setBarPlotWidth()
        // calculate metadata
        this.setPnl();
        this.setTitle('Hello')

    }

    setBarPlotWidth(){
        this.barPlotWidth = (this.axes.y.max - this.axes.y.min) / this.data.length;
    }
    setMaxMin(){
        this.axes.y.max = this.data.reduce((currMax, [_, _a, dataY]) => Math.max(currMax, dataY), -Infinity)
        this.axes.y.min = this.data.reduce((currMin, [_, _a, _b, dataY]) => Math.min(currMin, dataY), Infinity)
    }
    setYScale(){
        this.axes.y.scale = (this.height - this.axes.y.margin)/(this.axes.y.max - this.axes.y.min);
    }
    yTransform(value :number){
        return this.height - (value - this.axes.y.min) * this.axes.y.scale   
    }
    xTransform(value:number){
        return this.axes.x.min + value * this.barPlotWidth;
    }
    setPnl(){
        const startValue = this.data[0][4];
        const nominalValue = this.data[this.data.length - 1][4] - this.data[0][4];
        const percentageValue = (nominalValue/startValue)*100;
        this.meta = {
            ...this.meta,
            pnl : {
                nominal : nominalValue,
                percentage : percentageValue
            }
        }
    }
    setTitle(value : string){
        this.meta = {
            ...this.meta,
            title : value.toUpperCase()
        }
    }
}

export default BuildSvg;