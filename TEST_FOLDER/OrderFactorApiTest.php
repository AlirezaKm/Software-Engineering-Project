<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OrderFactorApiTest extends TestCase
{
    use MakeOrderFactorTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOrderFactor()
    {
        $orderFactor = $this->fakeOrderFactorData();
        $this->json('POST', '/api/orderFactors', $orderFactor);

        $this->assertApiResponse($orderFactor);
    }

    /**
     * @test
     */
    public function testReadOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $this->json('GET', '/api/orderFactors/'.$orderFactor->id);

        $this->assertApiResponse($orderFactor->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $editedOrderFactor = $this->fakeOrderFactorData();

        $this->json('PUT', '/api/orderFactors/'.$orderFactor->id, $editedOrderFactor);

        $this->assertApiResponse($editedOrderFactor);
    }

    /**
     * @test
     */
    public function testDeleteOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $this->json('DELETE', '/api/orderFactors/'.$orderFactor->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/orderFactors/'.$orderFactor->id);

        $this->assertResponseStatus(404);
    }
}
