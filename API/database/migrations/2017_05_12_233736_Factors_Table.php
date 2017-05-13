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
        Schema::create('Factors', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('seller');
            $table->double('sum')->default(0);
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('seller')->references('id')->on('Users');
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
    }
}
