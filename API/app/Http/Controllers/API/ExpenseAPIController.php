<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\CreateExpenseAPIRequest;
use App\Http\Requests\API\UpdateExpenseAPIRequest;
use App\Models\Expense;
use App\Repositories\ExpenseRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use InfyOm\Generator\Criteria\LimitOffsetCriteria;
use Prettus\Repository\Criteria\RequestCriteria;
use Response;

/**
 * Class ExpenseController
 * @package App\Http\Controllers\API
 */

class ExpenseAPIController extends AppBaseController
{
    /** @var  ExpenseRepository */
    private $expenseRepository;

    public function __construct(ExpenseRepository $expenseRepo)
    {
        $this->expenseRepository = $expenseRepo;
    }

    /**
     * @param Request $request
     * @return Response
     *
     * @SWG\Get(
     *      path="/expenses",
     *      summary="Get a listing of the Expenses.",
     *      tags={"Expense"},
     *      description="Get all Expenses",
     *      produces={"application/json"},
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="array",
     *                  @SWG\Items(ref="#/definitions/Expense")
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function index(Request $request)
    {
        $this->expenseRepository->pushCriteria(new RequestCriteria($request));
        $this->expenseRepository->pushCriteria(new LimitOffsetCriteria($request));
        $expenses = $this->expenseRepository->all();

        return $this->sendResponse($expenses->toArray(), 'Expenses retrieved successfully');
    }

    /**
     * @param CreateExpenseAPIRequest $request
     * @return Response
     *
     * @SWG\Post(
     *      path="/expenses",
     *      summary="Store a newly created Expense in storage",
     *      tags={"Expense"},
     *      description="Store Expense",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Expense that should be stored",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Expense")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Expense"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function store(CreateExpenseAPIRequest $request)
    {
        $input = $request->all();

        $expenses = $this->expenseRepository->create($input);

        return $this->sendResponse($expenses->toArray(), 'Expense saved successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Get(
     *      path="/expenses/{id}",
     *      summary="Display the specified Expense",
     *      tags={"Expense"},
     *      description="Get Expense",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Expense",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Expense"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function show($id)
    {
        /** @var Expense $expense */
        $expense = $this->expenseRepository->findWithoutFail($id);

        if (empty($expense)) {
            return $this->sendError('Expense not found');
        }

        return $this->sendResponse($expense->toArray(), 'Expense retrieved successfully');
    }

    /**
     * @param int $id
     * @param UpdateExpenseAPIRequest $request
     * @return Response
     *
     * @SWG\Put(
     *      path="/expenses/{id}",
     *      summary="Update the specified Expense in storage",
     *      tags={"Expense"},
     *      description="Update Expense",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Expense",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Parameter(
     *          name="body",
     *          in="body",
     *          description="Expense that should be updated",
     *          required=false,
     *          @SWG\Schema(ref="#/definitions/Expense")
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  ref="#/definitions/Expense"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function update($id, UpdateExpenseAPIRequest $request)
    {
        $input = $request->all();

        /** @var Expense $expense */
        $expense = $this->expenseRepository->findWithoutFail($id);

        if (empty($expense)) {
            return $this->sendError('Expense not found');
        }

        $expense = $this->expenseRepository->update($input, $id);

        return $this->sendResponse($expense->toArray(), 'Expense updated successfully');
    }

    /**
     * @param int $id
     * @return Response
     *
     * @SWG\Delete(
     *      path="/expenses/{id}",
     *      summary="Remove the specified Expense from storage",
     *      tags={"Expense"},
     *      description="Delete Expense",
     *      produces={"application/json"},
     *      @SWG\Parameter(
     *          name="id",
     *          description="id of Expense",
     *          type="integer",
     *          required=true,
     *          in="path"
     *      ),
     *      @SWG\Response(
     *          response=200,
     *          description="successful operation",
     *          @SWG\Schema(
     *              type="object",
     *              @SWG\Property(
     *                  property="success",
     *                  type="boolean"
     *              ),
     *              @SWG\Property(
     *                  property="data",
     *                  type="string"
     *              ),
     *              @SWG\Property(
     *                  property="message",
     *                  type="string"
     *              )
     *          )
     *      )
     * )
     */
    public function destroy($id)
    {
        /** @var Expense $expense */
        $expense = $this->expenseRepository->findWithoutFail($id);

        if (empty($expense)) {
            return $this->sendError('Expense not found');
        }

        $expense->delete();

        return $this->sendResponse($id, 'Expense deleted successfully');
    }
}
