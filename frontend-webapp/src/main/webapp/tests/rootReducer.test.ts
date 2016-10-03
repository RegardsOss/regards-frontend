import rootReducer from "../src/rootReducer"
import { assert } from "chai"


describe('[MAIN APP] Testing rootReducer', () => {

  it('should exist', () => {
    assert.isNotNull(rootReducer)
  })

})
