const {Validator} = require('jsonschema')
const validator = new Validator()

const infosSchema = {    
    type: "object",
    properties: {
        id: {type: 'string'},
        AnimalName: {type: 'string'},
        DonoName: {type:'string'},
        age: {type: 'number'},
        animal:{type:'string'}           
    },
    "required": ['AnimalName','age','DonoName','email']
  }

  const validateDataInfos = (e)=>{
    return validator.validate(e,infosSchema)
  }

  module.exports= {validateDataInfos}
