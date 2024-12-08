<script setup>

import {ref} from 'vue'
import Products from './Products.vue';
const invoiceData = ref({});
import { useUtils } from '../useComposables/useUtils';
const{calculateProductTotalValue, formatNumber, calculateInvoiceTotalValue, showAlert} = useUtils();

const isInvoiceValid = () => {
    return (invoiceData.value.clientRegNumber != undefined && (invoiceData.value.documentDate != undefined && invoiceData.value.documentDate != '') && invoiceData.value.documentNumber != undefined && (invoiceData.value.productList != undefined && invoiceData.value.productList.length > 0));
}
const formatProducts = () => {
    return invoiceData.value.productList.map(productRow).join("\n");
}
const productRow = (product, index) => {
    return `${index + 1}. ${product.name} - cantitate: ${product.quantity}, cost: ${formatNumber(product.cost)}, Total: ${calculateProductTotalValue(product.quantity, product.cost)}`;
}
const formatInvoice = () => {
    return `Factura nr.${invoiceData.value.documentNumber} din ${invoiceData.value.documentDate}
        \nCIF client: ${invoiceData.value.clientRegNumber}
        \n\nProduse:
        \n${formatProducts()}
        \n\nValoare totala: ${calculateInvoiceTotalValue(invoiceData.value.productList)}`;
}
 function onSubmit ()  {
   if(isInvoiceValid()) {
    downloadInvoice();
   } else {
    showAlert();
   }
};

function downloadInvoice() {
    const fileName = 'factura.txt';
    const blob = new Blob([formatInvoice()], { type: "text/plain"});

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
}

</script>


<template>
    <div class="invoice">
        <form class="pt-8 pb-20 px-5">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="custom-label" for="clientRegNumber">CIF client</label>
                                <input
                                    v-model="invoiceData.clientRegNumber"
                                    type="text"
                                    class="form-control text-base"
                                    placeholder="Introdu CIF-ul clientului">
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="custom-label" for="documentDate">Data emiterii</label>
                                <input
                                    v-model="invoiceData.documentDate"
                                    type="date"
                                    class="form-control text-base"
                                >
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="form-group">
                                <label class="custom-label" for="documentNumber">
                                    Serie si numar
                                </label>
                                <input
                                    v-model="invoiceData.documentNumber"
                                    type="text"
                                    class="form-control text-base"
                                    placeholder="SB123">
                            </div>
                        </div>
                    </div>
                </form>

                <Products @send-data="invoiceData.productList = $event">
                </Products>

                <div class="text-right py-5">
                    <button class="custom-button" type="submit" @click="onSubmit()">
                    Salveaza factura
                    </button> 
                </div>
    </div>
                
</template>

<style scoped>

</style>