<template>
  <div data-app>
    <div data-app="true">
      <v-flex>
        <!---------------------TOP UP DIALOG----------------------------->
        <v-dialog v-model="topUpDialog" persistent max-width="390">
          <v-card>
            <v-card-title class="headline">MAKE PAYMENT</v-card-title>
            <v-card-text v-if="topUpItem">
              Top up #
              <span style="color:blue">{{ topUpItem.name | capitalize }}</span>
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
                    v-model="topUpForm.deposit_amount"
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
              <v-btn
                color="green darken-1"
                flat
                @click.native="
                  topUpDialog = false;
                  topUpItem = null;
                "
                >CANCEL</v-btn
              >
              <v-btn
                color="green darken-1"
                :disabled="errors.any()"
                flat
                @click.native="topUp(topUpItem)"
                >Make Payment</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </div>

    <!---------------------LOADER IF COMPONENT ISN'T MOUNTED-------------------------->

    <div v-if="!allKoloGroups"><loader /></div>

    <!------------------------GROUPS-------------------------->

    <div class="col-lg-10 p-0" v-else>
      <div class="rightSide-page-title"><h6>Investment Group</h6></div>
      <div
        class="rightSide-main"
        id="investment-group"
        v-if="allKoloGroups && allKoloGroups.length > 0"
      >
        <section
          id="products"
          class="investment-group-detail"
          v-for="(item, i) in allKoloGroups"
          :key="i"
        >
          <span id="groupHeader">
            <v-layout row>
              <v-flex ml-5>
                <h6>{{ item.name.toUpperCase() }}</h6>
              </v-flex>
              <v-flex xs2>
                <span
                  :class="{
                    'group-canceled': !item.active,
                    'group-active': item.active
                  }"
                  >{{ item.active ? "Active" : "Inactive" }}</span
                >
              </v-flex>
            </v-layout>
          </span>
          <div class="table-responsive user-invest-table">
            <table class="table table-bordered m-0">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Capital</th>
                  <th scope="col">Interest</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-if="item.users && item.users.length > 0">
                <tr v-for="(user, i) in item.users" :key="i">
                  <td>
                    <span>{{ user.userName.toUpperCase() }}</span>
                    <span class="user-vote-btn">
                      <img
                        v-if="user.groupAdmin"
                        src="@/assets/images/vote-king-icon.png"
                        alt="vote-king"
                      />
                      <a
                        href="#"
                        v-if="user.userId === account.user.id"
                        @click="
                          adminDialog = true;
                          groupItem = item;
                          form.group_id = item.group_id;
                          form.group_admin_id = item.users.find(
                            user => user.groupAdmin
                          ).userId;
                        "
                        >Vote</a
                      >
                    </span>
                  </td>
                  <td data-label="User Deposit">
                    {{ user.group_deposit | currency("₦", 2) }}
                  </td>
                  <td data-label="User Interest">
                    {{ user.group_interest | currency("₦", 2) }}
                  </td>
                  <td data-label="Total">
                    {{
                      (user.group_deposit + user.group_interest)
                        | currency("₦", 2)
                    }}
                  </td>
                  <td data-label="User Status" class="status-active">
                    <span>Active</span>
                  </td>
                  <td class="top-up" data-label="Payment">
                    <a
                      v-if="user.userId === account.user.id"
                      @click="checkUserGroupProduct(item)"
                      >Make Payment</a>
                  </td>
                </tr>
                <tr v-if="item.users && item.users.length == 0">
                  No users!
                  <v-btn
                    color="blue"
                    @click="moveToUsers(item.group_id, item.name)"
                    >Add Users</v-btn
                  >
                </tr>
                <tr
                  class="last-row-total"
                  v-if="item.users && item.users.length > 0"
                >
                  <td>Total</td>
                  <td data-label="Total Capital">
                    {{
                      item.users.reduce((x, y) => {
                        return x + y.group_deposit;
                      }, 0) | currency("₦", 2)
                    }}
                  </td>
                  <td data-label="Total Interest">
                    {{
                      item.users.reduce((x, y) => {
                        return x + y.group_interest;
                      }, 0) | currency("₦", 2)
                    }}
                  </td>
                  <td data-label="Sum Total">
                    {{
                      (item.users.reduce((x, y) => {
                        return x + y.group_deposit;
                      }, 0) +
                        item.users.reduce((x, y) => {
                          return x + y.group_interest;
                        }, 0))
                        | currency("₦", 2)
                    }}
                  </td>
                  <td></td>
                  <td></td>
                  <td>
                    <!-- <a
                      @click="
                        groupReports({
                          form: { group_id: item.group_id },
                          snackbar
                        });
                        topUpDialog = true;
                      "
                      >Group Reports</a
                    > -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section v-if="allKoloGroups && allKoloGroups.length == 0">
          <h5
            style="color:red !important;text-align:center !important;font-weight:bold;text-decoration:underline;"
          >
            No data to show yet!
            <v-btn color="blue">
              <router-link class="link" to="/index/groups"
                >Add Group</router-link
              >
            </v-btn>
          </h5>
        </section>
        <!-- section id="investment-interest">
          <div class="row">
            <div class="col-md-6">
              <aside id="investment">
                <section>
                  <div class="top-title">
                    <h6>Investment</h6>
                    <ul class="nav">
                      <li class="nav-item">
                        <span class="circle-dark-blue"></span>Your Investment
                      </li>
                      <li class="nav-item">
                        <span class="circle-grey"></span>Group Investment
                      </li>
                    </ul>
                  </div>
                  <div
                    class="chart"
                    v-if="
                      getGroupDashboard &&
                        getGroupDashboard.savings &&
                        getGroupDashboard.savings.chart.length > 0
                    "
                  >
                    <line-chart
                      :chart-data="datacollectionSavings"
                      :options="options"
                    />
                  </div>
                </section>
                <div
                  class="last-bottom-total"
                  v-if="getGroupDashboard && getGroupDashboard.savings"
                >
                  <div>
                    <p>Your Investment:</p>
                    <h4>
                      {{
                        getGroupDashboard.savings.data.total_savings ||
                          0 | currency("₦", 2)
                      }}
                    </h4>
                  </div>
                  <div>
                    <p>Group Investment:</p>
                    <h4>
                      {{
                        getGroupDashboard.savings.data.group_savings ||
                          0 | currency("₦", 2)
                      }}
                    </h4>
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
                        <span class="circle-dark-blue"></span>Your Interest
                      </li>
                      <li class="nav-item">
                        <span class="circle-grey"></span>Group Interest
                      </li>
                    </ul>
                  </div>

                  <div
                    class="chart"
                    v-if="
                      getGroupDashboard &&
                        getGroupDashboard.interest.chart.length > 0
                    "
                  >
                    <line-chart
                      :chart-data="datacollection"
                      :options="options"
                    />
                  </div>
                </section>
                <div
                  class="last-bottom-total"
                  v-if="getGroupDashboard && getGroupDashboard.interest"
                >
                  <div>
                    <p>Your Interest:</p>
                    <h4>
                      {{
                        getGroupDashboard.interest.data.total_interest ||
                          0 | currency("₦", 2)
                      }}
                    </h4>
                  </div>
                  <div>
                    <p>Group Interest:</p>
                    <h4>
                      {{
                        getGroupDashboard.interest.data.group_interest ||
                          0 | currency("₦", 2)
                      }}
                    </h4>
                  </div>
                </div>
              </aside>
            </div> 
          </div>
        </section> -->
      </div>
      <div v-else class="noGroups"><h6>No Groups Yet!</h6></div>
      <v-snackbar v-model="snackbar.show" top right color="black">
        {{ snackbar.msg }}
        <v-btn flat small dark @click.native="snackbar.show = false"
          >Close</v-btn
        >
      </v-snackbar>
      <v-dialog v-model="adminDialog" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">CHANGE ADMIN</v-card-title>
          <v-card-text>
            <div class="form-group w-100" v-if="groupItem">
              <label for="liketoinvest">Current Admin</label>
              <div class="input-group">
                <h3 id="liketoinvest" class="form-control">
                  {{ newAdmin.userName.toUpperCase() }}
                </h3>
              </div>

              <label for="liketoinvest1">Vote New Admin</label>
              <div class="input-group">
                <select
                  id="liketoinvest1"
                  name="newadmin"
                  v-model="form.new_admin_id"
                >
                  <option
                    v-for="(user, i) in groupItem.users"
                    :key="i"
                    :value="user.userId"
                    >{{ user.userName.toUpperCase() }}</option
                  >
                </select>
                <span
                  v-show="errors.has('newadmin')"
                  class="text-danger"
                  style="font-size:9px;font-weight:bold;"
                  >{{ errors.first("newadmin") }}</span
                >
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              flat
              @click.native="
                adminDialog = false;
                form.group_admin_id = '';
                form.new_admin_id = '';
                form.group_id = '';
              "
              >CANCEL</v-btn
            >
            <v-btn
              color="green darken-1"
              :disabled="errors.any()"
              flat
              @click.native="changeAdmin({ form: form, snackbar: snackbar })"
              >VOTE</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
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
import loader from "@/components/loader.vue";
import { mapGetters, mapActions } from "vuex";
import config from "@/config/index";
import LineChart from "@/config/LineChart.js";
import dateMixin from "@/mixins/dateMixin.js";

