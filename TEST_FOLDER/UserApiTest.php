<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;

class UserApiTest extends TestCase
{
    use MakeUserTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateUser()
    {
        $user = $this->fakeUserData();
        $this->json('POST', '/api/users', $user);

        $this->assertApiResponse($user);
    }

    /**
     * @test
     */
    public function testReadUser()
    {
        $user = $this->makeUser();
        $this->json('GET', '/api/users/'.$user->id);

        $this->assertApiResponse($user->toArray());
    }

    /**
     * @test
     */
    public function testUpdateUser()
    {
        $user = $this->makeUser();
        $editedUser = $this->fakeUserData();

        $this->json('PUT', '/api/users/'.$user->id, $editedUser);

        $this->assertApiResponse($editedUser);
    }

    /**
     * @test
     */
    public function testDeleteUser()
    {
        $user = $this->makeUser();
        $this->json('DELETE', '/api/users/'.$user->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/users/'.$user->id);

        $this->assertResponseStatus(404);
    }
}
