<?php 
namespace Database\Seeders;

use App\Models\SchoolClass;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
     
        $classNames = [
            'First Year CS', 'Second Year CS', 'Third Year CS', 'Final Year CS',
            'First Year CT', 'Second Year CT', 'Third Year CT', 'Final Year CT'
        ];

        $classes = collect($classNames)->map(function ($name) {
            return SchoolClass::firstOrCreate(['name' => $name]);
        });

       
        foreach (range(1, 10) as $index) {
            $students = Student::factory(1000)->make([
                'class_id' => fn() => $classes->random()->id,
            ])->toArray();

            Student::insert($students);
        }
    }
}