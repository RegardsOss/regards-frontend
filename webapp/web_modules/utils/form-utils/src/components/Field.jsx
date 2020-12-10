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
import { Field as ReduxField } from 'redux-form'
import { i18nContextType } from '@regardsoss/i18n'
import DialogMessageHelpComponent from './help/DialogMessageHelpComponent'
import { FieldHelpContent } from '../shapes/FieldHelpShape'
import { FieldHelp } from '../domain/FieldHelp'

/**
 * Field wrapper for redux-form fields: provides internationalization context (as form uses PureComponent) and appends help functionality
 * when specified by caller
 *
 * @author Léo Mieulet
 */
class Field extends React.Component {
  static propTypes = {
    // optional help for field
    help: FieldHelpContent,
    // is full width? (as field is re-parented here, used for styling this section)
    fullWidth: PropTypes.bool,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Common field style */
  static COMMON_STYLE = {
    display: 'flex',
  }

  /** Full width field style */
  static FULLWIDTH_STYLE = {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    flexShrink: 1,
  }

  render() {
    const { help, fullWidth, ...otherProps } = this.props

    return (
      <div style={fullWidth ? Field.FULLWIDTH_STYLE : Field.COMMON_STYLE}>
        <ReduxField intl={this.context.intl} fullWidth={fullWidth} {...otherProps} />
        { (() => {
          if (help) {
            switch (help.contentType) {
              case FieldHelp.CONTENT_TYPES.MESSAGE:
                return <DialogMessageHelpComponent help={help} />
              default:
                return null
            }
          }
          return null
        })()}
      </div>
    )
  }
}

export default Field
