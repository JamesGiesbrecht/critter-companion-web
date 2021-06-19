import { ChangeEvent, FC, Ref } from 'react'

import useStore from 'store'

import { InputBase, makeStyles } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/ClearRounded'
import SearchIcon from '@material-ui/icons/Search'

interface Props {
  inputRef: Ref<any> | undefined
}

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.15)`,
    '&:hover': {
      backgroundColor: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.2)`,
    },
    width: '100%',
    marginTop: theme.spacing(1),
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: `rgba(${theme.palette.mode === 'light' ? '0, 0, 0' : '255, 255, 255'}, 0.54)`,
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 0, 1, 0),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

const Search: FC<Props> = ({ inputRef }) => {
  const classes = useStyles()
  const search = useStore((state) => state.filters.search)
  const setSearch = useStore((state) => state.filters.setSearch)

  const handleUpdateSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value.toLowerCase())

  const handleClearSearch = () => setSearch('')

  let clearIcon = null
  if (search !== '') {
    clearIcon = (
      <div
        className={classes.searchIcon}
        onClick={handleClearSearch}
        onKeyPress={handleClearSearch}
        role="button"
        tabIndex={0}>
        <ClearIcon />
      </div>
    )
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        inputRef={inputRef}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={search}
        onChange={handleUpdateSearch}
      />
      {clearIcon}
    </div>
  )
}

export default Search
