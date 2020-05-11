import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Card, Modal, Avatar, CardHeader } from '@material-ui/core'
import blathersLogo from '../assets/images/blathersLogo.svg'

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
  blathers: {
    height: '1.2em',
    width: '1.2em',
  },
})

const CritterInfo = ({ critter, modalOpen, handleModalClose, parentClasses, isDonated }) => {
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby={critter.name}
      aria-describedby={`${critter.name} Details`}
      open={modalOpen}
      onClose={handleModalClose}
    >
      <Card
        className={[classes.critterInfo].join(' ')}
        aria-labelledby={critter.name}
      >
        <CardHeader
          className={[parentClasses.name, isDonated ? parentClasses.donated : parentClasses.notDonated].join(' ')}
          avatar={<Avatar className={[classes.blathers, parentClasses.blathers].join(' ')} src={blathersLogo} />}
          title={critter.name}
        />
        <div
          aria-describedby={`${critter.name} Details`}
        >
          {critter.name}
        </div>
      </Card>
    </Modal>
  )
}

export default CritterInfo
