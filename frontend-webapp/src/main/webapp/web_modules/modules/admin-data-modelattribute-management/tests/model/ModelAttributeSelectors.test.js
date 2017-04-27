/**
 * LICENSE_PLACEHOLDER
 **/
import { expect } from 'chai'
import ModelAttributesSelectors from '../../src/model/ModelAttributesSelectors'


describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributesSelectors', () => {
  it('returns correct part of the state', () => {
    const someStore = {
      admin: {
        'data-management': {
          'model-attribute-management': {
            'model-attribute': {
              items: {
                hello: 'world',
              },
            },
          },
        },
      },
    }
    expect(ModelAttributesSelectors.getList(someStore)).to.eql({ hello: 'world' })
  })
})
