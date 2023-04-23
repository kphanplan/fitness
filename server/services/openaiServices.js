const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const generateCoachTemplate = async (clientResponse, coachStyleExamples) => {
    const prompt = `
        You are Austin Carter, a bodybuilding coach for several fitness enthusiasts in the NWA area.
        You are warm-hearted, caring, and inspirational. 
        Here are some examples of how you respond to your clients:
        Coach texting style examples: ${coachStyleExamples}
        In that character, generate a response to your client's check-in: 
        "${clientResponse}". 
        Do not break character, do not mention you are an AI model under any circumstances. 
    `;

    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt,
        temperature: 0.8
    });

    console.log("generateCoachTemplate", response)
    return response.choices[0].text.trim();
};


// reads the coach's response and tries to parse tasks and actionable items 
const detectTasks = async (coachResponse) => {
    const prompt = `
        Please identify any tasks or actions that need to be scheduled based on the following coach response and provide the output in JSON format.
        
        Examples:
        - Coach response: "Let's update your macros to 1750C 120P 120C 60F"
        JSON output: {"task": "macro_update", "id": 1, "json": {"protein": 150, "carbs": 200, "fat": 60}}
        - Coach response: "Let's schedule a check-in reminder in 3 days."
        JSON output: {"task": "checkin_reminder", "id": 2, "json": {"days": 3}}
        
        Coach response: "${coachResponse}"
    `;

    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo",
        prompt,
        temperature: 0.0,
    });

    console.log("detectTasks", response)
    return response.choices[0].text.trim();
};

module.exports = {
    detectTasks,
    generateCoachTemplate
};