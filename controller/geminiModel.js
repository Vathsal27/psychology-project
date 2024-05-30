// import Replicate from "replicate";
const Replicate = require('replicate');

function formatString(text) {
    text = text.replace(/,,/g, ',').replace(/,\n/g, '\n');
    text = text.replace(/\n\n+/g, '\n');
    text = text.replace(/\n\w+/g, (match) => match.charAt(0).toUpperCase() + match.slice(1));
    text = text.replace(/(?<!\.)\n/g, '. ');
    text = text.replace(/g,lows/g, 'glows').replace(/ cr,isp/g, ' crisp');
    return text;
  }

module.exports = {
    modelOutput: async (req, res) => {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        
        const prompt = req.body.prompt + "give prognosis and diagnosis for the following case detail";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        return res.status(200).json(formatString(text));
    }
};