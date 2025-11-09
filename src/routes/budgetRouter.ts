import { Router } from 'express'
import { handleInputErrors } from '../middleware/validation';
import { validateBudgetExist, validateBudgetId, validateBudgetInput } from '../middleware/budget';
import { BudgetController } from '../controllers/BudgetController';
import { ExpensesController } from '../controllers/ExpenseController';
import { validateExpenseExist, validateExpensetId, validateExpensetInput } from '../middleware/expenses';

const router = Router()

router.param('budgetId', validateBudgetId)
router.param('budgetId', validateBudgetExist)
router.param('expenseId', validateExpensetId)
router.param('expenseId', validateExpenseExist)

router.get('/', BudgetController.getAll)

router.post('/',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.create)

router.get('/:budgetId',
    BudgetController.getBudgetById
)

router.put('/:budgetId',
    validateBudgetInput,
    handleInputErrors,
    BudgetController.updateBudgetById)

router.delete('/:budgetId',
    BudgetController.deleteBudgetById)


// ROUTES FOR EXPENSES

router.post('/:budgetId/expenses',
    validateExpensetInput,
    handleInputErrors,
    ExpensesController.create
)

router.get('/:budgetId/expenses/:expenseId', ExpensesController.getById)

router.put('/:budgetId/expenses/:expenseId',
    validateExpensetInput,
    handleInputErrors,
    ExpensesController.updateById)
    
router.delete('/:budgetId/expenses/:expenseId', ExpensesController.deleteById)

export default router;