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

        // const devPrompt1 = "\ngive a provisional diagnosis for the above psychological case's json";
        const devPrompt1 = "\provide the most likely provisional diagnosis for the above psychological case's json in 200 words";
        const devPrompt2 = "\nlist out the most relevant differential diagnosis(at most 4) for the above psychological case's json";
        // const devPrompt3 = "\nEvaluate the above case history and complaints and guess what disorder they've point towards using ICD and DSM and give its codes";
        // const devPrompt3 = "\nsuggest possible psychomatric test/evaluation for the above psychological case to delve deeper into the diagnosis";
        const devPrompt3 = "\nsuggest the most relevant psychomatric tests/evaluation(at most 7) for the above psychological case to delve deeper into the diagnosis";
        const devPromptArr = [devPrompt1, devPrompt2, devPrompt3];
        const data = JSON.stringify(req.body);

        try {
            const promises = devPromptArr.map(async (element) => {
                const result = await model.generateContent(data + element);
                const response = await result.response;
                const text = response.text();
                return formatString(text.replace(/\r?\n/g, ""));
            });
            const promptRes = await Promise.all(promises);

            const finalRes = promptRes.map(async (element) => {
                const result = await model.generateContent(element + "\nRemove disclaimers from the above AI generated output");
                const response = await result.response;
                const text = response.text();
                return formatString(text.replace(/\r?\n/g, ""));
            });
            const promptResFinal = await Promise.all(finalRes);
            return res.status(200).render('../public/result.ejs', { promptResults: promptResFinal });
        } catch (err) {
            return res.status(500).json({ 'error': err });
        }
    }
};