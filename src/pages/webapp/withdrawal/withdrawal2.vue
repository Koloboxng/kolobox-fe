<template>
  <div id="dashboard" data-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title">
        <h6>Withdrawal</h6>
      </div>
      <div class="rightSide-main Withdrawal" id="investment-one">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-6">
              <aside id="investment">
                <div class="bottom-form-step">
                  <article class="first-article text-center">
                    <div class="img-wrap-withdraw">
                      <img src="@/assets/images/money-transfer.png" alt="money-transfer">
                    </div>
                    <h5>Your Withdrawal</h5>
                    <p>Does everything look ok ?</p>
                  </article>
                  <article class="second-article" v-if="params">
                    <p class="amount-bank">
                      Amount
                      <span>{{ params.amount | currency("₦", 2) }}</span> to
                      <span>
                        {{ params.id.bank_name }}
                        {{ params.id.account_number }}
                      </span>
                    </p>
                    <p class="delivery-date">
                      Your estimated delivery date is
                      <span>
                        {{
                        formatDate(getBusinessEndDate(3)) || 0
                        }}
                      </span>
                    </p>
                  </article>
                  <form class="Withdrawal-2" v-on:submit.prevent>
                    <div class="buttons-wrapper">
                      <button class="second-btn" @click="Edit">Edit Details</button>
                      <button type="submit" class="btn-submit" @click="pinDialog = true">Confirm</button>
                    </div>
                  </form>
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
            <v-btn
              color="primary"
              flat
              @click.stop="
                pinDialog = false;
                form.pin = '';
              "
            >Close</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid"
              color="blue"
              class="delivery-date"
              @click.stop="
                pinDialog = false;
                submit();
                form.pin = '';
              "
            >Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-snackbar v-model="snackbar.show" top right color="black" multi-line>
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
  mixins: [dateMixin],
  data() {
    return {
      valid: false,
      snackbar: {
        msg: " ",
        show: false
      },
      form: {
        pin: ""
      },
      params: {},
      pinDialog: false,
      estimatedDate: ""
    };
  },
  methods: {
    ...mapActions(["getProfile", "getEarnings"]),
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
          if (res.data.status) {
            console.log('pinstatus', res.data.message);
            this.snackbar.message = res.data.message;
            this.snackbar.show = true;

            //If pin is valid, process transaction
            this.$http
              .post("user/account/transfer", this.form, { emulateJSON: true })
              .then(res => {
                this.snackbar.msg = res.body.data.message || 'Success.';
                console.log('invalid');
              })
              .catch(e => {
                console.log('invalidd', e);
                this.snackbar.msg = e.body.message;
                this.snackbar.show = true;
              })
              .finally(() => {
                setTimeout(() => {
                  this.getProfile().then(() => {
                    this.getEarnings().then(() => {
                      this.$router.push("index/dashboard");
                    });
                  });
                }, 3500);
              });
          }
        })
        .catch(e => {
          //Handle error from the rate limiter or the pin controller
          this.snackbar.msg =
            typeof e.data === "string"
              ? e.data
              : e.data.message.message || "Invalid Pin";
          this.snackbar.show = true;
        });
    },
    Edit() {
      let form = this.params;
      this.$router.push({ name: "withdraw", params: { form } });
    }
  },
  created() {
    this.params = this.$route.params.form;
    this.form.id = this.params.id.id;
    this.form.amount = this.params.amount;
    this.form.product_id = this.params.product_id;
  },
  computed: {
    ...mapGetters(["account"])
  }
};
</script>

<style>
.bringBelow {
  margin: 0px 0px 0px 35px !important;
  color: gray;
  font-size: 10px;
}
.delivery-date{
  background-color: blue !important;
  color: white !important;
}
</style>
