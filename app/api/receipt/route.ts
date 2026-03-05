import { runOCR } from "@/lib/ocr"
import { analyzeReceipt } from "@/lib/gemini"
import { appendRow } from "@/lib/sheets"

export async function POST(req:Request){

const body = await req.json()

const image = body.image

// OCR
const text = await runOCR(image)

// AI解析
const data = await analyzeReceipt(text)

// Sheets書き込み
await appendRow(data)

return Response.json({
success:true,
data
})

}