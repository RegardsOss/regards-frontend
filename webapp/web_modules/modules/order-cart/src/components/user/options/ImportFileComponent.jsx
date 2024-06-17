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
import { ImportFromFileDialogButton } from '@regardsoss/file-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Import a file containing a list of product ids
 *
 * @author Théo Lasserre
 */
export class ImportFileComponent extends React.Component {
  static propTypes = {
    onImportFile: PropTypes.func.isRequired,
    refreshBasket: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { refreshBasket, onImportFile } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { import: { buttonStyle } } } } = this.context
    return (
      <ImportFromFileDialogButton
        onImport={onImportFile}
        buttonLabel={formatMessage({ id: 'order-cart.module.import.label' })}
        title={formatMessage({ id: 'order-cart.module.import.dialog.title' })}
        labelPosition="after"
        primary={false}
        onImportSucceed={refreshBasket}
        disableImportButton={false}
        ignoreErrors
        buttonStyle={buttonStyle}
      />
    )
  }
}

export default ImportFileComponent
