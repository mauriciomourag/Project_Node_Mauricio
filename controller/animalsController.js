let animals = ['Gato', 'Cachorro', 'Ave', "Reptil", "Roedor", "Primata", "Peixe"]


const getAnimals = (req,res)=>{
    res.status(200).json(animals)
}

const addAnimals= (req,res)=>{
    const animal = req.body
    animals.push(animal.animal)
    res.status(200).json(animals)
}

const removeAnimals = (req,res)=>{
    const animal = req.body.animal
    console.log(animal)
    const index = animals.findIndex((d)=>d===animal)

    if(index === -1)
    {
        return res.status(404).json({message:'Tipo de animal não encontrado'})
    }
    animals.splice(index,1)
    res.status(200).json({message:' Tipo de animal deletado'})  
   
}

module.exports={animals, getAnimals, addAnimals, removeAnimals}