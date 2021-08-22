import { useState, memo, useMemo, FC } from 'react'
import { Critter, CritterType } from '@james-giesbrecht/critter-companion-utility'

import { getCritterImagePath } from 'utility/critterUtility'
import useStore from 'store'
import { MainFilter } from 'typescript/enums'

import { Collapse, makeStyles, Typography, Button } from '@material-ui/core'
import CrittersTable from 'components/critters/CrittersTable'
import CustomPaper from 'components/ui/CustomPaper'
import ExpandMoreIcon from 'components/ui/ExpandMoreIcon'

interface Props {
  allCritters: Critter[]
  type: CritterType
}

const useStyles = makeStyles(() => ({
  headingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 10px',
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headingImg: {
    width: '55px',
    marginRight: '20px',
  },
}))

const CritterSection: FC<Props> = ({ allCritters, type }) => {
  const classes = useStyles()
  const mainFilter = useStore((state) => state.filters.mainFilter)
  const statusFilters = useStore((state) => state.filters.statusFilters)
  const showDonated = useStore((state) => state.filters.showDonated)
  const search = useStore((state) => state.filters.search)
  const donated = useStore((state) => state.donated)

  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => setExpanded((prevExpanded) => !prevExpanded)

  const randomImg = useMemo(
    () => getCritterImagePath(allCritters[Math.floor(Math.random() * allCritters.length)].id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const filterCritters = () => {
    let filteredCritters = []
    if (search) {
      return allCritters.filter((critter) => critter.name.toLowerCase().search(search) !== -1)
    }

    if (mainFilter === MainFilter.All) {
      // Add all critters
      filteredCritters = allCritters
    } else if (mainFilter === MainFilter.Available) {
      // add critters that are available now
      filteredCritters = allCritters.filter((critter) => critter.isAvailableNow)
    } else {
      //  Checking if any of the conditions in show are true properties on the critter
      filteredCritters = allCritters.filter(
        (critter) =>
          (statusFilters.includes('incoming') && critter.isIncoming) ||
          (statusFilters.includes('leaving') && critter.isLeaving) ||
          (statusFilters.includes('new') && critter.isNew),
      )
    }

    if (!showDonated) {
      // remove critters that are not donated
      filteredCritters = filteredCritters.filter((critter) => !donated[critter.id])
    }

    return filteredCritters
  }

  const critters = filterCritters()

  let content
  if (critters.length === 0) {
    content = `No ${type.toLowerCase()} to show`
  } else {
    content = <CrittersTable critters={critters} />
  }

  return (
    <CustomPaper>
      <div className={classes.headingWrapper}>
        <div className={classes.heading}>
          <img className={classes.headingImg} src={randomImg} alt={type} />
          <Typography variant="h4">{type}</Typography>
        </div>
        <Button
          size="large"
          color="inherit"
          onClick={handleToggleExpand}
          endIcon={<ExpandMoreIcon expand={expanded} />}>
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <Collapse in={Boolean(expanded)}>{content}</Collapse>
    </CustomPaper>
  )
}

export default memo(CritterSection)
