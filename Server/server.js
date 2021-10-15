const express = require("express")
const cors = require("cors")
const jsonServer = require("json-server")
const { default: axios } = require("axios")

const app = express()

const baseUrl = "https://propertytracker.s3.us-west-1.amazonaws.com/"
const suffix = "_data.json"
//suburb name to be taken from front end and space needs to be replaced with "+".
// also ALL UPPER CASE FOR SUBURB NAME
let suburbName = "CHATSWOOD"

let dbURL = `${baseUrl}${suburbName}${suffix}`

const subRouter = express.Router()

let dbData = ""

subRouter.route("/").get((req, res) => {
    const { address, suburb } = req.body
    suburbName = suburb.replace(" ", "+").toUpperCase()
    dbURL = `${baseUrl}${suburbName}${suffix}`
    axios
        .get(dbURL)
        .then((res) => {
            dbData = res.data.entries
            data = data.filter((item) => {
                ;`${item.P_H_Num} ${item.P_S_Name}` == address
            })
            res.json(data)
        })
        .catch((err) => {
            throw err
        })
})

// app.use("/", jsonServer.router(dbData))
// app.use("/:sub", (req, res) => {
//     // replace space with + and transform into uppercase
//     suburbName = req.params.sub.replace(" ", "+").toUpperCase()
//     dbURL = `${baseUrl}${suburbName}${suffix}`
//     console.log(dbURL)
//     let dbData = ""
//     axios
//         .get(dbURL)
//         .then((res) => {
//             dbData = res.data
//             console.log(res.data)
//             res.json({
//                 message: "Connected successfully router running on port ",
//             })
//             jsonServer.router(dbData)
//             console.log("finished")
//         })
//         .catch((err) => {
//             throw err
//         })

//     // console.log(suburbName)
//     // console.log(dbURL)
// })

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
