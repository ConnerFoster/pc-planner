import {useState, useMemo} from 'react'

export default function useSortingTable(items, config = null) {
  const [sortChoice, setSortChoice] = useState(config)

  const sortedItems = useMemo(() => {
    let sortedItems = [...items]

    if (sortChoice !== null) {
      if (sortChoice.sortMethod == 'number') {
        sortedItems.sort((a, b) => {
          if (a[sortChoice.key] < b[sortChoice.key]) {
            return sortChoice.direction === 'ascending' ? -1 : 1
          }
          if (a[sortChoice.key] > b[sortChoice.key]) {
            return sortChoice.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      }
      if (sortChoice.sortMethod == 'string') {
        sortedItems.sort((a, b) => {
          if (
            a[sortChoice.key].toLowerCase() < b[sortChoice.key].toLowerCase()
          ) {
            return sortChoice.direction === 'ascending' ? -1 : 1
          }
          if (
            a[sortChoice.key].toLowerCase() > b[sortChoice.key].toLowerCase()
          ) {
            return sortChoice.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      }
      if (sortChoice.sortMethod == 'nestedObjectString') {
        sortedItems.sort((a, b) => {
          if (
            a[sortChoice.key].title.toLowerCase() <
            b[sortChoice.key].title.toLowerCase()
          ) {
            return sortChoice.direction === 'ascending' ? -1 : 1
          }
          if (
            a[sortChoice.key].title.toLowerCase() >
            b[sortChoice.key].title.toLowerCase()
          ) {
            return sortChoice.direction === 'ascending' ? 1 : -1
          }
          return 0
        })
      }
    }
    return sortedItems
  }, [items, sortChoice])

  const trackSorting = (key) => {
    let direction = 'ascending'
    let sortMethod = ''
    if (key == 'name') {
      sortMethod = 'string'
    }
    if (key == 'category' || key == 'manufacturer') {
      sortMethod = 'nestedObjectString'
    }
    if (key == 'stock' || key == 'price') {
      sortMethod = 'number'
    }

    if (sortChoice.key === key && sortChoice.direction === 'ascending') {
      direction = 'descending'
    }
    setSortChoice({key, direction, sortMethod})
  }
  return {items: sortedItems, trackSorting}
}
