/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ItemLink from '../../../src/components/user/ItemLink'
import { ItemLinkContainer } from '../../../src/containers/user/ItemLinkContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Graph] Testing ItemLinkContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ItemLinkContainer)
  })
  it('should render correctly and propagate its properties to ItemLink', () => {
    const props = {
      Icon: () => <div />,
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      additiveLineComponent: <a href="idk">Non</a>,
      onSelect: () => { },
      locked: false,
      selected: false,
    }
    const enzymeWrapper = shallow(<ItemLinkContainer {...props} />, { context })
    const itemLink = enzymeWrapper.find(ItemLink)
    assert.lengthOf(itemLink, 1, 'The corresponding component should be rendered')
    testSuiteHelpers.assertWrapperProperties(itemLink, {
      entity: props.entity,
      Icon: props.Icon,
      descriptionProperties: props.descriptionProperties,
      additiveLineComponent: props.additiveLineComponent,
      // also verify the link shares parent container state
      displayState: enzymeWrapper.state('displayState'),
    })
  })
  it('should manage display state when not locked and not selected, and provide it to child link component and to listeners', () => {
    let lastNotifiedState = null
    const props = {
      Icon: () => <div />,
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      additiveLineComponent: <a href="idk">Non</a>,
      onSelect: () => { },
      locked: false,
      selected: false,
      onStateChange: (newState) => {
        lastNotifiedState = newState
      },
    }
    // check initial state
    const enzymeWrapper = shallow(<ItemLinkContainer {...props} />, { context })
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.DEFAULT, 'The component should be in default state')
    assert.equal(lastNotifiedState, ItemLink.States.DEFAULT, 'listener should be called with initial state (default)')
    let itemLink = enzymeWrapper.find(ItemLink)
    assert.lengthOf(itemLink, 1, 'There should be a child link')
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (1)')

    // check mouse enter
    enzymeWrapper.instance().onMouseOver()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.HOVER, 'The component should be in hover state')
    assert.equal(lastNotifiedState, ItemLink.States.HOVER, 'listener should be called with hover state')
    itemLink = enzymeWrapper.find(ItemLink)
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (2)')

    // check mouse exit
    enzymeWrapper.instance().onMouseOut()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.DEFAULT, 'The component should be in back in default state')
    assert.equal(lastNotifiedState, ItemLink.States.DEFAULT, 'listener should be called back with default state')
    itemLink = enzymeWrapper.find(ItemLink)
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (3)')
  })
  it('should manage display state when selected and not locked, and provide it to child link component and to listeners', () => {
    let lastNotifiedState = null
    const props = {
      Icon: () => <div />,
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      additiveLineComponent: <a href="idk">Non</a>,
      onSelect: () => { },
      locked: false,
      selected: true,
      onStateChange: (newState) => {
        lastNotifiedState = newState
      },
    }
    // check initial state
    const enzymeWrapper = shallow(<ItemLinkContainer {...props} />, { context })
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.SELECTED, 'The component should be in selected state')
    assert.equal(lastNotifiedState, ItemLink.States.SELECTED, 'listener should be called with initial state (selected)')
    let itemLink = enzymeWrapper.find(ItemLink)
    assert.lengthOf(itemLink, 1, 'There should be a child link')
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (4)')

    // check mouse enter
    enzymeWrapper.instance().onMouseOver()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.SELECTED_HOVER, 'The component should be in selected_hover state')
    assert.equal(lastNotifiedState, ItemLink.States.SELECTED_HOVER, 'listener should be called with selected_hover state')
    itemLink = enzymeWrapper.find(ItemLink)
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (5)')

    // check mouse exit
    enzymeWrapper.instance().onMouseOut()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.SELECTED, 'The component should be in back in selected state')
    assert.equal(lastNotifiedState, ItemLink.States.SELECTED, 'listener should be called back with selected state')
    itemLink = enzymeWrapper.find(ItemLink)
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (6)')
  })
  it('should manage display state when locked: no event propagated', () => {
    let lastNotifiedState = null
    const props = {
      Icon: () => <div />,
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      additiveLineComponent: <a href="idk">Non</a>,
      onSelect: () => { },
      locked: true,
      selected: false,
      onStateChange: (newState) => {
        lastNotifiedState = newState
      },
    }
    // check initial state
    const enzymeWrapper = shallow(<ItemLinkContainer {...props} />, { context })
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.LOCKED, 'The component should be in initial locked state')
    assert.equal(lastNotifiedState, ItemLink.States.LOCKED, 'listener should be called with initial state (locked)')
    const itemLink = enzymeWrapper.find(ItemLink)
    assert.lengthOf(itemLink, 1, 'There should be a child link')
    assert.equal(itemLink.props().displayState, enzymeWrapper.state('displayState'), 'Child state should follow parent container state (4)')

    // check mouse enter
    enzymeWrapper.instance().onMouseOver()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.LOCKED, 'Event should be ignored (1)')
    assert.equal(lastNotifiedState, ItemLink.States.LOCKED, 'listener should not have get a new event (1)')

    // check mouse exit
    enzymeWrapper.instance().onMouseOut()
    enzymeWrapper.update() // wait for setState
    assert.equal(enzymeWrapper.state('displayState'), ItemLink.States.LOCKED, 'Event should be ignored (2)')
    assert.equal(lastNotifiedState, ItemLink.States.LOCKED, 'listener should not have get a new event (2)')
  })
  it('Should dispatch each state change only once', () => {
    let callCount = 0
    const props = {
      Icon: () => <div />,
      entity: DumpProvider.getFirstEntity('AccessProjectClient', 'DatasetEntity'),
      descriptionProperties: {
        showDescriptionOption: true,
        isDescriptionAvailableFor: () => true,
        onShowDescription: () => {},
      },
      additiveLineComponent: <a href="idk">Non</a>,
      onSelect: () => { },
      locked: false,
      selected: false,
      onStateChange: (newState) => {
        callCount += 1
      },
    }
    // check initial state
    const enzymeWrapper = shallow(<ItemLinkContainer {...props} />, { context })
    assert.equal(callCount, 1)
    callCount = 0

    enzymeWrapper.instance().onMouseOver()
    enzymeWrapper.instance().onMouseOver()
    enzymeWrapper.instance().onMouseOver()
    assert.equal(callCount, 1)

    callCount = 0
    enzymeWrapper.instance().onMouseOut()
    enzymeWrapper.instance().onMouseOut()
    enzymeWrapper.instance().onMouseOut()
    assert.equal(callCount, 1)

    callCount = 0
    enzymeWrapper.setProps({ ...props, selected: true })
    enzymeWrapper.setProps({ ...props, selected: true })
    assert.equal(callCount, 1)
  })
})
