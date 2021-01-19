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
 */
import {
  lightBlue200, yellow300, green300, purple300,
} from 'material-ui/styles/colors'
import { RequestVerbEnum } from '@regardsoss/store-utils'

const styles = (theme) => ({
  listItem: {
    padding: '0 50px 12px 100px',
  },
  listItemEven: {},
  listItemOdd: {
    backgroundColor: theme.tableRow.stripeColor,
  },
  chipListItem: {
    margin: 4,
  },
  wrapperChipList: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '10px 10px',
  },
  chipItem: {
    marginRight: 10,
  },
  chipByVerb: {
    [RequestVerbEnum.GET]: {
      backgroundColor: lightBlue200,
      top: 12,
      left: 0,
    },
    [RequestVerbEnum.POST]: {
      backgroundColor: green300,
      top: 12,
      left: 0,
    },
    [RequestVerbEnum.PUT]: {
      backgroundColor: yellow300,
      top: 12,
      left: 0,
    },
    [RequestVerbEnum.DELETE]: {
      backgroundColor: purple300,
      top: 12,
      left: 0,
    },
  },
  description: {
    style: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textoverflow: 'ellipsis',
    },
    class: 'col-sm-75',
  },
  resourceSecondaryStyle: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  resourceIconStyle: {
    marginRight: 10,
  },
  resourceTitleStyle: {
    padding: '12px 0 12px 0',
    display: 'inline-block',
  },
  microserviceSplitPanel: {
    layoutStyle: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.borderColor,
    },
    titleStyle: {
      width: '100%',
    },
    contentStyle: {
      display: 'flex',
      flexDirection: 'row',
      minHeight: '196px',
      maxHeight: '484px',
      width: '100%',
    },
    leftColumnStyle: {
      borderRight: '1px solid',
      borderColor: theme.palette.borderColor,
      display: 'flex',
      flexDirection: 'column',
    },
    leftListStyle: {
      flexGrow: '1',
      overflow: 'auto',
    },
    leftButtonStyle: {
      flexGrow: '0',
    },
    rightColumnStyle: {
      overflow: 'auto',
    },
  },
})

export default styles
