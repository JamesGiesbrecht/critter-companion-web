import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Modal } from '@material-ui/core'

const useStyles = makeStyles({
  critterInfo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: '0',
    height: '200px',
    width: '200px',
  },
})

export default function CritterInfo({ critter, modalOpen, handleModalClose }) {
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby={critter.name}
      aria-describedby={`${critter.name} Details`}
      open={modalOpen}
      onClose={handleModalClose}
    >
      <Card
        className={classes.critterInfo}
        aria-labelledby={critter.name}
      >
        <div
          aria-describedby={`${critter.name} Details`}
        >
          {critter.name}
        </div>
      </Card>
    </Modal>
  )
}
