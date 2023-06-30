/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import { ModuleContainer } from '../../src/containers/ModuleContainer'
import styles from '../../src/styles/styles'

/**
 * ModuleContainer tests
 * @author Sébastien Binda
 */

const context = buildTestContext(styles)

describe('[Embedded-html] Testing ModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModuleContainer)
  })
  it('should render correctly when no data', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
      },
    }
    const wrapper = shallow(<ModuleContainer {...props} />, { context })
    const iFrame = wrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(iFrame, 0, 'The page should be hidden')
  })
  it('should render correctly in runtime with english locale', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        urlByLocale: {
          [UIDomain.LOCALES_ENUM.en]: 'URL-test.en',
          [UIDomain.LOCALES_ENUM.fr]: 'URL-test.fr',
        },
      },
    }
    const wrapper = shallow(<ModuleContainer {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.en,
        },
      },
    })
    const iFrame = wrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(iFrame, 1, 'There should be the page')
    assert.equal(iFrame.props().source, props.moduleConf.urlByLocale[UIDomain.LOCALES_ENUM.en], 'English page should have been selected')
  })
  it('should render correctly with french locale', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        urlByLocale: {
          [UIDomain.LOCALES_ENUM.en]: 'URL-test.en',
          [UIDomain.LOCALES_ENUM.fr]: 'URL-test.fr',
        },
      },
    }
    const wrapper = shallow(<ModuleContainer {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.fr,
        },
      },
    })
    const iFrame = wrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(iFrame, 1, 'There should be the page')
    assert.equal(iFrame.props().source, props.moduleConf.urlByLocale[UIDomain.LOCALES_ENUM.fr], 'French page should have been selected')
  })
  it('should render correctly, fallbacking on other locale when one is not found', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        urlByLocale: {
          [UIDomain.LOCALES_ENUM.fr]: 'URL-test.fr',
        },
      },
    }
    const wrapper = shallow(<ModuleContainer {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.en,
        },
      },
    })
    const iFrame = wrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(iFrame, 1, 'There should be the page')
    assert.equal(iFrame.props().source, props.moduleConf.urlByLocale[UIDomain.LOCALES_ENUM.fr], 'French page should have been selected')
  })
  it('should render correctly in preview, overriding context locale with preview one', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      moduleConf: {
        preview: true,
        previewLocale: UIDomain.LOCALES_ENUM.en,
        urlByLocale: {
          [UIDomain.LOCALES_ENUM.en]: 'URL-test.en',
          [UIDomain.LOCALES_ENUM.fr]: 'URL-test.fr',
        },
      },
    }
    const wrapper = shallow(<ModuleContainer {...props} />, {
      context: {
        ...context,
        intl: {
          ...context.intl,
          locale: UIDomain.LOCALES_ENUM.fr,
        },
      },
    })
    const iFrame = wrapper.find(IFrameURLContentDisplayer)
    assert.lengthOf(iFrame, 1, 'There should be the page')
    assert.equal(iFrame.props().source, props.moduleConf.urlByLocale[UIDomain.LOCALES_ENUM.en], 'English page should have been selected')
  })
})
