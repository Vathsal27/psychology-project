const { GoogleGenerativeAI } = require('@google/generative-ai');

function formatString(text) {
    const noAsterisk = text.replace(/\*/g, ""); // Remove all asterisks (*)
    const noHash = noAsterisk.replace(/#/g, ""); // Remove all hashes (#)
    return noHash.replace(/\\n/g, "\n");
}

module.exports = {
    modelOutput: async (req, res) => {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const devPrompt = "\ngive a provisional diagnosis, differential diagnosis & a final diagnosis with a treatment plan for the above psychological case's json";
        const prompt = JSON.stringify(req.body) + devPrompt;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.status(200).render('../public/result.ejs', {data: formatString(text.replace(/\r?\n/g, ""))});

        // return res.status(200).json(formatString(text.replace(/\r?\n/g, "")));
    }
};