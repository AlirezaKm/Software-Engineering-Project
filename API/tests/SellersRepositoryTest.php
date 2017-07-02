<?php

use App\Models\Sellers;
use App\Repositories\SellersRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class SellersRepositoryTest extends TestCase
{
    use MakeSellersTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var SellersRepository
     */
    protected $sellersRepo;

    public function setUp()
    {
        parent::setUp();
        $this->sellersRepo = App::make(SellersRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateSellers()
    {
        $sellers = $this->fakeSellersData();
        $createdSellers = $this->sellersRepo->create($sellers);
        $createdSellers = $createdSellers->toArray();
        $this->assertArrayHasKey('id', $createdSellers);
        $this->assertNotNull($createdSellers['id'], 'Created Sellers must have id specified');
        $this->assertNotNull(Sellers::find($createdSellers['id']), 'Sellers with given id must be in DB');
        $this->assertModelData($sellers, $createdSellers);
    }

    /**
     * @test read
     */
    public function testReadSellers()
    {
        $sellers = $this->makeSellers();
        $dbSellers = $this->sellersRepo->find($sellers->id);
        $dbSellers = $dbSellers->toArray();
        $this->assertModelData($sellers->toArray(), $dbSellers);
    }

    /**
     * @test update
     */
    public function testUpdateSellers()
    {
        $sellers = $this->makeSellers();
        $fakeSellers = $this->fakeSellersData();
        $updatedSellers = $this->sellersRepo->update($fakeSellers, $sellers->id);
        $this->assertModelData($fakeSellers, $updatedSellers->toArray());
        $dbSellers = $this->sellersRepo->find($sellers->id);
        $this->assertModelData($fakeSellers, $dbSellers->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteSellers()
    {
        $sellers = $this->makeSellers();
        $resp = $this->sellersRepo->delete($sellers->id);
        $this->assertTrue($resp);
        $this->assertNull(Sellers::find($sellers->id), 'Sellers should not exist in DB');
    }
}
