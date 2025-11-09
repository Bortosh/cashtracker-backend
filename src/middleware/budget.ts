import type { Request, Response, NextFunction } from 'express'
import { body, param, validationResult } from 'express-validator'
import Budget from '../models/Budget'

declare global {
    namespace Express {
        interface Request {
            budget?: Budget
        }
    }
}

export const validateBudgetId = async (req: Request, res: Response, next: NextFunction) => {

    await param('budgetId').isInt().withMessage('ID no válido')
        .custom(value => value > 0)
        .withMessage('ID no Válido')
        .run(req)

    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const validateBudgetExist = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { budgetId } = req.params
        const budget = await Budget.findByPk(budgetId)

        if (!budget) {
            const error = new Error('Presupuesto no encontrado')
            res.status(404).json({ error: error.message })
            return
        }

        req.budget = budget

        next()

    } catch (error) {
        res.status(500).json({ error: 'Hubo un error' })
    }

}

export const validateBudgetInput = async (req: Request, res: Response, next: NextFunction) => {

    await body('name')
        .notEmpty()
        .withMessage('El nombre del prepuesto no puede ir vacio').run(req)

    await body('amount')
        .notEmpty()
        .withMessage('La cantidad del prepuesto no puede ir vacia')
        .isNumeric().withMessage('La cantidad del prepuesto no es válida')
        .custom(value => value > 0).withMessage('La cantidad del prepuesto no puede ser menor o igual a cero').run(req)

    next()

}