<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('userTypes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->softDeletes();
        });

        DB::table('userTypes')->insert([
            ['name' => 'admin' ],
            ['name' => 'stockman' ],
            ['name' => 'accountant' ],
            ['name' => 'seller' ]
        ]);

        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fname');
            $table->string('lname');
            $table->unsignedInteger('type')->default(DB::table('userTypes')->where('name', 'seller')->first()->id);
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('type')->references('id')->on('userTypes');

        });

        DB::table('users')->insert([
            [
                'fname' => 'Alireza',
                'lname' => 'Karami' ,
                'type'  => DB::table('userTypes')->where('name', 'admin')->first()->id,
                'email' => 'alitm28@gmail.com',
                'password' => bcrypt('123456')
            ],
            [
                'fname' => 'Mohammad',
                'lname' => 'Sepahvand' ,
                'type'  => DB::table('userTypes')->where('name', 'stockman')->first()->id,
                'email' => 'mohammad@gmail.com',
                'password' => bcrypt('123456')
            ],
            [
                'fname' => 'Ali',
                'lname' => 'Hakimi' ,
                'type'  => DB::table('userTypes')->where('name', 'accountant')->first()->id,
                'email' => 'ali@gmail.com',
                'password' => bcrypt('123456')
            ],
            [
                'fname' => 'Mehrdad',
                'lname' => 'Rahmati' ,
                'type'  => DB::table('userTypes')->where('name', 'seller')->first()->id,
                'email' => 'mehrdad@gmail.com',
                'password' => bcrypt('123456')
            ]
        ]);

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('userTypes');
    }
}
