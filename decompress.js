#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
 
const filePath = process.argv[2]
const fileName = path.basename(process.argv[2])
let orginalFilePath = process.argv[3] == undefined ? '':process.argv[3]

function creatBitStream(bytes){
    let bitStram = ''

    for(let byte of bytes){
        bitStram+= byte.toString(2).padStart(8,'0')
    }

    return bitStram; 
}
function getOrginalText(bitStram,codes){
    let text = ""
    let buffer = ""
    let reversCodes = {}
    for(let [char,code] of Object.entries(codes)){
        reversCodes[code] = char
    }
    
    for(bit of bitStram){
        buffer+=bit
        if(reversCodes[buffer]){
            text+=reversCodes[buffer]
            buffer = ''
        }
    }
    return text
}

fs.readFile(filePath,(err,data)=>{
    if(err) console.log("sorry we coudn't read the file")
    else{
        let text = data.toString('utf8')
        let header = text.split("##end##")
        let headerSize = Buffer.byteLength(header[0]+"##end##")
        let compressedData = data.slice(headerSize)

        let codes = JSON.parse(header[0])

        let bytes = Array.from(compressedData)
        let bitStream = creatBitStream(bytes)
         
        let orginalContent = getOrginalText(bitStream,codes)
         
        let orginalFileName = fileName.split('.')[0]
         
        
        fs.writeFileSync(`${orginalFilePath}${orginalFileName}.txt`,orginalContent)
        
    }
})


 