import { Carts, Products, Users, Tickets } from "../dao/factory.js";
import CartsRepository from "./Carts.repository.js";
import UsersRepository from "./Users.repository.js";
import ProductsRepository from "./Products.repository.js";
import TicketsRepository from "./Tickets.repository.js";




export const ProductsService = new ProductsRepository(Products);
export const UsersService = new UsersRepository(Users);
export const CartsService = new CartsRepository(Carts);
export const TicketsService = new TicketsRepository(Tickets);