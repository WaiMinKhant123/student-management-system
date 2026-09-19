<?php

namespace App\Services;

use App\Models\Student;
use App\Models\SchoolClass;
use Illuminate\Support\Facades\DB;

class StudentService
{
    public function createStudent(array $data): Student
    {
        return DB::transaction(function () use ($data) {
    
            $class = SchoolClass::firstOrCreate([
                'name' => trim($data['class_name'])
            ]);

            return Student::create([
                'class_id' => $class->id,
                'name'     => $data['name'],
                'email'    => $data['email'],
                'phone'    => $data['phone'] ?? null,
            ]);
        });
    }

    public function updateStudent(Student $student, array $data): Student
    {
        return DB::transaction(function () use ($student, $data) {
            $class = SchoolClass::firstOrCreate([
                'name' => trim($data['class_name'])
            ]);

            $student->update([
                'class_id' => $class->id,
                'name'     => $data['name'],
                'email'    => $data['email'],
                'phone'    => $data['phone'] ?? null,
            ]);

            return $student;
        });
    }
}