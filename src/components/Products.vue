<script setup>
import {ref} from 'vue'
import ProductModal from './ProductModal.vue';
import { useUtils } from '../useComposables/useUtils';

const productList = ref([]);
const isModalOpen = ref(false);
const totalValue = ref('0.00');
const formData = ref({name: "", quantity: null, cost: null});
const actionType = ref();
const emit = defineEmits(["send-data"]);
const{calculateProductTotalValue, calculateInvoiceTotalValue} = useUtils();

const openModal = (type, item = null, index = null) => {
  if (type === 'add') {
    actionType.value = type;
    formData.value = {name: "", quantity: null, cost: null };
  } else if (type === 'edit') {
    actionType.value = type;
    item.index = index;
    formData.value = { ...item };
  }
  isModalOpen.value = true;
};
const closeModal = () => {
    isModalOpen.value = false;
}
const handleProduct = (product) => {
    //console.log('received data from emit =>', product);
    if(actionType.value == 'add') {
        productList.value.push(product);
        calculateInvoiceTotal();
    } else {
        productList.value[product.index] = product;
        calculateInvoiceTotal();
    } 
    emit('send-data', productList.value);
}
function calculateInvoiceTotal() {
    totalValue.value = calculateInvoiceTotalValue(productList.value);
}
function deleteProduct(index) {
    productList.value.splice(index, 1);
    calculateInvoiceTotal();
}
</script>

<template>
 <div class="product">
        <div class="p-5 leading-none border-b-[1px] border-gray tracking-tight text-primary text-xl">
             Produse
        </div>

        <div class="product-table">
            <div class="py-5 text-right">
                <button id="startAddNewProduct" @click="openModal('add')" class="custom-button">
                        Adauga produs
                </button>
            </div>
                <table class="m-3 w-full text-sm text-left text-white dark:text-primary md:m-[12px] md:text-base">
                    <thead class="text-base  text-white  dark:bg-primary dark:text-white">
                        <tr>
                            <th class="px-4">Produs</th>
                            <th class="text-right py-4 px-4">Cantitate</th>
                            <th class="text-right px-4">Pret unitar</th>
                            <th class="text-right px-4">Valoare</th>
                            <th class="text-center px-4">Actiuni</th>
                        </tr>
                    </thead>

                    <tbody id="productsTableBody">
                        <tr v-if="productList.length === 0">
                            <td colspan="5" class="text-center py-5 text-lg font-normal">
                                Adauga produse
                            </td>
                        </tr>
                        <tr v-for="productItem, index in productList" :key="index">
                            <td class="text-left py-4 px-4 text-base">{{ productItem.name }}</td>
                            <td class="text-right text-base">{{ productItem.quantity }}</td>
                            <td class="text-right text-base">{{ productItem.cost }}</td>
                            <td class="text-right text-base">{{ calculateProductTotalValue(productItem.quantity, productItem.cost)}}</td>
                            <td class="text-center">
                                <button class="btn btn-md btn-transparent text-primary mr-xsmall" 
                                        @click="openModal('edit', productItem, index)">
                                        <span class="glyphicon glyphicon-pencil"></span>
                                </button>
                                <button class="btn btn-md btn-transparent text-danger" 
                                        @click="deleteProduct(index)">
                                        <span class="glyphicon glyphicon-trash"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>

                    <tfoot class="border-t-[1px] border-gray">
                        <tr>
                            <th colspan="3" class="text-right py-5 font-bold text-base">Total</th>
                            <th class="text-right font-bold text-base">{{ totalValue }}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div> 
        
</div>

<ProductModal :isOpen="isModalOpen" 
            :initialData="formData"
            :actionType = "actionType"
            @modal-close="closeModal"
            @product="handleProduct">
</ProductModal>

</template>

<style scoped>

</style>