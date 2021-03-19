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
 **/
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { URIContentDisplayer } from '@regardsoss/components'

/**
 * Resolves file container and shows it for current results context when available
 * @author Rachid OULASRI
 */
export class DescriptionContainer extends React.Component {
  static propTypes = {
    resultsContext: UIShapes.ResultsContext.isRequired,
  }

  render() {
    const { resultsContext } = this.props
    const { uri } = resultsContext.tabs[UIDomain.RESULTS_TABS_ENUM.FILE]

    return uri ? <URIContentDisplayer uri={uri} /> : null
  }
}
export default DescriptionContainer
