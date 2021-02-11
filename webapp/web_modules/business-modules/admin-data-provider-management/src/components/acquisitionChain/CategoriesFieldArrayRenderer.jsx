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
import { fieldArrayFieldsPropTypes } from 'redux-form'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'mdi-material-ui/PlusCircle'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
 *
 * @author Kévin Picart
 */
export class CategoriesFieldArrayRenderer extends React.Component {
  static propTypes = {
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  state = {
    categoryField: '',
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  onRemoveCategory = (index) => {
    const { fields } = this.props
    fields.remove(index)
  }

  onKeyPressed = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.onAddCategory()
    }
  }

  onAddCategory = () => {
    const { fields } = this.props
    const { categoryField } = this.state
    const categoryToAdd = categoryField.trim()
    if (categoryToAdd && !fields.getAll().find((category) => category === categoryToAdd)) {
      fields.push(categoryField)
      this.setState({ categoryField: '' })
    }
  }

  onChangeValue = (evetn, value) => {
    this.setState({ categoryField: value })
  }

  renderChip = (member, index, fields) => {
    const {
      moduleTheme: {
        chainForm: {
          chip,
        },
      },
    } = this.context
    return (
      <Chip
        onRequestDelete={() => this.onRemoveCategory(index)}
        key={`groupname${member}`}
        className="categories-chip"
        onClick={this.onRemoveCategory}
        style={chip}
      >
        {fields.get(index)}
      </Chip>
    )
  }

  render() {
    const { fields } = this.props
    const { categoryField } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        chainForm: {
          categoriesField, chipSeparator, info, warnMessage,
        },
      },
    } = this.context
    return (
      <>
        <p style={info}>{formatMessage({ id: 'acquisition-chain.form.general.section.info.category' })}</p>
        <div style={categoriesField}>
          <TextField
            floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.category-hint' })}
            onKeyPress={this.onKeyPressed}
            value={categoryField}
            onChange={this.onChangeValue}
            // Warn the user while he has not clicked on add
            errorText={categoryField ? formatMessage({ id: 'acquisition-chain.form.general.section.click.category.add.warn' }) : null}
            errorStyle={warnMessage}
            floatingLabelFocusStyle={categoryField ? warnMessage : null}
          />
          <IconButton onClick={this.onAddCategory}>
            <AddIcon />
          </IconButton>
          <div style={chipSeparator} />
          {fields.map(this.renderChip)}
        </div>
      </>
    )
  }
}
