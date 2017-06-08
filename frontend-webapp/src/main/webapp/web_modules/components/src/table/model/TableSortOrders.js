/**
* LICENSE_PLACEHOLDER
**/

/**
 * Column sorting enumeration
 */
export const TableSortOrders = {
  NO_SORT: 'no.sort',
  ASCENDING_ORDER: 'ascending.order',
  DESCENDING_ORDER: 'descending.order',
}
/**
 * Returns next sort order from current
 */
export const getNextSortOrder = (sorting) => {
  switch (sorting) {
    case TableSortOrders.NO_SORT:
      return TableSortOrders.ASCENDING_ORDER
    case TableSortOrders.ASCENDING_ORDER:
      return TableSortOrders.DESCENDING_ORDER
    case TableSortOrders.DESCENDING_ORDER:
      return TableSortOrders.NO_SORT
    default:
      throw new Error(`Unknown sorting order ${sorting}`)
  }
}
