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
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'

storiesOf('TwoTemporalCriteriaSimpleComponent', module)
  .addDecorator(withKnobs)
  .addDecorator(muiTheme())
  .addDecorator(reactIntl)
  .add('Default', () => {
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
      <TwoTemporalCriteriaSimpleComponent attributes={attributes} onChange={action('onChange')} pluginInstanceId={42} />
    )
  })
