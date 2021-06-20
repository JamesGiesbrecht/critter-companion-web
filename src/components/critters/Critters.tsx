import { SyntheticEvent, useEffect, useMemo, useState } from 'react'

import bugsData from 'assets/data/bugs'
import fishData from 'assets/data/fish'
import seaData from 'assets/data/sea'
import { useApi } from 'context/Api'
import { useAuth } from 'context/Auth'
import useStore from 'store'
import { CritterType, JsonCritter } from 'typescript/types'
import { addProperties } from 'utility/critterUtility'

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

const Critters = () => {
  const classes = useStyles()
  const isNorthern = useStore((state) => state.filters.isNorthern)
  const search = useStore((state) => state.filters.search)
  const donated = useStore((state) => state.donated)
  const setDonated = useStore((state) => state.setDonated)
  const { donatedRef, updateCritters } = useApi()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<CritterType>('Bugs')

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

  const handleTabChange = (event: SyntheticEvent, newTab: CritterType) => setActiveTab(newTab)

  const getRandomImg = (critters: JsonCritter[]) =>
    critters[Math.floor(Math.random() * critters.length)].imagePath

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
    const allCritters = addProperties(bugsData.concat(fishData, seaData), isNorthern)
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
        {activeTab === 'Bugs' && <CrittersTable critters={addProperties(bugsData, isNorthern)} />}
        {activeTab === 'Fish' && <CrittersTable critters={addProperties(fishData, isNorthern)} />}
        {activeTab === 'Sea' && <CrittersTable critters={addProperties(seaData, isNorthern)} />}
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
