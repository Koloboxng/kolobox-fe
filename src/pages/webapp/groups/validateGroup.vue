<template>
  <v-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title"><h6>Validate Group</h6></div>
      <div class="rightSide-main investment-goal" id="investment-one">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-8">
              <aside id="investment">
                <div class="title-step-top">
                  <h6>Validate Your Invitation</h6>
                </div>
                <div class="bottom-form-step">
                  <form
                    class="form-login-pages"
                    v-on:submit.prevent="validateForm"
                  >
                    <div class="form-group w-150">
                      <label for="exampleSelect1">Please Enter Group ID</label>
                      <div class="input-group w-150">
                        <input
                          type="text"
                          id="liketoinvest"
                          class="form-control"
                          placeholder=""
                          v-model="form.group_id"
                          name="group"
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
                    <div class="bottom-form-area">
                      <div class="buttons-wrapper">
                        <button type="submit" class="btn-submit">
                          Validate
                        </button>
                      </div>
                    </div>
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        group_id: ""
      },
      snackbar: {
        msg: "",
        show: false
      }
    };
  },
  methods: {
    ...mapActions(["validateGroup"]),
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result)
            this.validateGroup({
              form: this.form,
              snackbar: this.snackbar,
              router: this.$router
            });
        })
        .catch(e => {
          this.snackbar.msg = "Oops! An error occured. Please try again";
          this.snackbar.show = true;
        });
    }
  }
};
</script>
