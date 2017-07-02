<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OrderStatusApiTest extends TestCase
{
    use MakeOrderStatusTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOrderStatus()
    {
        $orderStatus = $this->fakeOrderStatusData();
        $this->json('POST', '/api/orderStatuses', $orderStatus);

        $this->assertApiResponse($orderStatus);
    }

    /**
     * @test
     */
    public function testReadOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $this->json('GET', '/api/orderStatuses/'.$orderStatus->id);

        $this->assertApiResponse($orderStatus->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $editedOrderStatus = $this->fakeOrderStatusData();

        $this->json('PUT', '/api/orderStatuses/'.$orderStatus->id, $editedOrderStatus);

        $this->assertApiResponse($editedOrderStatus);
    }

    /**
     * @test
     */
    public function testDeleteOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $this->json('DELETE', '/api/orderStatuses/'.$orderStatus->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/orderStatuses/'.$orderStatus->id);

        $this->assertResponseStatus(404);
    }
}
