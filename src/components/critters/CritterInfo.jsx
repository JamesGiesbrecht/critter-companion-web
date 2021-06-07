import { Card, CardHeader, CardContent, Typography, Dialog, makeStyles } from '@material-ui/core'
import { FishSizes } from 'constants/AppConstants'
import Months from 'components/critters/Months'

const useStyles = makeStyles((theme) => ({
  critterInfo: {
    width: 350,
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
    width: 240,
    paddingLeft: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(2),
      width: 100,
    },
  },
  infoTitle: {
    textDecoration: 'underline',
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
}))

const CritterInfo = ({ critter, dialogOpen, handleDialogClose, nameButton, hours }) => {
  const classes = useStyles()

  return (
    <Dialog
      classes={{ paper: classes.critterInfo }}
      aria-labelledby={critter.name}
      aria-describedby={`${critter.name} Details`}
      open={dialogOpen}
      onClose={handleDialogClose}>
      <Card aria-labelledby={critter.name}>
        <CardHeader title={nameButton} />
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
            <div>
              <Typography variant="subtitle2" className={classes.infoTitle}>
                Available Time:
              </Typography>
              <Typography>{hours}</Typography>
            </div>
            {critter.size && (
              <div>
                <Typography variant="subtitle2" className={classes.infoTitle}>
                  Size:
                </Typography>
                <Typography>{FishSizes[critter.size]}</Typography>
              </div>
            )}
          </div>
        </CardContent>
        <CardContent className={classes.months}>
          <Months className={classes.month} months={critter.months} />
        </CardContent>
      </Card>
    </Dialog>
  )
}

export default CritterInfo
