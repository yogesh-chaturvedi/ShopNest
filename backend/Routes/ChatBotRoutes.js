const express = require('express')
const router = express.Router()

router.post('/response', async (req, res) => {
    try {
        const { productInfo, userQuestion, } = req.body

        // extract the sizes from the nested object
        let sizes = []
        for (const key in productInfo.size) {
            if (productInfo.size[key] === true) {
                sizes.push(key)
            }
        }

        const prompt = `
        Here are the product details:
        - Name-${productInfo.productName}
        - Price-${productInfo.productPrice}
        - Category-${productInfo.category}
        - AvailableSizes-${sizes.join(', ')}
        - Description-${productInfo.description}
        - BestSeller-${productInfo.bestSeller}
        - LatestCollection-${productInfo.latestCollection}
        - Type-${productInfo.type}

        Note: If any value is 'false', that feature is not available for the product.
        Note: Easy return & exchange within 7 days.
        Note: Cash on delivery available.
       Customer Question: ${userQuestion}

       Please answer clearly and helpfully based on the product information above.
        `

        const { GoogleGenAI } = await import('@google/genai');

        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const result = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt,
        });

        const text = result.text.trim();
        // console.log(text);

        res.status(200).json({ message: text, success: true })
    }
    catch (error) {
        console.error("Gemini Error:", error);
        res.status(500).json({ message: 'Somethig Went wrong', success: false, error })
    }
})


module.exports = router
