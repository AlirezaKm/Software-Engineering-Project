<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class ProductPropertyApiTest extends TestCase
{
    use MakeProductPropertyTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateProductProperty()
    {
        $productProperty = $this->fakeProductPropertyData();
        $this->json('POST', '/api/productProperties', $productProperty);

        $this->assertApiResponse($productProperty);
    }

    /**
     * @test
     */
    public function testReadProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $this->json('GET', '/api/productProperties/'.$productProperty->id);

        $this->assertApiResponse($productProperty->toArray());
    }

    /**
     * @test
     */
    public function testUpdateProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $editedProductProperty = $this->fakeProductPropertyData();

        $this->json('PUT', '/api/productProperties/'.$productProperty->id, $editedProductProperty);

        $this->assertApiResponse($editedProductProperty);
    }

    /**
     * @test
     */
    public function testDeleteProductProperty()
    {
        $productProperty = $this->makeProductProperty();
        $this->json('DELETE', '/api/productProperties/'.$productProperty->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/productProperties/'.$productProperty->id);

        $this->assertResponseStatus(404);
    }
}
