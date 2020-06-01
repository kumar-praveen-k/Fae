import { describe, it, expect } from "./_describe.ts"
import { divide } from '../mod.ts'
import { eq } from "./utils/utils.ts"

describe('divide', () => {
  it('should divide two numbers', () => {
    eq(divide(25, 5), 5)
    eq(divide(25, 4), 6.25)
    eq(divide(NaN, 10), NaN)
    eq(divide(Infinity, 4), Infinity)
    eq(divide(25, Infinity), 0)
    eq(divide(Infinity, Infinity), NaN)
    eq(divide(0, 0), NaN)
    eq(divide(25, 0), Infinity)
  })
})