export default {
  mixins: [dateMixin],
  components: {
    loader,
    LineChart
  },
  data() {
    return {
      snackbar: {
        msg: "",
        show: false
      },
      adminDialog: false,
      topUpDialog: false,
      form: {
        new_admin_id: "",
        group_admin_id: "",
        group_id: ""
      },
      message: "",
      access_code: "",
      reference: "",
      topUpForm: {
        deposit_amount: ""
      },
      groupItem: null,
      topUpItem: null,
      cancelItem: null,
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
      "get_user_groups",
      "changeAdmin",
      "getProfile",
      "getDashboard",
      "getEarnings",
      "getAllProducts",
      "getGroupCharts",
      "groupReports",
      "quickDeposit"
    ]),
    moveToUsers(id, name) {
      let form = {
        id,
        name
      };
      this.$router.push({ name: "users", params: { form } });
    },
    productSelection(item) {
      //find the product of this particular group type
      const product = this.allProduct.find(
        x => x.name.toUpperCase() === item.Name.toUpperCase()
      );

      const form = {
        deposit_amount: item.minimum_amount || 5000,
        product,
        group_id: item.group_id
      };
      this.$router.push({ name: "products", params: { form } });
    },
    topUp(item) {
      this.snackbar.msg = "Please wait. Loading paystack...";

      //Check if an active kolo group exists
      const isThereKoloGroup = this.earnings.find(
        x => x.name.toUpperCase() === "KOLO-GROUP"
      );

      const product_id = this.allProduct.find(
        x => x.name.toUpperCase() === item.Name.toUpperCase()
      ).id;

      if(isThereKoloGroup) {
        this.quickDeposit({
          amount: this.topUpForm.deposit_amount,
          id: this.account.user.id,
          product_id: product_id,
          group_id: this.topUpItem.group_id
        }).then( res => {
          this.snackbar.show = true;
          this.message = res.body.data.message
          this.access_code = res.body.data.top_up_data.access_code
          this.reference = res.body.data.top_up_data.reference
          this.payWithPaystack(item);
        })
      } else {
        this.productSelection(item);
      }
    },
    fetchUsers() {
      this.allKoloGroups.forEach(item => {
        const { group_id } = item;
        this.$http
          .post(
            "group/group_users",
            {
              group_id
            },
            {
              emulateJSON: true
            }
          )
          .then(res => (item.users = res.body.data));
      });
    },
    // check/usergroupproduct
    checkUserGroupProduct(item){
      const product_id = this.allProduct.find(
        x => x.name.toUpperCase() === item.Name.toUpperCase()
      ).id;
      // product/check/usergroupproduct
      // group_id: item.group_id
      // product/check/userproduct
      // product_id: product_id
      this.$http.post("product/check/usergroupproduct", {
        group_id: item.group_id
      },
      {
        emulateJSON: true
      })
      .then(res => {
        if(res.body.status){
          this.topUpItem = item;
          this.topUpDialog = true;
        }
      }).catch(error => {
        console.log('An error occurred:', error);
        if(!error.body.status) {
          this.productSelection(item);
        }
      });
    },
    payWithPaystack(item) {
      const product_id = this.allProduct.find(
        x => x.name.toUpperCase() === item.Name.toUpperCase()
      ).id;

      let metadata = {
        key: config.PAYSTACK_KEY,
        email: this.account.user.email,
        amount: Number(this.topUpForm.deposit_amount) * 100,
        subaccount: config.KOLOTARGET_SUBACCOUNT,
        // ref: "" + Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
        ref: this.reference,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        metadata: {
          // reference: `${new Date().toISOString()}`,
          reference: this.reference,
          type: "browserClient",
          user_id: this.account.user.id,
          product_id,
          group_id: this.topUpItem.group_id,
          action: "productTopUp",
          custom_fields: [
            {
              user: `${this.account.user.firstname} ${
                this.account.user.lastname
              }`,
              Group: this.topUpItem.name,
              Group_id: this.topUpItem.group_id,
              group_type: this.topUpItem.Name
            }
          ]
        },
        callback: response => {
          this.getProfile()
            .then(() => {
              this.getDashboard().then(() => {
                this.getEarnings();
                this.get_user_groups();
                this.snackbar.msg =
                  "Success. transaction ref is " + response.reference;
                this.snackbar.show = true;
                // console.log('Success. transaction ref is ' + response.reference);

                this.topUpDialog = false;
                this.topUpForm.deposit_amount = "";
                this.topUpItem = null;
              });
            })
            .catch(e => {
              // console.log('DEBUG', e)
              this.topUpDialog = false;
              this.snackbar.msg = e.body.message;
              this.snackbar.show = true;
            });
        },
        onClose: () => {
          this.topUpDialog = false;
          this.form.deposit_amount = "";
          this.snackbar.msg = "Payment canceled";
          this.snackbar.show = true;
        }
      };

      // eslint-disable-next-line no-undef
      let handler = PaystackPop.setup(metadata);
      handler.openIframe();
    },
    fillData() {
      // this.datacollection = {
      //   labels: [],
      //   datasets: [
      //     {
      //       label: "Your Investment",
      //       borderColor: "blue",
      //       fill: false,
      //       lineTension: 0,
      //       pointBackgroundColor: "blue",
      //       data: []
      //     },
      //     {
      //       label: "Group Investment",
      //       borderColor: "grey",
      //       fill: false,
      //       lineTension: 0,
      //       pointBackgroundColor: "grey",
      //       data: []
      //     }
      //   ]
      // };
      // this.datacollectionSavings = {
      //   labels: [],
      //   datasets: [
      //     {
      //       label: "Your Interest",
      //       borderColor: "blue",
      //       fill: false,
      //       lineTension: 0,
      //       pointBackgroundColor: "blue",
      //       data: []
      //     },
      //     {
      //       label: "Group Interest",
      //       borderColor: "grey",
      //       fill: false,
      //       lineTension: 0,
      //       pointBackgroundColor: "grey",
      //       data: []
      //     }
      //   ]
      // };
      // if (
      //   this.getGroupDashboard.interest.chart.length > 0 &&
      //   this.getGroupDashboard.savings.chart.length > 0
      // ) {
      //   this.getGroupDashboard.interest.chart.map(point => {
      //     this.datacollection.labels.push(this.formatDate(point.date));
      //     this.datacollection.datasets.map(set => {
      //       if (set.label === point.name) set.data.push(point.amount);
      //     });
      //   });
      //   this.getGroupDashboard.savings.chart.map((point, index) => {
      //     //Check if any investment has been made today
      //     if (
      //       index == 0 &&
      //       new Date(point.date).setHours(0, 0, 0, 0) !==
      //         new Date().setHours(0, 0, 0, 0)
      //     ) {
      //       this.datacollectionSavings.labels.push(this.formatDate(new Date()));
      //       this.datacollectionSavings.datasets.map(set => {
      //         set.data.push(0);
      //       });
      //     }
      //     this.datacollectionSavings.labels.push(this.formatDate(point.date));
      //     this.datacollectionSavings.datasets.map(set => {
      //       if (set.label === point.name) set.data.push(point.amount);
      //     });
      //   });
      // }
    }
  },
  computed: {
    ...mapGetters([
      "allKoloGroups",
      "account",
      "allProduct",
      "earnings",
      "getGroupDashboard"
    ]),
    newAdmin() {
      return this.groupItem.users.find(user => user.groupAdmin);
    }
  },
  created() {
    this.get_user_groups().then(() => {
      this.fetchUsers();
    });
    this.getAllProducts();
    this.getEarnings();
    /* this.allKoloGroups().then(() => {
      this.fetchUsers();
    }); */
    // this.allKoloGroups();
  },
  watch: {
    allKoloGroups() {
      this.fetchUsers();
    }
  }
};
</script>
<style>
.group-active {
  background-color: #33a457;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 7px 30px;
  border-radius: 30px;
}
.group-canceled {
  background-color: #ce0808;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 7px 30px;
  border-radius: 30px;
}
#groupHeader {
  padding: 40px !important;
}
.user-vote-btn a {
  margin-left: 5px;
}
select {
  width: 100%;
}
.noGroups h6 {
  margin: 10px 0px 0px 10px;
}

@media screen and (max-width: 767px) {
  table {
    display: block !important;
    margin: 0;
    padding: 0px 15px 10px 15px;
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

  .group-canceled {
    padding: 7px 15px;
    margin: 0px 0px 0px -35px;
  }

  main .rightSide-main .top-title ul.nav li.nav-item {
    font-size: 9px;
    margin: 0 2px 0 13px !important;
    border: none !important;
  }

  #groupHeader {
    margin-right: 5px;
  }
}
</style>
