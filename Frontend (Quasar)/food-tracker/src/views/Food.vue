<template>
   <div class="food">
    <div class="container">
      <div>
           <h3 class="text-info float-left">List food</h3>
           <q-btn 
            color="primary" 
            label="Add food"
            class="float-right"
             @click="openAddModel" 
            />   
      </div>
      <hr class="bg-info" />
      <div class="alert alert-danger" v-if="errorMsg">
        Error message
      </div>
      <div class="alert alert-success" v-if="successMsg">
        Success message
      </div>
      <div class="row">
      <div class="q-pa-md">
             <q-table
                :data="records"
                :columns="columns"
                row-key="id"
            >
            <template v-slot:header="props">       
                <q-tr :props="props">
                    <q-th
                        v-for="col in props.cols"
                        :key="col.name"
                        :props="props">
                        {{ col.label }}
                    </q-th>
                    <q-th>Actions</q-th>
                </q-tr>
            </template>
             <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td v-for="col in columns" :key="col.name" :props="props">
                        {{ col.format ? col.format(props.row[col.field]):props.row[col.field] }}
                    </q-td>
                    <q-td>
                        <q-btn round color="primary" icon="search" dense @click="updateFoodRecord(props.row)">
                            <q-tooltip>
                                Update
                            </q-tooltip>
                        </q-btn>
                        <q-btn round color="red" icon="fas fa-info" dense @click="deleteFoodRecord(props.row.id)">
                            <q-tooltip>
                                Delete
                            </q-tooltip>
                        </q-btn>
                    </q-td>
                </q-tr>
            </template>
            </q-table>
            
        </div>
      </div>
    </div>
    <Modal ref="addModal" @update="getAll()" />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import api from "../services/FoodRecordsApiService";
import Modal from "../components/Modal.vue";
@Component({
  components: {
    Modal
  }
})
export default class Food extends Vue {
  @Ref("addModal") addModal!: Modal;
  records = [];
  fields = [
    { key: "id", label: "ID", sortable: true, class: "text-center" },
    { key: "name", label: "Name", sortable: true, class: "text-center" },
    { key: "value", label: "Value", sortable: true, class: "text-center" },
    {
      key: "dateTime",
      label: "DateTime",
      sortable: true,
      class: "text-center"
    }
  ];

  columns = [
  { name: 'id', label: 'ID', field: 'id', sortable: true },
  { name: 'name', label: 'Name', field: 'name', sortable: true },
  { name: 'value', label: 'Value', field: 'value', sortable: true},
  { name: 'dateTime', label: 'DateTime', field: 'dateTime', sortable: true},
];
  errorMsg = false;
  successMsg = false;
  model = {};
  loading = false;
  async mounted() {
    await this.getAll();
  }
  async getAll() {
    this.loading = true;
    try {
      this.records = await api.getAll();
    } finally {
      this.loading = false;
    }
  }
  updateFoodRecord(data: any) {
    this.addModal.setModel(data);
    this.addModal.open();
  }
  async deleteFoodRecord(id: any) {
    if (confirm("Are you sure you want to delete this record?")) {
      // if we are editing a food record we deleted, remove it from the form
      await api.delete(id);
      await this.getAll();
   }
  }
  openAddModel() {
        this.addModal.resetModal();
        this.getAll();
        this.addModal.open();
  }
}
</script>
