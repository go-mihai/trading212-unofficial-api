import { Axes } from "./type"

class BuildSvg {
    width : number
    height : number
    axes : Axes
    constructor(){
        this.width = 324
        this.height = 180
        
        
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
    }

    setScale(){
        this.axes.y.scale = (this.height - this.axes.y.margin)/(this.axes.y.max - this.axes.y.min);
    }
    yTransform(value :number){
        return this.height - (value - this.axes.y.min) * this.axes.y.scale   
    }

}

export default BuildSvg;