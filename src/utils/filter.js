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

  if (x === 0 && y === 0) {
    const numHorizontal = viewport_width > square_dimensions ? Math.ceil(viewport_width / square_dimensions) : 1
    const numVertical = viewport_height > square_dimensions ? Math.ceil(viewport_height / square_dimensions) : 1

    // if (numHorizontal === 1 && numVertical === 1) {
    //   result.push(tiles[0])
    // } else if (numHorizontal > 1 && numVertical === 1) {
    //   result = tiles.filter((tile) => tile.x <= numHorizontal * square_dimensions)
    // }
    // else if (numHorizontal === 1 && numVertical > 1) {
    //   result = tiles.filter((tile) => tile.y <= numVertical * square_dimensions)
    // }
    // else {
      result = tiles.filter((tile) => {
        return (tile.x < numHorizontal * square_dimensions) && (tile.y < numVertical * square_dimensions)
      })
    // }
  } else if (x === area_width && y === area_height) {
    const numHorizontal = viewport_width > square_dimensions ? Math.ceil(viewport_width / square_dimensions) : 1
    const numVertical = viewport_height > square_dimensions ? Math.ceil(viewport_height / square_dimensions) : 1


  }

  return result
}
