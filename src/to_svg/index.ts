import { CandlesticksDataset, SvgOptions } from '../types'

export default function toSvg(data: CandlesticksDataset, options: SvgOptions) {
  const SVG_WIDTH = 324
  const SVG_HEIGHT = 180

  const maximumPrice = data.reduce((currMax, [_, _a, dataY]) => Math.max(currMax, dataY), -Infinity)
  const minimumPrice = data.reduce((currMin, [_, _a, _b, dataY]) => Math.min(currMin, dataY), Infinity)

  const yMax = maximumPrice * 1.0001
  const yMin = minimumPrice * 0.9999


  const xMin = 60
  const xMax = SVG_WIDTH - xMin + 20

  // Define the scale factor for the y-axis
  let yScale = SVG_HEIGHT / (yMax - yMin)

  // Define the transform function for the y-axis
  let yTransform = (value: number) => SVG_HEIGHT - (value - yMin) * yScale

  // const numYTicks = 5;
  const barPlotWidth = (xMax - xMin) / data.length
  let xTransform = (i: number) => xMin + i * barPlotWidth

  const pnlNominal = data[data.length - 1][4] - data[0][4]
  const startValue = data[0][4]
  const pnlPercentage = (pnlNominal / startValue) * 100
  const title = options.title

  return (
    `<svg width="${SVG_WIDTH}" height="${SVG_HEIGHT}" style="border:1px solid gray">` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)">` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${
      xMax / 2
    }" y="${yTransform(minimumPrice) + 8}"> min ${yMin.toFixed(4)}</text></g>` +
    `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"><text fill="#ddd" style="font-size:8px" x="${
      xMax / 2
    }" y="${yTransform(maximumPrice) - 2}"> max ${yMax.toFixed(4)}</text></g>` +
    `<line x1="${xMin}" y1="${yTransform(minimumPrice)}" x2="${xMax}" y2="${yTransform(
      minimumPrice,
    )}" stroke="#ddd" /><line x1="${xMin}" y1="${yTransform(maximumPrice)}" x2="${xMax}" y2="${yTransform(
      maximumPrice,
    )}" stroke="#ddd" />` +
    `${data
      .map(([_, open, high, low, close], index) => {
        let xB = xTransform(index)
        let OPEN = yTransform(open)
        let HIGH = yTransform(high)
        let LOW = yTransform(low)
        let CLOSE = yTransform(close)
        return `<g transform="translate(0, ${SVG_HEIGHT}) scale(1, -1)"> 
            <line x1="${xB + (barPlotWidth * 0.9) / 2}" y1="${HIGH}" x2="${
          xB + (barPlotWidth * 0.9) / 2
        }" y2="${LOW}" stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}" />
            <rect
              x="${xB}"
              y="${Math.min(CLOSE, OPEN)}"
              width="${barPlotWidth * 0.9}"
              height="${Math.abs(OPEN - CLOSE)}"
              fill="${OPEN - CLOSE > 0 ? '#00eb00' : '#ec0000'}"
              stroke="${OPEN - CLOSE > 0 ? '#1f8a1f' : '#720c00'}"
            />  
            </g>`
      })
      .join('')}` +
    `</g>` +
    `<text style="font-family:Arial;font-weight:bold; font-size:24px" x="4" y="24" fill="#909090">${title}</text>` +
    `<text style="font-family:Arial;font-weight:600;font-size:12px" x="4" y="40" fill="${
      pnlPercentage > 0 ? '#2ea82e' : '#ca0c0c'
    }">${pnlNominal > 0 ? '+' : ''}${pnlNominal.toFixed(2)}</text>` +
    `<text style="font-family:Arial;font-weight:600;font-size:12px" x="4" y="54" fill="${
      pnlPercentage > 0 ? '#2ea82e' : '#ca0c0c'
    }">(${pnlPercentage.toFixed(2)}%)</text>` 
    +`</svg>`
  )
}
