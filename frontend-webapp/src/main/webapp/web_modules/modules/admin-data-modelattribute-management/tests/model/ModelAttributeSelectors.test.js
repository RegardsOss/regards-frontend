/**
 * LICENSE_PLACEHOLDER
 **/
import { expect } from 'chai'
import ModelAttributeSelectors from '../../src/model/ModelAttributeSelectors'


describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeSelectors', () => {
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
    expect(ModelAttributeSelectors.getList(someStore)).to.eql({ hello: 'world' })
  })
})
