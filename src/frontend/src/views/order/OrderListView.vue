<template>
  <div class="container my-orders">
    <h3 class="text-center text-white bg-dark p-2">My Orders</h3>
    <div v-if="orders.length > 0">
      <div v-for="(order, index) in orders" :key="order.id" class="list-group mt-4">
        <div class="list-group-item list-group-item-light">
          <div class="row">
            <div class="col-md-3">
              <h5 class="mb-1">
                <strong>Order #</strong>{{ order.orderNumber.substring(0, 8) + '...' }}
              </h5>
              <small><strong>Date:</strong> {{ formatDate(order.orderDate) }}</small>
            </div>
            <div class="col-md-3">
              <p class="mb-1"><strong>Total:</strong> ${{ order.total }}</p>
              <p class="mb-1">
                <strong>Status:</strong>
                <span
                  :class="{
                    'text-success': order.orderStatus === 'Paid',
                    'text-danger': order.orderStatus !== 'Paid'
                  }"
                >
                  {{ order.orderStatus }}
                </span>
              </p>
            </div>
            <div class="col-md-3">
              <p class="mb-1">
                <strong>Shipping Address:</strong>
                {{ order.shippingStreet }}, {{ order.shippingCity }}, {{ order.shippingState }},
                {{ order.shippingCountry }}, {{ order.shippingZipCode }}
              </p>
            </div>
            <div class="col-md-3 d-flex align-items-center justify-content-center">
              <button
                class="btn btn-primary"
                type="button"
                data-toggle="collapse"
                :data-target="'#collapse' + index"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Show Details
              </button>
            </div>
          </div>
          <div class="collapse" :id="'collapse' + index">
            <div class="card card-body">
              <ul class="list-group list-group-flush">
                <li
                  class="list-group-item list-group-item-secondary"
                  v-for="item in order.orderItems"
                  :key="item._id"
                >
                  <div class="row">
                    <div class="col-md-3">
                      <h6 class="mb-1"><strong>Product ID:</strong> {{ item.productId }}</h6>
                    </div>
                    <div class="col-md-3">
                      <p class="mb-1"><strong>Name:</strong> {{ item.productName }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="mb-1"><strong>Quantity:</strong> {{ item.quantity }}</p>
                    </div>
                    <div class="col-md-3">
                      <p class="mb-1"><strong>Price:</strong> ${{ item.price }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-3">
          <select class="form-control" v-model="order.orderStatus">
            <option value="Submitted">Submitted</option>
            <option value="AwaitingValidation">Awaiting Validation</option>
            <option value="StockConfirmed">Stock Confirmed</option>
            <option value="Paid">Paid</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button class="btn btn-primary mt-3" @click="updateOrderStatus(order)">Update</button>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="currentPage--">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <a class="page-link" href="#" @click.prevent="currentPage = page">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" href="#" @click.prevent="currentPage++">Next</a>
        </li>
      </ul>
    </nav>
    <div v-if="orders.length === 0" class="no-orders">
      <p>No orders available.</p>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import orderService from '../../services/order/order.service';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export default {
  name: 'CustomerOrderView',
  setup() {
    const orders = ref([]);
    const itemsPerPage = ref(4);
    const currentPage = ref(1);
    const totalPages = ref(0);
    const toast = useToast();

    watch(
      currentPage,
      () => {
        const query = { pageIndex: currentPage.value - 1, pageSize: itemsPerPage.value };
        orderService
          .getAllOrders(query)
          .then((response) => {
            if (response.status === 200) {
              orders.value = response.data.data;
              totalPages.value = Math.ceil(response.data.totalItems / itemsPerPage.value);
            }
          })
          .catch((err) => console.log(err));
      },
      { immediate: true }
    );

    async function updateOrderStatus(newStatusOrder) {
      const oldStatusOrder = orders.value.find((order) => order._id === newStatusOrder._id);

      try {
        var updateStatusDTO = {
          id: newStatusOrder._id,
          orderStatus: newStatusOrder.orderStatus
        };

        await orderService.updateOrderStatus(oldStatusOrder._id, updateStatusDTO);
        orders.value = [];
        toast.success('Order status updated successfully', { position: 'top-right' });
        // Refresh the list of orders after updating status
        const query = { pageIndex: currentPage.value - 1, pageSize: itemsPerPage.value };
        const response = await orderService.getAllOrders(query);
        if (response.status === 200) {
          orders.value = response.data.data;
          totalPages.value = Math.ceil(response.data.totalItems / itemsPerPage.value);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        toast.error('Failed to update order status', { position: 'top-right' });
      }
    }

    return {
      orders,
      itemsPerPage,
      currentPage,
      totalPages,
      updateOrderStatus
    };
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.my-orders {
  padding: 20px;
}

.no-orders {
  text-align: center;
  margin-top: 20px;
  color: #888;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .order-card {
    padding: 20px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .order-card {
    padding: 30px;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .order-card {
    padding: 40px;
  }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .order-card {
    padding: 50px;
  }
}
</style>
