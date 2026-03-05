import { google } from "googleapis"

type Item = {
    name: string
    price: number
}

type ReceiptData = {
    date: string
    store: string
    items: Item[]
    price: number
    category: string
}

/**
 * items配列をスプレッドシート用の文字列に変換
 * 例:
 * シャンプー ¥450
 * 歯ブラシ ¥120
 */
function formatItems(items: Item[]): string {
    if (!items || items.length === 0) return ""

    return items
        .map((item) => `${item.name} ¥${item.price}`)
        .join("\n")
}

export async function appendRow(data: ReceiptData) {

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    })

    const sheets = google.sheets({
        version: "v4",
        auth
    })

    const itemsText = formatItems(data.items)

    await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: "Sheet1!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    data.date,
                    data.store,
                    itemsText,
                    data.price,
                    data.category
                ]
            ]
        }
    })
}