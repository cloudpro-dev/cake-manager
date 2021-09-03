import React from "react";
import {
    Avatar,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    makeStyles,
    Paper,
    Typography,
    Box
} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {red} from "@material-ui/core/colors";
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(5, 0, 0, 5),
        height: "600px"
    },
    media: {
        height: "469px"
    },
    avatar: {
        backgroundColor: red[500],
    },
    wrapIcon: {
        verticalAlign: 'middle',
        display: 'inline-flex'
    },
    skeletonTitle: {
        marginBottom: 6
    }
}));

/**
 * Component which shows the details of the selected Cake
 * @param loading true if the cake is loading
 * @param selectedCake the selected Cake for display
 * @returns {JSX.Element}
 * @constructor
 */
function CakeDetails({loading, selectedCake}) {
    const classes = useStyles();

    // default image if original URL is unavailable
    const onMediaFallback = (event) => {
        event.target.src = "https://via.placeholder.com/500x475?text=Image+Not+Available"
    };

    // create an avatar with initials from username (split on space and dash)
    const avatar = () => {
        const parts = selectedCake.createdBy.split(/[\s\-.]/);
        const first = parts[0];
        const last = parts[parts.length - 1];
        const initials = parts.length === 1 ?
            first.charAt(0).toUpperCase() + first.charAt(1).toUpperCase() :
            first.charAt(0).toUpperCase() + last.charAt(0).toUpperCase();
        return (
            <Avatar className={classes.avatar} aria-label="Author initials">{initials}</Avatar>
        );
    }

    return (
        <React.Fragment>
            {loading || selectedCake ? (
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            loading ? (
                                <Skeleton animation="wave" variant="circle" width={40} height={40} data-testid="details-skeleton" />
                            ) : (
                                avatar()
                            )
                        }
                        title={
                            loading ? (
                                    <Skeleton animation="wave" height={10} width="80%" className={classes.skeletonTitle} data-testid="details-skeleton" />
                                ) :
                                    <Box aria-label="Cake name">{selectedCake.title}</Box>
                        }
                        subheader={
                            loading ? (
                                <Skeleton animation="wave" height={10} width="40%" data-testid="details-skeleton" />
                            ) : (
                                <Box aria-label="Cake author">Created by {selectedCake.createdBy}</Box>
                            )
                        }
                    />
                    {
                        loading ? (
                            <Skeleton animation="wave" variant="rect" className={classes.media} data-testid="details-skeleton" />
                        ) : (
                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={selectedCake.imageUrl}
                                title={selectedCake.title}
                                onError={onMediaFallback}
                                aria-label="Picture of cake"
                            />
                        )
                    }
                    <CardContent>
                        {loading ? (
                            <>
                                <Skeleton animation="wave" height={10} className={classes.skeletonTitle} data-testid="details-skeleton" />
                                <Skeleton animation="wave" height={10} width="80%" data-testid="details-skeleton" />
                            </>
                        ) : (
                            <Typography variant="body2" color="textSecondary" component="p" aria-label="Description of cake">
                                {selectedCake.description}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <Paper className={classes.root}></Paper>
            )
            }
        </React.Fragment>
    );
}

CakeDetails.propTypes = {
    loading: PropTypes.bool,
    selectedCake: PropTypes.object
}

export default CakeDetails