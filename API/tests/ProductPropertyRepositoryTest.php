<?php

use App\Models\ProductProperty;
use App\Repositories\ProductPropertyRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProductPropertyRepositoryTest extends TestCase
{
    use MakeProductPropertyTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var ProductPropertyRepository
     */
    protected $productPropertyRepo;

    public function setUp()
    {
        parent::setUp();
        $this->productPropertyRepo = App::make(ProductPropertyRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateProductProperty()
    {
        $productProperty = $this->fakeProductPropertyData();
        $createdProductProperty = $this->productPropertyRepo->create($productProperty);
        $createdProductProperty = $createdProductProperty->toArray();
        $this->assertArrayHasKey('id', $createdProductProperty);
        $this->assertNotNull($createdProductProperty['id'], 'Created ProductProperty must have id specified');
        $this->assertNotNull(ProductProperty::find($createdProductProperty['id']), 'ProductProperty with given id must be in DB');
        $this->assertModelData($productProperty, $createdProductProperty);
    }

    /**
     * @test read
     */
    public function testReadProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $dbProductProperty = $this->productPropertyRepo->find($productProperty->id);
        $dbProductProperty = $dbProductProperty->toArray();
        $this->assertModelData($productProperty->toArray(), $dbProductProperty);
    }

    /**
     * @test update
     */
    public function testUpdateProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $fakeProductProperty = $this->fakeProductPropertyData();
        $updatedProductProperty = $this->productPropertyRepo->update($fakeProductProperty, $productProperty->id);
        $this->assertModelData($fakeProductProperty, $updatedProductProperty->toArray());
        $dbProductProperty = $this->productPropertyRepo->find($productProperty->id);
        $this->assertModelData($fakeProductProperty, $dbProductProperty->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $resp = $this->productPropertyRepo->delete($productProperty->id);
        $this->assertTrue($resp);
        $this->assertNull(ProductProperty::find($productProperty->id), 'ProductProperty should not exist in DB');
    }
}
