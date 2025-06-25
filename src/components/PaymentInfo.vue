<template>
    <div class="flex flex-col bg-[#FAFAFA] py-4 px-6 border border-[#E2E2E2] rounded-md space-y-4">

        <div className="flex flex-col">
            <label class="font-bold text-base font-[Helvetica]">Card Holder Name</label>
            <Field name="holderName" as="input" class="border border-gray-300 mt-1 rounded-md p-2" />
            <ErrorMessage name="holderName" class="text-red-500 text-sm" />
        </div>

        <MaskedField name="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456"
            :cleaveOptions="{ creditCard: true, delimiter: ' ' }" :useRawValue="true" />

        <div className="flex flex-row justify-between ">
            <div className="flex flex-col flex-1 max-w-[150px] min-w-0">
                <MaskedField name="expirationDate" label="Expiration Date" placeholder="MM/YY"
                    :cleaveOptions="{ date: true, datePattern: ['m', 'y'] }" />
            </div>
            <div class="flex flex-col flex-1 max-w-[150px] min-w-0">
                <label htmlFor="cvv" class="font-bold text-base font-[Helvetica]">
                    CVV
                </label>
                <Field id="cvv" name="cvv" as="input" class="border border-gray-300 mt-1 rounded-md p-2"
                    inputMode="numeric" />
                <ErrorMessage name="cvv" class="text-red-500 text-sm" />
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { Field, ErrorMessage } from 'vee-validate'
import MaskedField from './MaskedField.vue'

</script>