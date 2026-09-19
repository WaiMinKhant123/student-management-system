<?php 
namespace Database\Factories;

use App\Models\SchoolClass;
use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'class_id' => SchoolClass::factory(), 
            'name'     => $this->faker->name(),
            'email'    => $this->faker->unique()->safeEmail(),
            'phone'    => $this->faker->optional()->phoneNumber(), 
        ];
    }
}