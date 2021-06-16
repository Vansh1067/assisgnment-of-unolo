const express=require('express')
const path=require('path')
const fs=require('fs')
const app=express()

app.listen(3000,()=>{

    fs.readFile(path.join(__dirname,'sample.txt'),(err,buffer)=>{
        if(err){
            console.warn("Something error",err)
        }else{
            const dataArray=[]
            const string=buffer.toString()
            const data=string.split(' ')
           
            data.forEach((item)=>{
                const str=item.replace('.','')
                const found=dataArray.findIndex((data)=>data?.text?.toLowerCase()==str?.toLowerCase())
                if(found>-1){
                    dataArray[found].count=dataArray[found].count+1
                }else{
                    const data={
                        text:str,
                        count:1
                    }
                    dataArray.push(data)
                }

            })
            dataArray.sort((a,b)=>b.count-a.count)
            dataArray.forEach((item)=>{
                console.log(`${item.text} ${item.count}`)
            })
        }
    })
})