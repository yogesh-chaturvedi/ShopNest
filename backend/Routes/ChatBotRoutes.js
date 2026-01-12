const { default: axios } = require('axios')
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

        // System prompt for AI behavior
        const systemPrompt = `You are a helpful and friendly customer support assistant for ShopNest, an e-commerce store. 
        
          Your role:
           - Answer customer questions clearly and concisely
           - Be polite and professional
           - If a feature is not available, politely mention it
           - Keep responses under 3-4 sentences unless more detail is needed
           - Use a warm, conversational tone`;

        const prompt = `
        Here are the product details:
        - Name - ${productInfo.productName}
        - Price - ${productInfo.productPrice}
        - Category - ${productInfo.category}
        - AvailableSizes - ${sizes.join(', ')}
        - Description - ${productInfo.description}
        - BestSeller - ${productInfo.bestSeller}
        - LatestCollection - ${productInfo.latestCollection}
        - Type - ${productInfo.type}

        Note: If any value is 'false', that feature is not available for the product.
            Note: Easy return & exchange within 7 days.
                Note: Cash on delivery available.
       Customer Question: ${userQuestion}

       Please answer clearly and helpfully based on the product information above.
        `


        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant', // Fast and free
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 300,
                top_p: 1,
                stream: false
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GROQ_API_KEY} `,
                    'Content-Type': 'application/json'
                }
            }
        );

        const aiText = response.data.choices[0]?.message?.content;

        if (!aiText) {
            return res.status(500).json({
                message: 'No Response Generated',
                success: false
            });
        }

        res.status(200).json({
            message: aiText.trim(),
            success: true
        });
    }
    catch (error) {
        console.error("Groq API Error:", error.response?.data || error.message);
        res.status(500).json({ message: 'Somethig Went wrong', success: false, error })
    }
})


module.exports = router