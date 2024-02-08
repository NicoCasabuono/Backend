import { cartService } from '../../dao/services/cart.service.js'

export const HandleGetAll = async (req, res, next) => {
  try {
    const result = await cartService.getAll()
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleGetOne = async (req, res, next) => {
  try {
    const { cid } = req.params
    const result = await cartService.getOne(cid)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleCreate = async (req, res, next) => {
  try {
    const result = await cartService.create()
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleUpdate = async (req, res, next) => {
  try {
    const { cid } = req.params

    const result = await cartService.update(cid, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleDelete = async (req, res, next) => {
  try {
    const { cid } = req.params
    const result = await cartService.delete(cid)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}

export const HandlePurchase = async (req, res, next) => {
  try {
    const { cid } = req.params
    const { user, products } = req.body
    const result = await cartService.purchase(cid, user, products)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}

export const HandleProductGet = async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const result = await cartService.productAdd(cid, pid)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}

export const HandleProductAdd = async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const result = await cartService.productAdd(cid, pid)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleProductUpdate = async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const result = await cartService.productUpdate(cid, pid, req.body)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
export const HandleProductRemove = async (req, res, next) => {
  try {
    const { cid, pid } = req.params
    const result = await cartService.productRemove(cid, pid)
    res.status(result.status).json(result)
  } catch (error) {
    next(error)
  }
}
