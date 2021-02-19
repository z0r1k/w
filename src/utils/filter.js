const { Configuration_Error } = require('./errors')
const Schema = require('../schema/filter')

// typescript definitely would be a better fit here to check interfaces and types
const validate = ({ area_width, area_height, viewport_width, viewport_height, ...rest } = {}) => {
  const validation_result = Schema.validate({
    viewport_width,
    viewport_height,
    area_width,
    area_height,
    ...rest,
  })
  if (validation_result.error) {
    console.debug('Validation errors', validation_result.error.details)
  }
  return !(viewport_width > area_width || viewport_height > area_height || validation_result.error)
}

const sanitize = (props = {}) => {
  if (!props || !Object.keys(props).length) {
    throw new Configuration_Error('Missing required parameters')
  }

  const result = {}
  Object.keys(props).forEach((prop_name) => {
    result[prop_name] = parseInt(props[prop_name], 10)
  })

  return result
}

// when x,y is top left corner
const find_fixed_top = ({ viewport_width, viewport_height, square_dimensions, tiles } = {}) => {
  const num_horizontal = viewport_width > square_dimensions ? Math.ceil(viewport_width / square_dimensions) : 1
  const num_vertical = viewport_height > square_dimensions ? Math.ceil(viewport_height / square_dimensions) : 1

  return tiles.filter((tile) => {
    return tile.x < num_horizontal * square_dimensions && tile.y < num_vertical * square_dimensions
  })
}

// when x,y is bottom right corner
const find_fixed_bottom = ({
  area_width,
  area_height,
  viewport_width,
  viewport_height,
  square_dimensions,
  tiles,
} = {}) => {
  const viewport_top_left_horizontal = area_width - viewport_width
  const viewport_top_left_vertical = area_height - viewport_height

  return tiles.filter((tile) => {
    return (
      viewport_top_left_horizontal - tile.x < square_dimensions &&
      viewport_top_left_vertical - tile.y < square_dimensions
    )
  })
}

// when x,y is somewhere in the area
const find_floating = ({
  area_width,
  area_height,
  viewport_width,
  viewport_height,
  x,
  y,
  square_dimensions,
  tiles,
} = {}) => {
  const area_percent_horizontal = Math.ceil((x * 100) / area_width)
  const area_percent_vertical = Math.ceil((y * 100) / area_height)

  let viewport_top_left_horizontal = x - (viewport_width * area_percent_horizontal) / 100
  if (viewport_top_left_horizontal < 0) {
    viewport_top_left_horizontal = 0
  }
  let viewport_top_left_vertical = y - (viewport_height * area_percent_vertical) / 100
  if (viewport_top_left_vertical < 0) {
    viewport_top_left_vertical = 0
  }
  // console.debug(`viewport_top_left: [${viewport_top_left_horizontal},${viewport_top_left_vertical}]`)

  let viewport_bottom_right_horizontal = x + (viewport_width * (100 - area_percent_horizontal)) / 100
  if (viewport_bottom_right_horizontal > area_width) {
    viewport_bottom_right_horizontal = area_width
  }
  let viewport_bottom_right_vertical = y + (viewport_height * (100 - area_percent_vertical)) / 100
  if (viewport_bottom_right_vertical > area_height) {
    viewport_bottom_right_vertical = area_height
  }
  // console.debug(`viewport_bottom_right: [${viewport_bottom_right_horizontal},${viewport_bottom_right_vertical}]`)

  const closest_horizontal_boundary = viewport_top_left_horizontal - (viewport_top_left_horizontal % square_dimensions)
  const closest_vertical_boundary = viewport_top_left_vertical - (viewport_top_left_vertical % square_dimensions)
  // console.debug(`closest_boundary: [${closest_horizontal_boundary},${closest_vertical_boundary}]`)

  return tiles.filter((tile) => {
    return (
      tile.x >= closest_horizontal_boundary &&
      tile.x < viewport_bottom_right_horizontal &&
      tile.y >= closest_vertical_boundary &&
      tile.y < viewport_bottom_right_vertical
    )
  })
}

module.exports = (
  tiles = [],
  { area_width: raw_area_width, area_height: raw_area_height } = {},
  { viewport_width: raw_viewport_width, viewport_height: raw_viewport_height } = {},
  { x: raw_x, y: raw_y } = {},
  raw_square = 200,
) => {
  const { square_dimensions, area_width, area_height, viewport_width, viewport_height, x, y } = sanitize({
    square_dimensions: raw_square,
    area_width: raw_area_width,
    area_height: raw_area_height,
    viewport_width: raw_viewport_width,
    viewport_height: raw_viewport_height,
    x: raw_x,
    y: raw_y,
  })

  if (
    !validate({
      area_width,
      area_height,
      viewport_width,
      viewport_height,
      square_dimensions,
      x,
      y,
      tiles: tiles.length,
    })
  ) {
    throw new Configuration_Error('Wrong input parameters')
  }

  if (viewport_width === area_width && viewport_height === area_height) {
    return tiles
  }

  if (x === 0 && y === 0) {
    return find_fixed_top({ viewport_width, viewport_height, square_dimensions, tiles })
  }

  if (x === area_width && y === area_height) {
    return find_fixed_bottom({ area_width, area_height, viewport_width, viewport_height, square_dimensions, tiles })
  }

  return find_floating({ area_width, area_height, viewport_width, viewport_height, x, y, square_dimensions, tiles })
}
