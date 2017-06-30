<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OrderStatusApiTest extends TestCase
{
    use MakeOrderStatusTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOrderStatus()
    {
        $orderStatus = $this->fakeOrderStatusData();
        $this->json('POST', '/api/v1/orderStatuses', $orderStatus);

        $this->assertApiResponse($orderStatus);
    }

    /**
     * @test
     */
    public function testReadOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $this->json('GET', '/api/v1/orderStatuses/'.$orderStatus->id);

        $this->assertApiResponse($orderStatus->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $editedOrderStatus = $this->fakeOrderStatusData();

        $this->json('PUT', '/api/v1/orderStatuses/'.$orderStatus->id, $editedOrderStatus);

        $this->assertApiResponse($editedOrderStatus);
    }

    /**
     * @test
     */
    public function testDeleteOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $this->json('DELETE', '/api/v1/orderStatuses/'.$orderStatus->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/orderStatuses/'.$orderStatus->id);

        $this->assertResponseStatus(404);
    }
}
