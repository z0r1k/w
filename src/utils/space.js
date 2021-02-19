const { v4: uuidv4 } = require('uuid')
const { Configuration_Error } = require('./errors')

module.exports = (area_width, area_height, square) => {
  const square_dimensions = parseInt(square, 10)
  area_width = parseInt(area_width, 10)
  area_height = parseInt(area_height, 10)

  if (
    !square_dimensions ||
    square_dimensions < 0 ||
    area_width < square_dimensions ||
    area_height < square_dimensions
  ) {
    throw new Configuration_Error('Area width or height or square dimensions is misconfigured')
  }

  const num_squares_horizontal = Math.ceil(area_width / square_dimensions)
  const num_squares_vertical = Math.ceil(area_height / square_dimensions)

  const result = []
  for (let i = 0; i < num_squares_horizontal; i += 1) {
    for (let j = 0; j < num_squares_vertical; j += 1) {
      result.push({
        id: uuidv4(),
        x: i * square_dimensions,
        y: j * square_dimensions,
      })
    }
  }

  return result
}
