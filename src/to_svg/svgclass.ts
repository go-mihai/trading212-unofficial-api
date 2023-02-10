import { CandlesticksDataset } from '../types'
import { Axes, MetaData } from './type'

class BuildSvg {
  width: number
  height: number
  axes: Axes
  data: CandlesticksDataset
  barPlotWidth: number
  meta: MetaData

  SVG: string[]
  constructor(data: CandlesticksDataset, options: any) {
    this.SVG = []
    this.width = 324
    this.height = 180
    this.barPlotWidth = 10
    this.data = data

    this.meta = {
      pnl: {
        nominal: 0,
        percentage: 0,
      },
      title: options.title,
    }
    this.axes = {
      x: {
        margin: 30,
        min: 60,
        max: this.width - 60 + 30,
      },
      y: {
        max: 0,
        min: 1,
        margin: 30,
        scale: 1,
      },
    }

    // calculate min & max values.
    this.setMaxMin()
    // calculate y scale
    this.setYScale()
    // calculate barPlotWidth
    this.setBarPlotWidth()
    // calculate metadata
    this.setPnl()

    // TODO :  REFACTOR THIS METHODS CODE. :(
    this.SVG_setHeader()
    this.SVG_setCandlesticks()
    this.SVG_setTitle()
    this.SVG_setPNL()
    this.SVG_setFooter()
  }

  setBarPlotWidth() {
    this.barPlotWidth = (this.axes.x.max - this.axes.x.min) / this.data.length
  }
  setMaxMin() {
    this.axes.y.max = this.data.reduce((currMax, [_, _a, dataY]) => Math.max(currMax, dataY), -Infinity)
    this.axes.y.min = this.data.reduce((currMin, [_, _a, _b, dataY]) => Math.min(currMin, dataY), Infinity)
  }
  setYScale() {
    this.axes.y.scale = (this.height - this.axes.y.margin) / (this.axes.y.max - this.axes.y.min)
  }
  yTransform(value: number) {
    return this.height - (value - this.axes.y.min) * this.axes.y.scale
  }
  xTransform(value: number) {
    return this.axes.x.min + value * this.barPlotWidth
  }
  setPnl() {
    const startValue = this.data[0][4]
    const nominalValue = this.data[this.data.length - 1][4] - this.data[0][4]
    const percentageValue = (nominalValue / startValue) * 100
    this.meta = {
      ...this.meta,
      pnl: {
        nominal: nominalValue,
        percentage: percentageValue,
      },
    }
  }
  setTitle(value: string) {
    this.meta = {
      ...this.meta,
      title: value.toUpperCase(),
    }
  }
  SVG_setTitle() {
    this.SVG.push(
      `<text style="font-family:Arial;font-weight:bold; font-size:24px" x="4" y="24" fill="#909090">${this.meta.title}</text>`,
    )
  }
  SVG_setPNL() {
    this.SVG.push(
      `<text style="font-family:Arial;font-weight:600;font-size:12px" x="4" y="40" fill="${
        this.meta.pnl.nominal > 0 ? '#2ea82e' : '#ca0c0c'
      }">${this.meta.pnl.nominal > 0 ? '+' : ''}${this.meta.pnl.nominal.toFixed(2)}</text>`,
    )

    this.SVG.push(
      `<text style="font-family:Arial;font-weight:600;font-size:12px" x="4" y="54" fill="${
        this.meta.pnl.percentage > 0 ? '#2ea82e' : '#ca0c0c'
      }">(${this.meta.pnl.percentage.toFixed(2)}%)</text>`,
    )
  }
  SVG_setCandlesticks() {
    const self = this
    this.SVG.push(
      `<g transform="translate(0, ${self.height + self.axes.y.margin / 2}) scale(1, -1)">` +
        `<g transform="translate(0, ${
          self.height + self.axes.y.margin
        }) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${self.axes.x.max / 2}" y="${
          self.yTransform(self.axes.y.min) + 8
        }"> min ${self.axes.y.min.toFixed(4)}</text></g>` +
        `<g transform="translate(0, ${
          self.height + self.axes.y.margin
        }) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${self.axes.x.max / 2}" y="${
          self.yTransform(self.axes.y.max) - 2
        }"> max ${self.axes.y.max.toFixed(4)}</text></g>` +
        `<line x1="${self.axes.x.min}" y1="${self.yTransform(self.axes.y.min)}" x2="${
          self.axes.x.max
        }" y2="${self.yTransform(self.axes.y.min)}" stroke="#ddd" /><line x1="${self.axes.x.min}" y1="${self.yTransform(
          self.axes.y.max,
        )}" x2="${self.axes.x.max}" y2="${self.yTransform(self.axes.y.max)}" stroke="#ddd" />` +
        `${self.data
          .map(([_, open, high, low, close], index) => {
            let xB = self.xTransform(index)
            let OPEN = self.yTransform(open)
            let HIGH = self.yTransform(high)
            let LOW = self.yTransform(low)
            let CLOSE = self.yTransform(close)
            return `<g transform="translate(0, ${self.height + self.axes.y.margin}) scale(1, -1)"> 
                <line x1="${xB + (self.barPlotWidth * 0.9) / 2}" y1="${HIGH}" x2="${
              xB + (self.barPlotWidth * 0.9) / 2
            }" y2="${LOW}" stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}" />
                <rect
                  x="${xB}"
                  y="${Math.min(CLOSE, OPEN)}"
                  width="${self.barPlotWidth * 0.9}"
                  height="${Math.abs(OPEN - CLOSE)}"
                  fill="${OPEN - CLOSE > 0 ? '#00eb00' : '#ec0000'}"
                  stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}"
                />  
                </g>`
          })
          .join('')}` +
        `</g>`,
    )
  }
  SVG_setHeader() {
    this.SVG.unshift(`<svg width="${this.width}" height="${this.height}" style="border:1px solid gray">`)
  }
  SVG_setFooter() {
    this.SVG.push('</svg>')
  }
}

export default BuildSvg
