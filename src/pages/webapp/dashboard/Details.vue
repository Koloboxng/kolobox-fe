<template>
  <div data-app>
    <div id="dashboard" v-if="!earnings.length"><loader /></div>
    <div id="dashboard" v-else>
      <div class="col-lg-10 p-0">
        <div class="rightSide-main">
          <section id="products">
            <h6 class="border-bottom">Details</h6>
            <div class="products-order-detials-wrap">
              <ul class="d-flex top-head">
                <li><h6>Product Name</h6></li>
                <li><h6>Next Pay Date</h6></li>
                <li><h6>Next Payment</h6></li>
                <li></li>
              </ul>
              <ul class="d-flex bottom-body" v-if="earnings.length > 0" v-for="(item, index) in earnings" :key="index">
                <li>
                  <h5>{{ item.name }}</h5>
                </li>
                <li>
                  <h5>{{ formatDate(item.next_pay_day) }}</h5>
                </li>
                <li>
                  <h5>{{ item.interest | currency("₦", 2) }}</h5>
                </li>
                <li class="top-up">
                  <a
                    :class="{ 'grey-out': item.canceled }"
                    href="javascript:;"
                    slot="activator"
                    v-if="!item.canceled"
                    @click="openDialog(item)">
                    Change next pay day
                  </a>
                </li>
              </ul>
              <ul style="text-align:center;color:red;" v-else>
                No products yet!
                <v-btn>
                  <router-link class="link" to="/index/products">Add Product</router-link>
                </v-btn>
              </ul>
            </div>
            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Next Pay Date</th>
                  <th scope="col">Next Payment</th>
                  <th scope="col"><div id="increaseWidth"></div></th>
                </tr>
              </thead>
              <tbody v-if="earnings.length > 0">
                <tr v-for="(item, index) in earnings" :key="index">
                  <td data-label="Product Name">
                    <span>{{ item.name }}</span>
                  </td>
                  <td data-label="Next Pay Date">
                    <span>{{ formatDate(item.next_pay_day) }}</span>
                  </td>
                  <td data-label="Next Payment">
                    <span>{{ item.interest | currency("₦", 2) }}</span>
                  </td>
                  <td>
                    <span>
                      <a
                        :class="{ 'grey-out': item.canceled }"
                        href="javascript:;"
                        v-if="!item.canceled"
                        slot="activator"
                        @click="openDialog(item)">
                        Change next pay day
                      </a>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
          <section id="investment-interest">
            <div class="row">
              <div class="col-md-6">
                <aside id="investment">
                  <div class="last-bottom-total">
                    <div>
                      <p>Last withdrawal date:</p>
                      <h5 class="text-center">
                        {{ withdrawalDates.last_withdrawal_date && withdrawalDates.last_withdrawal_date !== "null" 
                          ? formatDate(withdrawalDates.last_withdrawal_date) 
                          : "---" 
                        }}
                      </h5>
                    </div>
                  </div>
                </aside>
              </div>
              <div class="col-md-6">
                <aside id="investment">
                  <div class="last-bottom-total">
                    <div>
                      <p>Next withdrawal date:</p>
                      <h5 class="belowGraph">
                        {{ withdrawalDates.next_withdrawal_date && withdrawalDates.next_withdrawal_date !== "null" 
                          ? formatDate(withdrawalDates.next_withdrawal_date) 
                          : "---" 
                        }}
                      </h5>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div data-app="true">
      <v-flex>
        <v-dialog v-model="dialog" persistent max-width="390">
          <v-card>
            <v-card-title class="headline">CHANGE NEXT PAY DATE</v-card-title>
            <v-card-text>
              <br />
              <div class="form-group w-100">
                <label for="liketoinvest">Next pay date</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">
                      <img src="@/assets/images/callender.png" alt="calendar" />
                    </span>
                  </div>
                  <input
                    type="date"
                    id="liketoinvest"
                    name="next_pay_date"
                    class="form-control"
                    v-validate="'required'"
                    v-model="form.next_pay_date"
                    aria-label
                    aria-describedby="basic-addon1"
                  />
                </div>
                <span v-show="errors.has('next_pay_date')" class="text-danger" style="font-size:9px;font-weight:bold;">
                  {{ errors.first("next_pay_date") }}
                </span>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="cancel()">CANCEL</v-btn>
              <v-btn color="green darken-1" :disabled="errors.any()" flat @click.native="changeDate()">
                CHANGE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </div>
    <v-snackbar v-model="snackbar.show" top right color="black">
      {{ snackbar.msg }}
      <v-btn flat small dark @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HP1WKQF3LQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HP1WKQF3LQ');
</script>

<script>
import { mapGetters, mapActions } from "vuex";
import loader from "@/components/loader";
import dateMixin from "@/mixins/dateMixin.js";

