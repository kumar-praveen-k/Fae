// fae-no-check
import { describe, it } from './_describe.ts'
import { pathOr, _ } from '../mod.ts'
import { eq } from './utils/utils.ts'

describe('pathOr', () => {
  let deepObject = {
    a: { b: { c: 'c' } },
    falseVal: false,
    nullVal: null,
    undefinedVal: undefined,
    arrayVal: ['arr'],
  }

  it('should take a path and an object and returns the value at the path or the default value', () => {
    let obj = {
      a: {
        b: {
          c: 100,
          d: 200,
        },
        e: {
          f: [100, 101, 102],
          g: 'G',
        },
        h: 'H',
      },
      i: 'I',
      j: ['J'],
    }
    eq(pathOr('Unknown', ['a', 'b', 'c'], obj), 100)
    eq(pathOr('Unknown', [], obj), obj)
    eq(pathOr('Unknown', '', obj), obj)
    eq(pathOr('Unknown', ['a', ''], obj), 'Unknown')
    eq(pathOr('Unknown', ['a', 'e', 'f', 1], obj), 101)
    eq(pathOr('Unknown', ['a', 'e', 'f', -2], obj), 101)
    eq(pathOr('Unknown', ['j', 0], obj), 'J')
    eq(pathOr('Unknown', ['j', 1], obj), 'Unknown')
    eq(pathOr('Unknown', ['a', 'b', 'c'], null), 'Unknown')
  })

  it("should get a deep property's value from objects", () => {
    eq(pathOr('Unknown', ['a', 'b', 'c'], deepObject), 'c')
    eq(pathOr('Unknown', ['a'], deepObject), deepObject.a)
  })

  it('should return the default value for items not found', () => {
    eq(pathOr('Unknown', ['a', 'b', 'foo'], deepObject), 'Unknown')
    eq(pathOr('Unknown', ['bar'], deepObject), 'Unknown')
  })

  it('should return the default value for null/undefined', () => {
    eq(pathOr('Unknown', ['toString'], null), 'Unknown')
    eq(pathOr('Unknown', [], null), 'Unknown')
    // @ts-ignore: object is undefined
    eq(pathOr('Unknown', ['toString'], undefined), 'Unknown')
  })

  it('should work with falsy items', () => {
    eq(
      // @ts-ignore: object is boolean
      pathOr('Unknown', ['toString'], false),
      Boolean.prototype.toString,
    )
  })

  it('should test curried versions too', () => {
    eq(pathOr('Default', 'a')({ a: 2, b: 3, c: { k: [1, 2, 3] } }), 2)
    eq(
      pathOr('Undefined', _, { a: 2, b: 3, c: { k: [1, 2, 3] } })(
        'c.k.e',
      ),
      'Undefined',
    )
    eq(
      pathOr(
        'Default',
        'c.k.0',
      )({ a: 2, b: 3, c: { k: [1, 2, 3] } }),
      1,
    )
    eq(
      pathOr('Default')('c/k/-1')({
        a: 2,
        b: 3,
        c: { k: [1, 2, 3] },
      }),
      3,
    )
    eq(pathOr('Default')('a')({ a: 2, b: 3, c: { k: [1, 2, 3] } }), 2)
    eq(
      pathOr(_, _, { a: 2, b: 3, c: { k: [1, 2, 3] } })('Undefined')(
        'c.k.e',
      ),
      'Undefined',
    )
    eq(
      pathOr('Default', _, { a: 2, b: 3, c: { k: [1, 2, 3] } })(
        'c.k.0',
      ),
      1,
    )
    eq(
      pathOr(_, 'c.k.e', { a: 2, b: 3, c: { k: [1, 2, 3] } })(
        'Undefined',
      ),
      'Undefined',
    )
    eq(
      pathOr(_, 'c/k/3')('Default')({
        a: 2,
        b: 3,
        c: { k: [1, 2, 3] },
      }),
      'Default',
    )
  })
})
