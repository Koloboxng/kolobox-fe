<template>
  <div>
    <div class="rightSide-page-title"><h6>Family Investment</h6></div>
    <div
      class="rightSide-main"
      id="family-investment"
      v-if="allFamilyGroups.length > 0">
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
import { mapActions, mapGetters } from "vuex";
import loader from "@/components/loader.vue";
import config from "@/config/index";
import colorMixin from "@/mixins/colorMixin.js";
import LineChart from "@/config/LineChart.js";

export default {
  mixins: [colorMixin],
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
      modalGroup: {
        groupUsers: "",
        group_id: ""
      },
      items: [],
      users: [],
      subusersDialog: false,
      adminDialog: false,
      form: {
        email: "",
        firstname: "",
        password: "",
        group_id: ""
      },
      message: "",
      access_code: "",
      reference: "",
      adminForm: {
        new_admin_id: "",
        group_admin_id: "",
        group_id: ""
      },
      topUpForm: {
        deposit_amount: ""
      },
      groupItem: null,
      topUpItem: null,
      topUpDialog: false,
      cancelDialog: false
    };
  },
  computed: {
    ...mapGetters([
      "allFamilyGroups",
      "account",
      "allSubUsers",
      "getGroupDashboard"
    ]),
    newAdmin() {
      return this.groupItem.users.find(user => user.groupAdmin);
    },
    randomColour() {
      return this.generateRandomColour();
    }
  },
  methods: {
    ...mapActions([
      "get_user_groups",
      "createSubUser",
      "changeAdmin",
      "getProfile",
      "getDashboard",
      "getEarnings",
      "getAllProducts",
      "allSubusersByUser",
      "cancelSubscription",
      "getGroupCharts",
      "quickDeposit"
    ]),
    moveToUsers(id, name) {
      let form = {
        id,
        name
      };
      this.$router.push({ name: "users", params: { form } });
    },
    subUsergroup(item) {
      item.subusers = [];
      this.allSubUsers.forEach(subuser => {
        subuser.groups.forEach(group => {
          if (group.id === item.group_id) item.subusers.push(subuser);
        });
      });
    },
    topUp() {
      this.snackbar.msg = "Please wait. Loading paystack...";
      this.quickDeposit({
        amount: this.topUpForm.deposit_amount,
        id: this.account.user.id,
        product_id: this.allProduct[1].id
      }).then( res => {
        this.snackbar.show = true;
        this.message = res.body.data.message
        this.access_code = res.body.data.top_up_data.access_code
        this.reference = res.body.data.top_up_data.reference
        this.payWithPaystack();
      })
    },

    payWithPaystack() {
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
          product_id: this.allProduct[1].id,
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
      this.datacollection = {
        labels: [],
        datasets: [
          {
            label: "Your Investment",
            borderColor: "blue",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "blue",
            data: []
          },
          {
            label: "Group Investment",
            borderColor: "grey",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "grey",
            data: []
          }
        ]
      };
      this.datacollectionSavings = {
        labels: [],
        datasets: [
          {
            label: "Your Interest",
            borderColor: "blue",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "blue",
            data: []
          },
          {
            label: "Group Interest",
            borderColor: "grey",
            fill: false,
            lineTension: 0,
            pointBackgroundColor: "grey",
            data: []
          }
        ]
      };
      if (
        this.getGroupDashboard.interest.chart &&
        this.getGroupDashboard.savings.chart
      ) {
        this.getGroupDashboard.interest.chart.map(point => {
          this.datacollection.labels.push(this.formatDate(point.date));
          this.datacollection.datasets.map(set => {
            if (set.label === point.name) set.data.push(point.amount);
          });
        });
        this.getGroupDashboard.savings.chart.map((point, index) => {
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
    this.get_user_groups();
    this.allSubusersByUser();
    this.getGroupCharts();
  },
  watch: {
    allFamilyGroups() {
      this.allFamilyGroups.forEach(group => this.subUsergroup(group));
    },
    getGroupCharts() {
      this.fillData();
    }
  },
  mounted() {
    this.fillData();
  }
};
</script>


<style>
.group-canceled {
  background-color: #ce0808;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 7px 30px;
  border-radius: 30px;
}
.user-vote-btn a {
  margin-left: 5px;
}
.noUsers {
  margin-left: 50px !important;
}
.createSub {
  float: right;
  margin-top: -15px;
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

  main
    .rightSide-main
    .investment-group-detail
    .user-invest-table
    table
    thead
    tr
    th:first-child,
  main
    .rightSide-main
    .investment-group-detail
    .user-invest-table
    table
    tbody
    tr
    td:first-child {
    padding-left: 15px !important;
  }
  .status-active span {
    float: right;
  }
}
@media screen and (max-width: 600px) {
  .createSub {
    margin: 25px 80px 0px 0px;
  }
}
</style>