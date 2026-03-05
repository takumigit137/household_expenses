import { google } from "googleapis"

export async function appendRow(data:any){

const auth = new google.auth.GoogleAuth({
credentials:{
client_email:process.env.GOOGLE_CLIENT_EMAIL,
private_key:process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g,"\n")
},
scopes:["https://www.googleapis.com/auth/spreadsheets"]
})

const sheets = google.sheets({
version:"v4",
auth
})

await sheets.spreadsheets.values.append({

spreadsheetId:process.env.SPREADSHEET_ID,

range:"Sheet1!A:E",

valueInputOption:"USER_ENTERED",

requestBody:{
values:[[
data.date,
data.store,
data.items,
data.price,
data.category
]]
}

})

}