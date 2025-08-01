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

import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper'
/**
 * React component to show the progress of datasource edition/creation.
 */
export class DBDatasourceStepperComponent extends React.Component {
  static propTypes = {
    stepIndex: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context

    const { stepIndex } = this.props
    return (
      <div className="row">
        <div className="col-sm-50 col-sm-offset-15">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>{formatMessage({ id: 'datasource.stepper.connection' })}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{formatMessage({ id: 'datasource.stepper.attributes' })}</StepLabel>
            </Step>
            <Step>
              <StepLabel>{formatMessage({ id: 'datasource.stepper.mapping' })}</StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    )
  }
}

export default DBDatasourceStepperComponent
