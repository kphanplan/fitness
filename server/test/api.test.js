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
            name: "Updated Name", // Updating name field
            gender: "male", // Updating gender field
          };
      
          chai
            .request(server)
            .put("/clients/1") // Replace 1 with an existing client ID
            .send(requestBody)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("object");
              expect(res.body.name).to.equal("Updated Name"); // Asserting that the name was updated
              expect(res.body.gender).to.equal("male"); // Asserting that the gender was updated
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
                motivationRating: 8,
                motivationDescription: "Feeling motivated to crush my goals this week!",
                nutritionAdherenceRating: 7,
                nutritionAdherenceDescription: "I had a cheat meal over the weekend, but other than that, I've been sticking to my meal plan.",
                coachResponse: "Great job on sticking to your meal plan! Let's keep up the good work."
            };
    
            chai
                .request(server)
                .put("/checkins/1") // Replace 1 with an existing check-in ID
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.motivationRating).to.equal(requestBody.motivationRating);
                    expect(res.body.motivationDescription).to.equal(requestBody.motivationDescription);
                    expect(res.body.nutritionAdherenceRating).to.equal(requestBody.nutritionAdherenceRating);
                    expect(res.body.nutritionAdherenceDescription).to.equal(requestBody.nutritionAdherenceDescription);
                    expect(res.body.coachResponse).to.equal(requestBody.coachResponse);
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
                question: "What is something positive that happened to you today?",
            };
    
            chai
                .request(server)
                .put("/positive-questions/1") // Replace 1 with an existing positive question ID
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.question).to.equal(requestBody.question);
                    expect(res.body.createdAt).to.be.a("string");
                    done();
                });
        });
    });
});

describe("OpenAI Services", function() {
    this.timeout(20000); // set timeout for all tests in this describe block

    describe("POST /generate-coach-response", () => {
        it("Should generate a coach template", (done) => {
            const requestBody = {
                clientResponse: "I did really well this week.",
                coachStyleExamples: "Great job! Keep up the good work.",
            };

            chai
                .request(server)
                .post("/generate-coach-response")
                .send(requestBody)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an("object");
                    expect(res.body.message).to.be.a("string");
                    done();
                });
        });
    });

    describe("POST /generate-tasks", () => {
        it("Should detect tasks from the coach's response", (done) => {
            const requestBody = {
                coachResponse: "Let's update your macros to 150P 200C 60F",
            };

            chai
                .request(server)
                .post("/generate-tasks")
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