<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('product_group')->insert([
            [
                'id' => 'cb2eaa85-9232-4c25-b3ba-9472317ce28a',
                'color' => '#F70909',
                'user_id' => null,
                'sort' => '100'
            ],
            [
                'id' => '8b2424b6-08a9-4ddf-a544-0edb93e77688',
                'color' => '#41F489',
                'user_id' => null,
                'sort' => '200'
            ],
            [
                'id' => '692b46bd-bdbc-4841-ae50-c8e85ea36f64',
                'color' => '#6633F9',
                'user_id' => null,
                'sort' => '300'
            ],
            [
                'id' => '5943bd29-2575-466f-83e8-8e6e542ae644',
                'color' => '#FF3AC8',
                'user_id' => null,
                'sort' => '400'
            ],
            [
                'id' => '5133b9e0-f27b-4b07-964c-00d2babaafb7',
                'color' => '#FCF554',
                'user_id' => null,
                'sort' => '500'
            ],
            [
                'id' => '7a6a1489-3c1b-4f74-b409-27a6bdfcc65f',
                'color' => '#0088CC',
                'user_id' => null,
                'sort' => '600'
            ]
        ]);
    }
}
