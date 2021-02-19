const yargs = require('yargs')
const config = require('./config/config.json')
const space_getter = require('./utils/space')
const space_filter = require('./utils/filter')

const { argv } = yargs
  .option('area_width', {
    alias: 'aw',
    description: 'Area Width',
    type: 'number',
  })
  .option('area_height', {
    alias: 'ah',
    description: 'Area Height',
    type: 'number',
  })
  .option('square', {
    alias: 'sq',
    description: 'Square Size',
    type: 'number',
  })
  .option('viewport_width', {
    alias: 'vw',
    description: 'Viewport Width',
    type: 'number',
  })
  .option('viewport_height', {
    alias: 'vh',
    description: 'Viewport Height',
    type: 'number',
  })
  .option('x', {
    alias: 'xp',
    description: 'X position',
    type: 'number',
  })
  .option('y', {
    alias: 'yp',
    description: 'Y position',
    type: 'number',
  })
  .help()
  .alias('help', 'h')

!(({ area_width, area_height, square, viewport_width, viewport_height, x, y } = config) => {
  console.debug(`Area: [${area_width}, ${area_height}]`)
  console.debug(`Square: [${square} x ${square}]`)
  console.debug(`Viewport: [${viewport_width}, ${viewport_width}]`)
  console.debug(`Coordinates: [${x}, ${y}]`)
  console.debug(`\n`)

  try {
    const space = space_getter(area_width, area_height, square)
    console.log('space tiles', space)

    const visibleTiles = space_filter(
      space,
      { area_width, area_height },
      { viewport_width, viewport_height },
      { x, y },
      square,
    )
    console.log('visible tiles', visibleTiles)
  } catch (err) {
    console.error('Something went wrong -- ', err)
  }
})({
  area_width: argv.area_width || config.area_width,
  area_height: argv.area_height || config.area_height,
  square: argv.square || config.square,
  viewport_width: argv.viewport_width || config.viewport_width,
  viewport_height: argv.viewport_height || config.viewport_height,
  x: argv.x || config.x,
  y: argv.y || config.y,
})
