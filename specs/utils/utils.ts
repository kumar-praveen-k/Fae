import { expect } from '../_describe.ts'

export function eq(actual: any, expected: any) {
  expect(actual).toEqual(expected)
}

export function thr(func: Function, expected: any) {
  let f = true
  try {
    func()
    f = false
  } catch(e) {
    eq(e.message, expected)
  }
  if(!f) throw 'No Error Throw'
}
