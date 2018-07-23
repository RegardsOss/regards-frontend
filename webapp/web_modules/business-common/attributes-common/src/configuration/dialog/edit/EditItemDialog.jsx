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
 **/
import get from 'lodash/get'
import { connect } from '@regardsoss/redux'
import { AccessShapes, DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType, i18nSelectors } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { PositionedDialog } from '@regardsoss/components'
import EditItemForm from './EditItemForm'


/**
 * Dialog box to edit or create an item in list. It shows the corresponding form
 * @author Raphaël Mechali
 */
export class EditItemDialog extends React.Component {
  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {
      locale: i18nSelectors.getLocale(state), // bind current locale for label presentation
    }
  }

  static propTypes = {
    allowLabel: PropTypes.bool.isRequired,
    allowAttributesRegroupements: PropTypes.bool.isRequired,
    // available attribute models
    attributeModels: DataManagementShapes.AttributeModelArray.isRequired,
    // edition data: this dialog is visible only when it is porvided
    editionData: PropTypes.shape({
      // model. When adding a new item, it must present in this model
      attributesList: AccessShapes.AttributeListConfigurationModel.isRequired,
      editedElementIndex: PropTypes.number.isRequired,
      isNewItem: PropTypes.bool.isRequired,
    }),
    // callback: on cancel () => ()
    onCancel: PropTypes.func.isRequired,
    // callback: on confirm (newList:AttributeListConfigurationModel) => ()
    onConfirm: PropTypes.func.isRequired,
    // from mapStateToProps
    locale: PropTypes.string,
  }

  static defaultProps = {
    locale: 'en', // make sure we have a locale in this component
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * User callback: user confirmed form edition
   * @param {AttributeElementModel} editedItem item resulting of edition
   * @param {number} order specified item order, expressed on attributesList property model as : 0: first, N : position ignoring self
   */
  onConfirm = (editedItem, order) => {
    const { onConfirm, editionData: { attributesList, editedElementIndex } } = this.props
    // Build new resulting list model
    const itemsWithoutEditedOne = attributesList.filter((item, index) => index !== editedElementIndex)
    const newList = [
      ...itemsWithoutEditedOne.slice(0, order), // report elements before
      editedItem,
      ...itemsWithoutEditedOne.slice(order), // report elements after
    ]
    onConfirm(newList)
  }

  render() {
    const {
      locale, allowLabel, allowAttributesRegroupements, attributeModels, editionData, onCancel,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { editDialog } } } = this.context

    // prepare actions
    return (
      <PositionedDialog
        dialogWidthPercent={editDialog.widthPercent}
        dialogHeightPercent={editDialog.heightPercent}
        bodyStyle={editDialog.dialogBodyStyle}
        title={
          formatMessage({
            id: get(editionData, 'isNewItem', false) ?
              'attribute.configuration.new.item.title' :
              'attribute.configuration.edit.item.title',
          })
        }
        open={!!editionData}
        modal
      >
        <EditItemForm
          allowLabel={allowLabel}
          allowAttributesRegroupements={allowAttributesRegroupements}
          attributeModels={attributeModels}
          editionData={editionData}
          onCancel={onCancel}
          onConfirm={this.onConfirm}
          locale={locale}
        />
      </PositionedDialog >
    )
  }
}

export default connect(EditItemDialog.mapStateToProps)(EditItemDialog)
