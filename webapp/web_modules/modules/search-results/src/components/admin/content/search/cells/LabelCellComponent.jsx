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
 **/
import isEmpty from 'lodash/isEmpty'
import TextField from 'material-ui/TextField'
import { UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from './CriteriaRowsHelper'

/**
 * Cell label: shows group title / criterion label for a locale and allows corresponding edition
 * @author Raphaël Mechali
 */
class LabelCellComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    locale: PropTypes.oneOf(UIDomain.LOCALES).isRequired,
    onUpdateElementLabel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    editing: false,
    editionText: null,
  }

  /** User started edition */
  onEdit = () => {
    const { entity: { label }, locale } = this.props
    this.setState({ editing: true, editionText: label[locale] || '' })
  }

  /** User stopped edition (performed only when editing to avoid useless setState calls) */
  onStopEdition = () => this.state.editing && this.setState({ editing: false, editionText: null })

  /**
   * User callback: text edition in progress
   * @param {*} event
   * @param {string} newText user input text
   */
  onTextChanged = (event, newText) => this.setState({ editionText: newText })

  /**
   * User callback: edition confirmed
   */
  onConfirmEdition = () => {
    const { entity: { groupIndex, criterionIndex }, locale, onUpdateElementLabel } = this.props
    const { editionText } = this.state
    // 1 - commit text
    onUpdateElementLabel(groupIndex, criterionIndex, locale, editionText)
    // 2 - exit edition
    this.onStopEdition()
  }

  /**
   * User callback: key pressed with edition text field opened
   * @param {*} event corresponding event
   */
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onConfirmEdition() // commit immediately
      event.preventDefault()
    }
  }

  /**
   * Renders in edition mode
   * @return {*} render element
   */
  renderInEdition() {
    const { editionText } = this.state
    return (
      <TextField
        id="localized.label.editor"
        value={editionText}
        onChange={this.onTextChanged}
        onBlur={this.onConfirmEdition} // on focus lost: commit changes
        onKeyPress={this.onKeyPress}
        autoFocus
      />)
  }

  /**
   * Renders as table cell, at rest
   * @return {*} render element
   */
  renderAtRest() {
    const { entity, locale } = this.props
    const { intl: { formatMessage }, moduleTheme: { configuration: { content: { searchPane: { commonCell } } } } } = this.context
    const labelValue = entity.label[locale]
    // Error: when empty, except for groups hiding title
    const error = isEmpty(labelValue) && (CriteriaRowsHelper.isCriterion(entity) || entity.showTitle)
    const displayLabel = isEmpty(labelValue)
      ? formatMessage({ id: 'search.results.form.configuration.search.pane.label.column.cell.unset' })
      : labelValue
    return (
      <div
        onClick={this.onEdit}
        style={error ? commonCell.error : commonCell.default}
        title={displayLabel}
      >
        {displayLabel}
      </div>)
  }

  render() {
    const { editing } = this.state
    return editing ? this.renderInEdition() : this.renderAtRest()
  }
}
export default LabelCellComponent
