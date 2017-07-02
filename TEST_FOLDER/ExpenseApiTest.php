<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ExpenseApiTest extends TestCase
{
    use MakeExpenseTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateExpense()
    {
        $expense = $this->fakeExpenseData();
        $this->json('POST', '/api/expenses', $expense);

        $this->assertApiResponse($expense);
    }

    /**
     * @test
     */
    public function testReadExpense()
    {
        $expense = $this->makeExpense();
        $this->json('GET', '/api/expenses/'.$expense->id);

        $this->assertApiResponse($expense->toArray());
    }

    /**
     * @test
     */
    public function testUpdateExpense()
    {
        $expense = $this->makeExpense();
        $editedExpense = $this->fakeExpenseData();

        $this->json('PUT', '/api/expenses/'.$expense->id, $editedExpense);

        $this->assertApiResponse($editedExpense);
    }

    /**
     * @test
     */
    public function testDeleteExpense()
    {
        $expense = $this->makeExpense();
        $this->json('DELETE', '/api/expenses/'.$expense->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/expenses/'.$expense->id);

        $this->assertResponseStatus(404);
    }
}
