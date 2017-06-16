/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AttributesComponent from '../../../../../src/components/description/properties/attributes/AttributesComponent'
import LoadingDisplayerComponent from '../../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing AttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AttributesComponent)
  })
  it('should render correctly when no data', () => {
    const props = {
      loading: false,
      // entity attributes, empty array allowed
      attributes: [],
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const noDataMessageWrapper = enzymeWrapper.findWhere(n => n.props().id === 'entities.common.properties.attribute.cell.no.value')
    assert.lengthOf(noDataMessageWrapper, 1, 'There should be a no data message displayer ')
  })
  it('should render correctly when loading', () => {
    const props = {
      loading: true,
      attributes: [],
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const loadingWrapper = enzymeWrapper.find(LoadingDisplayerComponent)
    assert.lengthOf(loadingWrapper, 1, 'There should be a loading displayer')
  })
  it('should render correctly with content', () => {
    const props = {
      loading: false,
      attributes: [{
        id: 0,
        label: 'un tout',
        renderer: () => <div id="renderer1" />,
        renderValue: { main: 'a Value' },
      }, {
        id: 1,
        label: 'petit bikini',
        renderer: () => <div id="renderer2" />,
        renderValue: null,
      }],

    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(props.attributes[0].renderer), 1, 'The first renderer should be used as value is not null')
    assert.lengthOf(enzymeWrapper.find(props.attributes[1].renderer), 0, 'The second renderer should not be used as value is null')
  })
})
