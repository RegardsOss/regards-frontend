/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import isNaN from 'lodash/isNaN'
import { formValueSelector } from 'redux-form'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import MinusIcon from 'mdi-material-ui/MinusBox'
import EqualIcon from 'mdi-material-ui/EqualBox'
import UnlimitedIcon from 'mdi-material-ui/Infinity'
import QuotaStatusIcon from 'mdi-material-ui/DownloadCircle'
import { connect } from '@regardsoss/redux'
import {
  Field, reduxForm, RenderTextField, ValidationHelpers,
} from '@regardsoss/form-utils'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { QuotaInfoConstants } from '@regardsoss/entities-common'

/**
 * Max quota form
 * @author Raphaël Mechali
 */
export class MaxQuotaFormComponent extends React.Component {
  static propTypes = {
    user: AccessShapes.ProjectUser,
    quotaWarningCount: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from redux form
    editedMaxQuota: PropTypes.string,
    pristine: PropTypes.bool,
    invalid: PropTypes.bool,
    initialize: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Max quota validators */
  static MAX_QUOTA_VALIDATORS = [
    ValidationHelpers.required,
    ValidationHelpers.getIntegerInRangeValidator(-1, Number.MAX_SAFE_INTEGER),
  ]

  /**
   * Computes remaining quota value to display (shown as string)
   * @param {number} currentQuota current quota from user DTO
   * @param {string} editedMaxQuota max quota as edited in form (string)
   * @param {number} initialMaxQuota max quota from user DTO
   * @return {number} remaining quota, either unlimited (-1) or an integer in [0; +inf]
   */
  static computeRemainingQuota(currentQuota, editedMaxQuota, initialMaxQuota) {
    let consideredMaxQuota = isNaN(initialMaxQuota) ? QuotaInfoConstants.UNLIMITED : initialMaxQuota
    const parsedEditedMaxQuota = parseInt(editedMaxQuota, 10)
    if (!isNaN(parsedEditedMaxQuota)) {
      consideredMaxQuota = parsedEditedMaxQuota
    }
    return consideredMaxQuota === QuotaInfoConstants.UNLIMITED ? consideredMaxQuota : Math.max(0, consideredMaxQuota - currentQuota)
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   * Nota: user property is stable during this component lifecycle (as parent dialog unmounts it when when user changes)
   */
  UNSAFE_componentWillMount = () => {
    const { user: { content: { maxQuota } }, initialize } = this.props
    initialize({
      maxQuota: (isNaN(maxQuota) ? QuotaInfoConstants.UNLIMITED : maxQuota).toString(),
    })
  }

  onSubmit = (values) => {
    const { onSubmit } = this.props
    onSubmit(parseInt(values.maxQuota, 10))
  }

  render() {
    const {
      user: { content: { currentQuota = 0, maxQuota } },
      editedMaxQuota, quotaWarningCount,
      onClose, pristine, invalid, handleSubmit,
    } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        usersList: {
          quotaDialog: {
            form: {
              root, maxField, currentField, remainingField,
              minusIcon, equalIcon, buttonsBar, spaceConsumer,
              warningIcon, consumedIcon, unlimitedIcon,
            },
          },
        },
      },
    } = this.context
    const remainingQuota = MaxQuotaFormComponent.computeRemainingQuota(currentQuota, editedMaxQuota, maxQuota)
    return (
      <form style={root} onSubmit={handleSubmit(this.onSubmit)}>
        {/* 1. Max quota field (editable)  and first column placeholder */}
        <div style={spaceConsumer} />
        <Field
          name="maxQuota"
          type="text"
          label={formatMessage({ id: 'projectUser.list.edit.quota.dialog.max.quota.field' })}
          component={RenderTextField}
          validate={MaxQuotaFormComponent.MAX_QUOTA_VALIDATORS}
          style={maxField}
          fullWidth
        />
        {/* 2. Current quota textfield (static) and minus icon */}
        <MinusIcon style={minusIcon} />
        <TextField
          id="currentQuota"
          value={currentQuota.toString()}
          floatingLabelText={formatMessage({ id: 'projectUser.list.edit.quota.dialog.current.quota.field' })}
          style={currentField}
          fullWidth
          disabled
        />
        {/* 3. Remaining quota (static), equal and summary icons */}
        <EqualIcon style={equalIcon} />
        <TextField
          id="remainingQuota"
          value={remainingQuota === QuotaInfoConstants.UNLIMITED
            ? formatMessage({ id: 'projectUser.list.edit.quota.dialog.remaining.quota.unlimited' })
            : remainingQuota.toString()}
          floatingLabelText={formatMessage({ id: 'projectUser.list.edit.quota.dialog.remaining.quota.field' })}
          style={remainingField}
          fullWidth
          disabled
        />
        { (() => {
          if (remainingQuota === QuotaInfoConstants.UNLIMITED) {
            return <UnlimitedIcon style={unlimitedIcon} />
          }
          if (remainingQuota <= 0) {
            return <QuotaStatusIcon style={consumedIcon} />
          }
          if (remainingQuota - quotaWarningCount <= 0) {
            return <QuotaStatusIcon style={warningIcon} />
          }
          return null
        })()}
        {/* 4. Form actions */}
        <div style={buttonsBar}>
          <FlatButton
            label={formatMessage({ id: 'projectUser.list.edit.quota.dialog.cancel' })}
            onClick={onClose}
          />
          <FlatButton
            label={formatMessage({ id: 'projectUser.list.edit.quota.dialog.confirm' })}
            disabled={pristine || invalid}
            onClick={handleSubmit(this.onSubmit)}
          />
        </div>
      </form>)
  }
}

const formID = 'max-quota-form'
const formValuesSelector = formValueSelector(formID)

/**
 * Selects currently edited attributes
 */
function editedMaxQuotaSelector(state) {
  return {
    editedMaxQuota: formValuesSelector(state, 'maxQuota'),
  }
}

export default compose(connect(editedMaxQuotaSelector), reduxForm({ form: formID }))(MaxQuotaFormComponent)
