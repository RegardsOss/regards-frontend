/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import Paper from 'material-ui/Paper'
import { DraggableCard } from '../../src/components/DraggableCard'
import ItemTypes from '../../src/components/ItemTypes'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing DraggableCard', () => {
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
    assert.isDefined(DraggableCard)
  })

  it('should render', () => {
    const props = {
      value: { data: { to: { save: 42 } } },
      connectDragSource: children => (children),
      title: 'Some title',
      draggableToContainerType: ItemTypes.ATTR_ASSOCIATED,
      children: (<div />),
      isDragging: false,
      isFragment: false,
      shadow: 1,
    }
    const context = {
      muiTheme: {
        layout: {
          cardEspaced: {},
        },
      },
    }
    const enzymeWrapper = shallow(<DraggableCard {...props} />, { context })
    const subComponent = enzymeWrapper.find(Paper)
    expect(subComponent).to.have.length(1)
  })
})
