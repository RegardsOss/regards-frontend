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
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import reactIntl from '../decorators/reactIntl'
import TwoTemporalCriteriaComponent from '../../src/components/TwoTemporalCriteriaComponent'

storiesOf('TwoTemporalCriteriaComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('with two different attributes', () => {
    const attributes = object('Attributes', {
      firstField: {
        name: 'firstAttribute',
        description: 'First attribute to search',
        type: 'temporal',
      },
      secondField: {
        name: 'secondAttribute',
        description: 'Second attribute to search',
        type: 'temporal',
      },
    })
    return (
      <TwoTemporalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
  .add('with the same attribute', () => {
    const attributes = object('Attributes', {
      firstField: {
        name: 'attribute',
        description: 'First attribute to search',
        type: 'temporal',
      },
      secondField: {
        name: 'attribute',
        description: 'Second attribute to search',
        type: 'temporal',
      },
    })
    return (
      <TwoTemporalCriteriaComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
