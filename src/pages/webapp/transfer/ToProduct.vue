<template>
  <div class="col-lg-10 p-0" data-app>
    <div class="rightSide-page-title"><h6>Transfer</h6></div>
    <div class="rightSide-main Withdrawal" id="investment-one">
      <section id="investment-interest">
        <div class="row">
          <div class="col-md-6">
            <aside id="investment">
              <div class="title-step-top">
                <h6>Transfer Balance</h6>
                <p>Step {{ step }} of 3</p>
              </div>
              <div v-if="firstStep" class="bottom-form-step">
                <div class="alert alert-light d-flex wallet-balance-alert" role="alert">
                  <div class="img-wrap" v-if="account">
                    <img src="@/assets/images/alert-wallet-icon.png" alt="wallet-icon"/>
                  </div>
                  <p>
                    Your wallet balance is <span>{{ account.wallet.account_balance || 0 | currency("₦", 2) }}</span>
                  </p>
                </div>
                <form>
                  <div class="form-group w-100">
                    <label for="liketoinvest">I’d like to transfer</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">₦</span>
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
                      <span v-show="errors.has('amount')" class="text-danger" style="font-size:9px;font-weight:bold;">
                        {{ errors.first("amount") }}
                      </span>
                    </div>
                  </div>
                  <div v-if="earnings.length" class="form-group w-100">
                    <label for="exampleSelect12">from</label>
                    <select
                      class="form-control"
                      id="exampleSelect12"
                      v-model="from_product_id"
                      disabled>
                      <option
                        :key="index"
                        :value="item.id"
                        selected
                        v-for="(item, index) in koloFlexEarnings"
                        >{{ item.name | capitalize }}</option>
                    </select>
                  </div>
                  <div v-if="earnings.length" class="form-group w-100">
                    <label for="exampleSelect13">to</label>
                    <select
                      class="form-control"
                      id="exampleSelect13"
                      v-model="form.product_id"
                      name="product_id"
                      v-validate="'required'">
                      <option :value="item.id" :key="index" selected v-for="(item, index) in otherEarnings">
                        {{ item.name | capitalize }}
                      </option>
                    </select>
                    <span v-show="errors.has('product')" class="text-danger" style="font-size:9px;font-weight:bold;">
                      {{ errors.first("product") }}
                    </span>
                  </div>
                  <div class="form-group w-150"></div>
                  <button
                    @click.prevent="validateForm()" 
                    :disabled="errors.has('amount') || errors.has('product')" 
                    class="btn-submit">
                    Continue
                  </button>
                </form>
                <span style="margin:19px 0px 0px 4px !important;font-size: 12px;color:grey;">
                  Please withdrawal amounts must exceed ₦1000
                </span>
              </div>

              <div v-if="secondStep" class="bottom-form-step">
                <article class="first-article text-center">
                  
                    <i src="fa fas-wallet" alt="money-transfer"></i>
            
                  <h5>Your Transfer</h5>
                  <p>Does everything look ok ?</p>
                </article>
                <article class="second-article">
                  <p class="amount-bank">
                    Amount
                    <span>{{ form.amount | currency("₦", 2) }}</span> to
                    <span>product {{ selectedProduct }}</span>
                  </p>
                  <p class="delivery-date">
                    Your estimated delivery date is <span>{{ formatDate(getBusinessEndDate(3)) || 0 }}</span>
                  </p>
                </article>
                <div class="buttons-wrapper">
                  <button class="second-btn" @click="previous()">Edit Details</button>
                  <button class="btn-submit" @click="openDialog()">Confirm</button>
                </div>
                <span class="bringBelow">
                  I agree to the KoloBox
                  <a class="blue">
                    <u slot="activator" @click="termDialog = true">Terms of Use</u>
                  </a>and
                  <a class="blue">
                    <u slot="activator" @click="termDialog = true">Privacy policy</u>
                  </a>.
                </span>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
    <div>
      <v-dialog v-model="pinDialog" max-width="500px">
        <v-card ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span>Enter your pin to continue</span>
          </v-card-title>
          <v-card-title>
            <v-text-field
              type="text"
              label="Pin code"
              v-model.number="form.pin"
              v-validate="'required|min:4'"
              mask="# - # - # - #"
            ></v-text-field>
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="closeDialog()">Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="!valid" color="blue" class="delivery-date" @click.stop="submit()">Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
import dateMixin from "@/mixins/dateMixin.js";

export default {
  name: "TransferToProduct",
  mixins: [dateMixin],
  data() {
    return {
      step: 1,
     
      from_product_id: "",
      form: {
        amount: "",
        product_id: "",
        pin: ""
      },
      snackbar: {
        show: false,
        msg: ""
      },
      items: [],
      valid: false,
      pinDialog: false
    };
  },
  methods: {
    ...mapActions(["getProfile", "getEarnings"]),
    async validateForm() {
      const firstStepValidations = Promise.all([
        this.$validator.validate("amount"),
        this.$validator.validate("product_id")
      ]);
      const vall = this.form.amount;
      if(vall >= 1000)
      {
       const firstStepValid = (await firstStepValidations).every(isValid => isValid);

      if (firstStepValid) {
        this.next();
        return;
      }
  else{
         this.toast.msg = "Sorry!! minimum is 1000 Naira";
      this.toast.show = true;
      }
      }
    
      
     this.toast.msg = "Oops! An error occured. Please try again";
      this.toast.show = true;
      
    

      
    },
    submit() {
      this.snackbar.msg = "Sending...";
      this.snackbar.show = true;

      //Check if Pin is valid

      this.$http
        .post("helpers/verifyPin", {
          user_id: this.account.user.id,
          pin: this.form.pin
        })
        .then(res => {
          if (!res.data.status) return;

          this.snackbar.message = res.data.message;
          this.snackbar.show = true;

          //If pin is valid, process transaction
          this.$http
            .post("user/me/wallet/move-funds", this.form, { emulateJSON: true })
            .then(res => {
              this.snackbar.msg = res.body.data.message || 'Success.';
            })
            .catch(e => {
              this.snackbar.msg = e.body.message;
              this.snackbar.show = true;
            })
            .finally(this.toDashboard);
        })
        .catch(e => {
          //Handle error from the rate limiter or the pin controller
          this.snackbar.msg =
            typeof e.data === "string"
              ? e.data
              : e.data.message.message || "Invalid Pin";
          this.snackbar.show = true;
        })
        .finally(this.toDashboard);
    },
    toDashboard() {
      this.closeDialog();
      setTimeout(() => {
        this.getProfile().then(() => this.$router.push("index/dashboard"));
      }, 3500);
    },
    next() {
      ++this.step;
    },
    previous() {
      if (this.step > 1) --this.step;
    },
    openDialog() {
      this.pinDialog = true;
    },
    closeDialog() {
      this.pinDialog = false;
      this.form.pin = "";
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
    koloFlexEarnings() {
      return this.earnings.filter(({ canceled, name }) => !canceled && name === "KOLO-FLEX");
    },
    otherEarnings() {
      return this.earnings.filter(({ canceled, name }) => !canceled && name === "KOLO-TARGET" || name === "KOLO-FAMILY" || name === "KOLO-TARGET-PLUS");
    },
    firstStep() {
      return this.step === 1;
    },
    secondStep() {
      return this.step === 2;
    },
    selectedProduct() {
      const product = this.earnings.find(({ id }) => id === this.form.product_id);
      return product ? product.name : '';
    }
  },
  watch: {
    koloFlexEarnings(val) {
      // Select a KOLO-FLEX product if at least one exists
      if (val.length && !this.from_product_id) this.from_product_id = val[0].id; 
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
