import Tesseract from "tesseract.js"

export async function runOCR(image: string) {

const result = await Tesseract.recognize(
    image,
    "jpn+eng"
)

return result.data.text

}