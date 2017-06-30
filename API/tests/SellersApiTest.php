<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SellersApiTest extends TestCase
{
    use MakeSellersTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateSellers()
    {
        $sellers = $this->fakeSellersData();
        $this->json('POST', '/api/v1/sellers', $sellers);

        $this->assertApiResponse($sellers);
    }

    /**
     * @test
     */
    public function testReadSellers()
    {
        $sellers = $this->makeSellers();
        $this->json('GET', '/api/v1/sellers/'.$sellers->id);

        $this->assertApiResponse($sellers->toArray());
    }

    /**
     * @test
     */
    public function testUpdateSellers()
    {
        $sellers = $this->makeSellers();
        $editedSellers = $this->fakeSellersData();

        $this->json('PUT', '/api/v1/sellers/'.$sellers->id, $editedSellers);

        $this->assertApiResponse($editedSellers);
    }

    /**
     * @test
     */
    public function testDeleteSellers()
    {
        $sellers = $this->makeSellers();
        $this->json('DELETE', '/api/v1/sellers/'.$sellers->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/sellers/'.$sellers->id);

        $this->assertResponseStatus(404);
    }
}
