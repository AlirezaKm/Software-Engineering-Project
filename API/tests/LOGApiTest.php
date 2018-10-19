<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class LOGApiTest extends TestCase
{
    use MakeLOGTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateLOG()
    {
        $lOG = $this->fakeLOGData();
        $this->json('POST', '/api/logs', $lOG);

        $this->assertApiResponse($lOG);
    }

    /**
     * @test
     */
    public function testReadLOG()
    {
        $lOG = $this->makeLOG();
        $this->json('GET', '/api/logs/'.$lOG->id);

        $this->assertApiResponse($lOG->toArray());
    }

    /**
     * @test
     */
    public function testUpdateLOG()
    {
        $lOG = $this->makeLOG();
        $editedLOG = $this->fakeLOGData();

        $this->json('PUT', '/api/logs/'.$lOG->id, $editedLOG);

        $this->assertApiResponse($editedLOG);
    }

    /**
     * @test
     */
    public function testDeleteLOG()
    {
        $lOG = $this->makeLOG();
        $this->json('DELETE', '/api/logs/'.$lOG->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/logs/'.$lOG->id);

        $this->assertResponseStatus(404);
    }
}
