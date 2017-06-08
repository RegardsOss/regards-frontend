/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { CardText } from 'material-ui/Card'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ContainerCard } from '../../src/components/ContainerCard'
import ItemTypes from '../../src/components/ItemTypes'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ContainerCard', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ContainerCard)
  })

  it('should render', () => {
    const props = {
      connectDropTarget: children => (children),
      title: "Some title",
      acceptAttrType: ItemTypes.ATTR_ASSOCIATED,
      children: (<div />),
      onChange: () => {},
      canDrop: false,
      isOver: false,
    }
    const context = {
      muiTheme: {
        layout: {
          cardEspaced: {},
        },
      },
    }
    const enzymeWrapper = shallow(<ContainerCard {...props} />, { context })
    const subComponent = enzymeWrapper.find(CardText)
    expect(subComponent).to.have.length(1)
  })
})
