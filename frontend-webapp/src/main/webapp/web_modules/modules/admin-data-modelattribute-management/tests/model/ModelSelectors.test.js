/**
 * LICENSE_PLACEHOLDER
 **/
import { expect } from 'chai'
import ModelSelectors from '../../src/model/ModelSelectors'


describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelSelectors', () => {
  it('returns correct part of the state', () => {
    const someStore = {
      admin: {
        'data-management': {
          'model-attribute-management': {
            model: {
              items: {
                hello: 'world',
              },
            },
          },
        },
      },
    }

    expect(ModelSelectors.getList(someStore)).to.eql({ hello: 'world' })
  })
})
