<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class OrderApiTest extends TestCase
{
    use MakeOrderTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateOrder()
    {
        $order = $this->fakeOrderData();
        $this->json('POST', '/api/orders', $order);

        $this->assertApiResponse($order);
    }

    /**
     * @test
     */
    public function testReadOrder()
    {
        $order = $this->makeOrder();
        $this->json('GET', '/api/orders/'.$order->id);

        $this->assertApiResponse($order->toArray());
    }

    /**
     * @test
     */
    public function testUpdateOrder()
    {
        $order = $this->makeOrder();
        $editedOrder = $this->fakeOrderData();

        $this->json('PUT', '/api/orders/'.$order->id, $editedOrder);

        $this->assertApiResponse($editedOrder);
    }

    /**
     * @test
     */
    public function testDeleteOrder()
    {
        $order = $this->makeOrder();
        $this->json('DELETE', '/api/orders/'.$order->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/orders/'.$order->id);

        $this->assertResponseStatus(404);
    }
}
