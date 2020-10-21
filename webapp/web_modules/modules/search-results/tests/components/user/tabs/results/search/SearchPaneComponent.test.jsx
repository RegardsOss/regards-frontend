/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 **/
import root from 'window-or-global'
import Drawer from 'material-ui/Drawer'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import SearchIcon from 'mdi-material-ui/Magnify'
import ClearIcon from 'mdi-material-ui/Eraser'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { UIDomain } from '@regardsoss/domain'
import SearchPaneComponent from '../../../../../../src/components/user/tabs/results/search/SearchPaneComponent'
import CriteriaListComponent from '../../../../../../src/components/user/tabs/results/search/CriteriaListComponent'
import styles from '../../../../../../src/styles'
import { attributes } from '../../../../../dumps/attributes.dump'

const context = buildTestContext(styles)

/**
 * Test SearchPaneComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing SearchPaneComponent', () => {
  before(() => {
    testSuiteHelpers.before()
    root.document = {
      addEventListener: () => {},
      removeEventListener: () => {},
    }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.document
  })


  it('should exists', () => {
    assert.isDefined(SearchPaneComponent)
  })
  // common props for all tests
  const commonProps = {
    rootContextCriteria: [{ requestParameters: { miniParam1: 'myMiniVal1', q: 'osef:true' } }, { requestParameters: { plop: 'plouf' } }],
    groups: [{
      showTitle: true,
      title: {
        [UIDomain.LOCALES_ENUM.en]: 'Group 1',
        [UIDomain.LOCALES_ENUM.fr]: 'Groupe 1',
      },
      criteria: [{
        pluginId: 8,
        pluginInstanceId: 'anythingIWant',
        conf: {
          attributes: { attr1: attributes[1].content },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
        state: { OK: true, kos: 36 },
        requestParameters: { ok: true, q: 'afterKos: [* TO 36]' },
      }, {
        pluginId: 10,
        pluginInstanceId: 'anythingIWant2',
        conf: {
          attributes: { },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'X2', [UIDomain.LOCALES_ENUM.fr]: 'X2(FR)' },
      }],
    }, {
      showTitle: false,
      title: {
        [UIDomain.LOCALES_ENUM.en]: '',
        [UIDomain.LOCALES_ENUM.fr]: '',
      },
      criteria: [{
        pluginId: 65,
        pluginInstanceId: 'anythingIWant3',
        conf: {
          attributes: { attr1000: attributes[2].content },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'Plugin1', [UIDomain.LOCALES_ENUM.fr]: 'Plugin1' },
        state: { count: { exact: true, val: 26 }, error: true },
        requestParameters: { q: 'count: [* TO 25] AND [27 TO *]' },
        delayedRequestParameters: { q: 'count: 25' },
      }],
    }, {
      showTitle: true,
      title: {
        [UIDomain.LOCALES_ENUM.en]: 'Group 3',
        [UIDomain.LOCALES_ENUM.fr]: 'Groupe 3',
      },
      criteria: [{
        pluginId: 8,
        pluginInstanceId: 'oyeoye',
        conf: { // configuration
          attributes: { attr1: attributes[2].content },
        },
        label: { [UIDomain.LOCALES_ENUM.en]: 'aye', [UIDomain.LOCALES_ENUM.fr]: 'aye' },
      }],
    }],
    onUpdatePluginState: () => {},
    onResetPluginsStates: () => {},
    onSearch: () => {},
    onClose: () => {},
  }
  it('should render correctly opened, with search enabled', () => {
    const props = {
      ...commonProps,
      open: true,
      searchDisabled: false,
    }
    const enzymeWrapper = shallow(<SearchPaneComponent {...props} />, { context })
    // 1 - Check drawer
    const drawer = enzymeWrapper.find(Drawer)
    assert.lengthOf(drawer, 1, 'There should be the drawer')
    assert.isTrue(drawer.props().open, 'Drawer should be open')
    // 2 - Check title and close button
    assert.lengthOf(enzymeWrapper.find(SearchIcon), 1, 'There should be title icon')
    assert.include(enzymeWrapper.debug(), 'search.results.search.pane.title', 'There should be title message')
    const closeButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(closeButtonWrapper, 1, 'There should be close button')
    testSuiteHelpers.assertWrapperProperties(closeButtonWrapper, {
      title: 'search.results.search.pane.close.tooltip',
      onClick: props.onClose,
    }, 'Close button properties should be correctly reported')
    assert.lengthOf(closeButtonWrapper.find(CloseIcon), 1, 'There should be close button icon')
    // 3 - Check criteria list
    const criteriaListWrapper = enzymeWrapper.find(CriteriaListComponent)
    assert.lengthOf(criteriaListWrapper, 1, 'There should be criteria list')
    testSuiteHelpers.assertWrapperProperties(criteriaListWrapper, {
      rootContextCriteria: props.rootContextCriteria,
      groups: props.groups,
      onUpdatePluginState: props.onUpdatePluginState,
    }, 'Criteria list properties should be correctly reported')
    // 4 - Check reset and search options
    const buttonsWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonsWrapper, 2, 'There should be two buttons')
    testSuiteHelpers.assertWrapperProperties(buttonsWrapper.at(0), {
      icon: <ClearIcon />,
      label: 'search.results.search.pane.reset.label',
      title: 'search.results.search.pane.reset.title',
      onClick: props.onResetPluginsStates,
    }, 'Reset button properties should be correctly set')
    testSuiteHelpers.assertWrapperProperties(buttonsWrapper.at(1), {
      icon: <SearchIcon />,
      disabled: props.searchDisabled,
      label: 'search.results.search.pane.search.label',
      title: 'search.results.search.pane.search.title',
      onClick: props.onSearch,
    }, 'Search button properties should be correctly set (enabled)')
  })
  it('should render correctly closed, with search disabled', () => {
    const props = {
      ...commonProps,
      open: false,
      searchDisabled: false,
    }
    const enzymeWrapper = shallow(<SearchPaneComponent {...props} />, { context })
    const drawer = enzymeWrapper.find(Drawer)
    assert.lengthOf(drawer, 1, 'There should be the drawer')
    assert.isFalse(drawer.props().open, 'Drawer should be closed')
    const buttonsWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonsWrapper, 2, 'There should be two buttons')
    testSuiteHelpers.assertWrapperProperties(buttonsWrapper.at(1), {
      icon: <SearchIcon />,
      disabled: props.searchDisabled,
      label: 'search.results.search.pane.search.label',
      title: 'search.results.search.pane.search.title',
      onClick: props.onSearch,
    }, 'Search button properties should be correctly set (enabled)')
  })
})
