<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class PropertyApiTest extends TestCase
{
    use MakePropertyTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateProperty()
    {
        $property = $this->fakePropertyData();
        $this->json('POST', '/api/properties', $property);

        $this->assertApiResponse($property);
    }

    /**
     * @test
     */
    public function testReadProperty()
    {
        $property = $this->makeProperty();
        $this->json('GET', '/api/properties/'.$property->id);

        $this->assertApiResponse($property->toArray());
    }

    /**
     * @test
     */
    public function testUpdateProperty()
    {
        $property = $this->makeProperty();
        $editedProperty = $this->fakePropertyData();

        $this->json('PUT', '/api/properties/'.$property->id, $editedProperty);

        $this->assertApiResponse($editedProperty);
    }

    /**
     * @test
     */
    public function testDeleteProperty()
    {
        $property = $this->makeProperty();
        $this->json('DELETE', '/api/properties/'.$property->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/properties/'.$property->id);

        $this->assertResponseStatus(404);
    }
}
