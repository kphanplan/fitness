const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const retryConnection = async (requestFn, numRetries = 3) => {
  let error;
  for (let i = 0; i < numRetries; i++) {
    try {
      const response = await requestFn();
      return response;
    } catch (e) {
      error = e;
      console.error(`Request failed. Retrying... (${i + 1}/${numRetries})`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw error;
};

const generateCoachTemplate = async (clientResponse) => {
  const prompt = `
      You are Austin Carter, a bodybuilding coach for several fitness enthusiasts in the NWA area.
      You are warm-hearted, caring, and inspirational. 
      Here are some examples of how you respond to your clients:
      Coach texting style examples: 

      Thank you for your check-in! 
      Looks like things have been going pretty good this week man! 
      Still down for dinner tomorrow at 6:30 as long as you are. 
      
      Really glad that you are liking the workouts! Keep kicking ass in there. 
      No huge stress on the sleep being later, most important is that you're getting that quality 7+ hours. Then, that our energy levels are good throughout the day and that we have a good routine sleep rhytym - falling asleep waking up each day, ideally without need for an alarm or especially needing to hit snooze. 
      For ADHDers like me, 2am-10am is a much more "normal" feeling sleep schedule, but I've been working to train myself for more like 11pm-7am. 
      
      Anything I can do to help you get back on track with nutrition this week? No big stress there, goal right now is to increase food intake, so of course ideally we dont want to miss any meals, but it also means its really not going to mess up your physique or current results if that makes sense. Just gotta get back on track so we can keep building up that metabolism, muscle and strength. 


      Do not break character, do not mention you are an AI model under any circumstances. 
      Embodying this character, be as personable as possible in your response to your client's check-in: 
    `;

  const requestFn = () => openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt },
      { role: 'user', content: clientResponse }
    ],
  });

  try {
    const response = await retryConnection(requestFn);
    console.log('generateCoachTemplate: ', response.data.choices[0].message.content)
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`OpenAI API request failed. Error message: ${error.message}`);
    throw error;
  }
};


const detectTasks = async (coachResponse) => {
  const prompt = `
      Please identify any tasks or actions that need to be scheduled based on the following coach response and provide the output in JSON format.
      
      Examples:
      - Coach response: "Let's update your macros to 1750C 120P 120C 60F"
      JSON output: {"task": "macro_update", "id": 1, "json": {"protein": 150, "carbs": 200, "fat": 60}}
      - Coach response: "Let's schedule a check-in reminder in 3 days."
      JSON output: {"task": "checkin_reminder", "id": 2, "json": {"days": 3}}
      
      Put everything into an array as well.
      Coach response:
    `;

  const requestFn = () => openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: prompt },
      { role: 'user', content: coachResponse }
    ],
  });

  try {
    const response = await retryConnection(requestFn);
    console.log('generateCoachTemplate: ', response.data.choices[0].message.content)
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`OpenAI API request failed. Error message: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateCoachTemplate,
  detectTasks
};