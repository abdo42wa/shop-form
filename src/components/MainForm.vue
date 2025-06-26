<template>
    <div
        class="bg-white rounded-sm border border-[#F2F2F2] flex flex-col justify-center max-w-[449px] mx-auto mt-9 px-10 py-23">
        <h1 class="text-xl text-center font-[Helvetica-Neue] mb-6">
            Get your Car Insurance for $9.99
        </h1>

        <Form :validation-schema="schema" @submit="onSubmit">
            <div class="flex flex-col space-y-5">
                <div class="flex flex-col">
                    <label for="fullName" class="text-base">Full Name</label>
                    <Field name="fullName" as="input" v-model="fullName" class="border border-gray-300 mt-1 rounded-sm p-2" />
                    <ErrorMessage name="fullName" class="text-red-500 text-sm" />
                </div>

                <div class="flex flex-col">
                    <label for="email" class="text-base">Email</label>
                    <Field name="email" as="input" type="email" class="border border-gray-300 mt-1 rounded-sm p-2" />
                    <ErrorMessage name="email" class="text-red-500 text-sm" />
                </div>

                <div class="flex flex-col">
                    <label for="zip" class="text-base">Zip Code</label>
                    <Field name="zip" as="input" class="border border-gray-300 mt-1 rounded-sm p-2" />
                    <ErrorMessage name="zip" class="text-red-500 text-sm" />
                </div>

                <BirthdateField />

                <div class="flex flex-col">
                    <label for="gender" class="text-base">Gender</label>
                    <div class="flex flex-row space-x-3">
                        <label :class="[
                            'border rounded-sm px-6 py-2 flex-auto cursor-pointer',
                            selectedGender === 'female' ? 'font-medium text-white bg-blue-500' : 'border-[#D8D6D6]'
                        ]">
                            <Field v-model="selectedGender" type="radio" name="gender" value="female" /> Female
                        </label>
                        <label :class="[
                            'border rounded-sm px-6 py-2 flex-auto cursor-pointer',
                            selectedGender === 'male' ? 'font-medium text-white bg-blue-500' : 'border-[#D8D6D6]'
                        ]">
                            <Field v-model="selectedGender" type="radio" name="gender" value="male" /> Male
                        </label>
                    </div>
                    <ErrorMessage name="gender" class="text-red-500 text-sm" />
                </div>

                <PaymentInfo :full-name="fullName" />
                <button type="submit"
                    class="bg-green-500 text-white text-lg py-2 px-4 rounded-sm hover:bg-green-700 disabled:opacity-50">
                    CONTINUE
                </button>
            </div>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { Form, Field, ErrorMessage, useForm } from 'vee-validate'
import BirthdateField from './BirthdateField.vue'
import PaymentInfo from './PaymentInfo.vue'

const selectedGender = ref('female')
const fullName = ref('');
const router = useRouter()

const schema = yup.object({
    fullName: yup
        .string()
        .required('Full Name is required')
        .test('is-full-name', 'Enter at least two words, each 2+ characters', (value) => {
            if (!value) return false
            const words = value.trim().split(/\s+/)
            return words.length >= 2 && words.every((word) => word.length >= 2)
        }),
    email: yup.string().email('Invalid email').required('Email is required'),
    zip: yup.string().matches(/^\d{5}$/, 'Zip must be 5 digits').required('Zip is required'),
    birthDate: yup.mixed().test('valid-date', 'You must be at least 18 years old', function (_, context) {
        const { birthYear, birthMonth, birthDay } = context.parent
        if (!birthYear ||!birthMonth ||!birthDay) return true
        const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`)
        const now = new Date()
        if (isNaN(birthDate.getTime())) return false
        const age = now.getFullYear() - birthDate.getFullYear()
        const monthDiff = now.getMonth() - birthDate.getMonth()
        const dayDiff = now.getDate() - birthDate.getDate()
        return age > 18 || (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    }),
    gender: yup.string().required('Gender is required'),
    holderName: yup.string().required('Card holder name is required'),
    cardNumber: yup
        .string()
        .required('Card number is required')
        .matches(/^\d{15,19}$/, 'Card number must be 16 to 19 digits'),
    expirationDate: yup
        .string()
        .required('Expiration date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Must be in MM/YY format')
        .test('not-expired', 'Card has expired', function (value) {
            if (!value) return false;
            const [mm, yy] = value.split('/');
            const expDate = new Date(2000 + parseInt(yy), parseInt(mm));
            const now = new Date();
            return expDate > now;
        }),
    cvv: yup.string().required('CVV is required').matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
})

interface InsuranceFormValues {
  fullName: string
  email: string
  zip: string
  birthDay: string
  birthMonth: string
  birthYear: string
  gender: 'male' | 'female'
  holderName: string
  cardNumber: string
  expirationDate: string
  cvv: string
}

const onSubmit = (values: InsuranceFormValues): void => {
  const { birthDay, birthMonth, birthYear, ...rest } = values
  const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`)

  console.log('Form submitted with:', { ...rest, birthDate })

  router.push({
    path: '/order-review'
  })
}
</script>