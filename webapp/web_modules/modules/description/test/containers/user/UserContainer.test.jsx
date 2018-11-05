/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DESCRIPTION_TABS_ENUM } from '../../../src/model/DescriptionTabsEnum'
import { UserContainer } from '../../../src/containers/user/UserContainer'
import EntityDescriptionComponent from '../../../src/components/user/EntityDescriptionComponent'
import styles from '../../../src/styles/styles'
import { fullModuleConf } from '../../dumps/configuration.dump'

const context = buildTestContext(styles)


describe('[Description] Testing UserContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UserContainer)
  })
  it('should render correctly when not requested', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: fullModuleConf,
      dialogState: {
        visible: false,
      },
      shownEntity: null,
      currentTab: null,
      initializeContext: () => { },
      onClose: () => { },
      onChangeTab: () => { },
    }

    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const component = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(component, 1, 'Component should be rendered')
    assert.isNotOk(component.props().entity, 'The entity should not be set (so component will not show up)')
  })

  it('should render correctly when current context is currently set', () => {
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: fullModuleConf,
      currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES,
      dialogState: {
        visible: false,
      },
      shownEntity: {
        content: {
          id: 'URN:helloooooooooooooo Nanny!',
          providerId: 'UnLapin',
          label: 'Hello, dear nanny',
          entityType: 'COLLECTION',
          model: '1',
          files: {},
          tags: [],
        },
      },
      initializeContext: () => { },
      onClose: () => { },
      onChangeTab: () => { },
    }
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    const component = enzymeWrapper.find(EntityDescriptionComponent)
    assert.lengthOf(component, 1, 'Component should be rendered')
    assert.equal(component.props().entity, props.shownEntity, 'The entity should be set (so component will show up)')
    assert.equal(component.props().currentTab, props.currentTab, 'The current tab should be correctly set')
  })

  it('should ignore request that are no pointing out this module', () => {
    let spiedInitCount = 0
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: fullModuleConf,
      currentTab: null,
      dialogState: {
        visible: false,
      },
      shownEntity: null,
      initializeContext: () => {
        spiedInitCount += 1
      },
      onClose: () => { },
      onChangeTab: () => { },
    }

    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    assert.equal(spiedInitCount, 0, 'Initialize context should not have initially been called')

    enzymeWrapper.setProps({
      visible: true,
      consumerID: 'not-that-module',
    })
    assert.equal(spiedInitCount, 0, 'Initialize context should not be called for another consumer ID')
  })

  it('should initialize context when a dialog request for this module comes in', () => {
    let spiedInitEntity = null
    const props = {
      projectName: 'project1',
      accessToken: 'abcdef....',
      appName: 'any',
      type: 'description',
      moduleConf: fullModuleConf,
      currentTab: DESCRIPTION_TABS_ENUM.PROPERTIES,
      dialogState: {
        visible: false,
      },
      shownEntity: null,
      initializeContext: (initEntity) => {
        spiedInitEntity = initEntity
      },
      onClose: () => { },
      onChangeTab: () => { },
    }

    // Init without request
    const enzymeWrapper = shallow(<UserContainer {...props} />, { context })
    assert.isNull(spiedInitEntity)

    // Mimics a reduced dialog state change
    const descriptionEntity = {
      content: {
        id: 'URN:helloooooooooooooo Nanny!',
        model: {
          id: 1,
        },
        label: 'Hello, dear nanny',
        tags: [],
        entityType: 'DATA',
      },
    }

    let spiedOnSearchCalledCount = 0
    const spiedOnSearch = () => { spiedOnSearchCalledCount += 1 } // simple marker toc

    enzymeWrapper.setProps({
      ...props,
      dialogState: {
        visible: true,
        consumerID: enzymeWrapper.instance().consumerID,
        parameters: {
          entity: descriptionEntity,
          onSearchTag: spiedOnSearch,
        },
      },
    })
    // check that initialization was correctly dispatched to show dialog window
    assert.deepEqual(spiedInitEntity, descriptionEntity, 'The initialization entity should be retrieved from dialog state parameters')
    // test that the right search call back is used (from dialog state parameters)
    enzymeWrapper.instance().onSearchTag('xxx')
    assert.equal(spiedOnSearchCalledCount, 1, 'On search tag should have been call using dialog state parameters method')
  })
})
