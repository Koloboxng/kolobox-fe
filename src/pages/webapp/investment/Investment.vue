<template>
  
  <div class="col-lg-10 p-0" data-app >
    <div class="rightSide-page-title"><h6>Investment</h6></div>
    <div class="rightSide-main investment-goal" id="investment-one">
      <section id="investment-interest">
        <div class="row">
          <div class="col-md-8">
            <aside id="investment">
              <div class="title-step-top">
                <h6>
                  {{
                    !edit
                      ? "What is your investment goal ?"
                      : "Edit your Investment goal"
                  }}
                </h6>
              </div>
              <div class="bottom-form-step">
                <form class="form-inline" v-on:submit.prevent="validateForm">
                  <div class="form-group w-100" v-show="!isThereGoal">
                    <label for="liketoinvest">I’d like to save</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          >₦</span
                        >
                      </div>
                      <input
                        type="text"
                        name="amount"
                        ref="amount"
                        v-validate="'required'"
                        v-model="form.amount"
                        id="liketoinvest"
                        class="form-control"
                        placeholder=""
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
                  <div class="form-group w-150" v-show="!isThereGoal">
                    <label for="exampleSelect1">towards</label>
                    <select
                      class="form-control"
                      v-model="form.purpose"
                      name="purpose"
                      v-validate="'required'"
                      id="exampleSelect1"
                    >
                      <option value="Wedding" selected>Wedding</option>
                      <option value="School fees">School fees</option>
                      <option value="Birthday">Birthday</option>
                      <option value="New gadget">New gadget</option>
                      <option value="Education">Education</option>
                      <option value="Car">Car</option>
                      <option value="Other">Other</option>
                      <span
                        v-show="errors.has('purpose')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("purpose") }}</span
                      >
                    </select>

                    <label for="date-on">on</label>
                    <div class="input-group">
                      <datetime
                        v-validate="'required'"
                        v-model="form.due_date"
                        name="date"
                      >
                      </datetime>
                      <span
                        v-show="errors.has('date')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("date") }}</span
                      >
                    </div>
                  </div>
                  <button
                    type="submit"
                    v-show="edit"
                    class="btn-submit"
                    :disabled="errors.any()"
                    @click="validateForm"
                  >
                    Update
                  </button>
                  <button
                    type="submit"
                    v-show="!edit && !isThereGoal"
                    class="btn-submit"
                    @click="validateForm"
                  >
                    Create
                  </button>
                  <button
                    type="submit"
                    class="btn-submit"
                    v-show="edit"
                    @click="
                      edit = false;
                      isThereGoal = true;
                      form.amount = '';
                      form.purpose = '';
                    "
                  >
                    Exit
                  </button>
                  <span id="agreementClause" v-show="edit || !isThereGoal"
                    >I agree to the KoloBox
                    <a class="blue"
                      ><u slot="activator" @click="termDialog = true"
                        >Terms of Use
                      </u></a
                    >and
                    <a class="blue"
                      ><u slot="activator" @click="termDialog = true"
                        >Privacy policy
                      </u></a
                    >.</span
                  >
                  <div v-if="getGoal" v-show="isThereGoal">
                    <div class="form-group w-100 border-bottom">
                      <p class="amount-balance">
                        You have invested
                        <span class="blue-two">{{
                          getGoal.amount_saved || 0 | currency("₦", 2)
                        }}</span>
                        ( wallet balance ) towards your
                        <span class="blue-two">{{
                          getGoal.purpose || "Other"
                        }}</span
                        >, which has a goal of
                        <span class="blue-two">{{
                          getGoal.goal_amount || 0 | currency("₦", 2)
                        }}</span>
                      </p>
                    </div>
                    <div class="days-target-progress row">
                      <div class="col-sm-5">
                        <div class="row">
                          <div class="col-6">
                            <v-progress-circular
                              :rotate="360"
                              :size="100"
                              :width="15"
                              :value="getGoal.percentageAmountSaved"
                              color="teal"
                            >
                              {{
                                getGoal.percentageAmountSaved > 100
                                  ? 100
                                  : getGoal.percentageAmountSaved ||
                                    0 | percent(2)
                              }}
                            </v-progress-circular>
                            <h6>Target Achieved</h6>
                          </div>
                          <div class="col-6">
                            <v-progress-circular
                              :rotate="-90"
                              :size="100"
                              :width="15"
                              :value="100 - getGoal.days_left"
                              color="primary"
                            >
                              {{
                                getGoal.days_left < 0 ? 0 : getGoal.days_left
                              }}
                            </v-progress-circular>
                            <h6>Days Left</h6>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-7 d-flex align-items-center">
                        <h5 class="progress-description">
                          You have achieved
                          {{
                            getGoal.percentageAmountSaved > 100
                              ? 100
                              : getGoal.percentageAmountSaved || 0 | percent(2)
                          }}
                          of your target ,
                          {{
                            100 - getGoal.percentageAmountSaved < 0
                              ? 0
                              : 100 - getGoal.percentageAmountSaved ||
                                0 | percent(2)
                          }}
                          remaining
                        </h5>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row">
                  <button
                    style="margin:30px 0px 0px 30px !important;padding:0px 20px 0px 20px;"
                    type="submit"
                    class="btn-submit"
                    @click="updateGoal"
                    v-show="isThereGoal"
                  >
                    Edit Goal
                  </button>
                  <router-link
                    class="nav-link"
                    to="/index/products"
                    v-show="isThereGoal"
                    >Pay for a Product</router-link
                  >
                </div>
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
    <v-dialog v-model="termDialog" persistent max-width="690">
      <terms-of-use />
      <v-card>
        <v-btn
          class="headline blue lighten-5 "
          style="position:fixed;bottom:28px;right:20px;"
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
import { mapActions } from "vuex";
import dateMixin from "@/mixins/dateMixin.js";
import loader from "@/components/loader";
import termsOfUse from "@/components/termsOfUse";

