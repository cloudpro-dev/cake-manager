import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Button, Grid, Popover, Typography} from "@material-ui/core";
import {deepPurple} from '@material-ui/core/colors';
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
    popover: {
        padding: theme.spacing(2)
    },
    typography: {
        padding: theme.spacing(2),
    },
    avatar: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: theme.spacing(1),
        fontSize: 35
    },
    grid: {
        minWidth: "355px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center"
    },
    altLabel: {
        color: "#AAA"
    }
}));

/**
 * User profile details popover component
 * @param anchorEl the page element to anchor the popover to
 * @param isOpen true if the popover is open, false otherwise
 * @param onClose close handler callback
 * @param onLogout logout handler callback
 * @param userDetails the details of the authenticated user
 * @returns {JSX.Element}
 * @constructor
 */
function ProfilePopover({ anchorEl, isOpen, onClose, onLogout, userDetails }) {
    const classes = useStyles();
    const id = isOpen ? "profile-popover" : undefined;

    return (
        <div>
            <Popover
                id={id}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                classes={{
                    paper: classes.popover,
                }}
            >
                <Grid container spacing={2} className={classes.grid}>
                    <Grid item xs={12}>
                        <Avatar className={classes.avatar} src={userDetails && userDetails.avatar ? userDetails.avatar : ""}>
                            {userDetails && userDetails.avatar}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            {userDetails ? userDetails.name : ""}
                        </Typography>
                        <Typography variant="body1" className={classes.altLabel}>
                            {userDetails ? userDetails.alt : ""}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined" onClick={onLogout}>Logout</Button>
                    </Grid>
                </Grid>
            </Popover>
        </div>
    );
}

ProfilePopover.propTypes = {
    anchorEl: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.any })
    ]),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    onLogout: PropTypes.func,
    userDetails: PropTypes.object
}

export default ProfilePopover