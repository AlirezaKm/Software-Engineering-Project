<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrderFactorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('OrderStatus', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->softDeletes();
        });

        DB::table('OrderStatus')->insert([
            ['name' => 'Payed'],
            ['name' => 'Cancelled']
        ]);

        Schema::create('OrderFactor', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('status')->default(DB::table('OrderStatus')->where('name','Cancelled')->first()->id);
            $table->unsignedInteger('count')->default(0);
            $table->double('sum')->default(0);
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('status')->references('id')->on('OrderStatus');
        });

        DB::update('ALTER TABLE OrderFactor AUTO_INCREMENT = 10000;');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('OrderFactor');
        Schema::dropIfExists('OrderStatus');
    }
}
