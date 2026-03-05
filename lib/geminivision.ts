import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
)

export async function analyzeReceiptImage(base64:string){

const model = genAI.getGenerativeModel({
model:"gemini-1.5-flash"
})

const prompt = `
この画像はレシートです。

商品名と金額を読み取り、
以下のJSON形式で出力してください。

{
    "date":"",
    "store":"",
    "items":[
        {"name":"","price":0}
    ],
    "price":0,
    "category":"生活雑貨|食費|娯楽費|通信費|その他"
}

ルール

・itemsには商品と価格をすべて入れる
・priceは合計金額
・JSONのみ出力
`

const result = await model.generateContent([
prompt,
{
inlineData:{
mimeType:"image/jpeg",
data:base64
}
}
])

const response = await result.response

const text = response.text()

return JSON.parse(text)

}