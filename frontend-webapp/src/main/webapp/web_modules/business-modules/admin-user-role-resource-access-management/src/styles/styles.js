/**
 * LICENSE_PLACEHOLDER
 */
import { brown50, lightBlue200, yellow300, green300, purple300 } from 'material-ui/styles/colors'

const styles = theme => ({
  listItem: {
    paddingLeft: '100px',
  },
  listItemOdd: {
    backgroundColor: brown50,
  },
  chipListItem: {
    margin: 4,
  },
  wrapperChipList: {
    display: 'flex',
    flexWrap: 'wrap',
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
})

export default styles
