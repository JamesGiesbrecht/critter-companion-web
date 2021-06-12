import { useEffect, useState } from 'react'
import { useApi } from 'context/Api'
import useStore, { Statuses } from 'store'
import bugsData from 'assets/data/bugs.json'
import fishData from 'assets/data/fish.json'
import seaData from 'assets/data/sea.json'
import { makeStyles } from '@material-ui/core'
import Controls from 'components/layout/controls/Controls'
import SignInPrompt from 'components/critters/SignInPrompt'
import CritterSection from 'components/critters/CritterSection'
import SearchSection from 'components/critters/SearchSection'
import Loading from 'components/ui/Loading'
import Centered from 'components/ui/Centered'
import { useAuth } from 'context/Auth'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}))

const today = new Date()
const curMonth = today.getMonth() + 1

const hasPrevMonth = (months) => {
  // January
  if (curMonth === 1) {
    return months.includes(12)
  }
  return months.includes(curMonth - 1)
}

const hasNextMonth = (months) => {
  // December
  if (curMonth === 12) {
    return months.includes(1)
  }
  return months.includes(curMonth + 1)
}

const isAvailableNow = (months) => months.includes(curMonth)

const getAvailability = (months) => {
  const availability = {}

  if (isAvailableNow(months)) {
    availability.isAvailableNow = true
    if (!hasPrevMonth(months)) {
      availability[Statuses.New] = true
    }
    if (!hasNextMonth(months)) {
      availability[Statuses.Leaving] = true
    }
  } else if (hasNextMonth(months)) {
    availability[Statuses.Incoming] = true
  }

  return availability
}

const Critters = () => {
  const classes = useStyles()
  const isNorthern = useStore((state) => state.filters.isNorthern)
  const search = useStore((state) => state.filters.search)
  const donated = useStore((state) => state.donated)
  const setDonated = useStore((state) => state.setDonated)
  const { donatedRef } = useApi()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (donatedRef) {
      setIsLoading(true)
      donatedRef.on('value', (snapshot) => {
        let data = snapshot.val()
        if (!data) {
          data = donated
          donatedRef.update(donated)
        }
        setDonated(data)
        setIsLoading(false)
      })
    }
    return () => donatedRef?.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donatedRef, setDonated])

  const addProperties = (critters) =>
    critters.map((critter) => {
      const critterMonths = isNorthern ? critter.northern_months : critter.southern_months
      return {
        ...critter,
        months: critterMonths,
        ...getAvailability(critterMonths),
      }
    })

  const bugs = addProperties(bugsData)
  const fish = addProperties(fishData)
  const seaCreatures = addProperties(seaData)

  let content

  if (isLoading) {
    content = (
      <Centered relative>
        <Loading />
      </Centered>
    )
  } else if (search) {
    content = <SearchSection allCritters={bugs.concat(fish, seaCreatures)} />
  } else {
    content = (
      <>
        <CritterSection allCritters={bugs} type="Bugs" />
        <CritterSection allCritters={fish} type="Fish" />
        <CritterSection allCritters={seaCreatures} type="Sea" />
      </>
    )
  }

  return (
    <div className={classes.root}>
      <Controls />
      {!user && <SignInPrompt />}
      {content}
    </div>
  )
}

export default Critters
