<template>
 <q-dialog persistent ref="modal" v-model="isShowing">
         <q-layout view="lhh LpR lff" container style="height: 400px" class="bg-grey-3">       
          <q-toolbar class="bg-primary text-white q-mb-sm">
            <q-toolbar-title>
                <slot name="titelWindow"></slot>
            </q-toolbar-title>
            <q-btn v-close-popup flat round dense icon="close" />
           </q-toolbar>
            <q-form @submit="handleSubmit" class="q-pa-md">
                <q-input v-model="name" label="Name" />
                <q-input v-model="value" label="Value" type="number"/>
                <q-input v-model="datetime" type="date"/>
                 <!-- <div class="q-pa-md" style="max-width: 300px">
                    <q-input filled v-model="date" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                    <q-date v-model="datetime" @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div> -->
                    <!-- <input type="file" name="image_uploader" id="image_uploader" ref='uploader' v-show="false"
                    <input type="file" name="image_uploader" id="image_uploader" ref='uploader' v-show="false"
                    <input type="file" name="image_uploader" id="image_uploader" ref='uploader' v-show="false" -->
                <div>
                    <q-btn label="Close" @click="close" color="primary" flat class="q-ml-sm" />
                    <q-btn label="Submit" type="submit" color="primary"/>
                </div>
            </q-form>
    </q-layout>
  </q-dialog>
</template>
<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import api from "../services/FoodRecordsApiService";
import Vue from "vue";

@Component
export default class Modal extends Vue {
  @Ref("form") form!: HTMLFormElement;

  id: any;
  name: string = '';
  value: any = 0;
  datetime: any = new Date();
  isShowing: boolean = false;
  nameState: any;
  valueState: any;
  dateTimeState: any;
  open() {
    this.isShowing = true;
  }
  close() {
    this.isShowing = false;
  }
  setModel(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.value = data.value;
    this.datetime = data.dateTime;
  }
  checkFormValidity() {
    const valid = this.form.validate();
    //    const valid = (this.$refs.form as Vue & { validate: () => boolean }).validate();
    this.nameState = valid ? "valid" : "invalid";
    this.valueState = valid ? "valid" : "invalid";
    this.dateTimeState = valid ? "valid" : "invalid";
    return valid;
  }
  resetModal() {
    this.id = null;
    this.name = '';
    this.nameState = null;
    this.value = null;
    this.valueState = null;
    this.datetime = null;
    this.dateTimeState = null;
  }
  async handleSubmit() {
    // Exit when the form isn't valid
    //   if (!this.checkFormValidity()) {
    //     return;
    //   }
    this.value = +this.value;
    if (this.id) {
      const data = {
        id: this.id,
        name: this.name,
        value: this.value,
        datetime: this.datetime
      };
      await api.update(this.id, data);
    } 
    else {
      const data = {
        name: this.name,
        value: this.value,
        datetime: this.datetime
      };
      await api.create(data);
    }
    this.id = null;
    this.resetModal();
    await this.$emit("update");
    // Hide the modal manually
    this.close();
  }
}
</script>
<style>

</style>
