<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SchoolClassFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->randomElement([
                'First Year CS', 
                'Second Year CS', 
                'Third Year CS', 
                'Final Year CS',
                'First Year CT', 
                'Second Year CT', 
                'Third Year CT', 
                'Final Year CT'
            ]),
        ];
    }
}