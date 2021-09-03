import React, {useState} from "react";
import {IconButton, InputBase, makeStyles, Paper} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));

/**
 * Search bar component that wraps an input and icon
 * @param onSearch search handler callback
 * @param loading true if cakes are loading, false otherwise
 * @returns {JSX.Element}
 * @constructor
 */
function SearchBar({onSearch, loading}) {
    const classes = useStyles();

    const [query, setQuery] = useState("");

    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            onSearch(query);
        }
    }

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                name="query"
                className={classes.input}
                placeholder="Search Cakes"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={() => onSearch(query)} disabled={loading}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}

SearchBar.propTypes = {
    onSearch: PropTypes.func,
    loading: PropTypes.bool
}

export default SearchBar