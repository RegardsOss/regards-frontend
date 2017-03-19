/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { stub, spy } from 'sinon'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { IntlStub } from '@regardsoss/tests-helpers'
import Styles from '../../src/styles/styles'
import { UnconnectedModuleContainer } from '../../src/containers/ModuleContainer'
import FormComponent from '../../src/components/user/FormComponent'
import { DATASET_TYPE } from '../../src/models/datasets/DatasetSelectionTypes'

/**
 * Tests for ModuleContainer
 * @author Sébastien binda
 */
describe('[SEARCH FORM] Testing User Container', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  const muiTheme = getMuiTheme({})
  const options = {
    context: {
      muiTheme,
      moduleTheme: Styles(muiTheme),
      intl: IntlStub,
    },
  }
  it('Should fetch the model attributes before rendering the criterion plugins', () => {
    const fetchAttributeCallback = spy()

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
      project: 'test',
      appName: 'test',
      moduleConf: {
        enableFacettes: false,
        layout: {
          id: 'main',
          type: 'type',
        },
        criterion,
        datasets: {
          type: DATASET_TYPE,
          selectedDatasets: [],
          selectedModels: [],
        },
      },
      fetchAttribute: fetchAttributeCallback,
      attributeModels: {},
      attributeModelsFetching: true,
    }
    const wrapper = shallow(
      <UnconnectedModuleContainer
        {...props}
      />, options,
    )

    assert.equal(fetchAttributeCallback.callCount, 3, 'There sould be 3 attributes to fetch')
    assert.isTrue(fetchAttributeCallback.calledWith(0), 'The attribute with id 0 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(1), 'The attribute with id 1 should be fetched')
    assert.isTrue(fetchAttributeCallback.calledWith(2), 'The attribute with id 2 should be fetched')
    assert.isTrue(wrapper.find(FormComponent).length === 1, 'There should be one FormComponent rendered')
  })
})
