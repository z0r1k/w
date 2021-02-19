const config = require('../config/config')
const { ConfigurationError } = require('./errors')

// typescript definitely would be a better fit here
module.exports = (tiles = [], {area_width, area_height} = {}, {viewport_width, viewport_height} = {}, {x, y} = {}) => {
  const square_dimensions = parseInt(config.square, 10)
  area_width = parseInt(area_width, 10)
  area_height = parseInt(area_height, 10)
  viewport_width = parseInt(viewport_width, 10)
  viewport_height = parseInt(viewport_height, 10)
  x = parseInt(x, 10)
  y = parseInt(y, 10)

  if (
    viewport_width > area_width ||
    viewport_height > area_height ||
    !tiles.length ||
    !area_width ||
    !area_height ||
    area_width <= 0 ||
    area_height <= 0 ||
    !viewport_width ||
    !viewport_height ||
    viewport_width <= 0 ||
    viewport_height <= 0 ||
    isNaN(x) ||
    isNaN(y) ||
    x < 0 ||
    y < 0
  ) {
    throw new ConfigurationError('Wrong input parameters')
  }

  if (viewport_width === area_width && viewport_height === area_height) {
    return tiles
  }

  let result = []

  const numHorizontal = viewport_width > square_dimensions ? Math.ceil(viewport_width / square_dimensions) : 1
  const numVertical = viewport_height > square_dimensions ? Math.ceil(viewport_height / square_dimensions) : 1

  // edge cases first
  if (x === 0 && y === 0) {
    result = tiles.filter((tile) => {
      return (tile.x < numHorizontal * square_dimensions) && (tile.y < numVertical * square_dimensions)
    })
  }
  // second edge case...
  else if (x === area_width && y === area_height) {
    const left_top_viewport_x = area_width - viewport_width
    const left_top_viewport_y = area_height - viewport_height

    result = tiles.filter((tile) => {
      return (left_top_viewport_x - tile.x < square_dimensions) && (left_top_viewport_y - tile.y < square_dimensions)
    })
  }

  // TODO go read how to find out is one rectangle fits in to a square around it... shame on you for not remembering it

  return result
}
