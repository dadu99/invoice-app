<script setup>
import {  defineEmits, ref, watch, computed} from "vue";
import {onClickOutside} from '@vueuse/core'
import { useUtils } from "../useComposables/useUtils";
import Swal from 'sweetalert2/dist/sweetalert2';

const { showAlert } = useUtils();
const props = defineProps({
  isOpen: Boolean,
  actionType: String,
  initialData: {
    type: Object,
    default: () => ({name: "", quantity: null, cost: null }),
  },
});
const product = ref({ ...props.initialData });
const emit = defineEmits(["modal-close", "product"]);
const isFormValid = () => {
  return (product.value.name != undefined && product.value.quantity != null && product.value.cost != null);
} 

watch(() => props.initialData,(newData) => {
    product.value = { ...newData }; 
  },
  { immediate: true } 
);
function submitData() {
    if(isFormValid()) {
      emit("product", product.value);
      emit("modal-close");
    } else {
      showAlert();
    }
}

const target = ref(null)

onClickOutside(target, () => {
  if(!Swal.isVisible()) {
      emit('modal-close')
  }
})

const updateProductTotal = computed(() => {
  if(product.value.quantity != null && product.value.cost) {
    return (product.value.quantity * product.value.cost).toFixed(2);
  } 
  return null;

})
</script>

<template>
  <div v-if="isOpen" class="bg-black/50 fixed z-50 top-0 left-0 h-screen w-screen place-items-center">
    <div class="modal-wrapper">
      <div class="modal-container bg-white shadow-lg w-[350px] rounded-lg py-3 px-3 mx-auto mt-[50px] md:w-[700px] md:py-30 px-30" ref="target">
        <button type="button" @click.stop="emit('modal-close')" class="close m-4 z-50 text-2xl" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
        </button>
        <h4 v-if="actionType == 'add'" class="modal-header text-xl font-normal text-primary">
         Adauga produs
        </h4> 
          <h4 v-else class="modal-header text-xl font-normal text-primary">
         Editeaza produs
        </h4> 
        <div class="modal-body">
                    <form id="productForm">
                        <div class="form-group">
                            <label class="custom-label" for="productName">Nume produs</label>
                            <input
                                v-model="product.name"
                                type="text"
                                class="form-control text-base"
                                placeholder="Introdu numele produsului">
                        </div>
                        <div class="form-group">
                            <label class="custom-label" for="productQuantity">Cantitate</label>
                            <input
                                v-model="product.quantity"
                                type="number"
                                class="form-control text-base"
                                placeholder="Introdu cantitatea">
                        </div>
                        <div class="form-group">
                            <label class="custom-label" for="productCost">Pret unitar</label>
                            <input
                                v-model="product.cost"
                                type="number"
                                class="form-control text-base"
                                placeholder="Introdu pretul unitar">
                        </div>
                        <div class="form-group">
                            <label class="custom-label" for="productTotal">Valoare totala</label>
                            <input
                              :value="updateProductTotal"
                              class="form-control text-base"
                              placeholder="Valoarea totala"
                              readonly
                              type="number">
                        </div>
                    </form>
                </div>
        
        <div class="modal-footer">
          <slot name="footer">
            <div class="flex justify-center gap-4">
              <button @click.stop="emit('modal-close')" type="button" class="custom-secondary-button" data-dismiss="modal">Inchide</button>
              <button @click="submitData" type="button" class="custom-button" id="saveProduct">Submit</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>