/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DataManagementShapes } from '@regardsoss/shape'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import EntitiesAttributesFormComponent from '../components/EntitiesAttributesFormComponent'
import messages from '../i18n'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributesFormContainer extends React.Component {
  static propTypes = {
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    // When false, hide the component
    isDisplayAttributeValue: PropTypes.bool.isRequired,
    // When true and modelAttribute not alterable, mark the field as disabled
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { modelAttributeList, isDisplayAttributeValue, isEditing } = this.props
    return (
      <ShowableAtRender show={isDisplayAttributeValue}>
        <I18nProvider messages={messages}>
          <EntitiesAttributesFormComponent
            modelAttributeList={modelAttributeList}
            isEditing={isEditing}
          />
        </I18nProvider>
      </ShowableAtRender>
    )
  }
}

export default EntitiesAttributesFormContainer
