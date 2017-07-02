<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use MakeCategoryTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateCategory()
    {
        $category = $this->fakeCategoryData();
        $this->json('POST', '/api/categories', $category);

        $this->assertApiResponse($category);
    }

    /**
     * @test
     */
    public function testReadCategory()
    {
        $category = $this->makeCategory();
        $this->json('GET', '/api/categories/'.$category->id);

        $this->assertApiResponse($category->toArray());
    }

    /**
     * @test
     */
    public function testUpdateCategory()
    {
        $category = $this->makeCategory();
        $editedCategory = $this->fakeCategoryData();

        $this->json('PUT', '/api/categories/'.$category->id, $editedCategory);

        $this->assertApiResponse($editedCategory);
    }

    /**
     * @test
     */
    public function testDeleteCategory()
    {
        $category = $this->makeCategory();
        $this->json('DELETE', '/api/categories/'.$category->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/categories/'.$category->id);

        $this->assertResponseStatus(404);
    }
}
