/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  CardActions,
  CardTitle,
  Card,
  CardText,
  MenuItem,
} from 'material-ui'
import { CardActionsComponent } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { i18nContextType } from '@regardsoss/i18n'
import {
  reduxForm, RenderSelectField, Field, FieldArray, RenderTextField,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import OpenSearchStepperComponent from './OpenSearchStepperComponent'
import AddFilterDialogComponent from './AddFilterDialogComponent'

/**
 * Comment Here
 * @author Maxime Bouveron
 */

export class OSQueryConfigurationComponent extends React.Component {
  static propTypes = {
    backUrl: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
    initialize: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    const { initialValues } = this.props

    this.props.initialize(initialValues)
  }

  handleSubmit = (fields) => {
    this.props.onSubmit(fields)
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Card>
          <CardTitle title="Create the query" subtitle="Query stuff" />
          <OpenSearchStepperComponent stepIndex={1} />
          <CardText>
            Select feature last update parameter
            <br />
            <Field
              name="lastUpdate"
              component={RenderSelectField}
              type="text"
              label="Parameter"
              // validate={requiredStringValidator}
            >
              <MenuItem value="lol" primaryText="Lol" />
              <MenuItem value="Mdr" primaryText="Mdr" />
              <MenuItem value="Ptdr" primaryText="Ptdr" />
              <MenuItem value="Xptdr" primaryText="Xptdr" />
              <MenuItem value="LMFAO" primaryText="LMFAO" />
            </Field>
            <br />
            Enter the number of total elements
            <br />
            <Field
              name="nbElements"
              component={RenderTextField}
              type="number"
              label="Number of elements"
              // validate={requiredNumberValidator}
            />
            <br />
            <br />
            <br />
            <FieldArray name="filters" component={AddFilterDialogComponent} filters={filters} />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonType="submit"
              isMainButtonDisabled={this.props.submitting || this.props.invalid}
              mainButtonLabel={<FormattedMessage id="datasource.form.create.action.next" />}
              secondaryButtonLabel={this.context.intl.formatMessage({
                id: 'datasource.form.create.action.previous',
              })}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}
export default reduxForm({
  form: 'opensearch-query-form',
})(OSQueryConfigurationComponent)

const filters = [
  {
    label: 'geometry',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'resolution',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
  },
  {
    label: 'orbitNumber',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'platform',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
  },
  {
    label: 'processingLevel',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
  },
  {
    label: 'geometry',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'resolution',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'orbitNumber',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'platform',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'processingLevel',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
  },
  {
    label: 'geometry',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'resolution',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'orbitNumber',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'platform',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'processingLevel',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'geometry',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'resolution',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'orbitNumber',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'platform',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'processingLevel',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'geometry',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'resolution',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'orbitNumber',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'platform',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
  {
    label: 'processingLevel',
    description:
      'Region of interest defined in well known text standard (WKT) with coordinated in decimal degrees (EPSG:4326)',
    bounds: 23,
    pattern: 'jesaispasquoi',
    possibleValues: ['combobox', 'pascombobox', 'encoreunautretruc'],
  },
]
