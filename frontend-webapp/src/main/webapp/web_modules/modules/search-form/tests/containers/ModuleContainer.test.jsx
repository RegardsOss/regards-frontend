/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import sinon from 'sinon'
import { UnconnectedModuleContainer } from '../../src/containers/ModuleContainer'
import FormComponent from '../../src/components/user/FormComponent'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing User Container', () => {
  it('Should fetch the model attributes before rendering the criterion plugins', () => {
    const fetchAttributeCallback = sinon.spy()

    const criterion = [
      {
        id: 1,
        label: 'string-criterion',
        pluginId: 1,
        container: 'content',
        pluginConf: {
          attributes: {
            testAttr: 0,
            testAttr2: 1,
          },
        },
      },
      {
        id: 2,
        label: 'test-criterion',
        pluginId: 1,
        container: 'content',
        pluginConf: {
          attributes: {
            testAttr2: 1,
            testAttr3: 2,
          },
        },
      },
    ]

    const props = {
      layout: '{}',
      criterion,
      fetchAttribute: fetchAttributeCallback,
      attributeModels: {},
      attributeModelsFetching: true,
    }
    const wrapper = shallow(
      <UnconnectedModuleContainer
        {...props}
      />,
    )

    assert.equal(fetchAttributeCallback.callCount, 3, 'There sould be 3 attributes to fetch')
    assert.isTrue(fetchAttributeCallback.calledWith(0), 'The attribute with id 0 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(1), 'The attribute with id 1 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(2), 'The attribute with id 2 should be fetched')
    assert.isTrue(wrapper.find(FormComponent).length === 1, 'There should be one FormComponent rendered')
  })
})
