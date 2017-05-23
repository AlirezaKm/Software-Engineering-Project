<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OrderFactorApiTest extends TestCase
{
    use MakeOrderFactorTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOrderFactor()
    {
        $orderFactor = $this->fakeOrderFactorData();
        $this->json('POST', '/api/v1/orderFactors', $orderFactor);

        $this->assertApiResponse($orderFactor);
    }

    /**
     * @test
     */
    public function testReadOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $this->json('GET', '/api/v1/orderFactors/'.$orderFactor->id);

        $this->assertApiResponse($orderFactor->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $editedOrderFactor = $this->fakeOrderFactorData();

        $this->json('PUT', '/api/v1/orderFactors/'.$orderFactor->id, $editedOrderFactor);

        $this->assertApiResponse($editedOrderFactor);
    }

    /**
     * @test
     */
    public function testDeleteOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $this->json('DELETE', '/api/v1/orderFactors/'.$orderFactor->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/orderFactors/'.$orderFactor->id);

        $this->assertResponseStatus(404);
    }
}
