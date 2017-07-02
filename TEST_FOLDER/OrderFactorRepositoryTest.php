<?php

use App\Models\OrderFactor;
use App\Repositories\OrderFactorRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class OrderFactorRepositoryTest extends TestCase
{
    use MakeOrderFactorTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var OrderFactorRepository
     */
    protected $orderFactorRepo;

    public function setUp()
    {
        parent::setUp();
        $this->orderFactorRepo = App::make(OrderFactorRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateOrderFactor()
    {
        $orderFactor = $this->fakeOrderFactorData();
        $createdOrderFactor = $this->orderFactorRepo->create($orderFactor);
        $createdOrderFactor = $createdOrderFactor->toArray();
        $this->assertArrayHasKey('id', $createdOrderFactor);
        $this->assertNotNull($createdOrderFactor['id'], 'Created OrderFactor must have id specified');
        $this->assertNotNull(OrderFactor::find($createdOrderFactor['id']), 'OrderFactor with given id must be in DB');
        $this->assertModelData($orderFactor, $createdOrderFactor);
    }

    /**
     * @test read
     */
    public function testReadOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $dbOrderFactor = $this->orderFactorRepo->find($orderFactor->id);
        $dbOrderFactor = $dbOrderFactor->toArray();
        $this->assertModelData($orderFactor->toArray(), $dbOrderFactor);
    }

    /**
     * @test update
     */
    public function testUpdateOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $fakeOrderFactor = $this->fakeOrderFactorData();
        $updatedOrderFactor = $this->orderFactorRepo->update($fakeOrderFactor, $orderFactor->id);
        $this->assertModelData($fakeOrderFactor, $updatedOrderFactor->toArray());
        $dbOrderFactor = $this->orderFactorRepo->find($orderFactor->id);
        $this->assertModelData($fakeOrderFactor, $dbOrderFactor->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteOrderFactor()
    {
        $orderFactor = $this->makeOrderFactor();
        $resp = $this->orderFactorRepo->delete($orderFactor->id);
        $this->assertTrue($resp);
        $this->assertNull(OrderFactor::find($orderFactor->id), 'OrderFactor should not exist in DB');
    }
}
