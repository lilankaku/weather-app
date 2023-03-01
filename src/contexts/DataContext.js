import {createContext} from 'react'

export const DataContext = createContext({
    dateRange: '',
    city: {},
    data: [],
    setData: () => {},
    setDateRange: () => {},
    setCity: () => {},
  })