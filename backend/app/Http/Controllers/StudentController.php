<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Models\Student;
use App\Services\StudentService;
use App\Http\Requests\UpdateStudentRequest;


class StudentController extends Controller
{
     protected StudentService $studentService;
     public function __construct(StudentService $studentService)
    {
        $this->studentService = $studentService;
    }

    public function index()
    {
       $students = Student::with('schoolClass')->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'status' => 'success',
            'data'   => $students
        ], 200);
    }

    public function store(StoreStudentRequest $request)
    {
        $student = $this->studentService->createStudent($request->validated());

        return response()->json([
            'message' => 'Student created successfully',
            'data' => $student->load('schoolClass')
        ], 201);
    }

    public function show(Student $student)
    {
        return response()->json([
            'status' => 'success',
            'data'   => $student->load('schoolClass')
        ], 200);
    }

    public function update(UpdateStudentRequest $request,int $id)
    {
        $student = Student::find($id);
        $updatedStudent = $this->studentService->updateStudent($student, $request->validated());

        return response()->json([
            'message' => 'Student updated successfully!',
            'data'    => $updatedStudent->load('schoolClass')
        ], 200);
    }

    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Student deleted successfully'
        ], 200);
    }
}