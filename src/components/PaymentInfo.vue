<template>
    <div class="flex flex-col bg-[#FAFAFA] py-4 px-6 border border-[#E2E2E2] rounded-sm space-y-4">
        <MaskedField name="holderName" label="Card Holder Name" v-model="holderName" />

        <MaskedField name="cardNumber" label="Card Number" :cleave-options="{ creditCard: true, delimiter: ' ' }"
            :use-raw-value="true" />

        <div class="flex flex-row justify-between">
            <div class="flex flex-col flex-1 max-w-[150px] min-w-0">
                <MaskedField name="expirationDate" label="Expiration Date" placeholder="MM/YY"
                    :cleave-options="{ date: true, datePattern: ['m', 'y'] }" />
            </div>
            <div class="flex flex-col flex-1 max-w-[150px] min-w-0">
                <MaskedField name="cvv" label="CVV" :cleave-options="{ blocks: [3] }" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps } from 'vue';
import MaskedField from './MaskedField.vue';

const props = defineProps({
    fullName: String
});

const holderName = ref(props.fullName);

watch(() => props.fullName, (newFullName) => {
    holderName.value = newFullName;
});
</script>