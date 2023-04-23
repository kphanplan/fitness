const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

const { expect } = chai;

chai.use(chaiHttp);

describe("Client endpoints", () => {
    describe("GET /clients", () => {
        it("Should get all clients", (done) => {
            chai
                .request(server)
                .get("/clients")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body[0]).to.be.an("object");
                    done();
                });
        });
    });

    describe("GET /clients/:id", () => {
        it("Should get a specific client", (done) => {
            chai
                .request(server)
                .get("/clients/1") // Replace 1 with an existing client ID
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.id).to.equal(1); // Replace with the correct client ID
                    done();
                });
        });
    });

    describe("PUT /clients/:id", () => {
        it("Should update a specific client", (done) => {
            const requestBody = {
                // Add the fields you want to update here
            };

            chai
                .request(server)
                .put("/clients/1") // Replace 1 with an existing client ID
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    // Add assertions for the updated fields here
                    done();
                });
        });
    });
});

describe("CheckIn endpoints", () => {
    describe("GET /checkins", () => {
        it("Should get all check-ins", (done) => {
            chai
                .request(server)
                .get("/checkins")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body[0]).to.be.an("object");
                    done();
                });
        });
    });

    describe("GET /checkins/:id", () => {
        it("Should get a specific check-in", (done) => {
            chai
                .request(server)
                .get("/checkins/1") // Replace 1 with an existing check-in ID
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.id).to.equal(1); // Replace with the correct check-in ID
                    done();
                });
        });
    });

    describe("PUT /checkins/:id", () => {
        it("Should update a specific check-in", (done) => {
            const requestBody = {
                // Add the fields you want to update here
            };

            chai
                .request(server)
                .put("/checkins/1") // Replace 1 with an existing check-in ID
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    // Add assertions for the updated fields here
                    done();
                });
        });
    });
});

describe("PositiveQuestions endpoints", () => {
    describe("GET /positive-questions", () => {
        it("Should get all positive questions", (done) => {
            chai
                .request(server)
                .get("/positive-questions")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("array");
                    expect(res.body[0]).to.be.an("object");
                    done();
                });
        });
    });

    describe("GET /positive-questions/:id", () => {
        it("Should get a specific positive question", (done) => {
            chai
                .request(server)
                .get("/positive-questions/1") // Replace 1 with an existing positive question ID
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.id).to.equal(1); // Replace with the correct positive question ID
                    done();
                });
        });
    });

    describe("PUT /positive-questions/:id", () => {
        it("Should update a specific positive question", (done) => {
            const requestBody = {
                // Add the fields you want to update here
            };

            chai
                .request(server)
                .put("/positive-questions/1") // Replace 1 with an existing positive question ID
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    // Add assertions for the updated fields here
                    done();
                });
        });
    });
});

describe("OpenAI Services", () => {
    describe("POST /generateCoachTemplate", () => {
        it("Should generate a coach template", (done) => {
            const requestBody = {
                clientResponse: "I did really well this week.",
                coachStyleExamples: "Great job! Keep up the good work.",
            };

            chai
                .request(server)
                .post("/generateCoachTemplate")
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.message).to.be.a("string");
                    done();
                });
        });
    });

    describe("POST /detectTasks", () => {
        it("Should detect tasks from the coach's response", (done) => {
            const requestBody = {
                coachResponse: "Let's update your macros to 150P 200C 60F",
            };

            chai
                .request(server)
                .post("/detectTasks")
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.tasks).to.be.a("string");
                    done();
                });
        });
    });
});