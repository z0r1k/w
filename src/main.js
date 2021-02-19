const get_space = require('./utils/space')
const filter_space = require('./utils/filter')

!((area_width, area_height) => {

  const space = get_space(area_width, area_height)
  console.log('space tiles', space)

  const visibleTiles = filter_space(space, {
    area_width,
    area_height,
  }, {
    viewport_width: 125,
    viewport_height: 75
  }, {
    x: 0,
    y: 0
  })
  console.log('visible tiles', visibleTiles)

})(500, 300)
