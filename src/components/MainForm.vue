<template>
    <div class="bg-white rounded-md border border-[#F2F2F2] flex flex-col justify-center max-w-[449px] mx-auto mt-9 px-10 py-23">
      <h1 class="font-bold text-xl text-center font-[Helvetica-Neue] mb-6">
        Get your Car Insurance for $9.99
      </h1>
  
      <Form :validation-schema="schema" @submit="onSubmit">
        <div class="flex flex-col space-y-5">
          <div class="flex flex-col">
            <label for="fullName" class="font-bold text-base font-[Helvetica]">Full Name</label>
            <Field
              id="fullName"
              name="fullName"
              as="input"
              class="border border-gray-300 mt-1 rounded-md p-2"
            />
            <ErrorMessage name="fullName" class="text-red-500 text-sm" />
          </div>
  
          <div class="flex flex-col">
            <label for="email" class="font-bold text-base font-[Helvetica]">Email</label>
            <Field
              id="email"
              name="email"
              as="input"
              type="email"
              class="border border-gray-300 mt-1 rounded-md p-2"
            />
            <ErrorMessage name="email" class="text-red-500 text-sm" />
          </div>
  
          <div class="flex flex-col">
            <label for="zip" class="font-bold text-base font-[Helvetica]">Zip Code</label>
            <Field
              id="zip"
              name="zip"
              as="input"
              class="border border-gray-300 mt-1 rounded-md p-2"
            />
            <ErrorMessage name="zip" class="text-red-500 text-sm" />
          </div>
  
          <div class="flex flex-col">
            <label for="birthDate" class="font-bold text-base font-[Helvetica]">Birth Date</label>
            <div class="flex space-x-2.5">
                <Field name="birthMonth" as="select" class="p-2 border border-gray-300 rounded grow-7">
                    <option value="">Month</option>
                    <option v-for="m in 12" :key="m" :value="String(m).padStart(2, '0')">{{ m }}</option>
                </Field>

                <Field name="birthDay" as="select" class="p-2 border border-gray-300 rounded grow-3">
                    <option value="">Day</option>
                    <option v-for="d in 31" :key="d" :value="String(d).padStart(2, '0')">{{ d }}</option>
                </Field>

                <Field name="birthYear" as="select" class="p-2 border border-gray-300 rounded grow-3">
                    <option value="">Year</option>
                    <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
                </Field>
            </div>

            <ErrorMessage name="birthDate" class="text-red-500 text-sm" />
          </div>
  
          <div class="flex flex-col">
            <label for="gender" class="font-bold text-base font-[Helvetica]">Gender</label>
            <Field
              id="gender"
              name="gender"
              as="select"
              class="border border-gray-300 mt-1 rounded-md p-2"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </Field>
            <ErrorMessage name="gender" class="text-red-500 text-sm" />
          </div>
  
          <button
            type="submit"
            class="bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600"
          >
            CONTINUE
          </button>
        </div>
      </Form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { Form, Field, ErrorMessage } from 'vee-validate'
  import * as yup from 'yup'
  
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const schema = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  zip: yup.string().matches(/^\d{5}$/, 'Zip must be 5 digits').required(),
  birthMonth: yup.string().required(),
  birthDay: yup.string().required(),
  birthYear: yup.string().required(),
  gender: yup.string().required()
});

  
  function onSubmit(values: any) {
  const { birthDay, birthMonth, birthYear, ...rest } = values
  const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
  if (isNaN(birthDate.getTime())) {
    console.error("Invalid birth date");
    return;
  }

  console.log('Form submitted with:', { ...rest, birthDate });
}

  </script>
  