export default {
  name: "Details",
  mixins: [dateMixin],
  components: {
    loader
  },
  data() {
    return {
      snackbar: {
        show: false,
        msg: ""
      },
      dialog: false,
      form: {
        subscription_id: "",
        next_pay_date: "",
        status: ""
      }
    };
  },
  methods: {
    ...mapActions([
      "getEarnings",
      "getProfile",
      "getAllProducts"
    ]),
    openDialog(item) {
      this.dialog = true;
      this.form.subscription_id = item.subscription_id;
      this.form.next_pay_date = item.next_pay_day.split("T")[0];
      this.form.status = item.status;
    },
    cancel() {
      this.dialog = false;
      this.form.subscription_id = "";
      this.form.next_pay_date = "";
      this.form.status = "";
    },
    changeDate() {
      this.$validator
        .validateAll()
        .then(result => {
          if (!result) return;
          this.$http
            .post("user/me/subscriptions", this.form, { emulateJSON: true })
            .then(({ data: { data } }) => {
              this.snackbar.msg = data || 'Success.';
              this.snackbar.show = true;

              this.cancel();
              console.log({data})
            } )
            .catch(e => {
              this.snackbar.msg = e.body.message;
              this.snackbar.show = true;
            })
            .finally(() => {
              this.getProfile();
              this.getEarnings();
            });
        })
        .catch(e => {
          this.toast.msg = e.body.message || "Oops! An error occured. Please try again";
          this.toast.show = true;
        });
    }
  },
  created() {
    this.getProfile();
    this.getEarnings();
    this.getAllProducts();
  },
  computed: {
    ...mapGetters(["allProduct", "withdrawalDates"]),
    subscribedProductNames() {
      return this.$store.getters.earnings.map(({ name }) => name);
    },
    subscribedProducts() {
      return this.allProduct.filter(({ name }) => this.subscribedProductNames.includes(name));
    },
    subscriptions() {
      return this.$store.getters.subscriptions.map(s => {
        const product = this.subscribedProducts.find(p => s.product_id === p.id);

        return product ? { ...s, name: product.name } : s;
      });
    },
    earnings() {
      return this.$store.getters.earnings.map(e => {
        const sub = this.subscriptions.find(s => s.name === e.name);
        // return sub;

        return sub ? { ...e, subscription_id: sub.id, next_pay_day: sub.next_pay_day, status: sub.status } : e;
      });
    }
  }
};
</script>

<style>
.grey-out {
  background-color: rgb(129, 125, 125) !important;
  cursor: not-allowed;
}
.reduce {
  margin-right: 98px;
}

table th {
  color: rgb(157, 162, 167);
  font-size: 11px;
}
table {
  margin-left: 30px;
  display: none !important;
}
td {
  font-size: 11px;
}
td a {
  background-color: #1486e9;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 9px 20px;
  border-radius: 30px;
}
.active-button {
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 7px 30px;
  border-radius: 30px;
}

@media screen and (max-width: 767px) {
  table {
    display: block !important;
    margin: 0;
    padding: 0px 15px 10px 15px;
  }
  .products-order-detials-wrap {
    display: none;
  }

  thead {
    display: none;
  }
  tr {
    border-bottom: 3px solid #ddd;
    width: 100%;
    display: inline-block;
  }
  td {
    border-bottom: 1px solid #ddd;
    text-align: right;
    width: 100%;
    display: inline-block;
    float: left;
  }
  td:before {
    content: attr(data-label);
    float: left;
    width: 50%;
    display: block;
    text-align: left;
    font-weight: bold;
  }
  td > span {
    display: block;
    text-align: left;
    word-break: break-all;
    float: left;
  }
  td a {
    padding: 7px 30px;
  }

  main .rightSide-main .top-title ul.nav li.nav-item {
    font-size: 9px;
    margin: 0 2px 0 13px !important;
    border: none !important;
  }
}

@media (max-width: 480px) {
  .chart {
    text-align: center;
  }
  .last-bottom-total h5 {
    text-align: center;
  }
  .date-time-change {
    display: block !important;
    margin: auto !important;
  }
  .date-change {
    width: 30% !important;
    margin: auto !important;
  }
  .date-time-change p {
    text-align: center !important;
    margin: 10px !important;
  }
  td a {
    border-radius: 30px !important;
  }
}
@media (min-width: 768px) {
  main .rightSide-main .last-bottom-total div {
    padding: 0 20px !important;
  }
  td a {
    border-radius: 30px !important;
  }
}
#increaseWidth {
  width: 90px;
}
#products {
  overflow: hidden !important;
}
.top-up a {
  border-radius: 30px !important;
}
.active-button {
  text-align: center !important;
}
</style>
