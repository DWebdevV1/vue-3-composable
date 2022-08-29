import {computed} from "vue";

export const useUserQueryList = (list, query, field) => {
    const userListByFilter = computed(() =>
        list.value.filter(user => user[field].toLowerCase().includes(query.value.toLowerCase())));
    return {
        userListByFilter
    }
}