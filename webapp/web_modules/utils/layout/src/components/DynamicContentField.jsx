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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import Help from 'mdi-material-ui/HelpCircle'

import { Checkbox } from 'redux-form-material-ui'
import { Field } from 'redux-form'
import { ValidationHelpers, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import Badge from 'material-ui/Badge'

const dynamicContentWrapperStyle = { display: 'flex' }
const checkboxStyle = { marginTop: 15 }
const badgeStyle = { paddingLeft: 0 }
const badgeBadgeStyle = { top: 20 }
const labelStyle = { width: '100%' }
const smallIconStyle = {
  width: 20,
  height: 20,
}

/**
 * @author Xavier-Alexandre Brochard
 */
class DynamicContentField extends React.Component {
  static propTypes = {
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Dialog layout content style */
  static DIALOG_CONTENT_STYLE = { width: 'auto' }

  state = {
    open: false,
  }

  handleChange = (event, newValue, previousValue) => {
    if (newValue) {
      event.preventDefault()
      this.setState({ open: true })
    }
  }

  handleCancel = () => {
    this.setState({ open: false })
  }

  handleConfirm = () => {
    const { change } = this.props
    change('dynamicContent', true)
    this.setState({ open: false })
  }

  render() {
    const { intl: { formatMessage }, muiTheme } = this.context
    return (
      <div style={dynamicContentWrapperStyle}>
        <Badge
          style={badgeStyle}
          badgeStyle={badgeBadgeStyle}
          badgeContent={
            <IconButton
              tooltip={formatMessage({ id: 'container.form.dynamicContent.info' })}
              tooltipPosition="top-right"
              iconStyle={smallIconStyle}
            >
              <Help color={muiTheme.palette.disabledColor} />
            </IconButton>
          }
        >
          <Field
            onChange={this.handleChange}
            name="dynamicContent"
            style={checkboxStyle}
            component={Checkbox}
            label={formatMessage({ id: 'container.form.dynamicContent' })}
            labelStyle={labelStyle}
            parse={Boolean}
          />
        </Badge>
        <Dialog
          title={formatMessage({ id: 'container.form.dynamicContent.modal.title' })}
          actions={
            <>
              <FlatButton
                key="cancel"
                label={formatMessage({ id: 'container.form.dynamicContent.modal.cancel' })}
                onClick={this.handleCancel}
              />
              <FlatButton
                key="confirm"
                label={formatMessage({ id: 'container.form.dynamicContent.modal.ok' })}
                onClick={this.handleConfirm}
              />
            </>
          }
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={DynamicContentField.DIALOG_CONTENT_STYLE}
        >
          {formatMessage({ id: 'container.form.dynamicContent.modal.content' })}
        </Dialog>
      </div>
    )
  }
}

export default DynamicContentField
