/**
 * LICENSE_PLACEHOLDER
 **/
export default {
  EQ: 'EQ',
  NE: 'NE',
  LE: 'LE',
  GE: 'GE',
  getLabel : (value) => {
    switch (value) {
      case 'EQ' : return '='
      case 'NE' : return '!='
      case 'LE' : return '<'
      case 'GE' : return '>'
    }
  }
}
