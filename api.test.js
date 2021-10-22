// Import supertest
const supertest = require("supertest")

// Initialise server  + router
const app = require("./Server/app")


describe("is_server_running", () =>{
    it("should be listening", async () =>{
        await supertest(app).get("/")
        .expect(404)
    })
})