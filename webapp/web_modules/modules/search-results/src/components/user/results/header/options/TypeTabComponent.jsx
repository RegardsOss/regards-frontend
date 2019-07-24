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
import get from 'lodash/get'
import FlatButton from 'material-ui/FlatButton'
import CollectionsIcon from 'material-ui/svg-icons/device/storage'
import DatasetsIcon from 'material-ui/svg-icons/image/collections-bookmark'
import DataIcon from 'material-ui/svg-icons/av/library-books'
import DocumentsIcon from 'mdi-material-ui/ImageMultiple'
import { DamDomain } from '@regardsoss/domain'
import { UIShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Component to display a type tab
 * @author Raphaël Mechali
 */
class TypeTabComponent extends React.Component {
  static propTypes = {
    type: PropTypes.oneOf(DamDomain.ENTITY_TYPES).isRequired,
    resultsContext: UIShapes.ResultsContext.isRequired,
    onTypeSelected: PropTypes.func.isRequired,
  }

  static ICON_CONSTRUCTOR_BY_TYPE = {
    [DamDomain.ENTITY_TYPES_ENUM.COLLECTION]: CollectionsIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DATASET]: DatasetsIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DATA]: DataIcon,
    [DamDomain.ENTITY_TYPES_ENUM.DOCUMENT]: DocumentsIcon,
  }


  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { resultsContext, type, onTypeSelected } = this.props
    const { intl: { locale, formatMessage } } = this.context
    const IconConstructor = TypeTabComponent.ICON_CONSTRUCTOR_BY_TYPE[type]
    const state = resultsContext.typeState[type]
    return (
      <FlatButton
        // label from configuration when provided, default otherwise
        label={get(state, `label.${locale}`, formatMessage({ id: `search.results.default.tab.label.for.${type}` }))}
        onClick={onTypeSelected}
        icon={<IconConstructor />}
        secondary={type === resultsContext.type}
      />
    )
  }
}
export default TypeTabComponent
