<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SubCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SubCategory', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->unsignedInteger('category');
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('category')->references('id')->on('Category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('SubCategory');
    }
}
