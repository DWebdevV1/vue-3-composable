import { ref, readonly, onMounted, computed, watch } from 'vue';

const USER_API = 'https://jsonplaceholder.typicode.com/users';

export function useUserList() {
    const userList = ref([]);
    const userLoading = ref(false);
    const userError = ref(null);

    const loadUsers = async () => {
        try {
            userLoading.value = true;
            userList.value = await (await fetch(USER_API)).json();
        } catch (e) {
            userError.value = e;
        } finally {
            userLoading.value = false;
        }
    }

    onMounted(loadUsers);

    const userListCount = computed(() => userList.value.length); 

    return {
        userList: readonly(userList),
        userLoading,
        userError,
        userListCount
    }
}