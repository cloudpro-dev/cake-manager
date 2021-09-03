import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";

import {Backdrop, CircularProgress, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';

import CakePanel from "./components/CakePanel";
import NavBar from "./components/NavBar";

import {CakesProvider, useAuthStore} from "./store";
import CakeForm from "./components/CakeForm";

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3, 0),
    }
}));

/**
 * Main application component
 * Show a backdrop while user authentication is performed and routes components based on URL
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    const classes = useStyles();
    const [ { isAuthPending }, { getUserDetails } ] = useAuthStore();

    // verify credentials once on load
    useEffect(() => {getUserDetails()}, []);

    return (
        <CakesProvider>
            <CssBaseline/>
            {isAuthPending ? (
                /* Load backdrop whilst we check user authentication */
                <Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                /* Credentials have been checked */
                /* User may, or may not be logged in right now */
                <React.Fragment>
                    <NavBar />
                    <Container className={classes.content}>
                        <Switch>
                            <Route exact path="/add">
                                <CakeForm />
                            </Route>
                            <Route exact path={["/", "/cakes"]}>
                                <CakePanel />
                            </Route>
                        </Switch>
                    </Container>
                </React.Fragment>
            )}
        </CakesProvider>
    );
}

export default App;
