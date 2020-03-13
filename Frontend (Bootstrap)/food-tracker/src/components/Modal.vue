<template>
   <b-modal
            v-model="visible"
            ref="modal"
            title="Add new food" 
            @ok="handleOk"
            >
                <form ref="form">
                    <b-form-group
                    :state="nameState"
                label="Name"
                label-for="name-input"
                label-align-sm="right"
                invalid-feedback="Name is required"
                >
                <b-form-input
                    id="name-input"
                    v-model="model.name"
                    type="text"
                    :state="nameState"
                    required
                ></b-form-input>
                </b-form-group>
                        <b-form-group
                :state="valueState"
                label="Value"
                label-for="value-input"
                invalid-feedback="Value is required"
                >
                <b-form-input
                    id="value-input"
                    v-model="model.value"
                    type="number"
                    :state="valueState"
                    required
                ></b-form-input>
                </b-form-group>
                        <b-form-group
                :state="dateTimeState"
                label="Datetime"
                label-for="Datetime-input"
                invalid-feedback="Datetime is required"
                >
                <b-form-input
                    id="datetime-input"
                    v-model="model.dateTime"
                    type="datetime-local"
                    :state="dateTimeState"
                    required
                ></b-form-input>
                </b-form-group>
            </form>
    </b-modal>
</template>

<script>
import api from '@/services/FoodRecordsApiService';
export default {
 data() {
      return {
        model: {},
        visible: false,
        nameState: null,
        valueState: null,
        dateTimeState: null
      }
    },
    methods:{
        open(){
            this.visible=true;
        },
        close(){
            this.visible =false;
        },
        setModel(data){
            this.model = data;
        },   
        checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid ? 'valid' : 'invalid'
                this.valueState = valid ? 'valid' : 'invalid'
                this.dateTimeState = valid ? 'valid' : 'invalid'
                return valid
        },
        resetModal() {
                this.model.name = '';
                this.nameState = null;
                this.model.value = '';
                this.valueState = null;
                this.model.datetime = null;
                this.dateTimeState = null;
        },
        handleOk(bvModalEvt) {
                // Prevent modal from closing
                bvModalEvt.preventDefault()
                // Trigger submit handler
                this.handleSubmit()
        },
        async handleSubmit() {
                // Exit when the form isn't valid
                // alert("trigger");
                if (!this.checkFormValidity()) {
                return
                }
                this.model.value = +this.model.value;
                if(this.model.id){
                     await api.update(this.model.id, this.model);
                }
                else{
                     alert("trigger create");
                    await api.create(this.model);
                }
             
                this.model = {};
                await this.$emit('update');
                // Hide the modal manually
                this.$nextTick(() => {
                    this.$refs.modal.hide()
                })
        },
    }
}
</script>
<style>
</style>