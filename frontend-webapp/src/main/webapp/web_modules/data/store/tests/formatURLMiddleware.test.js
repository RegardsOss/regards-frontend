import { assert } from 'chai'
const { CALL_API } = require('redux-api-middleware')
import formatURLMiddleware from '../src/formatURLMiddleware'


describe('[STORE DATA MANAGEMENT] Testing formatURLMiddleware', () => {
  it('should exists', () => {
    assert.isDefined(formatURLMiddleware)
    assert.isFunction(formatURLMiddleware)
  })

  it('keep valid URL unchanged', () => {
    const validURL = 'http://localhost:3333/user/cdpp/modules/12?t=dataobjects&u=pouet'
    const callResult = { updatedURL: undefined }
    const asserter = ((action) => {
      callResult.updatedURL = action[CALL_API].endpoint
    })
    formatURLMiddleware()(asserter)({
      [CALL_API]: {
        endpoint: validURL,
      },
    })
    assert.equal(callResult.updatedURL, validURL, 'The action endpoint should remain unchanged')
  })

  it('should update invalid URLs', () => {
    const invalidURL = 'http://localhost:3333/user /cdpp /modules/12?t=dataobjects&u=po uet'
    const validURL = 'http://localhost:3333/user%20/cdpp%20/modules/12?t=dataobjects&u=po%20uet'
    const callResult = { updatedURL: undefined }
    const asserter = ((action) => {
      callResult.updatedURL = action[CALL_API].endpoint
    })
    formatURLMiddleware()(asserter)({
      [CALL_API]: {
        endpoint: invalidURL,
      },
    })
    assert.equal(callResult.updatedURL, validURL, 'The action endpoint should remain unchanged')
  })
})
