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
import map from 'lodash/map'
import FlatButton from 'material-ui/FlatButton'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import reduce from 'lodash/reduce'
import { ScrollArea } from '@regardsoss/adapters'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import Checkbox from 'material-ui/Checkbox'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import MultiIcon from 'mdi-material-ui/AccountGroup'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  NoContentComponent, withConfirmDialog, Title, SelectableList,
  PositionedDialog,
} from '@regardsoss/components'
import { NotifierShapes } from '@regardsoss/shape'
import messages from './i18n'
import styles from './styles'

export const ButtonWithConfirmDialog = withConfirmDialog(RaisedButton)

/**
  * Confirm action dialog component.
  * @author Théo Lasserre
  */
export class NotifyDialog extends React.Component {
  static propTypes = {
    onConfirmNotify: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    recipientList: NotifierShapes.RecipientArray,
    numberOfSelectedProducts: PropTypes.number,
  }

  static defaultProps = {
    numberOfSelectedProducts: 0,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="feature.list.empty.title"
      Icon={AddToPhotos}
    />)

  state = {
    selectedRecipients: {},
    isConfirmDialogOpen: false,
  }

  /**
   * Check if a recipient is selected
   * @param {NotifierShapes.Recipient} recipient
   * @returns a boolean
   */
  isRecipientsSelected = (recipient) => !!find(this.state.selectedRecipients, (selectedRecipient) => selectedRecipient.businessId === recipient.businessId)

  /**
   * Check if all available recipients are selected
   * @returns a boolean
   */
  areAllRecipientsSelected = () => {
    const { recipientList } = this.props
    const { selectedRecipients } = this.state
    return !isEmpty(recipientList) && size(recipientList) === size(selectedRecipients)
  }

  /**
   * Select or unselect all available recipients
   * If none or some recipients are already selected we select all recipients. Unselect all recipients otherwise.
   */
  onClickButtonSelectAllRecipients = () => {
    const { recipientList } = this.props
    let newSelectedRecipients = {}
    if (!this.areAllRecipientsSelected()) {
      newSelectedRecipients = recipientList
    }
    this.setState({
      selectedRecipients: newSelectedRecipients,
    })
  }

  /**
   * Select a recipient
   * @param {NotifierShapes.Recipient} selectedRecipient
   */
  selectRecipient = (selectedRecipient) => {
    const { selectedRecipients } = this.state
    let newSelectedRecipients = {}
    if (!this.isRecipientsSelected(selectedRecipient)) {
      newSelectedRecipients = {
        ...selectedRecipients,
        [selectedRecipient.businessId]: selectedRecipient,
      }
    } else {
      newSelectedRecipients = reduce(selectedRecipients, (acc, recipient) => {
        if (recipient.businessId !== selectedRecipient.businessId) {
          return {
            [recipient.businessId]: recipient,
            ...acc,
          }
        }
        return acc
      }, {})
    }
    this.setState({
      selectedRecipients: newSelectedRecipients,
    })
  }

  toggleConfirmDialog = () => {
    const { isConfirmDialogOpen } = this.state
    this.setState({
      isConfirmDialogOpen: !isConfirmDialogOpen,
    })
  }

