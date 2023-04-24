const express = require("express");
const cors = require("cors");
const checkInService = require('./services/checkInService');
const clientService = require('./services/clientService');
const positiveQuestionsService = require('./services/positiveQuestionsService');
const openAIService = require('./services/openaiServices');

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

app.post('/checkins', async (req, res) => {
  try {
    const data = req.body;
    const newCheckIn = await checkInService.createCheckIn(data);
    res.json(newCheckIn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create CheckinData' });
  }
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

// Positive Questions endpoints
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


// OpenAI endpoints
app.post("/generate-coach-response", async (req, res) => {
  const { clientResponse, coachStyleExamples } = req.body;
  try {
    const response = await openAIService.generateCoachTemplate(clientResponse, coachStyleExamples);
    res.json({ message: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating coach template" });
  }
});

app.post("/generate-tasks", async (req, res) => {
  const { coachResponse } = req.body;
  try {
    const tasks = await openAIService.detectTasks(coachResponse);
    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error detecting tasks" });
  }
});

// port
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;