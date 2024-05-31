import { formatCurrency } from "../kashifscripts/utilis/money.js";
import { getProduct } from "./products.js";

export let orders = JSON.parse(localStorage.getItem('orders')) || [];
if (!orders) {
  orders = [{
    id: 'b2620549-14f1-4a21-aae8-a80ec6c2a92f',
    orderTime: "2024-05-28T11:08:34.673Z",
    totalCostCents: 2095,
    products: {
      estimatedDeliveryTime: '2024-06-04T11:12:41.661Z',
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
    }
  }];
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

window.onload = function () {
  let ordersHTML = '';


  orders.forEach((order) => {

    const dateString = order.orderTime;
    const orderDate = new Date(dateString);

    ordersHTML += `
      <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${orderDate.toLocaleDateString('en-US', { dateStyle: 'long' })}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div> `;

    if (Array.isArray(order.products)) {
      order.products.forEach((product) => {

        const productId = product.productId;
        const matchingOrder = getProduct(productId);

        const dateString = product.estimatedDeliveryTime;
        const deliveryTime = new Date(dateString);

        ordersHTML += `
      <div class="order-details-grid">
        <div class="product-image-container">
          <img src=${matchingOrder.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingOrder.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryTime.toLocaleDateString('en-US', { dateStyle: 'long' })}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
      });
    } else {
      // Handle case where order.products is not an array
      console.error('Products is not an array for order with ID:', order.id);
    }
  });

  document.querySelector('.js-orders-container').innerHTML = ordersHTML;
}
