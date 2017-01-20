/**
 * LICENSE_PLACEHOLDER
 **/
import { expect } from 'chai'
import AttributeModelSelectors from '../../src/model/AttributeModelSelectors'


describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing AttributeModelSelectors', () => {
  it('returns correct part of the state', () => {
    const someStore = {
      admin: {
        'data-management': {
          'model-attribute-management': {
            'attribute-model': {
              items: {
                hello: 'world',
              },
            },
          },
        },
      },
    }
    expect(AttributeModelSelectors.getList(someStore)).to.eql({ hello: 'world' })
  })
})
