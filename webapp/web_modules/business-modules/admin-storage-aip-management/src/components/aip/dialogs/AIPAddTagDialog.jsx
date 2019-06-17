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
import size from 'lodash/size'
import map from 'lodash/map'
import without from 'lodash/without'
import concat from 'lodash/concat'
import Dialog from 'material-ui/Dialog'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import TextField from 'material-ui/TextField'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import Chip from 'material-ui/Chip'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'

/**
 * Allows to add tags on several AIPS inside a dialog component
 */
class AIPAddTagDialog extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    tagsToAdd: [],
    value: '',
  }

  onInput = (event, value) => {
    this.setState({
      value,
    })
  }

  handleSubmit = () => {
    const { tagsToAdd } = this.state
    this.props.onSubmit(tagsToAdd)
  }

  addTag = () => {
    const { tagsToAdd, value } = this.state
    this.setState({
      tagsToAdd: concat(tagsToAdd, value),
      value: '',
    })
  }

  removeTag = (tag) => {
    const { tagsToAdd } = this.state
    this.setState({
      tagsToAdd: without(tagsToAdd, tag),
    })
  }

  renderActions = () => {
    const { onClose } = this.props
    const { tagsToAdd } = this.state
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'aip.add-tag.action.cancel' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="submitForm"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'aip.add-tag.action.add' })}
        onClick={this.handleSubmit}
        disabled={size(tagsToAdd) === 0}
      />,
    ]
  }

  renderForm = () => {
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.manageTags.formInput}>
        <TextField
          hintText={this.context.intl.formatMessage({ id: 'aip.add-tag.input' })}
          onChange={this.onInput}
          value={this.state.value}
        />
        <IconButton
          onClick={this.addTag}
          tooltip={this.context.intl.formatMessage({ id: 'aip.add-tag.input.action.add' })}
          disabled={this.state.value.length === 0}
        >
          <Add />
        </IconButton>
      </div>
    )
  }

  renderTags = (tagList) => {
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.manageTags.tagsChipWrapper}>
        {map(tagList, tag => (
          <Chip
            key={tag}
            onClick={() => { this.removeTag(tag) }}
          >
            {tag}
          </Chip>
        ))}
      </div>
    )
  }

  render() {
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { tagsToAdd } = this.state
    return (
      <Dialog
        title={formatMessage({ id: 'aip.add-tag.title' })}
        actions={this.renderActions()}
        modal={false}
        open
      >
        {this.renderForm()}
        <Subheader style={moduleTheme.manageTags.subtitle}>{formatMessage({ id: 'aip.add-tag.list' })}</Subheader>
        {this.renderTags(tagsToAdd)}
      </Dialog>
    )
  }
}

export default AIPAddTagDialog
