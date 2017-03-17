/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { CardText } from 'material-ui/Card'
import { ContainerCard } from '../../src/components/ContainerCard'
import ItemTypes from '../../src/components/ItemTypes'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ContainerCard', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })

  it('should exists', () => {
    assert.isDefined(ContainerCard)
  })

  it('should render', () => {
    const props = {
      connectDropTarget: children => (children),
      title: (<span>Some title</span>),
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
