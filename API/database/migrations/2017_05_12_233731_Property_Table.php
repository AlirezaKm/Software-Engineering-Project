<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PropertyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Property', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('subcategory');
            $table->string('name');
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('subcategory')->references('id')->on('SubCategory');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Property');
    }
}
