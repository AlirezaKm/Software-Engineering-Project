<?php

use App\Models\OrderStatus;
use App\Repositories\OrderStatusRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class OrderStatusRepositoryTest extends TestCase
{
    use MakeOrderStatusTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var OrderStatusRepository
     */
    protected $orderStatusRepo;

    public function setUp()
    {
        parent::setUp();
        $this->orderStatusRepo = App::make(OrderStatusRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateOrderStatus()
    {
        $orderStatus = $this->fakeOrderStatusData();
        $createdOrderStatus = $this->orderStatusRepo->create($orderStatus);
        $createdOrderStatus = $createdOrderStatus->toArray();
        $this->assertArrayHasKey('id', $createdOrderStatus);
        $this->assertNotNull($createdOrderStatus['id'], 'Created OrderStatus must have id specified');
        $this->assertNotNull(OrderStatus::find($createdOrderStatus['id']), 'OrderStatus with given id must be in DB');
        $this->assertModelData($orderStatus, $createdOrderStatus);
    }

    /**
     * @test read
     */
    public function testReadOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $dbOrderStatus = $this->orderStatusRepo->find($orderStatus->id);
        $dbOrderStatus = $dbOrderStatus->toArray();
        $this->assertModelData($orderStatus->toArray(), $dbOrderStatus);
    }

    /**
     * @test update
     */
    public function testUpdateOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $fakeOrderStatus = $this->fakeOrderStatusData();
        $updatedOrderStatus = $this->orderStatusRepo->update($fakeOrderStatus, $orderStatus->id);
        $this->assertModelData($fakeOrderStatus, $updatedOrderStatus->toArray());
        $dbOrderStatus = $this->orderStatusRepo->find($orderStatus->id);
        $this->assertModelData($fakeOrderStatus, $dbOrderStatus->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteOrderStatus()
    {
        $orderStatus = $this->makeOrderStatus();
        $resp = $this->orderStatusRepo->delete($orderStatus->id);
        $this->assertTrue($resp);
        $this->assertNull(OrderStatus::find($orderStatus->id), 'OrderStatus should not exist in DB');
    }
}
