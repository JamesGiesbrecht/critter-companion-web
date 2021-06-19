import { useEffect, useState } from 'react'

import bugsData from 'assets/data/bugs'
import fishData from 'assets/data/fish'
import seaData from 'assets/data/sea'
import { useApi } from 'context/Api'
import { useAuth } from 'context/Auth'
import useStore from 'store'
import { Statuses } from 'typescript/enums'
import { Critter, JsonCritter, Month } from 'typescript/types'

import { makeStyles } from '@material-ui/core'
import CritterSection from 'components/critters/CritterSection'
import SearchSection from 'components/critters/SearchSection'
import SignInPrompt from 'components/critters/SignInPrompt'
import Controls from 'components/layout/controls/Controls'
import Centered from 'components/ui/Centered'
import Loading from 'components/ui/Loading'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
}))

const today = new Date()
const curMonth = (today.getMonth() + 1) as Month

const hasPrevMonth = (months: Month[]) => {
  // January
  if (curMonth === 1) {
    return months.includes(12)
  }
  return months.includes(((curMonth as number) - 1) as Month)
}

const hasNextMonth = (months: Month[]) => {
  // December
  if (curMonth === 12) {
    return months.includes(1)
  }
  return months.includes(((curMonth as number) + 1) as Month)
}

const isAvailableNow = (months: Month[]) => months.includes(curMonth)

const getAvailability = (months: Month[]) => {
  const availability: {
    isAvailableNow?: boolean
    [Statuses.New]?: boolean
    [Statuses.Leaving]?: boolean
    [Statuses.Incoming]?: boolean
  } = {}

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
  const { donatedRef, updateCritters } = useApi()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (donatedRef) {
      setIsLoading(true)
      donatedRef.on('value', (snapshot) => {
        let data = snapshot.val()
        if (!data) {
          data = donated
          updateCritters(donated, false)
        }
        setDonated(data)
        setIsLoading(false)
      })
    }
    return () => donatedRef?.off()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donatedRef, setDonated, updateCritters])

  const addProperties = (critters: JsonCritter[]): Critter[] =>
    critters.map((critter) => {
      const critterMonths = isNorthern ? critter.northernMonths : critter.southernMonths
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
    const allCritters = bugs.concat(fish, seaCreatures)
    content = <SearchSection critters={allCritters} />
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
