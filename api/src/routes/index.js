const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require('axios');
const {Dog,Temperament}=require('../db')
const router = Router();
const {API_KEY} = process.env;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiIn=async()=>{
    const apiUrl=await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo=await apiUrl.data.map(obj=>{
        return{
            id:obj.id,
            url:obj.image.url,
            name:obj.name,
            temperament:obj.temperament,
            height:obj.height,
            weight:obj.weight,
            life_span:obj.life_span
        }
    })
    return apiInfo
}

const getDbIn=async()=>{
    return Dog.findAll({
        include:{
            model:Temperament,
            attributes:['name'],
            through:{
                attributes:[],
            }
        }
    })
    .then((dogs)=>{
        return dogs.map((dog)=>{
            // console.log(dog.dataValues)
            var temperaments=dog.dataValues.temperaments
            dog.dataValues.temperament=dog.dataValues.temperaments.map((t)=>t.name).join(", ")
            return dog.dataValues;
        })
    }

    )
}

const getAll=async()=>{
    const apiIn=await getApiIn();
    const dbIn=await getDbIn();
    const allIn=apiIn.concat(dbIn)
    return allIn
}

router.get('/dogs', async (req,res)=>{
    const name=req.query.name
    const allBreeds=await getAll()
    if (name) {
        let breedsName= await allBreeds.filter(n=>n.name.toLowerCase().includes(name.toLowerCase()))
        breedsName.length ?
        res.status(200).send(breedsName):
        res.status(404).send("No esta la raza che")
    }else{
        res.status(200).send(allBreeds)
    }
})
router.get('/temperaments', async (req,res)=>{
    const apiT= await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const arr=apiT.data.map(i=>i.temperament)
    const arrT=arr.toString(arr).split(',')
    arrT.forEach(i=>{
        Temperament.findOrCreate({
            where:{name:i}
        })
    })
    const allTemperaments=await Temperament.findAll()
    res.send(allTemperaments)
})
router.get('/dogs/:id', async (req,res)=>{
    const id=req.params.id;
    const breedTotal=await getAll()
    if (id) {
        let breedId= breedTotal.filter(a=>a.id==id)
        breedId.length?
        res.status(200).json(breedId):
        res.status(404).send('No lo encontre')
    }
})
router.post('/dogs', async (req,res)=>{
    let{
        name,
        height,
        weight,
        life_span,
        temperament,
        createinDb
    }=req.body
    let dogCreate=await Dog.create({
        name,
        height,
        weight,
        life_span,
        createinDb
    })
    let dbTemp=await Temperament.findAll({where:{name:temperament}})
    dogCreate.addTemperament(dbTemp)
    res.send('Raza de perro creada')
})


module.exports = router;
