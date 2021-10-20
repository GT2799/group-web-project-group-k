import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "../../components/Typography"
import { white } from "material-ui/styles/colors"

import { compose } from 'redux'
import { connect } from 'react-redux'

const styles = (theme) => ({
    root: {
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
    },
    container: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(30),
        padding: "0px",
        display: "flex",
        position: "relative",
        width: "100vw",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "no-wrap",
    },
    item: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(0, 5),
        },
    image: {
        height: 55,
    },
    title: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    curvyLines: {
        pointerEvents: "none",
        position: "absolute",
        top: -180,
    },
    
    resultStyle: {
        backgroundColor: theme.palette.primary.dark,
        position: "absolute",
        marginTop: theme.spacing(40),
        width: "100vw",
        height: "35vh",
        display: "flex",
        flexDirection: "column",
    },

    currResults: {
        display: "flex",
        position: "absolute",
        marginTop: theme.spacing(10),
        width: "100vw",
        flexDirection: "row",
        flexWrap: "no-wrap",
        color: "#35ca9b",
        fontSize: "xx-large"
    },

    resAdd:{
        position:"absolute",
        marginLeft:"12vw",
    },
    resPrice:{
        position:"absolute",
        marginLeft:"47vw",
    },
    resNumSold:{
        position:"absolute",
        marginLeft:"83vw",
    },

    resultsContLine: {
        display: "flex",
        position: "absolute",
        marginTop: theme.spacing(20),
        width: "100vw",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "no-wrap",
        color: "white",
    },

    HLine: {
        width: "20vw",
    },

    resultsCont: {
        display: "flex",
        position: "absolute",
        marginTop: theme.spacing(19),
        width: "100vw",
        flexDirection: "row",
        flexWrap: "no-wrap",
        color: "white",
        fontSize: "large"
    },

    Atext:{
        position: "absolute",
        marginLeft: "14vw",
    },

    Ptext:{
        position: "absolute",
        marginLeft: "49vw",
    },

    NStext:{
        position: "absolute",
        marginLeft: "81vw",
    },
})

const ProductValues = (props) => {
    const { classes } = props
    var apiArr = props.apiResponse.data
    var currSuburb = props.suburb.toUpperCase()
    var currAddress = props.address
    var currPrice = props.price
    var currNumSold = props.numSold
    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src="/productCurvyLines.png"
                    className={classes.curvyLines}
                    alt="curvy lines"
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/productValues1.svg"
                                alt="suitcase"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Current Data Set
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "Our app currently uses data from 2001-2020, this data is acquired from official publicly available NSW Property Sales Information."
                                }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="productValues2.svg"
                                alt="graph"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Pricing History
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "Find official sale pricing history and other relevant information of a number of NSW properties by searching or clicking on any property on the map "
                                }
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div className={classes.item}>
                            <img
                                className={classes.image}
                                src="/productValues3.svg"
                                alt="clock"
                            />
                            <Typography variant="h6" className={classes.title}>
                                Our Purpose
                            </Typography>
                            <Typography variant="h5">
                                {
                                    "We wish to create an easy to use app that could help inform real-estate investors and first-home buyers before purchasing property"
                                }
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <div className={classes.resultStyle}>
                    <div className={classes.currResults}>
                        <p className={classes.resAdd}>{currAddress[0].toUpperCase()}, {currAddress[1].toUpperCase()}</p>
                        <p className={classes.resPrice}>{currPrice}</p>
                        <p className={classes.resNumSold}>{currNumSold}</p>
                    </div>
                    <div className={classes.resultsContLine}>
                        <hr className={classes.HLine}></hr>
                        <hr className={classes.HLine}></hr>
                        <hr className={classes.HLine}></hr>
                    </div>
                    <div className={classes.resultsCont}>
                                <p className={classes.Atext}>{currSuburb}</p>
                                <p className={classes.Ptext}>PRICE</p>
                                <p className={classes.NStext}>TIMES SOLD</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}


ProductValues.propTypes = {
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return{
        apiResponse: state.apiResponse,
        suburb: state.suburb,
        address: state.address,
        price: state.price,
        numSold: state.numSold
    }
}

const enhanced = compose(
    connect(mapStateToProps),
    withStyles(styles)
)

export default enhanced(ProductValues)
