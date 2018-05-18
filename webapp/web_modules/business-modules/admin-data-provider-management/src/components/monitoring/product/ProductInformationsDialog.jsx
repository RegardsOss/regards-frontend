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
import { DataProviderShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import { PositionedDialog } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
* Component to display information about a product acquisition process
* @author Sébastien Binda
*/
class ProductInformationDialog extends React.Component {
  static propTypes = {
    product: DataProviderShapes.ProductContent,
    onClose: PropTypes.func.isRequired,
  }

  static defaultProps = {}

  static DATETIME_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  renderJobInformations = (jobLabel, jobInfos) => {
    if (!jobInfos) {
      return null
    }
    const { moduleTheme: { productInfos }, intl: { formatMessage, formatDate } } = this.context
    return (
      <div>
        <div style={productInfos.jobInfos.titleStyle}>{jobLabel}</div>
        <div>
          <span style={productInfos.jobInfos.fieldLabelStyle}>{formatMessage({ id: 'acquisition-product.informaton.dialog.job.info.percentCompleted' })}</span>
          {jobInfos.status.percentCompleted}%
        </div>
        <div>
          <span style={productInfos.jobInfos.fieldLabelStyle}>{formatMessage({ id: 'acquisition-product.informaton.dialog.job.info.queuedDate' })}</span>
          {formatDate(jobInfos.status.queuedDate, ProductInformationDialog.DATETIME_OPTIONS)}
        </div>
        <div>
          <span style={productInfos.jobInfos.fieldLabelStyle}>{formatMessage({ id: 'acquisition-product.informaton.dialog.job.info.startDate' })}</span>
          {formatDate(jobInfos.status.startDate, ProductInformationDialog.DATETIME_OPTIONS)}
        </div>
        <div>
          <span style={productInfos.jobInfos.fieldLabelStyle}>{formatMessage({ id: 'acquisition-product.informaton.dialog.job.info.stopDate' })}</span>
          {formatDate(jobInfos.status.stopDate, ProductInformationDialog.DATETIME_OPTIONS)}
        </div>
        <div>
          <span style={productInfos.jobInfos.fieldLabelStyle}>{formatMessage({ id: 'acquisition-product.informaton.dialog.job.info.status' })}</span>
          {jobInfos.status.status}
        </div>
        {jobInfos.status.stackTrace ?
          <div>
            <div style={productInfos.jobInfos.fieldLabelStyle}>error : </div>
            <div style={productInfos.jobInfos.stackTraceStyle}>{jobInfos.status.stackTrace}</div>
          </div> : null}
      </div>
    )
  }

  render() {
    const { product, onClose } = this.props
    const { intl: { formatMessage }, moduleTheme: { productInfos: { errorStyle, jobInfos } } } = this.context
    if (!product) {
      return null
    }
    const actions = [
      <FlatButton
        key="close"
        label={formatMessage({ id: 'acquisition-product.informaton.dialog.close.button' })}
        primary
        onClick={onClose}
      />,
    ]
    console.error('product', product)
    return (
      <PositionedDialog
        title={formatMessage({ id: 'acquisition-product.informaton.dialog.title' }, { label: product.productName })}
        open
        autoScrollBodyContent
        actions={actions}
        dialogWidthPercent={80}
        onRequestClose={onClose}
      >
        {product.error ?
          <div>
            <div style={jobInfos.titleStyle}>{formatMessage({ id: 'acquisition-product.informaton.global.error' })}</div>
            <div style={errorStyle}>{product.error}</div>
          </div> : null
        }
        {this.renderJobInformations(formatMessage({ id: 'acquisition-product.informaton.generation.job.title' }), product.lastSIPGenerationJobInfo)}
        {this.renderJobInformations(formatMessage({ id: 'acquisition-product.informaton.submition.job.title' }), product.lastSIPSubmissionJobInfo)}
      </PositionedDialog>
    )
  }
}
export default ProductInformationDialog
