"use client"

import { useState } from "react"

export default function Page(){

const [image,setImage] = useState<string>()

async function upload(){

await fetch("/api/receipt",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
image
})
})

alert("保存しました")

}

return(

<div>

<h1>レシート記録</h1>

<input
type="file"
accept="image/*"
capture="environment"
onChange={(e)=>{

const file = e.target.files?.[0]

if(!file) return

const reader = new FileReader()

reader.onload=()=>{
setImage(reader.result as string)
}

reader.readAsDataURL(file)

}}
/>

<button onClick={upload}>
送信
</button>

</div>

)

}