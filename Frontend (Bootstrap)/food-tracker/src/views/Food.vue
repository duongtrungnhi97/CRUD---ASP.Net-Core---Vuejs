<template>
    <div class="food">
        <div class="container">
            <div class="row mt-3">
              <div class="col-lg-6">
                  <h1 class="text-info float-left"> List food</h1>
              </div>
                <div class="col-lg-6">
                <b-button class="btn btn-info float-right" v-b-modal.modal-prevent-closing @click="openAddModel">
                    <i class="fas fa-user"></i>&nbsp;&nbsp;Add food
                </b-button>
              </div>
            </div>
            <hr class="bg-info">
            <div class="alert alert-danger" v-if="errorMsg">
            Error message
            </div>
            <div class="alert alert-success" v-if="successMsg">
                Success message
            </div>
            <div class="row">
                <div class="col-lg-12">
            <b-table striped hover :items="records" :fields="fields"> 
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" variant="warning" @click.prevent="updateFoodRecord(row)" >
                    Edit
                    </b-button> |
                    <b-button size="sm" variant="danger"  @click.prevent="deleteFoodRecord(row.item.id)">
                    Delete
                    </b-button>
                </template>
                </b-table>
                </div>
            </div>
        </div>
      <modal ref='addModal' @update="getAll()"  />
    </div>
</template>

 <script>
  import api from '@/services/FoodRecordsApiService';
  import modal from "@/components/Modal.vue";
  export default {
    data() {
      return {
        records: [],
        fields: [
          { key: 'id', label: 'ID', sortable: true, class: 'text-center' },
          { key: 'name', label: 'Name', sortable: true, class: 'text-center' },
          { key: 'value', label: 'Value', sortable: true, class: 'text-center' },
          { key: 'dateTime', label: 'DateTime', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        errorMsg: false,
        successMsg: false,
        model: {},
        nameState: null,
        valueState: null,
        dateTimeState: null
      }
    },
      components: {
    modal
  },
      async created() {
      this.getAll()
    },
        methods: {
            async getAll() {
                this.loading = true
                try {
                    this.records = await api.getAll();
                } finally {
                    this.loading = false
                }
            },
            updateFoodRecord(data){        
                this.$refs.addModal.setModel(data.item);       
                this.$refs.addModal.open();                       
            },
            async deleteFoodRecord(id){
                if (confirm('Are you sure you want to delete this record?')) {
                 // if we are editing a food record we deleted, remove it from the form
                    if (this.model.id === id) {
                    this.model = {}
                    }
                await api.delete(id)
                await this.getAll()
                }
            },
            async openAddModel(){
                this.$refs.addModal.resetModal();
                await this.getAll();
                this.$refs.addModal.open();
            }
        }
  }
</script> 
