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
import get from 'lodash/get'
import Dialog from 'material-ui/Dialog'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import MaxQuotaFormComponent from './MaxQuotaFormComponent'

/**
 * Dialog component to set a user max quota
 * @author Raphaël Mechali
 */
class MaxQuotaDialogComponent extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    user: AccessShapes.ProjectUser,
    quotaWarningCount: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const {
      open, user, quotaWarningCount, onClose, onConfirm,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { usersList: { quotaDialog: { root } } } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'projectUser.list.edit.quota.dialog.title' }, { name: get(user, 'content.email') })}
        bodyStyle={root}
        open={open}
        modal={false}
        onRequestClose={onClose}
      >
        <MaxQuotaFormComponent
          user={user}
          quotaWarningCount={quotaWarningCount}
          onClose={onClose}
          onSubmit={onConfirm}
        />
      </Dialog>
    )
  }
}
export default MaxQuotaDialogComponent
