<template>
  <div id="dashboard" data-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title"><h6>Investment</h6></div>
      <div class="rightSide-main" id="investment-one">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-6">
              <aside id="investment">
                <div class="title-step-top">
                  <h6>Add Investment Product</h6>
                  <p>Step 1 of 2</p>
                </div>
                <div class="px-4 py-4">
                  <h3>Alternative Payment:</h3>
                  <p>
                    You can make payment into this account:
                    <br>
                    Account Name: UBA NOM Radix AML KoloBox
                    <br>
                    Account Number: 1024694431
                    <br>
                    Banmk Name: UBA
                    <br>
                    <span>Take note, that your payment may take up to 0-24 hours confirmation</span>
                  </p>
                </div>
                <div class="bottom-form-step">
                  <div
                    class="alert alert-light d-flex wallet-balance-alert"
                    role="alert"
                  >
                    
                     <i class=" fas fa-wallet"></i>
                    
                    <p>
                      Your wallet balance is
                      <span>
                        {{
                          account.wallet.account_balance || 0 | currency("₦", 2)
                        }}
                      </span>
                    </p>
                  </div>
                  <form class="form-inline" v-on:submit.prevent="validateForm" style="border-radius:15px;">
                    <div class="form-group w-100">
                      <label for="paymentOption">Payment Option</label>
                      <select
                        class="form-control"
                        id="paymentOption"
                        v-validate="'required'"
                        name="payment"
                        v-model="form.payment"
                      >
                        <option value="paystack" selected>Paystack</option>
                        <!-- <option value="flutterwave">Flutterwave</option> -->
                      </select>
                      <span
                        v-show="errors.has('payment')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("payment") }}</span
                      >
                    </div>
                    <div class="form-group w-100">
                      <label for="liketoinvest">I’d like to invest</label>
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text" id="basic-addon1"
                            >₦</span
                          >
                        </div>
                        <input
                          type="text"
                          id="liketoinvest"
                          class="form-control"
                          placeholder
                          v-model="form.deposit_amount"
                          name="amount"
                          v-validate="'required'"
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
                    <div class="form-group w-100">
                      <label for="exampleSelect1">to</label>
                      <select
                        class="form-control"
                        id="exampleSelect1"
                        v-model="productDescription"
                        v-validate="'required'"
                        name="product"
                      >
                        <option
                          v-if="availableProducts.length && !isRedirected"
                          v-for="(product, index) in availableProducts"
                          :key="index"
                          :value="product"
                          selected
                        >
                          {{ product.name | capitalize }}
                        </option>
                        <option
                          v-if="isRedirected && productDescription"
                          :value="productDescription"
                          selected
                        >
                          {{ productDescription.name | capitalize }}
                        </option>
                      </select>
                      <span
                        v-show="errors.has('product')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("product") }}</span
                      >
                    </div>
                    <div v-if="productDescription" class="product-description">
                      <v-toolbar flat>
                        <v-toolbar-items>
                          <v-btn class="goBack" flat small left>
                            <v-icon color="red">info</v-icon>
                            Interest Rate:
                            {{ productDescription.interest_rate | percent(2) }}
                          </v-btn>
                          <v-btn flat small left>
                            Minimum Amount:
                            {{
                              productDescription.minimum_amount
                                | currency("₦", 2)
                            }}
                          </v-btn>
                          <v-btn flat small left
                            >Tenure:
                            {{ productDescription.tenor || 0 }} days</v-btn
                          >
                        </v-toolbar-items>
                      </v-toolbar>
                    </div>
                    <div class="form-group w-100">
                      <label for="exampleSelect2"></label>
                      <select
                        class="form-control"
                        id="exampleSelect2"
                        v-validate="'required'"
                        name="frequency"
                        v-model="form.saving_frequency"
                      >
                        <option value="once" selected>One Time</option>
                        <option value="daily" selected>Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <span
                        v-show="errors.has('frequency')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("frequency") }}</span
                      >
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success"
                      :disabled="errors.any()"
                    >
                      Confirm
                    </button>
                    <span class="spanStyle">
                      By clicking, I agree to the KoloBox
                      <a class="blue">
                        <u slot="activator" @click="termDialog = true"
                          >Terms of Use</u
                        > </a
                      >and
                      <a class="blue">
                        <u slot="activator" @click="termDialog = true"
                          >Privacy policy</u
                        > </a
                      >.
                    </span>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </div>
    <v-snackbar v-model="snackbar.show" top right color="black" multi-line>
      {{ snackbar.msg }}
      <v-btn flat small dark @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>
    <v-dialog v-model="termDialog" persistent max-width="690" data-app>
      <terms-of-use />
      <v-card>
        <v-btn
          class="headline blue lighten-5"
          style="position:fixed;bottom:25px;right:20px;"
          block
          @click.native="termDialog = false"
          >CLOSE</v-btn
        >
      </v-card>
    </v-dialog>
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
import config from "@/config/index";
import termsOfUse from "@/components/termsOfUse";

