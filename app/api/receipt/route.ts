import { analyzeReceiptImage } from "@/lib/geminivision"
import { appendRow } from "@/lib/sheets"

export async function POST(req:Request){

const body = await req.json()

const base64 = body.image.split(",")[1]

const data = await analyzeReceiptImage(base64)

await appendRow(data)

return Response.json({
success:true,
data
})

}