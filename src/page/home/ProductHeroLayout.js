import React from "react"
import PropTypes from "prop-types"
import clsx from "clsx"
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

import Map from "../map/Map"

const styles = (theme) => ({
    root: {
        color: theme.palette.common.white,
        position: "relative",
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.up("sm")]: {
            height: "80vh",
            minHeight: 500,
            maxHeight: 1300,
        },
    },
    container: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(14),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    backdrop: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.5,
        zIndex: 0,
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
    },
    arrowDown: {
        position: "absolute",
        bottom: theme.spacing(1),
    },
})

function ProductHeroLayout(props) {
    const { backgroundClassName, children, classes } = props

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                {//on top of background
                }
                {children}
                <div className={classes.backdrop} />
                <div className={classes.background}>
                    <Map/>
                </div>
                <img
                    className={classes.arrowDown}
                    src="/productHeroArrowDown.png"
                    height="20"
                    width="20"
                    alt="arrow down"
                />
            </Container>
        </section>
    )
}

ProductHeroLayout.propTypes = {
    backgroundClassName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductHeroLayout)
