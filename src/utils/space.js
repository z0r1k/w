const { v4: uuidv4 } = require('uuid')
const config = require('../config/config')
const { ConfigurationError } = require('./errors')

module.exports = (area_width = 500, area_height = 300) => {
  const square_dimensions = parseInt(config.square, 10)
  area_width =  parseInt(area_width, 10)
  area_height =  parseInt(area_height, 10)

  if (!square_dimensions || square_dimensions < 0 || area_width < square_dimensions || area_height < square_dimensions) {
    throw new ConfigurationError('Area width or height or square dimensions is misconfigured')
  }

  const numSquaresHorizontal = Math.ceil(area_width / square_dimensions)
  const numSquaresVertical = Math.ceil(area_height / square_dimensions)

  const result = []
  for (let i = 0; i < numSquaresHorizontal; i++) {
    for (let j = 0; j < numSquaresVertical; j++) {
      result.push({
        id: uuidv4(),
        x: i * square_dimensions,
        y: j * square_dimensions,
      })
    }
  }

  return result
}
