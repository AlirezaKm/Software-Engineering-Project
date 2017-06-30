<?php

use App\Models\Expense;
use App\Repositories\ExpenseRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ExpenseRepositoryTest extends TestCase
{
    use MakeExpenseTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ExpenseRepository
     */
    protected $expenseRepo;

    public function setUp()
    {
        parent::setUp();
        $this->expenseRepo = App::make(ExpenseRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateExpense()
    {
        $expense = $this->fakeExpenseData();
        $createdExpense = $this->expenseRepo->create($expense);
        $createdExpense = $createdExpense->toArray();
        $this->assertArrayHasKey('id', $createdExpense);
        $this->assertNotNull($createdExpense['id'], 'Created Expense must have id specified');
        $this->assertNotNull(Expense::find($createdExpense['id']), 'Expense with given id must be in DB');
        $this->assertModelData($expense, $createdExpense);
    }

    /**
     * @test read
     */
    public function testReadExpense()
    {
        $expense = $this->makeExpense();
        $dbExpense = $this->expenseRepo->find($expense->id);
        $dbExpense = $dbExpense->toArray();
        $this->assertModelData($expense->toArray(), $dbExpense);
    }

    /**
     * @test update
     */
    public function testUpdateExpense()
    {
        $expense = $this->makeExpense();
        $fakeExpense = $this->fakeExpenseData();
        $updatedExpense = $this->expenseRepo->update($fakeExpense, $expense->id);
        $this->assertModelData($fakeExpense, $updatedExpense->toArray());
        $dbExpense = $this->expenseRepo->find($expense->id);
        $this->assertModelData($fakeExpense, $dbExpense->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteExpense()
    {
        $expense = $this->makeExpense();
        $resp = $this->expenseRepo->delete($expense->id);
        $this->assertTrue($resp);
        $this->assertNull(Expense::find($expense->id), 'Expense should not exist in DB');
    }
}
