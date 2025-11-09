import type { Request, Response } from 'express'
import Expense from '../models/Expense'

export class ExpensesController {

    static create = async (req: Request, res: Response) => {
        const { id } = req.budget

        try {

            const expense = new Expense(req.body)
            expense.budgetId = id

            await expense.save()

            res.status(201).json('El gasto a sido creado correctamente')

        } catch (error) {
            // console.log(error)
            res.status(500).json({ error: 'Hubo un error.' })
        }


    }

    static getById = async (req: Request, res: Response) => {
        res.status(200).json(req.expense)
    }

    static updateById = async (req: Request, res: Response) => {
        await req.expense.update(req.body)
        res.status(200).json('Gasto Actualizado correctamente')
    }

    static deleteById = async (req: Request, res: Response) => {
        await req.expense.destroy()
        res.status(200).json('Gasto eliminado correctamente')
    }
}