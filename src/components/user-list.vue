<script setup>
import {ref} from 'vue';
    import { useUserList } from '../composables/userList.js';
    import {useUserQueryList} from "../composables/userQueryList.js";

    const username = ref('');
    const { userList, userLoading, userError, userListCount } = useUserList();
    const { userListByFilter } = useUserQueryList(userList, username, 'username');
</script>

<template>
  <div class="user-header">
      <h1>User List ({{ userListCount }}) with Vue 3 Composables</h1>
      <div v-if="userLoading">
        <p>Content loading...</p>
      </div>
      <form v-else>
          <input name="username" v-model="username" placeholder="Enter Username to search" />
      </form>
    <div v-if="userError">
      <p>Error while loading users...</p>
    </div>
  </div>

  <div v-if="userListByFilter.length" class="user-result">
    <h2>User Filter Result</h2>
    <ul>
      <li v-for="user of userListByFilter" :key="user?.id">
        <span>Name: {{ user?.name }}</span>
        <span>Username: {{ user?.username }}</span>
        <span>E-Mail: {{ user?.email }}</span>
      </li>
    </ul>
  </div>

  <div class="user-list">
    <h2>User List</h2>
    <ul>
      <li v-for="user of userList" :key="user?.id">
        <span>Name: {{ user?.name }}</span>
        <span>Username: {{ user?.username }}</span>
        <span>E-Mail: {{ user?.email }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .user-list, .user-result {
    margin: 1rem 0;
  }

  div {
    & > h2 {
      padding: 1rem 0;
      color: red;
      font-style: italic;
    }
  }

  .user-header {
    margin: 1rem 0;
    padding: 2rem;
    background: rgba(0, 0, 0, .66);
    display: flex;
    align-items: center;
    justify-content: space-between;

    & input {
      width: 15rem;
      padding: .5rem;
      font-size: 1rem;
    }
  }

  ul {
    list-style: none;
    border: 2px solid whitesmoke;
    background: rgba(0, 0, 0, .66);

    & li {
      display: flex;
      justify-content: space-between;
      gap: 2rem;
      padding: 1rem;

      &:nth-child(even) {
        background-color: rgba(0, 0, 0, 0.33);
      }

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
      }

      &:hover {
        cursor: pointer;
        font-weight: bold;
      }

      & span {
        flex: 1;
      }
    }
  }
</style>