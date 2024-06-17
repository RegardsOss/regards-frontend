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

import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { ApplicationErrorAction } from '@regardsoss/global-system-error'
import { OrderClient } from '@regardsoss/client'
import { DragAndDrop } from '@regardsoss/components'

// get an instance of default actions / selectors (the basket state is shared over all modules)
const orderBasketActions = new OrderClient.OrderBasketActions()

/**
 * Order uploader
 */
class OrderUploader extends React.Component {
  /**
     * Redux: map dispatch to props function
     * @param {*} dispatch: redux dispatch function
     * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
     * @return {*} list of component properties extracted from redux state
     */
  static mapDispatchToProps(dispatch) {
    return {
      throwError: (message) => dispatch(ApplicationErrorAction.throwError(message)),
      onImportFile: (file) => dispatch(orderBasketActions.importFile(file)),
    }
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    refreshBasket: PropTypes.func.isRequired,
    // from mapDispatchToProps
    onImportFile: PropTypes.func.isRequired,
    throwError: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Manage file upload
   * @param {*} files files to upload
   */
  handleDrop = (files) => {
    const { onImportFile, throwError, refreshBasket } = this.props
    onImportFile({ file: files[0] }).then((actionResult) => {
      if (actionResult.error) {
        throwError('Unable to import file')
      } else {
        refreshBasket()
      }
    })
  }

  render() {
    const { children } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { dragAndDropMapStyle, dragOrderMainDivStyle } } } = this.context
    return <DragAndDrop
      handleDrop={this.handleDrop}
      onHideDisplayComponent={children}
      title={formatMessage({ id: 'dragndrop.title' })}
      subtitle={formatMessage({ id: 'dragndrop.subtitle.order' })}
      style={dragAndDropMapStyle}
      mainDivStyle={dragOrderMainDivStyle}
    >
      {children}
    </DragAndDrop>
  }
}

export default connect(
  null,
  OrderUploader.mapDispatchToProps)(OrderUploader)
