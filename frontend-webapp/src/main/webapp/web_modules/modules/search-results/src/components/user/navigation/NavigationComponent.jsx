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
 **/
import DefaultModuleIcon from 'material-ui/svg-icons/image/style'
import { i18nContextType } from '@regardsoss/i18n'
import { Breadcrumb } from '@regardsoss/components'
import { Tag } from '../../../models/navigation/Tag'

const ROOT_PLACEHOLDER = {}

/**
 * Component to display navigation bar.
 *
 * @author Sébastien binda
 */
class NavigationComponent extends React.Component {

  static propTypes = {
    resultsTitle: PropTypes.string,
    navigationLevels: PropTypes.arrayOf(PropTypes.instanceOf(Tag)).isRequired,
    onLevelSelected: PropTypes.func.isRequired, // on level selected in breadcrumb: (level, index) => void
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getLevelLabel = (levelTag, index) => {
    const { resultsTitle } = this.props
    const { intl: { formatMessage } } = this.context
    if (index === 0) {
      // root level may have no label (use home then)
      return resultsTitle || formatMessage({ id: 'navigation.home.label' })
    }
    return levelTag.label
  }

  render() {
    const { navigationLevels, onLevelSelected } = this.props
    const breadcrumbElements = [
      ROOT_PLACEHOLDER, // add root (as a placeholder)
      ...navigationLevels,
    ]
    return (
      <Breadcrumb
        RootIconConstructor={DefaultModuleIcon}
        elements={breadcrumbElements}
        labelGenerator={this.getLevelLabel}
        onAction={onLevelSelected}
      />
    )
  }

}

export default NavigationComponent
