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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import LoadingPaneComponent from '../../src/loading/LoadingPaneComponent'

describe('[COMPONENTS] Testing LoadingPaneComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(LoadingPaneComponent)
  })

  it('should render properly', () => {
    // use a simple component for validation
    const SimpleText = ({ text }) => <span>{text}</span>
    SimpleText.propTypes = { text: PropTypes.string.isRequired }

    const titleText = 'Hello title'
    const subtitleText = 'Hello subtitle'
    const props = {
      title: <SimpleText text={titleText} />,
      subTitle: <SimpleText text={subtitleText} />,
    }
    // let it render and check there is no shallow nor prop types errors
    // (no interesting assertion for that component, as most elements are embedded in Card)
    shallow(<LoadingPaneComponent {...props} />)
  })
})
