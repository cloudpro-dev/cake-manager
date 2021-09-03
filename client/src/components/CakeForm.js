import React, { useState } from "react";
import {Button, Grid, TextField, makeStyles, Paper, Typography, CircularProgress, Container} from "@material-ui/core";
import {Link as RouterLink, useHistory } from "react-router-dom";
import CakeDataService from "../services/cake.service";
import {useCakesStore} from "../store";
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
    buttonContainer: {
        marginTop: 16
    },
    formPanel: {
        padding: 20
    },
    formContainer: {
        maxWidth: "600px",
        textAlign: "center"
    },
    buttonProgress: {
        marginTop: 20,
        color: blue[500],
    },
}));

const initialFormState = {
    title: '',
    description: '',
    imageUrl: ''
}

/**
 * Cake form component for inputting new Cake details
 * @returns {JSX.Element}
 * @constructor
 */
function CakeForm() {
    const classes = useStyles();

    const [form, setForm] = useState(initialFormState);
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const history = useHistory();

    // custom context
    const {dispatch} = useCakesStore();

    // update the form state when a field value changes i.e. controlled input
    const setInput = (inputName) => {
        return (e) => {
            const newValue = {[inputName] : e.target.value}
            return setForm(form => ({...form, ...newValue}))
        }
    }

    // handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();

        // disables the submit button
        setSubmitting(true);

        // create a new cake via the service
        CakeDataService.create(form)
            .then(response => {
                console.log("Cake saved", response);
                dispatch({
                    type: 'CREATED',
                    payload: response.data
                });
                // use React Router id to pass back to main page
                history.push("/?success=true&id=" + response.data.id)
            })
            .catch(e => {
                if(e.response && e.response.status === 400) {
                    // bad request (server-side validation issue)
                    // response contain errors which we can use to highlight fields

                    // set field errors
                    let map = e.response.data.fieldErrors.reduce((accumulator, currentValue) => {
                        accumulator[currentValue.field] = currentValue.message;
                        return accumulator;
                    }, {});
                    setErrors(map);
                    // re-enable the submit button
                    setSubmitting(false)
                }
            });
    }

    return (
        <Container className={classes.formContainer}>
            <form onSubmit={handleSubmit} noValidate>
                <Typography variant="h4" align="center" component="h1" gutterBottom>
                    Create a new Cake
                </Typography>
                <Typography paragraph align="center">
                    Use the form below to add a new Cake to the application
                </Typography>
                <Paper className={classes.formPanel}>
                    <Grid container alignItems="flex-start" spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="title"
                                label="Title"
                                value={form.title}
                                error={!!errors.title}
                                helperText={errors.title}
                                onChange={setInput("title")}
                                disabled={isSubmitting}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="description"
                                label="Description"
                                value={form.description}
                                error={!!errors.description}
                                helperText={errors.description}
                                onChange={setInput("description")}
                                disabled={isSubmitting}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="imageUrl"
                                label="Image URL"
                                value={form.imageUrl}
                                error={!!errors.imageUrl}
                                helperText={errors.imageUrl}
                                onChange={setInput("imageUrl")}
                                disabled={isSubmitting}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item className={classes.buttonContainer}>
                            <Button
                                type="button"
                                variant="contained"
                                component={RouterLink}
                                to={"/"}
                                disabled={isSubmitting}
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid item className={classes.buttonContainer}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Submit
                            </Button>
                        </Grid>
                        <Grid item>
                            {isSubmitting && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        </Container>
    );
}

export default CakeForm