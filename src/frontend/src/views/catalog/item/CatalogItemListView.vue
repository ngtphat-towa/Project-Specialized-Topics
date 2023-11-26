<template>
  <div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Employee Table</h1>
      <button class="btn btn-primary" @click="showAddForm = !showAddForm">Add Employee</button>
    </div>
    <div class="mb-3 d-flex justify-content-between">
      <input v-model="searchTerm" class="form-control" placeholder="Search..." />
      <select v-model="searchField" class="form-control">
        <option value="">Select field to search...</option>
        <option value="name">Name</option>
        <option value="department">Department</option>
        <option value="age">Age</option>
        <option value="dateOfBirth">Date Of Birth</option>
      </select>
      <select v-model="sortField" class="form-control">
        <option value="">Select field to sort...</option>
        <option value="name">Name</option>
        <option value="department">Department</option>
        <option value="age">Age</option>
        <option value="dateOfBirth">Date Of Birth</option>
      </select>
      <select v-model="sortMode" class="form-control">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <div v-if="showAddForm" class="mb-3 border p-3 rounded">
      <h2>Add Employee</h2>
      <form @submit.prevent="addEmployee">
        <div class="form-group row">
          <label class="col-sm-2 col-form-label font-weight-bold">Name</label>
          <div class="col-sm-10">
            <input class="form-control" v-model="newEmployee.name" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label font-weight-bold">Department</label>
          <div class="col-sm-10">
            <input class="form-control" v-model="newEmployee.department" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label font-weight-bold">Age</label>
          <div class="col-sm-10">
            <input class="form-control" v-model="newEmployee.age" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label font-weight-bold">Date Of Birth</label>
          <div class="col-sm-10">
            <input class="form-control" v-model="newEmployee.dateOfBirth" />
          </div>
        </div>
        <button class="btn btn-success" type="submit">Save</button>
        <button class="btn btn-danger" @click="showAddForm = false">Cancel</button>
      </form>
    </div>
    <table class="table table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Department</th>
          <th scope="col">Age</th>
          <th scope="col">Date Of Birth</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in paginatedItems" :key="item.name">
          <tr>
            <td>{{ item.name }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.dateOfBirth }}</td>
            <td>
              <button class="btn btn-success" @click="editItem(index)">Edit</button>
              <button class="btn btn-danger" @click="deleteItem(index)">Delete</button>
              <button class="btn btn-primary" @click="showDetails(item)">Details</button>
              <button class="btn btn-danger" @click="confirmDelete(index)">Delete 2</button>
            </td>
          </tr>
          <tr v-if="editingIndex === index">
            <td colspan="5">
              <h2>Edit Employee</h2>
              <form @submit.prevent="updateItem" class="p-3 border rounded">
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label font-weight-bold">Name</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="items[editingIndex].name" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label font-weight-bold">Department</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="items[editingIndex].department" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label font-weight-bold">Age</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="items[editingIndex].age" />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-2 col-form-label font-weight-bold">Date Of Birth</label>
                  <div class="col-sm-10">
                    <input class="form-control" v-model="items[editingIndex].dateOfBirth" />
                  </div>
                </div>
                <button class="btn btn-success" type="submit">Save</button>
                <button class="btn btn-danger" @click="cancelEdit">Cancel</button>
              </form>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { tmpData } from './temp';
export default {
  setup() {
    const items = ref(tmpData);
    const searchTerm = ref('');
    const searchField = ref('');
    const sortField = ref('');
    const sortMode = ref('asc');
    const editingIndex = ref(null);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const newEmployee = ref({ name: '', department: '', age: '', dateOfBirth: '' });
    const showAddForm = ref(false);
    // The rest of your setup code goes here...

    const addEmployee = () => {
      items.value.push({ ...newEmployee.value });
      newEmployee.value = { name: '', department: '', age: '', dateOfBirth: '' };
      showAddForm.value = false;
    };

    const filteredAndSortedItems = computed(() => {
      let result = items.value;
      if (searchTerm.value && searchField.value) {
        result = result.filter((item) =>
          item[searchField.value].toString().includes(searchTerm.value)
        );
      }
      if (sortField.value) {
        result = result.sort((a, b) => {
          if (a[sortField.value] < b[sortField.value]) return sortMode.value === 'asc' ? -1 : 1;
          if (a[sortField.value] > b[sortField.value]) return sortMode.value === 'asc' ? 1 : -1;
          return 0;
        });
      }
      return result;
    });

    const totalPages = computed(() =>
      Math.ceil(filteredAndSortedItems.value.length / itemsPerPage.value)
    );

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredAndSortedItems.value.slice(start, end);
    });

    const showDetails = (item) => {
      alert(JSON.stringify(item, null, 2));
    };

    const deleteItem = (index) => {
      this.items = this.items.splice(index, 1);
    };

    const  confirmDelete= (index)=> {
      if (window.confirm('Are you sure you want to delete this employee?')) {
        this.deleteItem(index);
      }
    };

    const editItem = (index) => {
      editingIndex.value = editingIndex.value === index ? null : index;
    };

    const updateItem = () => {
      editingIndex.value = null;
    };

    const cancelEdit = () => {
      editingIndex.value = null;
    };

    return {
      newEmployee,
      showAddForm,
      items,
      searchTerm,
      searchField,
      sortField,
      sortMode,
      editingIndex,
      currentPage,
      itemsPerPage,
      filteredAndSortedItems,
      totalPages,
      paginatedItems,
      showDetails,
      addEmployee,
      confirmDelete,
      deleteItem,
      editItem,
      updateItem,
      cancelEdit
    };
  }
};
</script>

<style scoped>
.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}
.font-weight-bold {
  font-weight: bold;
}
</style>