  /**
   * Display a confirm message
   * @returns
   */
  displayConfirmMessage = () => {
    const { onConfirmNotify } = this.props
    const { selectedRecipients } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        notifyDialogStyle: {
          messageDivStyle, messageButtonStyle, confirmTitleStyle,
          messageIconStyle,
        },
      },
    } = this.context
    const selectedRecipientIds = map(selectedRecipients, (selectedRecipient) => selectedRecipient.businessId)
    return (
      <div style={messageDivStyle}>
        <Title
          level={3}
          label={formatMessage({ id: 'feature.notify.confirm.message' })}
          style={confirmTitleStyle}
        />
        <div style={messageButtonStyle}>
          <RaisedButton
            label={formatMessage({ id: 'feature.notify.back.button' })}
            onClick={this.toggleConfirmDialog}
          />
          <RaisedButton
            label={formatMessage({ id: 'feature.notify.confirm.button' })}
            primary
            icon={<MultiIcon style={messageIconStyle} />}
            labelPosition="before"
            onClick={() => onConfirmNotify(selectedRecipientIds)}
          />
        </div>
      </div>
    )
  }

  /**
   * Construct a table line with a given recipient.
   * @param {NotifierShapes.Recipient} recipient
   * @param {boolean} isHeaderLine : when true no recipient is needed
   * @returns a table line or a table header line
   */
  buildLine = (recipient, isHeaderLine = false) => {
    const { recipientList } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        notifyDialogStyle: {
          lineDivStyle, lineCheckBoxStyle, lineLabelStyle, lineHeaderLabelStyle, lineDescriptionStyle,
          lineHeaderDescriptionStyle,
        },
      },
    } = this.context
    return (
      <div style={lineDivStyle}>
        <div style={lineCheckBoxStyle}>
          <Checkbox
            checked={!isHeaderLine ? this.isRecipientsSelected(recipient) : this.areAllRecipientsSelected()}
            onCheck={isHeaderLine ? this.onClickButtonSelectAllRecipients : null}
            disabled={isHeaderLine ? isEmpty(recipientList) : false}
          />
        </div>
        <div style={!isHeaderLine ? lineLabelStyle : lineHeaderLabelStyle}>
          {!isHeaderLine ? recipient.recipientLabel : formatMessage({ id: 'feature.table.header.column.label' })}
        </div>
        <div style={!isHeaderLine ? lineDescriptionStyle : lineHeaderDescriptionStyle}>
          {!isHeaderLine ? recipient.description : formatMessage({ id: 'feature.table.header.column.description' })}
        </div>
      </div>
    )
  }

  renderDialogContent = () => {
    const { recipientList } = this.props
    const { isConfirmDialogOpen } = this.state
    const {
      intl: { formatMessage }, moduleTheme: {
        notifyDialogStyle: {
          mainDivStyle, topBlocStyle, subTitleStyle,
          messageIconStyle, bottomBlocStyle, headerTableStyle,
          scrollAreaStyle, selectableListStyle, lineStyle,
          lineAltStyle, buttonDivStyle,
        },
      },
    } = this.context
    return (
      isConfirmDialogOpen
        ? this.displayConfirmMessage()
        : <div style={mainDivStyle}>
          <div style={topBlocStyle}>
            <div style={subTitleStyle}>
              {formatMessage({ id: 'feature.subtitle' })}
            </div>
          </div>
          <div style={bottomBlocStyle}>
            <ListItem
              key="header"
              value={null}
              style={headerTableStyle}
              disabled
              primaryText={this.buildLine(null, true)}
            />
            <ScrollArea
              vertical
              style={scrollAreaStyle}
            >
              {
                !isEmpty(recipientList)
                  ? <SelectableList
                      style={selectableListStyle}
                  >
                    {map(recipientList, (recipient, i) => (
                      <ListItem
                        key={i}
                        value={recipient}
                        title={`${recipient.recipientLabel}`}
                        onClick={() => this.selectRecipient(recipient)}
                        style={i % 2 === 0 ? lineStyle : lineAltStyle}
                        primaryText={this.buildLine(recipient)}
                      />
                    ))}
                  </SelectableList>
                  : NotifyDialog.EMPTY_COMPONENT
              }
            </ScrollArea>
          </div>
          <div style={buttonDivStyle}>
            <RaisedButton
              label={formatMessage({ id: 'feature.button.notify' })}
              icon={<MultiIcon style={messageIconStyle} />}
              labelPosition="after"
              primary
              onClick={this.toggleConfirmDialog}
            />
          </div>
        </div>
    )
  }

  /**
   * Build title with number of selected elements
   */
  renderTitle = () => {
    const { numberOfSelectedProducts } = this.props
    const { intl: { formatMessage } } = this.context
    const title = numberOfSelectedProducts > 0 ? formatMessage({ id: 'feature.references.notify.title' }) : formatMessage({ id: 'feature.references.notify.title.all' })
    const countTitle = numberOfSelectedProducts > 0 ? formatMessage({ id: 'feature.references.notify.title.count' }, { value: numberOfSelectedProducts }) : ''
    return (
      `${title} ${countTitle}`
    )
  }

  render() {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <PositionedDialog
        title={this.renderTitle()}
        actions={
          <FlatButton
            key="cancel"
            id="confirm.dialog.cancel"
            label={formatMessage({ id: 'feature.close' })}
            onClick={onClose}
          />
        }
        modal
        open
        dialogWidthPercent={75}
        dialogHeightPercent={63}
        minHeight={585}
      >
        {this.renderDialogContent()}
      </PositionedDialog>
    )
  }
}

export default withModuleStyle(styles, true)(withI18n(messages, true)(NotifyDialog))
