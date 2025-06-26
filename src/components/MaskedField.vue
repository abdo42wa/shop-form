<template>
    <Field v-slot="{ errorMessage, meta, setValue, handleBlur, value }" :name="name">
        <div class="flex flex-col">
            <label :for="name" class="text-base">{{ label }}</label>

            <input :id="name" ref="inputEl" :value="isEditing ? displayValue : value"
            :placeholder="placeholder"
            class="border border-gray-300 mt-1 rounded-sm p-2 placeholder:font-medium"
            @input="onInput($event, setValue)"
            @blur="handleBlur"
            />

            <p v-if="meta.touched && errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
        </div>
    </Field>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Field } from 'vee-validate';
import Cleave from 'cleave.js';

const props = defineProps<{
    name: string;
    label: string;
    placeholder?: string;
    cleaveOptions?: any;
    useRawValue?: boolean;
}>();

const inputEl = ref<HTMLInputElement | null>(null);
const cleaveInstance = ref<any>(null);
const displayValue = ref('');
const useRawValue = props.useRawValue ?? false;
const isEditing = ref(false);

watch(
    () => props.value,
    (newVal) => {
        if (!isEditing.value) {
            displayValue.value = newVal;
        }
    },
    { immediate: true }
);

onMounted(() => {
    if (inputEl.value) {
        cleaveInstance.value = new Cleave(inputEl.value, {
            ...props.cleaveOptions,
            onValueChanged: (e: any) => {
                displayValue.value = e.target.value;
            },
        });
    }
});

const onInput = (event: Event, setValue: (val: string) => void) => {
    const target = event.target as HTMLInputElement;
    displayValue.value = target.value;

    const valueToSet = useRawValue && cleaveInstance.value
        ? cleaveInstance.value.getRawValue()
        : target.value;

    setValue(valueToSet); 
    isEditing.value = true; 
}

const handleBlur = () => {
    isEditing.value = false;
}
</script>