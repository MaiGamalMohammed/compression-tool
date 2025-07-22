class Node{
    constructor(e,w){
        this.element = e
        this.wight = w
    }
    getEle(){
        return this.element
    }
    getWight(){
        return this.wight
    }
}


class internalNode{
    constructor(l,r,w){
        this.left = l
        this.right = r
        this.wight = w
    }
}
module.exports = {Node,internalNode}