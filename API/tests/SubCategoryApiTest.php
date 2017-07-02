<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class SubCategoryApiTest extends TestCase
{
    use MakeSubCategoryTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateSubCategory()
    {
        $subCategory = $this->fakeSubCategoryData();
        $this->json('POST', '/api/subCategories', $subCategory);

        $this->assertApiResponse($subCategory);
    }

    /**
     * @test
     */
    public function testReadSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $this->json('GET', '/api/subCategories/'.$subCategory->id);

        $this->assertApiResponse($subCategory->toArray());
    }

    /**
     * @test
     */
    public function testUpdateSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $editedSubCategory = $this->fakeSubCategoryData();

        $this->json('PUT', '/api/subCategories/'.$subCategory->id, $editedSubCategory);

        $this->assertApiResponse($editedSubCategory);
    }

    /**
     * @test
     */
    public function testDeleteSubCategory()
    {
        $subCategory = $this->makeSubCategory();
        $this->json('DELETE', '/api/subCategories/'.$subCategory->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/subCategories/'.$subCategory->id);

        $this->assertResponseStatus(404);
    }
}
