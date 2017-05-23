<?php

use App\Models\Order;
use App\Repositories\OrderRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class OrderRepositoryTest extends TestCase
{
    use MakeOrderTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var OrderRepository
     */
    protected $orderRepo;

    public function setUp()
    {
        parent::setUp();
        $this->orderRepo = App::make(OrderRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateOrder()
    {
        $order = $this->fakeOrderData();
        $createdOrder = $this->orderRepo->create($order);
        $createdOrder = $createdOrder->toArray();
        $this->assertArrayHasKey('id', $createdOrder);
        $this->assertNotNull($createdOrder['id'], 'Created Order must have id specified');
        $this->assertNotNull(Order::find($createdOrder['id']), 'Order with given id must be in DB');
        $this->assertModelData($order, $createdOrder);
    }

    /**
     * @test read
     */
    public function testReadOrder()
    {
        $order = $this->makeOrder();
        $dbOrder = $this->orderRepo->find($order->id);
        $dbOrder = $dbOrder->toArray();
        $this->assertModelData($order->toArray(), $dbOrder);
    }

    /**
     * @test update
     */
    public function testUpdateOrder()
    {
        $order = $this->makeOrder();
        $fakeOrder = $this->fakeOrderData();
        $updatedOrder = $this->orderRepo->update($fakeOrder, $order->id);
        $this->assertModelData($fakeOrder, $updatedOrder->toArray());
        $dbOrder = $this->orderRepo->find($order->id);
        $this->assertModelData($fakeOrder, $dbOrder->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteOrder()
    {
        $order = $this->makeOrder();
        $resp = $this->orderRepo->delete($order->id);
        $this->assertTrue($resp);
        $this->assertNull(Order::find($order->id), 'Order should not exist in DB');
    }
}
