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
                      <label for="exampleSelect1"
                        >How much would you like to make</label
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
                    <div class="form-group w-100">
                      <v-subheader>If you Save for</v-subheader>

                      <v-slider
                        v-model="form.days"
                        step="1"
                        ticks
                        always-dirty
                        thumb-label="always"
                        track-color="blue"
                        color="red"
                      >
                      </v-slider>
                    </div>

                    <div class="form-group w-100">
                      <h5>Amount To Invest:</h5>
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
      }
    };
  },
  methods: {
    ...mapActions(["getAllProducts"])
  },
  computed: {
    ...mapGetters(["allProduct"])
  },
  created() {
    this.getAllProducts();
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
}
</style>
