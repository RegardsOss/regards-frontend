/**
 * Created by lmieulet on 05/12/16.
 */
import { expect } from 'chai'
import AuthenticationSelectors from '../src/AuthenticationSelectors'


describe('[AUTHENTICATION UTILS] Testing authentication selectors', () => {
  it('returns correct part of the state', () => {
    const someStore = {
      common: {
        authentication: {
          hello: 'world',
        },
      },
    }

    expect(AuthenticationSelectors.getAuthentication(someStore)).to.eql({ hello: 'world' })
  })
})
