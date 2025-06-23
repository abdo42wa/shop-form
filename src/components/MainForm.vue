<template>
    <div
        class="bg-white rounded-md border border-[#F2F2F2] flex flex-col justify-center max-w-[449px] mx-auto mt-9 px-10 py-23">
        <h1 class="font-bold text-xl text-center font-[Helvetica-Neue] mb-6">
            Get your Car Insurance for $9.99
        </h1>

        <Form :validation-schema="schema" @submit="onSubmit">
            <div class="flex flex-col space-y-5">
                <div class="flex flex-col">
                    <label for="fullName" class="font-bold text-base font-[Helvetica]">Full Name</label>
                    <Field id="fullName" name="fullName" as="input"
                        class="border border-gray-300 mt-1 rounded-md p-2" />
                    <ErrorMessage name="fullName" class="text-red-500 text-sm" />
                </div>

                <div class="flex flex-col">
                    <label for="email" class="font-bold text-base font-[Helvetica]">Email</label>
                    <Field id="email" name="email" as="input" type="email"
                        class="border border-gray-300 mt-1 rounded-md p-2" />
                    <ErrorMessage name="email" class="text-red-500 text-sm" />
                </div>

                <div class="flex flex-col">
                    <label for="zip" class="font-bold text-base font-[Helvetica]">Zip Code</label>
                    <Field id="zip" name="zip" as="input" class="border border-gray-300 mt-1 rounded-md p-2" />
                    <ErrorMessage name="zip" class="text-red-500 text-sm" />
                </div>

                <BirthdateField />

                <div class="flex flex-col">
                    <label for="gender" class="font-bold text-base font-[Helvetica]">Gender</label>
                    <div class="flex flex-row space-x-3">
                        <label :class="[
                            'border rounded-b-sm px-6 py-2 flex-auto cursor-pointer',
                            selectedGender === 'female' ? 'font-medium text-white bg-blue-500' : 'border-[#D8D6D6]'
                        ]">
                            <Field type="radio" name="gender" value="female" class="mr-2" v-model="selectedGender" />
                            Female
                        </label>
                        <label :class="[
                            'border rounded-b-sm px-6 py-2 flex-auto cursor-pointer',
                            selectedGender === 'male' ? 'font-medium text-white bg-blue-500' : 'border-[#D8D6D6]'
                        ]">
                            <Field type="radio" name="gender" value="male" class="mr-2" v-model="selectedGender" />
                            Male
                        </label>
                    </div>
                    <ErrorMessage name="gender" class="text-red-500 text-sm" />
                </div>

                <div className="flex flex-col bg-[#FAFAFA] py-4 px-6 border border-[#E2E2E2] rounded-md space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="holderName" className="font-bold text-base font-[Helvetica]">
                            Card Holder Name
                        </label>
                        <Field id="holderName" name="holderName" as="input"
                            className="border border-gray-300 mt-1 rounded-md p-2"/>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="cardNumber" className="font-bold text-base font-[Helvetica]">
                            Card Number
                        </label>
                        <Field id="cardNumber" name="cardNumber" as="input"
                            className="border border-gray-300 mt-1 rounded-md p-2"
                            inputMode="numeric" />
                    </div>

                    <div className="flex flex-row justify-between ">
                        <div className="flex flex-col flex-1 max-w-[150px] min-w-0">
                            <label htmlFor="expirationDate" className="font-bold text-base font-[Helvetica]">
                                Expiration Date
                            </label>
                            <Field id="expirationDate" name="expirationDate" as="input"
                                className="border border-gray-300 mt-1 rounded-md p-2" placeholder="MM/YY" />
                        </div>

                        <div className="flex flex-col flex-1 max-w-[150px] min-w-0">
                            <label htmlFor="cvv" className="font-bold text-base font-[Helvetica]">
                                CVV
                            </label>
                            <Field id="cvv" name="cvv" as="input" className="border border-gray-300 mt-1 rounded-md p-2"
                                inputMode="numeric" />
                        </div>
                    </div>
                </div>


                <button type="submit" :disabled="isSubmitting"
                    class="bg-blue-500 text-white py-2 px-4 rounded-md font-bold hover:bg-blue-600 disabled:opacity-50">
                    CONTINUE
                </button>
            </div>
        </Form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import BirthdateField from "./BirthdateField.vue";
import { useForm } from "vee-validate";

const { isSubmitting } = useForm();
const selectedGender = ref("");

const schema = yup.object({
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    zip: yup.string().matches(/^\d{5}$/, "Zip code must be exactly 5 digits").required("Zip Code is required"),
    gender: yup.string().required("Gender is required"),
    birthDate: yup.mixed().test("valid-date", "Invalid birth date", function (_, context) {
        const { birthYear, birthMonth, birthDay } = context.parent;
        const date = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
        return !isNaN(date.getTime());
    }),
});

function onSubmit(values: any) {
    const { birthDay, birthMonth, birthYear, ...rest } = values;
    const birthDate = new Date(`${birthYear}-${birthMonth}-${birthDay}`);
    if (isNaN(birthDate.getTime())) {
        console.error("Invalid birth date");
        return;
    }
    console.log("Form submitted with:", { ...rest, birthDate });
}
</script>
