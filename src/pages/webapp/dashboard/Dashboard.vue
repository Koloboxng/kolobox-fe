<template>
  <div data-app>
    <div id="dashboard" v-if="!earnings"><loader /></div>
    <div id="dashboard" v-else>
      <div class="col-lg-10 p-0">
        <div class="rightSide-main">
          <section id="products">
            <h6 class="border-bottom">Products</h6>
            <div class="products-order-detials-wrap">
              <ul class="d-flex top-head">
                <li><h6>Product Name</h6></li>
                <li><h6>Start Date</h6></li>
                <li><h6>End Date</h6></li>
                <li><h6>Tenure</h6></li>
                <li><h6>Interest Rate</h6></li>
                <li><h6>Interest</h6></li>
                <li><h6>Investment</h6></li>
                <li><h6>Status</h6></li>
                <li><h6>Action</h6></li>
                <li><h6>Auto-subscription</h6></li>
              </ul>
              <ul class="d-flex flex-wrap bottom-body"  v-if="earnings.length > 0"
                
               
                v-for="(item, index) in earnings"
                :key="index">
              
                <li>
                  <h5>{{ item.name }}</h5>
                </li>
                <li>
                  <h5>{{ formatDate(item.start_date) }}</h5>
                </li>
                <li>
                  <h5>
                    {{
                      item.name !== "KOLO-FLEX"
                        ? formatDate(getEndDate(item.start_date, 90)) ||
                          "00-00-00"
                        : "-"
                    }}
                  </h5>
                </li>
                <li>
                  <h5>
                    {{ item.name !== "KOLO-FLEX" ? item.tenor + " days" : "-" }}
                  </h5>
                </li>
                <li>
                  <h5>{{ item.interest_rate | percent(2) }}</h5>
                </li>
                <li>
                  <h5>{{ item.interest | currency("₦", 2) }}</h5>
                </li>
                <li>
                  <h5>{{ item.amount | currency("₦", 2) }}</h5>
                </li>
                <li
                  :class="{
                    'status-cancelled': item.canceled,
                    'status-active': !item.canceled
                  }"
                >
                  <span>{{ item.canceled ? "Canceled" : "Active" }}</span>
                </li>
                <li class="top-up">
                  <a
                    :class="{ 'grey-out': item.canceled }"
                    href="#"
                    slot="activator"
                    @click="item.canceled ? '' : openDialog(item)"
                    >Top Up</a
                  >
                </li>
                <li class="top-up">
                  <span v-if="!item.canceled">
                    <a
                      v-if="item.subscription.auto_subscription"
                      href="javascript:;"
                      slot="activator"
                      @click="pauseSub(item)"
                      >Pause sub</a>
                    <a
                      v-else
                      href="javascript:;"
                      slot="activator"
                      @click="resumeSub(item)"
                      >Resume sub</a>
                  </span>
                </li>
              </ul>
              <ul style="text-align:center;color:red;" v-else>
                No products yet!
                <v-btn>
                  <router-link class="link" to="/index/products"
                    >Add Product</router-link
                  >
                </v-btn>
              </ul>
            </div>
            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Tenure</th>
                  <th scope="col">Interest Rate</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Investment</th>
                  <th scope="col">Status</th>
                  <th scope="col"><div id="increaseWidth"></div></th>
                  <th scope="col"><div id="increaseWidth"></div></th>
                </tr>
              </thead>
              <tbody v-if="earnings.length > 0">
                <tr v-for="(item, index) in earnings" :key="index">
                  <td data-label="Product Name">
                    <span>{{ item.name }}</span>
                  </td>
                  <td data-label="Start Date">
                    <span>{{ formatDate(item.start_date) }}</span>
                  </td>
                  <td data-label="End Date">
                    <span>
                      {{
                        item.name !== "KOLO-FLEX"
                          ? formatDate(
                              getEndDate(item.start_date, Number(item.tenor))
                            ) || "00-00-00"
                          : "-"
                      }}
                    </span>
                  </td>
                  <td data-label="Tenure">
                    <span>
                      {{
                        item.name !== "KOLO-FLEX" ? item.tenor + " days" : "-"
                      }}
                    </span>
                  </td>
                  <td data-label="Interest Rate">
                    <span>{{ item.interest_rate | percent(2) }}</span>
                  </td>
                  <td data-label="Interest">
                    <span>{{ item.interest | currency("₦", 2) }}</span>
                  </td>
                  <td data-label="Investment">
                    <span>{{ item.amount | currency("₦", 2) }}</span>
                  </td>
                  <td data-label="Status">
                    <span
                      class="active-button"
                      :style="[
                        item.canceled
                          ? { 'background-color': 'red' }
                          : { 'background-color': '#33a457' }
                      ]"
                      >{{ item.canceled ? "Canceled" : "Active" }}</span
                    >
                  </td>
                  <td data-label="Payment">
                    <span>
                      <a
                        :class="{ 'grey-out': item.canceled }"
                        href="#"
                        slot="activator"
                        @click="item.canceled ? '' : openDialog(item)"
                        >Top Up</a
                      >
                    </span>
                  </td>
                  <td data-label="Auto-subscription">
                    <span v-if="!item.canceled">
                      <a
                       v-if="item.subscription.auto_subscription"
                        href="javascript:;"
                        slot="activator"
                        @click="pauseSub(item)"
                        >Pause subscription</a>
                      <a
                        v-else
                        href="javascript:;"
                        slot="activator"
                        @click="resumeSub(item)"
                        >Resume subscription</a>
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
                  <section>
                    <div class="top-title">
                      <h6>Investment</h6>
                      <ul class="nav">
                        <li class="nav-item">
                          <span class="circle-orange"></span>Kolo-Flex
                        </li>
                        <li class="nav-item">
                          <span class="circle-blue"></span>Kolo-Target
                        </li>
                      </ul>
                    </div>
                    <div
                      class="chart"
                      v-if="savingsChart && savingsChart.length > 0"
                    >
                      <line-chart
                        :chart-data="datacollectionSavings"
                        :options="options"
                      />
                    </div>
                    <div class="chart" v-else>No data to show yet</div>
                  </section>
                  <div class="last-bottom-total">
                    <div>
                      <p>Total Investment:</p>
                      <h5 class="belowGraph" v-if="savingsData">
                        {{ savingsData.total_savings || 0 | currency("₦", 2) }}
                      </h5>
                    </div>
                    <div>
                      <p>Monthly Average:</p>
                      <h5 class="belowGraph" v-if="savingsData">
                        {{
                          savingsData.average_savings || 0 | currency("₦", 2)
                        }}
                      </h5>
                    </div>
                  </div>
                </aside>
              </div>
              <div class="col-md-6">
                <aside id="interest">
                  <section>
                    <div class="top-title">
                      <h6>Interest</h6>
                      <ul class="nav">
                        <li class="nav-item">
                          <span class="circle-orange"></span>Kolo-Flex
                        </li>
                        <li class="nav-item">
                          <span class="circle-blue"></span>Kolo-Target
                        </li>
                      </ul>
                    </div>
                    <div
                      class="chart"
                      v-if="interestChart && interestChart.length > 0"
                    >
                      <line-chart
                        :chart-data="datacollection"
                        :options="options"
                      />
                    </div>
                    <div class="chart" v-else>No data to show yet</div>
                  </section>
                  <div class="last-bottom-total">
                    <div>
                      <p>Total Interest:</p>
                      <h5 class="belowGraph">
                        {{ totalInterest || 0 | currency("₦", 2) }}
                      </h5>
                    </div>
                    <div>
                      <p>Monthly Average:</p>
                      <h5 class="belowGraph">
                        {{ averageInterest || 0 | currency("₦", 2) }}
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
            <v-card-title class="headline">TOP UP</v-card-title>
            <v-card-text>
              Top up #
              <span style="color:blue"> {{ topItem.name | capitalize }} </span>
              <br />
              <div class="form-group w-100">
                <label for="liketoinvest">I’d like to topup</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">₦</span>
                  </div>
                  <input
                    type="text"
                    id="liketoinvest"
                    name="amount"
                    class="form-control"
                    v-validate="'required'"
                    placeholder="Please enter amount"
                    v-model="form.deposit_amount"
                    aria-label
                    aria-describedby="basic-addon1"
                  />
                  <span
                    v-show="errors.has('amount')"
                    class="text-danger"
                    style="font-size:9px;font-weight:bold;"
                    >{{ errors.first("amount") }}</span
                  >
                </div>
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click.native="dialog = false"
                >CANCEL</v-btn
              >
              <v-btn
                color="green darken-1"
                :disabled="errors.any()"
                flat
                @click.native="topUp(topItem.id)"
                >TOP UP</v-btn
              >
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
import LineChart from "@/config/LineChart.js";
import { mapGetters, mapActions } from "vuex";
import loader from "@/components/loader";
import config from "@/config/index";
import dateMixin from "@/mixins/dateMixin.js";
export default {
  name: "dashboard",
  mixins: [dateMixin],
  components: {
    loader,
    LineChart
  },
  data() {
    return {
      snackbar: {
        show: false,
        msg: ""
      },
      interest: {
        total: 0,
        average: 0
      },
      dialog: false,
      dialogDelete: false,
      form: {
        deposit_amount: "",
      },
      product_id: "",
      access_code: "",
      authorization_url: "",
      reference: "",
      message: "",
      topItem: {},
      deleteItem: {},
      datacollection: null,
      datacollectionSavings: null,
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: tooltipItem => {
              return tooltipItem.yLabel;
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                lineWidth: 3,
                drawBorder: false
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    ...mapActions([
      "getDashboard",
      "getEarnings",
      "quickDeposit",
      "getProfile",
      "pauseAutoSubscription",
      "resumeAutoSubscription",
      "getAllProducts",
    ]),
    openDialog(item) {
      this.dialog = true;
      this.topItem = item;
    },
    topUp() {
      this.snackbar.msg = "Please wait. Loading paystack...";
      this.snackbar.show = true;

      if (this.topItem.name === this.allProduct[0].name) {
        this.product_id = this.allProduct[0].id;
      } else {
        this.product_id = this.allProduct.filter(
          x => x.name === this.topItem.name
        )[0].id;
      }

      this.quickDeposit({
        amount: this.form.deposit_amount,
        id: this.account.user.id,
        product_id: this.product_id,
        group_id: this.topItem.group_id
      }).then( res => {
        console.log({res})
        this.message = res.body.data.message
        this.access_code = res.body.data.top_up_data.access_code
        this.reference = res.body.data.top_up_data.reference
        this.payWithPaystack();
      })

      //let productId = res.body.data.product_id
    },

    payWithPaystack() {
      let metadata = {
        key: config.PAYSTACK_KEY,
        email: this.account.user.email,
        amount: Number(this.form.deposit_amount) * 100,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        ref: this.reference,
        metadata: {
          reference: this.reference,
          type: "browserClient",
          user_id: this.account.user.id,
          action: "productTopUp",
          custom_fields: [
            {
              user: `${this.account.user.firstname} ${
                this.account.user.lastname
              }`,
              product: this.topItem.name
            }
          ]
        },
        callback: response => {
          this.getProfile()
            .then(() => {
              this.getDashboard().then(() => {
                this.getEarnings();
                this.snackbar.msg =
                  "Success. transaction ref is " + response.reference;
                this.snackbar.show = true;
                // console.log('Success. transaction ref is ' + response.reference);

                this.dialog = false;
                this.form.deposit_amount = "";
                this.topItem = {};
              });
            })
            .catch(e => {
              // console.log('DEBUG', e)
              this.dialog = false;
              this.snackbar.msg = e.body.message;
              this.snackbar.show = true;
            });
        },
        onClose: () => {
          this.dialog = false;
          this.form.deposit_amount = "";
          this.snackbar.msg = "Payment canceled";
          this.snackbar.show = true;
          // console.log('Payment cancelled');
        }
      };
      if (this.topItem.name === this.allProduct[0].name) {
        metadata.subaccount = config.KOLOFLEX_SUBACCOUNT;
        metadata.metadata.product_id = this.allProduct[0].id;
      } else {
        metadata.subaccount = config.KOLOTARGET_SUBACCOUNT;
        metadata.metadata.product_id = this.allProduct.filter(
          x => x.name === this.topItem.name
        )[0].id;
      }
      //Check if subaccount and product id exist
      if (metadata.subaccount && metadata.metadata.product_id) {
        // eslint-disable-next-line no-undef
        let handler = PaystackPop.setup(metadata);
        handler.openIframe();
      }
    },
    cancel(item) {
      this.dialogDelete = true;
      this.deleteItem = item;
    },
    pauseSub(item) {
      this.pauseAutoSubscription(item.subscription)
        .then(res => {
          this.snackbar.msg = res.data;
        })
        .catch(e => {
          this.snackbar.msg = e.body.message || e.body.message.message || "Oops! Please try again";
        })
        .finally(() => {
          this.snackbar.show = true;
          this.dialogDelete = false;
        });
    },
    resumeSub(item) {
      this.resumeAutoSubscription(item.subscription)
        .then(res => {
          this.snackbar.msg = res.data;
        })
        .catch(e => {
          this.snackbar.msg = e.body.message || e.body.message.message || "Oops! Please try again";
        })
        .finally(() => {
          this.snackbar.show = true;
          this.dialogDelete = false;
        });
    },
    fillData() {
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: "KOLO-FLEX",
            borderColor: "orange",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "orange",
            data: []
          },
          {
            label: "KOLO-TARGET",
            borderColor: "blue",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "blue",
            data: []
          }
        ]
      };
      this.datacollectionSavings = {
        labels: [],
        datasets: [
          {
            label: "KOLO-FLEX",
            borderColor: "orange",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "orange",
            data: []
          },
          {
            label: "KOLO-TARGET",
            borderColor: "blue",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "blue",
            data: []
          }
        ]
      };
      if (this.interestChart && this.savingsChart) {
        this.interestChart.map(point => {
          this.datacollection.labels.push(this.formatDate(point.date));
          this.datacollection.datasets.map(set => {
            if (set.label === point.name) set.data.push(point.amount);
          });
        });
        this.savingsChart.map((point, index) => {
          //Check if any investment has been made today
          if (
            index == 0 &&
            new Date(point.date).setHours(0, 0, 0, 0) !==
              new Date().setHours(0, 0, 0, 0)
          ) {
            this.datacollectionSavings.labels.push(this.formatDate(new Date()));
            this.datacollectionSavings.datasets.map(set => {
              set.data.push(0);
            });
          }

          this.datacollectionSavings.labels.push(this.formatDate(point.date));
          this.datacollectionSavings.datasets.map(set => {
            if (set.label === point.name) set.data.push(point.amount);
          });
        });
      }
    }
  },
  created() {
    this.getDashboard();
    this.getEarnings();
    this.getAllProducts();
  },
  computed: {
    ...mapGetters([
      "dashboardReady",
      "interestData",
      "savingsData",
      "loaded",
      "account",
      "interestChart",
      "savingsChart",
      "allProduct"
    ]),
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
      return this.$store.getters.earnings.map((e) => {
        const sub = this.subscriptions.find(s => s.name === e.name);

        e.subscription = sub || {};

        return e;
      });
    },
    totalInterest() {
      if (this.interestData && this.interestData.length) {
        return this.interestData
          .map(el => Number(el.total_interest))
          .reduce((accumulator, currValue) => accumulator + Number(currValue));
      } else return 0;
    },
    averageInterest() {
      if (this.interestData && this.interestData.length) {
        return this.interestData
          .map(el => el.average_interest)
          .reduce((accumulator, currValue) => accumulator + Number(currValue));
      } else return 0;
    }
  },
  mounted() {
    this.fillData();
  },
  watch: {
    savingsChart() {
      this.fillData();
    },
    interestChart() {
      this.fillData();
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

.belowGraph {
  font-weight: bold;
  color: rgb(157, 162, 167);
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
