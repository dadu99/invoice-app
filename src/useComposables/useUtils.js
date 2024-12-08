import Swal from 'sweetalert2/dist/sweetalert2';


export function useUtils() {
    const calculateProductTotalValue = ((quantity, cost) => {
        return (quantity * cost).toFixed(2);
    })
    const formatNumber = (number) => {
        return number.toFixed(2);
    }
    const calculateInvoiceTotalValue = (productList) => {
        const total = (productList.reduce((sum, product) => sum + parseFloat(calculateProductTotalValue(product.quantity, product.cost)), 0));   
        return total.toFixed(2);
    }
    function showAlert() {
        Swal.fire({
          title: 'Completeaza toate campurile!',
          icon: 'error',
          confirmButtonText: 'Inchide',
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: false
    });
  }
  

    return {
        calculateProductTotalValue,
        formatNumber,
        calculateInvoiceTotalValue,
        showAlert
    }
}