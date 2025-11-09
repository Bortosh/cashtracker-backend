import type { Request, Response } from 'express'
import Budget from '../models/Budget'
import Expense from '../models/Expense'

export class BudgetController {
    static getAll = async (req: Request, res: Response) => {

        try {
            const budgets = await Budget.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                include: [Expense]
                // TODO: FILTRAR POR EL USUARIO AUTENTICADO
            })

            res.status(200).json(budgets)

        } catch (error) {
            // console.log(error)
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static create = async (req: Request, res: Response) => {

        try {

            const budget = new Budget(req.body)

            await budget.save()


            res.status(201).json('Presupuesto creado correctamente')


        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }

    }

    static getBudgetById = async (req: Request, res: Response) => {

        const budget = await Budget.findByPk(req.budget.id, {
            include: [Expense]
        })

        res.status(200).json(budget)

    }

    static updateBudgetById = async (req: Request, res: Response) => {
        await req.budget.update(req.body)
        res.status(200).json('Presupuesto Actualizado correctamente')
    }

    static deleteBudgetById = async (req: Request, res: Response) => {
        await req.budget.destroy()
        res.status(200).json('Presupuesto eliminado correctamente')
    }

}


