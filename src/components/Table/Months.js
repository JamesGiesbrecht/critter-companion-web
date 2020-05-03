import React from 'react'
import { Chip } from '@material-ui/core'

const Months = ({ months }) => {
  const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  return allMonths.map((month, index) => {
    const isActive = months.includes(index + 1)
    const color = isActive ? { color: "primary" } : { disabled: true }
    return (
      <Chip
        size="small"
        label={month}
        {...color}
      />
    )
  })
}

export default Months
