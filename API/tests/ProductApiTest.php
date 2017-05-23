<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class ProductApiTest extends TestCase
{
    use MakeProductTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateProduct()
    {
        $product = $this->fakeProductData();
        $this->json('POST', '/api/v1/products', $product);

        $this->assertApiResponse($product);
    }

    /**
     * @test
     */
    public function testReadProduct()
    {
        $product = $this->makeProduct();
        $this->json('GET', '/api/v1/products/'.$product->id);

        $this->assertApiResponse($product->toArray());
    }

    /**
     * @test
     */
    public function testUpdateProduct()
    {
        $product = $this->makeProduct();
        $editedProduct = $this->fakeProductData();

        $this->json('PUT', '/api/v1/products/'.$product->id, $editedProduct);

        $this->assertApiResponse($editedProduct);
    }

    /**
     * @test
     */
    public function testDeleteProduct()
    {
        $product = $this->makeProduct();
        $this->json('DELETE', '/api/v1/products/'.$product->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/products/'.$product->id);

        $this->assertResponseStatus(404);
    }
}
