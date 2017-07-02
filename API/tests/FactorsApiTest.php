<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class FactorsApiTest extends TestCase
{
    use MakeFactorsTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateFactors()
    {
        $factors = $this->fakeFactorsData();
        $this->json('POST', '/api/factors', $factors);

        $this->assertApiResponse($factors);
    }

    /**
     * @test
     */
    public function testReadFactors()
    {
        $factors = $this->makeFactors();
        $this->json('GET', '/api/factors/'.$factors->id);

        $this->assertApiResponse($factors->toArray());
    }

    /**
     * @test
     */
    public function testUpdateFactors()
    {
        $factors = $this->makeFactors();
        $editedFactors = $this->fakeFactorsData();

        $this->json('PUT', '/api/factors/'.$factors->id, $editedFactors);

        $this->assertApiResponse($editedFactors);
    }

    /**
     * @test
     */
    public function testDeleteFactors()
    {
        $factors = $this->makeFactors();
        $this->json('DELETE', '/api/factors/'.$factors->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/factors/'.$factors->id);

        $this->assertResponseStatus(404);
    }
}
