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
import isEqual from 'lodash/isEqual'
import size from 'lodash/size'
import map from 'lodash/map'
import without from 'lodash/without'
import concat from 'lodash/concat'
import Dialog from 'material-ui/Dialog'
import Subheader from 'material-ui/Subheader'
import FlatButton from 'material-ui/FlatButton'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import Chip from 'material-ui/Chip'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
import { themeContextType } from '@regardsoss/theme'
import messages from '../../../i18n'

/**
 * Allows to delete tags on several AIPS inside a dialog component
 */
class AIPRemoveTagDialog extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    searchingTags: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    tagsRemaining: [],
    tagsToRemove: [],
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.tags, this.props.tags)) {
      this.handleInitialise(nextProps)
    }
  }

  handleSubmit = () => {
    const { tagsToRemove } = this.state
    this.props.onSubmit(tagsToRemove)
  }
  handleInitialise = (props) => {
    this.setState({
      tagsRemaining: props.tags,
      tagsToRemove: [],
    })
  }

  handleRemoveTag = (tag) => {
    const { tagsRemaining, tagsToRemove } = this.state

    this.setState({
      tagsRemaining: without(tagsRemaining, tag),
      tagsToRemove: concat(tagsToRemove, tag),
    })
  }
  handleReAddTag = (tag) => {
    const { tagsRemaining, tagsToRemove } = this.state
    this.setState({
      tagsRemaining: concat(tagsRemaining, tag),
      tagsToRemove: without(tagsToRemove, tag),
    })
  }

  renderActions = () => {
    const { onClose } = this.props
    const { tagsToRemove } = this.state
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'aip.remove-tag.action.cancel' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="submitForm"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'aip.remove-tag.action.delete' })}
        onClick={this.handleSubmit}
        disabled={size(tagsToRemove) === 0}
      />,
    ]
  }

  renderTags = (tagList, actionOnClick) => {
    const { moduleTheme } = this.context
    return (
      <div style={moduleTheme.manageTags.tagsChipWrapper}>
        {map(tagList, tag => (
          <Chip
            key={tag}
            onClick={() => { actionOnClick(tag) }}
          >
            {tag}
          </Chip>
        ))}
      </div>
    )
  }
  render() {
    const { searchingTags } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    const { tagsRemaining, tagsToRemove } = this.state
    return (
      <Dialog
        title={formatMessage({ id: 'aip.remove-tag.title' })}
        actions={this.renderActions()}
        modal={false}
        open
      >
        <LoadableContentDisplayDecorator
          isLoading={searchingTags}
          loadingComponent={<CircularProgress />}
        >
          <Subheader style={moduleTheme.manageTags.subtitle}>{formatMessage({ id: 'aip.remove-tag.available' })}</Subheader>
          {this.renderTags(tagsRemaining, this.handleRemoveTag)}
          <div style={moduleTheme.manageTags.tagsSeparator}>
            <Divider />
          </div>
          <Subheader style={moduleTheme.manageTags.subtitle}>{formatMessage({ id: 'aip.remove-tag.removing' })}</Subheader>
          {this.renderTags(tagsToRemove, this.handleReAddTag)}
        </LoadableContentDisplayDecorator>
      </Dialog>
    )
  }
}

export default withI18n(messages)(AIPRemoveTagDialog)
