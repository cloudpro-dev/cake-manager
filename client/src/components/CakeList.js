import {Box, Button, Divider, Grid, List, ListItem, makeStyles, Paper, Tooltip, Typography} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import {Skeleton} from "@material-ui/lab";
import React from "react";
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
    listContainer: {
        margin: theme.spacing(5, 0, 0, 0),
    },
    listTitle: {
        fontSize: 24,
        padding: theme.spacing(2, 0, 0, 2),
    },
    addButton: {
        margin: "15px 10px 10px 0",
        minWidth: "18px",
        borderRadius: "50%",
        padding: "5px"
    },
    cakeList: {
        height: 540,
        overflow: "auto",
        paddingTop: "0px"
    },
    skeletonContainer: {
        padding: '1rem'
    },
    skeletonItem: {
        marginBottom: '0.70rem',
        borderRadius: '10px'
    }
}));

/**
 * List component which shows all the loaded Cakes
 * @param isAuthenticated is the user authenticated
 * @param cakes list of Cake details to display
 * @param selectedIndex the selected cakes index
 * @param onSelect selection callback
 * @param loading true if the list is loading, false otherwise
 * @returns {JSX.Element}
 * @constructor
 */
function CakeList({isAuthenticated, cakes, selectedIndex, onSelect, loading}) {
    const classes = useStyles();

    return (
        <Paper className={classes.listContainer}>
            <Grid
                justify="space-between"
                container
            >
                <Grid item>
                    <Typography className={classes.listTitle} color="textSecondary" gutterBottom>
                        Cake List
                    </Typography>
                </Grid>
                <Grid item>
                    <Tooltip title="Add a new cake" aria-label="add">
                        <Button className={classes.addButton}
                                color="primary"
                                variant="contained"
                                component={RouterLink}
                                to={"/add"}
                                disabled={!isAuthenticated}>
                            <AddIcon />
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
            <Divider />
            <List component="nav" className={classes.cakeList}>
                {loading ? (
                    <Box className={classes.skeletonContainer}>
                        {Array(14).fill(1).map((n,i) => {
                            return <Skeleton variant="rect" animation="wave" height={25} className={classes.skeletonItem} key={i} data-testid="list-skeleton" />
                        })}
                    </Box>
                ) : (
                    cakes &&
                    cakes.map((cake, index) => (
                        <ListItem
                            key={index}
                            selected={index === selectedIndex}
                            onClick={() => onSelect(cake, index)}
                            divider
                            button>
                            {cake.title}
                        </ListItem>
                    ))
                )}
            </List>
        </Paper>
    );
}

CakeList.propTypes = {
    isAuthenticated: PropTypes.bool,
    cakes: PropTypes.array,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    loading: PropTypes.bool
}

export default CakeList