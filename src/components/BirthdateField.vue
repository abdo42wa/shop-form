<template>
    <div class="flex flex-col text-base text-[#71717A]">
        <label for="birthDate" class="text-black">Birth Date</label>
        <div class="flex space-x-2.5">
            <Field name="birthMonth" as="select" class="p-2 border border-gray-300 rounded grow-7 font-medium ">
                <option value="">Month</option>
                <option v-for="m in 12" :key="m" :value="String(m).padStart(2, '0')">{{ m }}</option>
            </Field>

            <Field name="birthDay" as="select" class="p-2 border border-gray-300 rounded grow-3 font-medium">
                <option value="">Day</option>
                <option v-for="d in 31" :key="d" :value="String(d).padStart(2, '0')">{{ d }}</option>
            </Field>

            <Field name="birthYear" as="select" class="p-2 border border-gray-300 rounded grow-3 font-medium">
                <option value="">Year</option>
                <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
            </Field>
        </div>

        <ErrorMessage name="birthDate" class="text-red-500 text-sm" />
    </div>
</template>

<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate'

const currentYear = new Date().getFullYear()
const yearOptions = Array.from({ length: 100 }, (_, i) => currentYear - i)
</script>