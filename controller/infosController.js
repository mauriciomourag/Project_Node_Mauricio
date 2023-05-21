const {v4:uuidv4} = require('uuid')
const {animals} = require ('./animalsController')
const {validateDataInfos} = require('../model/infosModel')
const fs = require('fs')

function getInfosPromise()
{
    return new Promise((resolve, reject) =>{
        fs.readFile('model/infos.json','utf8',(err,data)=>
        {
            if(err){
                reject(err)
            }
            else
            {
                let infos = JSON.parse(data)
                resolve(infos)
            }
        })
    })
}

const getInfos = (req,res)=>{
    getInfosPromise()
    .then(infos => res.status(200).json(infos))
    .catch(err=> res.status(500).send(err.message))
}

//POST
function addInfosPromise(info) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('model/infos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } 
      else {    
                
        let infos = JSON.parse(data)   

        if(infos.some(e=>e.email===info.email))
        {
            reject(new Error('Email já existe'))                  
        }
        else{
        const id = uuidv4()         
        const infoNew = { id, ...info }  
        
        infos.push(infoNew)  
        
        fs.writeFile('model/infos.json', JSON.stringify(infos), (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(infoNew);
          }
        })
      }
    }
  })
  })
}

const addInfos = (req,res)=>{
    const info = req.body

    const validResult = validateDataInfos(info)
       
    if(!validResult.valid)
    {
      return res.status(400).json({message:'Informações inválidas', errors : validResult.errors})
    }    

    /*if(!animals.includes(info.animals)) 
    {
      return res.status(404).json({message:'Animal Inválido'})
    }*/

    addInfosPromise(info)
    .then(infoNew => res.status(200).json(infoNew))
    .catch(err => res.status(500).send(err.message))
}  

//PUT 
function updateInfosPromise(id,info) 
{
  return new Promise((resolve, reject) => {      
    fs.readFile('model/infos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        
        let infos = JSON.parse(data)  
        
        const index = infos.findIndex((e) => e.id === id)

        if (index === -1) {
          reject(new Error('Não encontrado'))
        } 
        else 
        {
          
          const infoUpdate = { ...infos[index], ...info, email: infos[index].email }  
          
          infos[index] = infoUpdate  
          
          fs.writeFile('model/infos.json', JSON.stringify(infos), (err) => {
            if (err) {
              reject(err)
            } else {
              resolve(infoUpdate)
            }
          })
        }
      }
    })
  })
}
  
const updateInfos = (req,res) =>{
  const id = req.params.id
  const info = req.body
  updateInfosPromise(id,info) 
  .then(infoUpdate => res.status(200).json(infoUpdate))
  .catch(err => res.status(500).send(err.message))

}

//DELETE
function removeInfosPromise(id) 
{
  return new Promise((resolve, reject) => {
    fs.readFile('model/infos.json', 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } 
      else {
        
          const infos = JSON.parse(data)
          
          const index = infos.findIndex(e => e.id === id)

          if (index === -1) {
            reject(new Error('Não encontrado'))
          } 
          else {
            
            infos.splice(index, 1)
            
            fs.writeFile('model/infos.json', JSON.stringify(infos), err => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            })
          }       
      }
    })
  })
}

const removeInfos = (req,res)=>{      
    const id = req.params.id
    removeInfosPromise(id)
    .then(() => res.status(200).json({message:'Deletado'}))
    .catch(err => res.status(500).send(err.message))
}

module.exports = {getInfos, addInfos, removeInfos, updateInfos}