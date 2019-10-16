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
import Chip from 'material-ui/Chip'
import { TextField } from 'material-ui'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
 *
 * @author Kévin Picart
 */
export class CategoriesFieldArrayRenderer extends React.Component {
  static propTypes = {
    fields: PropTypes.shape({
      getAll: PropTypes.func.isRequired,
      push: PropTypes.func.isRequired,
      remove: PropTypes.func.isRequired,
    }),
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

  onAddCategory = (ev) => {
    const { fields } = this.props
    const { categoryField } = this.state
    if (ev.key === 'Enter') {
      ev.preventDefault()
      if (!fields.getAll().find(category => category === categoryField) && categoryField !== '') {
        fields.push(categoryField)
        this.setState({ categoryField: '' })
      }
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
          chipWrapper, info,
        },
      },
    } = this.context
    return (
      <React.Fragment>
        <p style={info}>{formatMessage({ id: 'acquisition-chain.form.general.section.info.category' })}</p>
        <TextField
          hintText={formatMessage({ id: 'acquisition-chain.form.general.section.category-hint' })}
          floatingLabelText={formatMessage({ id: 'acquisition-chain.form.general.section.category-hint' })}
          fullWidth
          onKeyPress={this.onAddCategory}
          value={categoryField}
          onChange={this.onChangeValue}
        />
        <div style={chipWrapper}>
          {fields.map(this.renderChip)}
        </div>
      </React.Fragment>
    )
  }
}
