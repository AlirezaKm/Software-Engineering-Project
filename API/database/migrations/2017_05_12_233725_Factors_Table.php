<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FactorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Sellers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->softDeletes();
            # Foreign Keys
        });

        Schema::create('Factors', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('seller');
            $table->date('date')->nullable();
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('seller')->references('id')->on('Sellers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Factors');
        Schema::dropIfExists('Sellers');
    }
}
