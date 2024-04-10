import { writable } from 'svelte/store';

export const handleSubmitStore = writable(null);
export const fileStore = writable(null);
export const imageOutputUrlStore = writable(null);
export const imageIsChangingStore = writable(null);