export default {
  components: {
    termsOfUse
  },
  name: "Investment",
  data() {
    return {
      snackbar: {
        show: false,
        msg: ""
      },
      form: {
        deposit_amount: "",
        saving_frequency: "",
        busy: false,
        payment: ""
      },
      loading: false,
      productDescription: null,
      allProducts: null,
      termDialog: false,
      isRedirected: false,
      group_id: "",
      access_code: "",
      authorization_url: "",
      reference: "",
      message: ""
    };
  },
  methods: {
    ...mapActions([
      "getAllProducts",
      "getProfile",
      "getDashboard",
      "getEarnings",
      "quickDeposit",
      "postProduct"
    ]),
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) this.submit();
        })
        .catch(e => {
          this.snackbar.msg = "Oops! An error occured. Please try again";
          this.snackbar.show = true;
        });
    },
    submit() {
      this.form.payment == 'paystack' ? this.snackbar.msg = "Paystack Loading..." : this.snackbar.msg = "Flutterwave Loading...";
      this.snackbar.show = true;

      let shouldSetTimeout = false;

      this.earnings.map(product => {
        /*If they want to select an already existing product, set time out to inform them it 
        will add to their subscriptions*/

        if (
          !product.canceled &&
          product.name === this.productDescription.name
        ) {
          shouldSetTimeout = true;
          this.snackbar.msg =
            "You are adding another subscription to this product, if this isn't what you want use the topup option on your dashboard to prevent adding another.";
        }
      });

      if (this.form.busy) return;

      if (
        Number(this.form.deposit_amount) <
        Number(this.productDescription.minimum_amount)
      ) {
        return (this.snackbar.msg =
          "This amount is less than the minimum amount");
      }

      // depositing
      // this.quickDeposit()
      this.postProduct({
        form: {
          id: this.account.user.id,
          deposit_amount: this.form.deposit_amount,
          saving_frequency: this.form.saving_frequency,
          payment: this.form.payment,
          busy: this.form.busy,
          product_id: this.productDescription.id,
          group_id: this.group_id
        },
        snackbar: this.snackbar
      }).then( res => {
        this.access_code = this.getProducts.data.access_code
        this.authorization_url = this.getProducts.data.authorization_url
        this.reference = this.getProducts.data.reference
        this.message = this.getProducts.message

        this.form.busy = true;

        //Check if setting timeout is needed or not
        if(this.form.payment == 'paystack'){
          shouldSetTimeout
          ? setTimeout(() => {
              this.payWithPaystack();
            }, 3500)
          : this.payWithPaystack();
        }

        //Check if setting timeout is needed or not
        if(this.form.payment == 'flutterwave'){
          shouldSetTimeout
          ? setTimeout(() => {
              this.makePayment();
            }, 3500)
          : this.makePayment();
        }
      })
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
          product_id: this.productDescription.id,
          group_id: this.group_id,
          saving_frequency: this.form.saving_frequency,
          product_type: this.productDescription.product_type,
          action: "productSelection",
          custom_fields: [
            {
              saving_frequency: this.form.saving_frequency,
              user: `${this.account.user.firstname} ${
                this.account.user.lastname
              } `,
              product: this.productDescription.name
            }
          ]
        },
        callback: response => {
          console.log({response})
          this.getProfile()
            .then(() => {
              this.getDashboard().then(() => {
                this.getEarnings();
                this.form.busy = false;
                this.snackbar.msg =
                  "Success. Transaction ref is " + response.reference;
                this.snackbar.show = true;
                this.group_id
                  ? this.$router.push("/index/group")
                  : this.$router.push({
                      name: "products_two",
                      params: { amount: Number(this.form.deposit_amount) }
                    });
              });
            })
            .catch(e => {
              this.snackbar.msg = e.body.message.message || e.body.message;
              this.snackbar.show = true;
            });
        },
        onClose: () => {
          this.form.busy = false;
          this.snackbar.msg = "Payment cancelled";
          this.snackbar.show = true;
        }
      };

      if (this.productDescription.name === this.allProduct[0].name)
        metadata.subaccount = config.KOLOFLEX_SUBACCOUNT;
      else metadata.subaccount = config.KOLOTARGET_SUBACCOUNT;
      if (metadata.subaccount) {
        // eslint-disable-next-line no-undef
        let handler = PaystackPop.setup(metadata);
        handler.openIframe();
      }
    },

    makePayment() {
      FlutterwaveCheckout({
          public_key: config.FLUTTERWAVE_KEY,
          tx_ref: `${new Date().toISOString()}`,
          amount: Number(this.form.deposit_amount),
          currency: "NGN",
          payment_options: "card, mobilemoneyghana, ussd",
          callback: response => {
          this.getProfile()
          .then(() => {
              this.getDashboard().then(() => {
              this.getEarnings();
              this.form.busy = false;
              this.snackbar.msg =
                  "Success. Transaction ref is " + response.reference;
              this.snackbar.show = true;
              this.group_id
                  ? this.$router.push("/index/group")
                  : this.$router.push({
                      name: "products_two",
                      params: { amount: Number(this.form.deposit_amount) }
                  });
              });
          })
          .catch(e => {
              this.snackbar.msg = e.body.message.message || e.body.message;
              this.snackbar.show = true;
          });
      },
      onClose: () => {
          this.form.busy = false;
          this.snackbar.msg = "Payment cancelled";
          this.snackbar.show = true;
      },
      redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
          meta: {
          consumer_id: 23,
          consumer_mac: "92a3-912ba-1192a",
          },
          customer: {
          email: this.account.user.email,
          phone_number: this.account.user.phone,
          name: this.fullName,
          },
          customizations: {
          title: "Kolobox",
          description: this.productDescription.name,
          logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
          },
      });
    }

  },

  computed: {
    ...mapGetters(["account", "allProduct", "earnings", "getProducts"]),
    availableProducts() {
      // Exclude the group products (except KOLO-FAMILY)
      return this.allProduct
        .filter(({ product_category_id, name }) => product_category_id < 3 || name === "KOLO-FAMILY");
    },
    getProductSelectionResult() {
      return this.getProducts
    },
    getProductSelectionResults() {
      return this.getProducts
    }
  },
  created() {
    this.getAllProducts();
    if (this.$route.params.form) {
      this.form.deposit_amount = this.$route.params.form.deposit_amount;
      this.productDescription = this.$route.params.form.product;
      this.isRedirected = true;
      this.snackbar.msg = this.$route.params.snackbarMessage || "";
      this.snackbar.show = true;
      this.group_id = this.$route.params.form.group_id;
      this.form.saving_frequency = this.$route.params.form.saving_frequency;
      this.form.payment = "paystack";
      console.log(this.$route.params.form)
      console.log(this.$route.params)
    }
    this.getEarnings();
  }
};
</script>

<style>
.product-description {
  margin: 7px 0px 15px -20px;
  width: 477px;
}
#paymentOption{
  width: 250px;
}
@media (max-width: 650px) {
  .product-description {
    width: 350px !important;
    margin: 0px;
  }
  div.v-btn__content {
    font-size: 8px;
    font-weight: bold;
  }
  .v-btn {
    font-size: 11px !important;
    padding: 4px;
  }
  div#investment-one .bottom-form-step form select#exampleSelect1 {
    width: 250px;
  }
  span.spanStyle {
    margin: 11px 0px 0px 0px !important;
  }
  button.btn-submit {
    margin-left: 0px !important;
  }
  h6 {
    font-size: 80% !important;
  }
}
.v-btn__content {
  margin-right: -7px !important;
}
.goBack {
  margin-left: -52px !important;
}
.terms {
  margin: 11px 0px 0px 20px !important;
  font-size: 10px;
  color: grey;
}
.btn-submit {
  margin-left: 20px !important;
}
.spanStyle {
  margin: 11px 40px 0px 3px !important;
  font-size: 10px;
  color: grey;
}
.v-btn {
  font-family: Raleway, sans-serif;
}
</style>
