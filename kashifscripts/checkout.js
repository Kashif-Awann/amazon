import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { incrementQuantity, decrementQuantity } from "../data/cart.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();

function increaseQuantity() {
    incrementQuantity()
}

function decreaseQuantity() {
    decrementQuantity()
}

document.querySelectorAll('.quantity-buttons button').forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.closest('svg').getAttribute('width') === '12' && event.target.closest('svg').getAttribute('height') === '4') {
            decreaseQuantity();
        } else {
            increaseQuantity();
        }
    });
});
