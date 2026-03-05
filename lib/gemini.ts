import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
)

export async function analyzeReceipt(text: string) {

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash"
    })

    const prompt = `
以下はレシートのOCR結果です

${text}

次のJSONで整理してください

{
    "date":"",
    "store":"",
    "items":"",
    "price":0,
    "category":"生活雑貨|食費|娯楽費|通信費|その他"
}

JSONのみ出力してください
`

    const result = await model.generateContent(prompt)

    const response = await result.response

    const output = response.text()

    return JSON.parse(output)

}