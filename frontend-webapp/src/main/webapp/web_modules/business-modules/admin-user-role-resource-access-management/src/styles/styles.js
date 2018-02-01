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
 */
import { lightBlue200, yellow300, green300, purple300 } from 'material-ui/styles/colors'

const styles = theme => ({
  listItem: {
    paddingLeft: '100px',
  },
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
  getChip: {
    backgroundColor: lightBlue200,
  },
  putChip: {
    backgroundColor: yellow300,
  },
  deleteChip: {
    backgroundColor: green300,
  },
  postChip: {
    backgroundColor: purple300,
  },
  description: {
    style: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textoverflow: 'ellipsis',
    },
    class: 'col-sm-75',
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
