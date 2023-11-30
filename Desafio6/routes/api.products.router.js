import { Router, json, urlencoded } from 'express'
import { productsManager} from '../dao/ProductsManager.mongoose.js'

export const apiProductsRouter = Router()

apiProductsRouter.use(json())

apiProductsRouter.get('/', async (req, res) => {
  try {
    res.json(await productsManager.findAll())
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
})

apiProductsRouter.get('/:id', async (req, res) => {
  try {
    const buscada = await productsManager.findById(req.params.id)
    res.json(buscada)
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
})

apiProductsRouter.post('/', async (req, res) => {
  try {
    const creada = await productsManager.create(req.body)
    res.status(201).json(creada)
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
})

apiProductsRouter.put('/:id', async (req, res) => {
  try {
    const nuevaPersona = await productsManager.updateById(req.params.id, req.body)
    res.json(nuevaPersona)
  } catch (error) {
    if (error.message === 'id no encontrado') {
      res.status(404)
    } else {
      res.status(400)
    }

    res.json({
      status: 'error',
      message: error.message
    })
  }
})

apiProductsRouter.delete('/:id', async (req, res) => {
  try {
    const borrada = await productsManagerMongodb.deleteById(req.params.id)
    res.json(borrada)
  } catch (error) {
    return res.status(404).json({
      status: 'error',
      message: error.message
    })
  }
})