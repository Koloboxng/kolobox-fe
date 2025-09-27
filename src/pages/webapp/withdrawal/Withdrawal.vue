<template>
  <div class="col-lg-10 p-0" data-app>
    <div class="rightSide-page-title"><h6>Withdrawal</h6></div>
    <div class="rightSide-main Withdrawal" id="investment-one">
      <section id="investment-interest">
        <div class="row">
          <div class="col-md-6">
            <aside id="investment">
              <div class="title-step-top">
                <h6>Withdrawal Balance</h6>
                <p>Step 1 of 3</p>
              </div>
              <div class="bottom-form-step">
                <div
                  class="alert alert-light d-flex wallet-balance-alert"
                  role="alert"
                >
                  <div class="img-wrap" v-if="account">
                    <img
                      src="@/assets/images/alert-wallet-icon.png"
                      alt="wallet-icon"
                    />
                  </div>
                  <p>
                    Your wallet balance is
                    <span>{{
                      account.wallet.account_balance || 0 | currency("₦", 2)
                    }}</span>
                  </p>
                </div>
                <form class="form-inline" v-on:submit.prevent="validateForm">
                  <div class="form-group w-100">
                    <label for="liketoinvest"
                      >I’d like to make a Withdrawal of</label
                    >
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >₦</span
                        >
                      </div>
                      <input
                        type="text"
                        id="liketoinvest"
                        v-validate="'required'"
                        name="amount"
                        class="form-control"
                        placeholder=""
                        v-model="form.amount"
                        aria-label=""
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
                  <div class="form-group w-100">
                    <label for="exampleSelect12">from product</label>
                    <select
                      class="form-control"
                      id="exampleSelect12"
                      v-model="form.product_id"
                      name="product"
                      v-validate="'required'"
                      v-if="earnings"
                    >
                      <option
                        :value="item.id"
                        selected
                        v-for="(item, index) in trueEarningsKoloFlex"
                        >{{ item.name | capitalize }}</option
                      >
                    </select>
                    <span
                      v-show="errors.has('product')"
                      class="text-danger"
                      style="font-size:9px;font-weight:bold;"
                      >{{ errors.first("product") }}</span
                    >
                  </div>
                  <div class="form-group w-150">
                    <label for="exampleSelect1">deposited to</label>
                    <select
                      class="form-control"
                      @click="referToSettings"
                      id="exampleSelect1"
                      name="account"
                      v-validate="'required'"
                      v-model="form.id"
                      v-if="items"
                    >
                      <option
                        :value="item"
                        selected
                        v-for="(item, index) in items"
                        >{{
                          (item.account_number + " " + item.bank_name)
                            | capitalize
                        }}</option
                      >
                    </select>
                    <span
                      v-show="errors.has('account')"
                      class="text-danger"
                      style="font-size:9px;font-weight:bold;"
                      >{{ errors.first("account") }}</span
                    >
                  </div>
                  <button
                    type="submit"
                    :disabled="errors.any()"
                    class="btn-submit"
                  >
                    Continue
                  </button>
                </form>
                <span
                  style="margin:19px 0px 0px 4px !important;font-size: 12px;color:grey;"
                  >Please withdrawal amounts must exceed ₦1000</span
                >
              </div>
            </aside>
          </div>
        </div>
      </section>
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
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Withdrawal1",
  data() {
    return {
      form: {
        amount: "",
        id: "",
        product_id: ""
      },
      snackbar: {
        show: false,
        msg: ""
      },
      items: []
    };
  },
  methods: {
    ...mapActions(["getProfile", "getEarnings"]),
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) this.submit();
        })
        .catch(e => {
          this.toast.msg =
            e.body.message || "Oops! An error occured. Please try again";
          this.toast.show = true;
        });
    },
    submit() {
      this.snackbar.msg = "preparing invoice...";
      this.snackbar.show = true;
      let form = this.form;
      this.$router.push({ name: "withdrawal2", params: { form } });
    },
    referToSettings() {
      let refer = () => {
        this.snackbar.msg =
          "You have no accounts. You will be redirected to add a bank account";
        this.snackbar.show = true;
        setTimeout(
          () =>
            this.$router.push({ name: "settings", params: { redirect: true } }),
          2500
        );
      };
      this.items.length == 0 ? refer() : "";
    }
  },
  created() {
    if (this.$route.params.form) {
      this.form.amount = this.$route.params.form.amount;
      this.form.pin = this.$route.params.form.pin;
    }
    this.$http.get("user/me/bank").then(res => {
      this.items = res.body.data;
    });
    this.getEarnings();
  },
  computed: {
    ...mapGetters(["account", "earnings"]),
    trueEarnings() {
      let trueEarnings = [];
      this.earnings.map(earning => {
        if (!earning.canceled) trueEarnings.push(earning);
      });
      return trueEarnings;
    },
    trueEarningsKoloFlex() {
      return this.earnings.filter(earning => earning.name.toLowerCase() === "kolo-flex" && !earning.canceled);
    }
  }
};
</script>
<style>
.img-wrap {
  width: 0;
  background: transparent !important;
}
.img-wrap img {
  margin-right: 10px;
  border-radius: 100%;
  background: #439eed;
  padding: 10px;
}
.btn-submit {
  margin: 0 !important;
}
.no-pads .col-7,
.no-pads .col-8,
.no-pads .col-4,
.no-pads .col-5 {
  padding: 0 !important;
}

@media (max-width: 700px) {
  div#investment-one .bottom-form-step form select#exampleSelect1 {
    width: 270px;
  }
}
</style>
