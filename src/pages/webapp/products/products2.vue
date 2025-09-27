<template>
  <div class="col-lg-10 p-0" data-app>
    <div class="rightSide-page-title"><h6>Investment</h6></div>
    <div class="rightSide-main" id="investment-one">
      <section id="investment-interest">
        <div class="row">
          <div class="col-md-6">
            <aside id="investment">
              <div class="title-step-top">
                <h6>Investment</h6>
                <p>Step 2 of 2</p>
              </div>
              <div class="bottom-form-step">
                <div
                  class="alert alert-light d-flex wallet-balance-alert"
                  role="alert"
                >
                  <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-money-check-alt"></i></span>
                  <p>
                    Your wallet balance is
                    <span v-if="account">{{
                      account.wallet.account_balance || 0 | currency("₦", 2)
                    }}</span>
                  </p>
                </div>
                <article class="first-article">
                  <h3>You are all done !</h3>
                  <div class="two-img-wrap">
                    <div class="circle-box">
                      <img src="@/assets/images/coins.png" />
                    </div>
                    <div>
                      <img src="@/assets/images/arrow-between-images.png" />
                    </div>
                    <div class="circle-box">
                      <img src="@/assets/images/bank-icon.png" />
                    </div>
                  </div>
                  <p id="payment-status">
                    Your payment of
                    <span>{{ amount || 0 | currency("₦", 2) }}</span> was
                    successful
                  </p>
                </article>
                <article class="second-article">
                  <p>What would you like to do next ?</p>
                  <div class="buttons-wrapper">
                    <router-link class="nav-link" to="/index/dashboard"
                      >Back to dashboard</router-link
                    >
                    <button type="submit" class="btn-submit">
                      <router-link class="link" to="/index/products">
                        Payment</router-link
                      >
                    </button>
                  </div>
                </article>
              </div>
            </aside>
          </div>
        </div>
      </section>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      amount: ""
    };
  },
  methods: {
    getAmount() {
      if (this.$route.params.amount) this.amount = this.$route.params.amount;
    }
  },
  created() {
    this.getAmount();
  },
  computed: {
    ...mapGetters(["account"])
  }
};
</script>
