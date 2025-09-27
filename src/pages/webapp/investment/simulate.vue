<template>
  <v-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title"><h6>Simulate Returns</h6></div>
      <div class="rightSide-main investment-goal" id="investment-one">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-8">
              <aside id="investment">
                <div class="title-step-top">
                  <h6>Track Your Investments Payout</h6>
                </div>
                <div class="bottom-form-step">
                  <form class="form-inline" v-on:submit.prevent="validateForm">
                    <div class="form-group w-150">
                      <label for="exampleSelect1">Select Product</label>
                      <select
                        class="form-control"
                        v-model="form.product"
                        name="purpose"
                        v-validate="'required'"
                        id="exampleSelect1"
                      >
                        <option
                          v-if="allProduct"
                          v-for="(product, index) in allProduct
                            .filter // Exclude the group products
                            (e => e.product_category_id < 3)"
                          :key="index"
                          :value="product"
                          selected
                          >{{ product.name }}
                        </option>
                        <span
                          v-show="errors.has('purpose')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("purpose") }}</span
                        >
                      </select>
                    </div>
                    <div class="form-group w-100" v-if="form.product">
                      <v-subheader>Select duration</v-subheader>

                      <v-slider
                        v-model="form.days"
                        :tick-labels="
                          form.product.name == 'KOLO-FLEX'
                            ? fourOptions
                            : twoOptions
                        "
                        :max="form.product.name == 'KOLO-FLEX' ? 4 : 2"
                        step="1"
                        ticks
                        always-dirty
                        thumb-label="always"
                        track-color="blue"
                        color="red"
                        class="reduceText"
                      >
                      </v-slider>
                    </div>
                    <div class="form-group w-100" v-if="form.product">
                      <label for="exampleSelect1">Enter Amount</label>
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
                          placeholder=""
                          v-model="form.deposit_amount"
                          name="amount"
                          v-validate="'required'"
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
                    <div class="form-group w-100" v-if="finalReturn">
                      <h5>
                        Expected Investment Return:
                        {{ this.finalReturn || 0 | currency("₦", 2) }}
                      </h5>
                    </div>
                    <button
                      type="submit"
                      class="btn-submit"
                      :disabled="errors.any()"
                    >
                      Simulate
                    </button>
                    <button
                      @click="redirectToProduct()"
                      v-if="finalReturn"
                      class="btn-submit"
                      id="proceedButton"
                    >
                      Proceed with Investment
                    </button>
                  </form>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <v-snackbar v-model="snackbar.show" top right color="black">
        {{ snackbar.msg }}
        <v-btn flat small dark @click.native="snackbar.show = false"
          >Close</v-btn
        >
      </v-snackbar>
    </div>
  </v-app>
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
  data() {
    return {
      form: {
        product: null,
        days: null,
        deposit_amount: null
      },
      snackbar: {
        msg: "",
        show: false
      },
      twoOptions: ["0 days", "90 days", "180 days"],
      fourOptions: ["0 days", "30 days", "60 days", "90 days", "180 days"],
      finalReturn: null,
      window: {
        width: 0
      }
    };
  },
  methods: {
    ...mapActions(["getAllProducts"]),
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
      let numberOfDays;
      if (this.form.days == 0) {
        this.snackbar.msg = "Please select a duration";
        this.snackbar.show = true;
      }
      if (this.form.product.name == "KOLO-FLEX")
        numberOfDays = Number(this.fourOptions[this.form.days].split(" ")[0]);
      else numberOfDays = Number(this.twoOptions[this.form.days].split(" ")[0]);

      let rate = 1 + Number(this.form.product.interest_rate) / (365 * 100);

      let interest = Math.pow(rate, numberOfDays);

      this.finalReturn = this.form.deposit_amount * interest;
    },
    redirectToProduct() {
      this.$router.push({ name: "products", params: { form: this.form } });
    }
  },
  computed: {
    ...mapGetters(["allProduct"])
  },
  created() {
    this.getAllProducts();
    this.window.width = window.innerWidth;
  }
};
</script>

<style scoped>
#liketoinvest {
  width: 200px !important;
}
@media (max-width: 650px) {
  #proceedButton {
    margin-top: 8px !important;
  }
  .v-slider__ticks > span {
    font-size: 10px !important;
  }
  .v-slider {
    font-size: 10px !important;
  }
  .reduceText {
    font-size: 12px !important;
  }
}
</style>
