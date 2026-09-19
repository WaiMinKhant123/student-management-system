<?php namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'class_name' => 'required|string|max:255',  
            'name'  => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:students,email,',
            'phone' => 'nullable|string|max:20',
        ];
    }
}