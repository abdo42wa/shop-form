import Cleave from 'cleave.js';

export default {
    mounted(el: HTMLElement, binding: any) {
        (el as any).cleave = new Cleave(el, binding.value);
    },
    unmounted(el: any) {
        if (el.cleave) {
            el.cleave.destroy();
        }
    },
};
