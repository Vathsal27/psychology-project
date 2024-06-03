const { GoogleGenerativeAI } = require('@google/generative-ai');

function formatString(text) {
    const noAsterisk = text.replace(/\*/g, "");
    const noHash = noAsterisk.replace(/#/g, "");
    return noHash.replace(/\\n/g, "\n");
}

module.exports = {
    modelOutput: async (req, res) => {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const devPrompt = "\ngive a provisional diagnosis, differential diagnosis & a final diagnosis with a treatment plan for the above psychological case's json";
        const devPrompt1 = "\ngive a possible provisional diagnosis for the above psychological case's json";
        const devPrompt2 = "\nlist out the differential diagnosis for the above psychological case's json";
        const devPrompt3 = "\ngive a possible diagnosis with a treatment plan for the above psychological case's json";
        const devPromptArr = [devPrompt1, devPrompt2, devPrompt3];
        const data = JSON.stringify(req.body);

        const promises = devPromptArr.map(async (element) => {
            const result = await model.generateContent(data + element);
            const response = await result.response;
            const text = response.text();
            return formatString(text.replace(/\r?\n/g, ""));
        });

        const promptRes = await Promise.all(promises);

        return res.status(200).render('../public/result.ejs', { promptResults: promptRes });
    }
};