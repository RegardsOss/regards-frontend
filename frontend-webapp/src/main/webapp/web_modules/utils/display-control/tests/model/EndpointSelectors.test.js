/**
 * @author lmieulet
 */
import { expect } from 'chai'
import EndpointSelectors from '../../src/model/EndpointSelectors'

describe('[DISPLAY CONTROL UTILS] Testing endpoints selectors', () => {
  it('should return the correct object', () => {
    const currentState = {
      common: {
        endpoints: {
          items: {
            hello: 'world',
          },
        },
      },
    }
    const expectedResult = {
      hello: 'world',
    }
    expect(EndpointSelectors.getEndpointsItems(currentState)).to.eql(expectedResult)
  })
})
