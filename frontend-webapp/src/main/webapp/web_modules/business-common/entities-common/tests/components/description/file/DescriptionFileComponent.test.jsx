/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { NoContentMessageInfo, IFrameURLContentDisplayer, MarkdownFileContentDisplayer } from '@regardsoss/components'
import DescriptionFileComponent from '../../../../src/components/description/file/DescriptionFileComponent'
import LoadingDisplayerComponent from '../../../../src/components/description/LoadingDisplayerComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Entities Common] Testing DescriptionFileComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DescriptionFileComponent)
  })
  it('should render correctly a no data', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const noDataWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noDataWrapper, 1, 'There should be a no data displayer')
    assert.isTrue(noDataWrapper.props().noContent, 'It should currently display a no data mode')
  })
  it('should render correctly loading', () => {
    const props = {
      loading: true,
      descriptionFileURL: null,
      descriptionFile: null,
    }
    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const loadingWrapper = enzymeWrapper.find(LoadingDisplayerComponent)
    assert.lengthOf(loadingWrapper, 1, 'There should be a loading displayer')
  })
  it('should render correctly with an URL to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: 'www.google.fr',
      descriptionFile: null,
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const urlContentWrapper = enzymeWrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(urlContentWrapper, 1, 'There should be an URL content displayer')
    assert.equal(urlContentWrapper.props().contentURL, props.descriptionFileURL, 'The URL should be set to the downloadable description')
  })
  it('should render correctly with a local description content to display', () => {
    const props = {
      loading: false,
      descriptionFileURL: null,
      descriptionFile: {
        entityId: 'URN:1001-dalmatiens',
        contentType: 'text/markdown',
        content: '#Hello',
      },
    }

    const enzymeWrapper = shallow(<DescriptionFileComponent {...props} />, { context })
    const localMarkdownWrapper = enzymeWrapper.find(MarkdownFileContentDisplayer)
    assert.lengthOf(localMarkdownWrapper, 1, 'There should be markdown displayer (scrollable container here)')
  })
})