export default {
  mixins: [dateMixin],
  components: {
    loader,
    termsOfUse
  },
  data() {
    return {
      form: {
        purpose: "",
        amount: "",
        due_date: ""
      },
      snackbar: {
        msg: "",
        show: false
      },
      edit: false,
      isThereGoal: false,
      getGoal: null,
      loaded: false,
      termDialog: false,
      simulate: false
    };
  },
  created() {
    this.userGoal();
  },
  methods: {
    ...mapActions(["getUserGoal"]),
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.edit ? this.update() : this.submit();
          }
        })
        .catch(e => {
          this.snackbar.msg = "Oops! An error occured. Please try again";
          this.snackbar.show = true;
        });
    },
    returnError() {
      this.snackbar.msg = "Please choose a valid date";
      this.snackbar.show = true;
    },
    submit() {
      this.snackbar.msg = "Creating...";
      this.snackbar.show = true;
      let form = this.form;

      let createData = () => {
        this.$http
          .post("user/investment/goal", form, { emulateJSON: true })
          .then(res => {
            this.snackbar.msg = "Your investment goal has been saved";
            this.snackbar.show = true;
            this.form.purpose = "";
            this.form.due_date = "";
            this.form.amount = "";
            return true;
          })
          .then(res => {
            this.userGoal();
          })
          .catch(e => {
            this.snackbar.msg =
              e.body.message.message || "Oops! An error occured. Try again";
            this.snackbar.show = true;
          });
      };

      this.dateEligible(this.form.due_date) ? createData() : this.returnError();
    },
    updateGoal() {
      this.$refs.amount.focus();
      this.edit = true;
      this.isThereGoal = false;
      this.form.amount = this.getGoal.goal_amount;
      this.form.purpose = this.getGoal.purpose || "Other";
      this.form.due_date = this.getGoal.due_date;
    },
    update() {
      this.snackbar.msg = "Updating...";
      this.snackbar.show = true;
      let putData = () => {
        this.$http
          .put("user/investment/goal", this.form, { emulateJSON: true })
          .then(res => {
            this.snackbar.msg = res.body.data;
            this.userGoal();
            this.form.amount = "";
            this.form.purpose = "";
            this.form.due_date = "";
            this.edit = false;
          });
      };
      this.dateEligible(this.form.due_date) ? putData() : this.returnError();
    },
    dateEligible(selectedDate) {
      if (new Date(selectedDate) >= new Date()) return true;
      return false;
    },
    userGoal() {
      this.$http
        .get("user/investment/goal")
        .then(res => {
          if (res.body.data === "no investment goal") {
            this.isThereGoal = false;
            this.loaded = true;
            return;
          }
          this.getGoal = res.body.data;
          this.isThereGoal = true;
          this.loaded = true;
        })
        .catch(e => {
          this.snackbar.msg = "Oops! An Error occured. Please try again";
          this.snackbar.show = true;
        });
    }
  }
};
</script>

<style scoped>
.v-progress-circular {
  margin: auto;
  display: block;
  margin-bottom: 15px;
}

h3.progress-description {
  text-align: center;
  margin: 20px 0 0 0;
}
#investment button.btn-submit {
  margin: 0;
}
#investment label {
  float: left;
}

a {
  margin: 30px 0px 0px 5px !important;
}

#agreementClause {
  margin: 15px 150px 0px 15px !important;
  font-size: 12px;
  color: grey;
}
@media (max-width: 700px) {
  #agreementClause {
    margin: 15px 0px 0px 15px !important;
  }
  h6 {
    font-size: 80% !important;
  }
}
</style>
