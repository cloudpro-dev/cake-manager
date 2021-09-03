import React, {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import {Grid, Snackbar} from "@material-ui/core"
import SearchBar from "./SearchBar"

import {useAuthStore, useCakesStore} from "../store";
import CakeDataService from "../services/cake.service";
import CakeList from "./CakeList";
import CakeDetails from "./CakeDetails";
import MuiAlert from '@material-ui/lab/Alert';

/**
 * Wrapper for the SearchBar, CakeList and CakeDetails
 * Provides wiring between components
 *
 * @returns {JSX.Element}
 * @constructor
 */
function CakePanel() {
    const [currentCake, setCurrentCake] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [alertOpen, setAlertOpen] = useState(false);
    const {state, dispatch} = useCakesStore();
    const [filtered, setFiltered] = useState(state);
    const [isLoading, setLoading] = useState(false);
    const [ { isAuthenticated } ] = useAuthStore();
    const params = useParams();
    const location = useLocation();

    // select an item in the list
    const selectItem = (cake, index) => {
        setCurrentCake(cake);
        setCurrentIndex(index);
    }

    // handle changes to the query field
    const handleSearch = (query) => {
        if(query.length === 0) {
            setFiltered(state);
            selectItem(state[0], 0);
        }
        else {
            let filtered = [...state.filter(c => c.title.toLowerCase().includes(query.toLowerCase()))];
            setFiltered(filtered);
            selectItem(filtered[0], 0);
        }
    }

    const handleAlertClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    // load the cakes from the backing datastore
    const loadCakes = () => {
        setLoading(true);
        CakeDataService.getAll()
            .then(resp => {
                console.log("Loaded cakes...", resp);
                dispatch({
                    type: "LOADED",
                    payload: resp.data
                });
                // set filtered to be same as state to start with
                setFiltered(resp.data)
                selectItem(resp.data[0], 0);
            })
            .catch(e => console.log(e))
            .finally(() => {setLoading(false)});
    }

    const checkParams = () => {
        let searchParams = new URLSearchParams(location.search);
        let successParam = searchParams.get('success');
        let idParam = searchParams.get('id');
        if(successParam && successParam === 'true') {
            if(idParam && Number(idParam)) {
                setAlertOpen(true);
            }
        }
        else {
            setAlertOpen(false);
        }
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // runs just once on load
    useEffect(() => {loadCakes()}, []);

    // if the URL parameters changes
    useEffect(() => {checkParams()}, [params]);

    return (
        <React.Fragment>
            <Grid container>
                <Grid item sm={12} md={12}>
                    <SearchBar onSearch={handleSearch} loading={isLoading} />
                </Grid>
                <Grid item sm={12} md={4}>
                    <CakeList
                        isAuthenticated={isAuthenticated}
                        cakes={filtered}
                        selectedIndex={currentIndex}
                        onSelect={selectItem}
                        loading={isLoading} />
                </Grid>
                <Grid item sm={12} md={8}>
                    <CakeDetails selectedCake={currentCake} loading={isLoading} />
                </Grid>
            </Grid>
            <Snackbar open={alertOpen}
                      autoHideDuration={6000}
                      onClose={handleAlertClose}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleAlertClose} severity="success">
                    Created Cake successfully
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}

export default CakePanel