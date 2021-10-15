const express = require("express")
const cors = require("cors")
const jsonServer = require("json-server")
const { default: axios } = require("axios")

const app = express()
app.use(express.json())
app.use(cors())

const baseUrl = "https://propertytracker.s3.us-west-1.amazonaws.com/"
const suffix = "_data.json"
//suburb name to be taken from front end and space needs to be replaced with "+".
// also ALL UPPER CASE FOR SUBURB NAME

const subRouter = express.Router()

let dbData = ""
/*
*   Front end will include these in the request
    1. String suburb => suburb of the address. this will be used to retrieve json file
    2. Array of Array<String> addrs =>  array of address sent back by geocoding api 
        Array<String> first element is street number. second element is st name
*/
subRouter.route("/").post((req, res) => {
    const { suburb, addrs } = req.body
    console.log(`received request for ${addrs} ${suburb}`)
    suburbUpper = suburb.replace(" ", "+").toUpperCase()
    const dbURL = `${baseUrl}${suburbUpper}${suffix}`
    axios
        .get(dbURL)
        .then((result) => {
            dbData = result.data.Entries
            if (!dbData) {
                res.json({ message: "we do not have entry" })
            }

            let filteredData = dbData.filter(
                (item) =>
                    item.P_H_Num === addrs[0][0] &&
                    item.P_S_Name === addrs[0][1]
            )

            if (!filteredData) {
                res.json({ message: "we do not have data" })
            }
            res.json({ data: filteredData })
        })
        .catch((err) => {
            console.log("unable to retrieve data from server")
            throw err
        })
})

app.use("/api", subRouter)
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
