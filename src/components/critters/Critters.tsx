import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import {
  BaseCritter,
  CritterType,
  bugsData,
  fishData,
  seaData,
  Critter,
} from '@james-giesbrecht/critter-companion-utility'

import { useApi } from 'context/Api'
import { useAuth } from 'context/Auth'
import useStore from 'store'
import { MainFilter } from 'typescript/enums'
import { filterCritters, getCritterImagePath } from 'utility/critterUtility'

import { makeStyles, Tab, Tabs } from '@material-ui/core'
import CrittersTable from 'components/critters/CrittersTable'
import SearchSection from 'components/critters/SearchSection'
import SignInPrompt from 'components/critters/SignInPrompt'
import Controls from 'components/layout/controls/Controls'
import Centered from 'components/ui/Centered'
import Loading from 'components/ui/Loading'
import CustomPaper from 'components/ui/CustomPaper'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down(450)]: {
      flexDirection: 'column',
    },
  },
  tabImg: {
    width: 45,
    marginRight: theme.spacing(1),
    [theme.breakpoints.down(450)]: {
      marginRight: 0,
    },
  },
}))

const initialFilterConfig = {
  isNorthern: true,
  mainFilter: MainFilter.All,
  statusFilters: [],
  showDonated: true,
  donated: {},
}

const critterData: {
  Bugs: { raw: BaseCritter[]; initial: Critter[] }
  Fish: { raw: BaseCritter[]; initial: Critter[] }
  Sea: { raw: BaseCritter[]; initial: Critter[] }
} = {
  Bugs: { raw: bugsData, initial: filterCritters(bugsData, initialFilterConfig) },
  Fish: { raw: fishData, initial: filterCritters(fishData, initialFilterConfig) },
  Sea: { raw: seaData, initial: filterCritters(seaData, initialFilterConfig) },
}

const Critters = () => {
  const classes = useStyles()
  const isNorthern = useStore((state) => state.filters.isNorthern)
  const search = useStore((state) => state.filters.search)
  const donated = useStore((state) => state.donated)
  const setDonated = useStore((state) => state.setDonated)
  const mainFilter = useStore((state) => state.filters.mainFilter)
  const statusFilters = useStore((state) => state.filters.statusFilters)
  const showDonated = useStore((state) => state.filters.showDonated)
  const { donatedRef, updateCritters } = useApi()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<CritterType>('Bugs')
  const [filteredBugs, setFilteredBugs] = useState<Critter[]>(critterData.Bugs.initial)
  const [filteredFish, setFilteredFish] = useState<Critter[]>(critterData.Fish.initial)
  const [filteredSea, setFilteredSea] = useState<Critter[]>(critterData.Sea.initial)

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

  useEffect(() => {
    const newData = filterCritters(critterData[activeTab].raw, {
      isNorthern,
      mainFilter,
      statusFilters,
      showDonated,
      donated,
    })
    if (activeTab === 'Bugs') {
      setFilteredBugs(newData)
    } else if (activeTab === 'Fish') {
      setFilteredFish(newData)
    } else if (activeTab === 'Sea') {
      setFilteredSea(newData)
    }
  }, [activeTab, isNorthern, mainFilter, statusFilters, showDonated, donated])

  const handleTabChange = (event: SyntheticEvent, newTab: CritterType) => {
    setActiveTab(newTab)
  }

  const getRandomImg = (critters: BaseCritter[]) =>
    getCritterImagePath(critters[Math.floor(Math.random() * critters.length)].id)

  const randomBug = useMemo(() => getRandomImg(bugsData), [])
  const randomFish = useMemo(() => getRandomImg(fishData), [])
  const randomSeaCreature = useMemo(() => getRandomImg(seaData), [])

  let content

  if (isLoading) {
    content = (
      <Centered relative>
        <Loading />
      </Centered>
    )
  } else if (search) {
    const allCritters = filterCritters(bugsData.concat(fishData, seaData), {
      isNorthern,
      mainFilter: MainFilter.All,
      statusFilters,
      showDonated,
      donated,
    })
    content = <SearchSection critters={allCritters} />
  } else {
    content = (
      <CustomPaper>
        <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
          <Tab
            value="Bugs"
            label={
              <span className={classes.tab}>
                <img className={classes.tabImg} src={randomBug} alt="" />
                Bugs
              </span>
            }
          />
          <Tab
            value="Fish"
            label={
              <span className={classes.tab}>
                <img className={classes.tabImg} src={randomFish} alt="" />
                Fish
              </span>
            }
          />
          <Tab
            value="Sea"
            label={
              <span className={classes.tab}>
                <img className={classes.tabImg} src={randomSeaCreature} alt="" />
                Sea
              </span>
            }
          />
        </Tabs>
        {activeTab === 'Bugs' && <CrittersTable critters={filteredBugs} />}
        {activeTab === 'Fish' && <CrittersTable critters={filteredFish} />}
        {activeTab === 'Sea' && <CrittersTable critters={filteredSea} />}
      </CustomPaper>
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
