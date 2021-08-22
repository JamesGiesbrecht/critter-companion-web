import { MouseEvent } from 'react'
import { Status } from '@james-giesbrecht/critter-companion-utility'
import clsx from 'clsx'

import useStore from 'store'
import { dot } from 'styles/cssClasses'
import { MainFilter } from 'typescript/enums'
import { removeItem } from 'utility/utility'

import {
  ToggleButtonGroup,
  ToggleButton,
  useMediaQuery,
  Theme,
  makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    '& > *': {
      flexGrow: '1',
    },
  },
  buttonGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      '& > *:not(:last-child)': {
        marginBottom: '10px',
      },
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      textAlign: 'center',
      '& > *:not(:last-child)': {
        marginRight: '10px',
      },
    },
  },
  toggleGroup: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  isNorthernToggle: {
    [theme.breakpoints.down('lg')]: {
      flexGrow: 5,
    },
  },
  donatedToggle: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('lg')]: {
      flexGrow: 1,
    },
  },
  donatedSelected: {
    backgroundColor: `${theme.palette.primary.main}75!important`,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}50!important`,
    },
  },
  disabled: {
    '& span': {
      color: theme.palette.text.disabled,
    },
  },
  dot,
  new: {
    backgroundColor: theme.palette.success.light,
  },
  leaving: {
    backgroundColor: theme.palette.error.light,
  },
  incoming: {
    backgroundColor: theme.palette.info.light,
  },
}))

const FilterButtons = () => {
  const classes = useStyles()
  const mainFilter = useStore((state) => state.filters.mainFilter)
  const setMainFilter = useStore((state) => state.filters.setMainFilter)
  const statusFilters = useStore((state) => state.filters.statusFilters)
  const setStatusFilters = useStore((state) => state.filters.setStatusFilters)
  const isNorthern = useStore((state) => state.filters.isNorthern)
  const toggleIsNorthern = useStore((state) => state.filters.toggleIsNorthern)
  const showDonated = useStore((state) => state.filters.showDonated)
  const toggleShowDonated = useStore((state) => state.filters.toggleShowDonated)
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))

  const handleIsNorthernChange = (e: MouseEvent<HTMLElement>, newIsNorthern: boolean) => {
    if (newIsNorthern !== isNorthern) toggleIsNorthern()
  }

  const handleMainFilterChange = (e: MouseEvent<HTMLElement>, newMainFilter: MainFilter) => {
    if (newMainFilter === null || newMainFilter === MainFilter.Custom) {
      setMainFilter(MainFilter.Custom)
    } else {
      let newStatusFilters = statusFilters
      if (!newStatusFilters.includes('new')) newStatusFilters.push('new')
      if (!newStatusFilters.includes('leaving')) newStatusFilters.push('leaving')
      if (newMainFilter === MainFilter.All) {
        if (!newStatusFilters.includes('incoming')) newStatusFilters.push('incoming')
      } else if (newMainFilter === MainFilter.Available) {
        if (newStatusFilters.includes('incoming'))
          newStatusFilters = removeItem(newStatusFilters, 'incoming')
      }
      setStatusFilters(newStatusFilters)
      setMainFilter(newMainFilter)
    }
  }

  const handleStatusFiltersChange = (e: MouseEvent<HTMLElement>, newStatusFilters: Status[]) =>
    setStatusFilters(newStatusFilters)

  const toggles = (
    <>
      <ToggleButtonGroup
        className={clsx(classes.buttons, classes.isNorthernToggle)}
        value={isNorthern}
        size="small"
        exclusive
        onChange={handleIsNorthernChange}>
        {/* eslint-disable-next-line react/jsx-boolean-value */}
        <ToggleButton value={true}>Northern</ToggleButton>
        <ToggleButton value={false}>Southern</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButton
        size="small"
        className={classes.donatedToggle}
        classes={{ selected: classes.donatedSelected }}
        value={showDonated}
        selected={showDonated}
        onChange={toggleShowDonated}>
        Include Donated
      </ToggleButton>
    </>
  )

  return (
    <div className={classes.buttonGroup}>
      {isDesktop ? toggles : <div className={classes.toggleGroup}>{toggles}</div>}
      <ToggleButtonGroup
        className={classes.buttons}
        value={mainFilter}
        size="small"
        exclusive
        onChange={handleMainFilterChange}>
        <ToggleButton value={MainFilter.All}>Show All</ToggleButton>
        <ToggleButton value={MainFilter.Available}>Available Now</ToggleButton>
        <ToggleButton value={MainFilter.Custom}>Custom</ToggleButton>
      </ToggleButtonGroup>
      <ToggleButtonGroup
        className={classes.buttons}
        value={statusFilters}
        onChange={handleStatusFiltersChange}
        size="small">
        <ToggleButton
          value="new"
          classes={{ disabled: classes.disabled }}
          disabled={mainFilter !== MainFilter.Custom}>
          New
          <span className={clsx(classes.dot, classes.new)} />
        </ToggleButton>
        <ToggleButton
          value="leaving"
          classes={{ disabled: classes.disabled }}
          disabled={mainFilter !== MainFilter.Custom}>
          Leaving
          <span className={clsx(classes.dot, classes.leaving)} />
        </ToggleButton>
        <ToggleButton
          value="incoming"
          classes={{ disabled: classes.disabled }}
          disabled={mainFilter !== MainFilter.Custom}>
          Incoming
          <span className={clsx(classes.dot, classes.incoming)} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default FilterButtons
