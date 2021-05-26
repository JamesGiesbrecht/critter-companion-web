import { makeStyles } from '@material-ui/core/styles'
import { Card, Modal, Avatar, CardHeader, CardContent, Typography } from '@material-ui/core'
import blathersLogo from '../assets/images/blathersLogo.svg'
import Months from './Months'

const useStyles = makeStyles({
  critterInfo: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    outline: '0',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '0px',
  },
  blathers: {
    height: '1.2em',
    width: '1.2em',
  },
  critterImg: {
    width: '64px',
    height: '64px',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '190px',
    paddingLeft: '16px',
  },
  infoTitle: {
    textDecoration: 'underline',
  },
  times: {
    marginTop: '16px',
  },
  months: {
    width: '240px',
    boxSizing: 'content-box',
    paddingTop: '0px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  month: {
    height: '22px',
    width: '36px',
    margin: '2px',
    '& span': {
      fontSize: '1em',
    },
  },
})

const CritterInfo = ({
  critter,
  modalOpen,
  handleModalClose,
  parentClasses,
  isDonated,
  handleDonatedCheck,
  isNorthern,
  hours,
}) => {
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby={critter.name}
      aria-describedby={`${critter.name} Details`}
      open={modalOpen}
      onClose={handleModalClose}>
      <Card className={[classes.critterInfo].join(' ')} aria-labelledby={critter.name}>
        <CardHeader
          className={[
            parentClasses.name,
            isDonated ? parentClasses.donated : parentClasses.notDonated,
          ].join(' ')}
          avatar={
            <Avatar
              className={[classes.blathers, parentClasses.blathers].join(' ')}
              src={blathersLogo}
              onClick={() => handleDonatedCheck(critter.name)}
            />
          }
          title={critter.name}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent className={classes.content} aria-describedby={`${critter.name} Details`}>
          <img className={classes.critterImg} src={critter.image_path} alt={critter.name} />
          <div className={classes.info}>
            <div>
              <Typography variant="subtitle2" className={classes.infoTitle}>
                Price:
              </Typography>
              <Typography>{`${critter.value} bells`}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" className={classes.infoTitle}>
                Location:
              </Typography>
              <Typography>{critter.location}</Typography>
            </div>
            <div className={classes.times}>
              <Typography variant="subtitle2" className={classes.infoTitle}>
                Available Time:
              </Typography>
              <Typography>{hours}</Typography>
            </div>
          </div>
        </CardContent>
        <CardContent className={classes.months}>
          <Months
            className={classes.month}
            months={isNorthern ? critter.northern_months : critter.southern_months}
          />
        </CardContent>
      </Card>
    </Modal>
  )
}

export default CritterInfo
