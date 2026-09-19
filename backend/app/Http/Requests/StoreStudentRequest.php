<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreStudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'class_name' => 'required|string|max:255',          
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:20',
        ];
    }
       public function messages(): array
    {
        return [
            'class_id.exists' => 'ရွေးချယ်ထားသော အတန်း မရှိပါ။',
            'email.unique'    => 'ဒီ Email ကို အခြားကျောင်းသား အသုံးပြုပြီးသား ဖြစ်ပါသည်။',
        ];
    }
}
