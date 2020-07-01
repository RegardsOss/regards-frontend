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
import IconButton from 'material-ui/IconButton'
import HelpCircle from 'mdi-material-ui/HelpCircle'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { FormattedHTMLMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import { RenderTextField, Field } from '@regardsoss/form-utils'
/**
* Comment Here
* @author Sébastien Binda
*/
class AttributeModelUnitFieldComponent extends React.Component {
  static contextTypes = {
    ...i18nContextType,
  }

  /** Root component style */
  static ROOT_STYLE = {
    display: 'flex', flexDirection: 'row',
  }

  state = {
    unitDescriptionOpen: false,
  }

  handleOpenUnitDescription = () => this.setState({ unitDescriptionOpen: true })

  handleCloseDescription = () => this.setState({ unitDescriptionOpen: false })

  renderDescriptionDialog = () => {
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        open={this.state.unitDescriptionOpen}
        title={formatMessage({ id: 'attrmodel.form.unit.description.dialog.title' })}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'attrmodel.form.unit.description.dialog.close' })}
            primary
            onClick={this.handleCloseDescription}
          />
        </>}
        modal
      >
        <FormattedHTMLMessage id="attrmodel.form.unit.description.dialog.content" />
      </Dialog>
    )
  }

  render() {
    return (
      <div style={AttributeModelUnitFieldComponent.ROOT_STYLE}>
        <Field
          name="unit"
          fullWidth
          component={RenderTextField}
          type="text"
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.unit' })}
        />
        <IconButton onClick={this.handleOpenUnitDescription}><HelpCircle /></IconButton>
        {this.renderDescriptionDialog()}
      </div>
    )
  }
}
export default AttributeModelUnitFieldComponent
