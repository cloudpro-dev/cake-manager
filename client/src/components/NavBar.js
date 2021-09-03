import React, {useRef, useState} from "react";
import {AppBar, Button, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core"
import AccountCircle from "@material-ui/icons/AccountCircle";
import HttpsIcon from "@material-ui/icons/Https";
import ProfilePopover from "./ProfilePopover";
import {useAuthStore} from "../store";

const useStyles = makeStyles(() => ({
    appTitle: {
        flexGrow: 1,
    }
}));

/**
 * Main navigation bar at the top of the page
 * @returns {JSX.Element}
 * @constructor
 */
function NavBar() {
    const classes = useStyles();
    const [isProfileOpen, setProfileOpen] = useState(false);
    const profileAnchorRef = useRef();
    const [ { isAuthenticated, userDetails }, { logout } ] = useAuthStore();

    const logoutHandler = () => {
        // close the popover from the parent component
        setProfileOpen(false);
        // use context method to logout
        logout();
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.appTitle} variant="h6">
                    Cake Manager
                </Typography>
                {isAuthenticated ? (
                    <div>
                        <IconButton
                            title="Profile"
                            color="inherit"
                            ref={profileAnchorRef}
                            onClick={() => setProfileOpen(true)}
                        >
                            <AccountCircle/>
                        </IconButton>
                    </div>
                ) : (
                    <Button
                        title="Login"
                        variant="contained"
                        color="secondary"
                        startIcon={<HttpsIcon/>}
                        href="/oauth2/authorization/github"
                    >
                        Login
                    </Button>
                )}
            </Toolbar>
            <ProfilePopover
                anchorEl={profileAnchorRef.current}
                isOpen={isProfileOpen}
                setOpen={setProfileOpen}
                onClose={() => setProfileOpen(false)}
                onLogout={logoutHandler}
                userDetails={userDetails}
            />
        </AppBar>
    );
}

export default NavBar

