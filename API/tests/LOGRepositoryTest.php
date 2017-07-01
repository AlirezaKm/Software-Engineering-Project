<?php

use App\Models\LOG;
use App\Repositories\LOGRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class LOGRepositoryTest extends TestCase
{
    use MakeLOGTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var LOGRepository
     */
    protected $lOGRepo;

    public function setUp()
    {
        parent::setUp();
        $this->lOGRepo = App::make(LOGRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateLOG()
    {
        $lOG = $this->fakeLOGData();
        $createdLOG = $this->lOGRepo->create($lOG);
        $createdLOG = $createdLOG->toArray();
        $this->assertArrayHasKey('id', $createdLOG);
        $this->assertNotNull($createdLOG['id'], 'Created LOG must have id specified');
        $this->assertNotNull(LOG::find($createdLOG['id']), 'LOG with given id must be in DB');
        $this->assertModelData($lOG, $createdLOG);
    }

    /**
     * @test read
     */
    public function testReadLOG()
    {
        $lOG = $this->makeLOG();
        $dbLOG = $this->lOGRepo->find($lOG->id);
        $dbLOG = $dbLOG->toArray();
        $this->assertModelData($lOG->toArray(), $dbLOG);
    }

    /**
     * @test update
     */
    public function testUpdateLOG()
    {
        $lOG = $this->makeLOG();
        $fakeLOG = $this->fakeLOGData();
        $updatedLOG = $this->lOGRepo->update($fakeLOG, $lOG->id);
        $this->assertModelData($fakeLOG, $updatedLOG->toArray());
        $dbLOG = $this->lOGRepo->find($lOG->id);
        $this->assertModelData($fakeLOG, $dbLOG->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteLOG()
    {
        $lOG = $this->makeLOG();
        $resp = $this->lOGRepo->delete($lOG->id);
        $this->assertTrue($resp);
        $this->assertNull(LOG::find($lOG->id), 'LOG should not exist in DB');
    }
}
