const get_space = require('./utils/space')
const filter_space = require('./utils/filter')

!((area_width, area_height) => {

  const space = get_space(area_width, area_height)
  console.log('space tiles', space)

  const visibleTiles = filter_space(space, {
    area_width,
    area_height,
  }, {
    viewport_width: 225,
    viewport_height: 215
  }, {
    x: 500,
    y: 300
  })
  console.log('visible tiles', visibleTiles)

})(500, 300)
