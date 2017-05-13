<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class OrderOrderFactorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('Order', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('product');
            $table->unsignedInteger('count');
            $table->unsignedInteger('orderFactor');
            $table->timestamps();
            $table->softDeletes();
            # Foreign Keys
            $table->foreign('product')->references('code')->on('Product');
            $table->foreign('orderFactor')->references('id')->on('Factors');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('Order');
    }
}
