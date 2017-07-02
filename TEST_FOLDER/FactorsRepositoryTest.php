<?php

use App\Models\Factors;
use App\Repositories\FactorsRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class FactorsRepositoryTest extends TestCase
{
    use MakeFactorsTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var FactorsRepository
     */
    protected $factorsRepo;

    public function setUp()
    {
        parent::setUp();
        $this->factorsRepo = App::make(FactorsRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateFactors()
    {
        $factors = $this->fakeFactorsData();
        $createdFactors = $this->factorsRepo->create($factors);
        $createdFactors = $createdFactors->toArray();
        $this->assertArrayHasKey('id', $createdFactors);
        $this->assertNotNull($createdFactors['id'], 'Created Factors must have id specified');
        $this->assertNotNull(Factors::find($createdFactors['id']), 'Factors with given id must be in DB');
        $this->assertModelData($factors, $createdFactors);
    }

    /**
     * @test read
     */
    public function testReadFactors()
    {
        $factors = $this->makeFactors();
        $dbFactors = $this->factorsRepo->find($factors->id);
        $dbFactors = $dbFactors->toArray();
        $this->assertModelData($factors->toArray(), $dbFactors);
    }

    /**
     * @test update
     */
    public function testUpdateFactors()
    {
        $factors = $this->makeFactors();
        $fakeFactors = $this->fakeFactorsData();
        $updatedFactors = $this->factorsRepo->update($fakeFactors, $factors->id);
        $this->assertModelData($fakeFactors, $updatedFactors->toArray());
        $dbFactors = $this->factorsRepo->find($factors->id);
        $this->assertModelData($fakeFactors, $dbFactors->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteFactors()
    {
        $factors = $this->makeFactors();
        $resp = $this->factorsRepo->delete($factors->id);
        $this->assertTrue($resp);
        $this->assertNull(Factors::find($factors->id), 'Factors should not exist in DB');
    }
}
