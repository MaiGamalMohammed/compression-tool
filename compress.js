#!/usr/bin/env node
 
const nodes = require('./class')
const fs = require('fs')
const path = require('path')
const filePath = process.argv[2]
let fileName = path.basename(process.argv[2])
let compressFilePath = process.argv[3] == undefined? '':process.argv[3]
 
function creatBitStream(text,codes){
    let bitStream = ''
    for(char of text){
        bitStream+=codes[char]
    }
    return bitStream
}

function traversNodes(Node,path,codes){
   if(!Node) return
   if(Node.element!==undefined ){
    codes[Node.element] = path
    return ;
   }
   traversNodes(Node.left,path+'0',codes)

   traversNodes(Node.right,path+'1',codes)
}

function humffinTree(Nodes){
    while(Nodes.length>1){
       let fnode =  Nodes.shift()
       let snode = Nodes.shift()

       let nnode = new nodes.internalNode(fnode,snode,fnode.wight+snode.wight)

       Nodes.push(nnode)
       Nodes.sort((a,b)=>a.wight-b.wight)
    }
    return Nodes
}
 
function converToNodes(data){
    let Nodes = []
    for(const[char,wight] of Object.entries(data)){
        Nodes.push(new nodes.Node(char,wight))
    }
    Nodes.sort((a,b)=>a.wight-b.wight)
    return Nodes ;
}

function charAccurance(data){
    let dect = {}
    for(let i=0;i<data.length;i++){
        dect[data[i]]!=undefined ? dect[data[i]]+=1:dect[data[i]]=1
    }
    return dect
}

function getCodes(data){
    let codes = {}
    let accuranceData = charAccurance(data)
    let Nodes = converToNodes(accuranceData)
    humffinTree(Nodes)
    traversNodes(Nodes[0],'',codes)
    return codes
}

 
 
 
let data = fs.readFileSync(filePath)
data = data.toString('utf8')
let codes = getCodes(data)
let header = JSON.stringify(codes)+"##end##"
 

let readableStream = fs.createReadStream(filePath,'utf8')
let writableStream = fs.createWriteStream(`${compressFilePath}${fileName.split('.')[0]}.huff`)
writableStream.write(header)

let bitBuffer = ''
let bytes = [] 
 

readableStream.on('data',(chunk)=>{
    let bitStream = creatBitStream(chunk,codes)
    bitBuffer+=bitStream
     
    while(bitBuffer.length>8){
        let byte = parseInt(bitBuffer.slice(0,8),2)
        bytes.push(byte)
        bitBuffer = bitBuffer.slice(8)
        if(bytes.length>1024) {
            writableStream.write(Buffer.from(bytes))
            bytes = []
        }
    }
})


readableStream.on('end',()=>{
    if(bitBuffer.length>0){
        let byte = parseInt(bitBuffer.padEnd(8,'0'),2)
        bytes.push(byte)  
    }

    writableStream.write(Buffer.from(bytes))
    writableStream.end()
    
})
