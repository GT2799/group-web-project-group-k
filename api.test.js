// Import supertest
const supertest = require("supertest")

// Initialise server  + router
const app = require("./Server/app")


describe("is_server_running", () =>{
    it("should be listening", async () =>{
        await supertest(app).get("/")
        .expect(404)
        .then(res =>{
            expect(res.headers['x-powered-by']).toBe("Express")
        })
    })

    it("api should return a response",async ()=>{
        await supertest(app).get("/api/")
            .expect(404)
            .then(res => {
                expect(res.headers['content-type']).toBe('text/html; charset=utf-8')
                expect(res.headers['x-powered-by']).toBe('Express')
            })
    })
})


// Methods test
// The only available methods are POST

// GET TEST
test("GET /api", async () =>{
    await supertest(app).get("/")
        .expect(404)
        .then((response) => {

        })
})

// GET TEST
test("PUT /", async () =>{
    await supertest(app).put("/api")
        .expect(404)
        .then((response) => {

        })
})


// DELETE TEST
test("DELETE /", async () =>{
    await supertest(app).delete("/")
        .expect(404)
        .then((response) => {

        })
})


