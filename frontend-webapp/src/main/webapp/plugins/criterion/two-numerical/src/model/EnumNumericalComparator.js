/**
 * LICENSE_PLACEHOLDER
 **/
export default {
  EQ: 'EQ',
  LE: 'LE',
  GE: 'GE',
  getLabel: (value) => {
    switch (value) {
      case 'EQ' : return '='
      case 'LE' : return '<'
      case 'GE' : return '>'
    }
  },
}
