const space_getter = require('../utils/space')
const grid_example = require('./fixture/grid.json')

const get_tiles = () => space_getter(400, 400, 150)

describe('Creates 3x3 grid', () => {
  test('Should generate grid for given parameters', () => {
    const tiles = get_tiles()
    expect(tiles.length).toEqual(9)
    expect(
      tiles.map((tile) => {
        return {
          x: tile.x,
          y: tile.y,
        }
      }),
    ).toEqual(grid_example)
  })

  test('Should comply with schema', () => {
    const tile = get_tiles().pop()
    expect(tile.id).toBeDefined()
    expect(tile.x).toBeDefined()
    expect(tile.y).toBeDefined()
  })

  test('Should contain unique IDs', () => {
    const tiles = get_tiles()

    let hasDuplicates = false
    const ids = []

    // eslint-disable-next-line no-restricted-syntax
    for (const tile of tiles) {
      if (ids.includes(tile.id)) {
        hasDuplicates = true
        break
      }
      ids.push(tile.id)
    }

    expect(hasDuplicates).toBeFalsy()
  })
})
