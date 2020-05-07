import React, { useState } from 'react'
import {
  TableRow, TableCell, Checkbox, makeStyles,
} from '@material-ui/core'
import Months from './Months'

const useStyles = makeStyles({
  critterImgCell: {
    padding: '0 10px',
  },
  critterImg: {
    width: '40px',
  },
})

const CritterRow = ({
  critter, obtainedCritters, setObtainedCritters, isNorthern, hours,
}) => {
  const classes = useStyles()
  const [isChecked, setIsChecked] = useState(obtainedCritters.includes(critter.name))

  const handleObtainedCheck = (critterName) => {
    const critterIndex = obtainedCritters.indexOf(critterName)
    setIsChecked((prevChecked) => !prevChecked)
    if (critterIndex > -1) {
      setObtainedCritters((prevCritters) => {
        prevCritters.splice(critterIndex, 1)
        return prevCritters
      })
    } else {
      setObtainedCritters((prevCritters) => prevCritters.concat([critterName]))
    }
  }

  return (
    <TableRow
      hover
      tabIndex={-1}
      key={critter.name}
    >
      <TableCell classes={{ root: classes.critterImgCell }}>
        <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
      </TableCell>
      <TableCell component="th" scope="critter" padding="none">
        {critter.name}
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isChecked}
          onChange={() => handleObtainedCheck(critter.name)}
          name={critter.name}
          color="primary"
        />
      </TableCell>
      <TableCell align="right">{critter.value}</TableCell>
      <TableCell align="right">{critter.location}</TableCell>
      <TableCell align="right">{hours}</TableCell>
      <TableCell align="right"><Months months={isNorthern ? critter.northern_months : critter.southern_months} /></TableCell>
    </TableRow>
  )
}

export default CritterRow
