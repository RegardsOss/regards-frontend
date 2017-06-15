/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { TableRow } from 'material-ui/Table'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo } from '@regardsoss/components'
import AttributesComponent from '../../../../../src/components/description/properties/attributes/AttributesComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing AttributesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)


  it('should exists', () => {
    assert.isDefined(AttributesComponent)
  })
  it('should render properly in no data mode', () => {
    const props = {
      contentHeight: 20,
      entityLabel: 'jobijoba',
      attributes: [],
    }
    const enzymeWrapper = shallow(<AttributesComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isTrue(noDataWrapper.props().noContent, 'It should currently display a no data mode')
  })
  it('should render properly with content, delegating rendering when value is not null', () => {
    const props = {
      contentHeight: 20,
      entityLabel: 'jobijoba',
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
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isFalse(noDataWrapper.props().noContent, 'It should not display a no data')

    // find: one row for each attribute, + one for the header and one for tags
    const rowsWrapper = enzymeWrapper.find(TableRow)
    assert.lengthOf(rowsWrapper, props.attributes.length + 2, 'There should be one row for each attribute and one more for the header')

    assert.lengthOf(enzymeWrapper.find(props.attributes[0].renderer), 1, 'The first renderer should be used as value is not null')
    assert.lengthOf(enzymeWrapper.find(props.attributes[1].renderer), 0, 'The second renderer should not be used as value is null')
  })
})
