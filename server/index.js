const express = require("express");
const cors = require("cors");
const checkInService = require('./services/checkInService');
const clientService = require('./services/clientService');
const positiveQuestionsService = require('./services/positiveQuestionsService');

// SET UP THE ENDPOINTS
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World! I'm alive!");
});

// CheckInData endpoints
app.get("/checkins", async (req, res) => {
  const checkIns = await checkInService.getAllCheckIns();
  res.json(checkIns);
});

app.get("/checkins/:id", async (req, res) => {
  const checkIn = await checkInService.getCheckInById(req.params.id);
  res.json(checkIn);
});

app.put("/checkins/:id", async (req, res) => {
  const updatedCheckIn = await checkInService.updateCheckIn(req.params.id, req.body);
  res.json(updatedCheckIn);
});

// Clients endpoints
app.get("/clients", async (req, res) => {
  const clients = await clientService.getAllClients();
  res.json(clients);
});

app.get("/clients/:id", async (req, res) => {
  const client = await clientService.getClientById(req.params.id);
  res.json(client);
});

app.put("/clients/:id", async (req, res) => {
  const updatedClient = await clientService.updateClient(req.params.id, req.body);
  res.json(updatedClient);
});

// PositiveQuestions endpoints
app.get("/positive-questions", async (req, res) => {
  const positiveQuestions = await positiveQuestionsService.getAllPositiveQuestions();
  res.json(positiveQuestions);
});

app.get("/positive-questions/:id", async (req, res) => {
  const positiveQuestion = await positiveQuestionsService.getPositiveQuestionById(req.params.id);
  res.json(positiveQuestion);
});

app.put("/positive-questions/:id", async (req, res) => {
  const updatedPositiveQuestion = await positiveQuestionsService.updatePositiveQuestion(req.params.id, req.body);
  res.json(updatedPositiveQuestion);
});

// port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});