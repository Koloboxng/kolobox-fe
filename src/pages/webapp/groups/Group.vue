
<template>
  <div id="dashboard" data-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title"><h6>Group Product</h6></div>
      <div class="rightSide-main" id="product-group">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-12">
              <aside id="investment">
                <div class="title-step-top"><h6>Add Group Product</h6></div>
                <div class="bottom-form-step">
                  <form class="form-inline" v-on:submit.prevent="validateForm">
                    <div class="form-group w-150">
                      <label for="exampleSelect5"
                        >I want to setup a new group
                      </label>
                      <select
                        class="form-control"
                        name="group"
                        v-validate="'required'"
                        id="exampleSelect5"
                        v-model="form.group_type_id"
                        v-if="allGroups"
                      >
                        <option
                          v-for="item in allGroups.filter(
                            x => x.Name.toLowerCase() === 'kolo-group'
                          )"
                          :value="item.id"
                          :key="item.id"
                          selected
                          >{{ item.Name }}</option
                        >
                      </select>
                      <span
                        v-show="errors.has('group')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("group") }}</span
                      >
                    </div>
                    <div class="form-group w-150">
                      <label for="exampleSelect9"
                        >I’d like to name this group</label
                      >
                      <input
                        type="text"
                        id="exampleSelect9"
                        name="groupName"
                        v-validate="'required'"
                        class="form-control"
                        placeholder=""
                        aria-label=""
                        aria-describedby="basic-addon1"
                        v-model="form.name"
                      />
                      <span
                        v-show="errors.has('groupName')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("groupName") }}</span
                      >
                    </div>
                    <div class="form-group w-100 my-4">
                      <label for="exampleSelect19">for</label>
                      <select
                        class="form-control"
                        name="tenor"
                        v-validate="'required'"
                        id="exampleSelect19"
                        v-model="form.tenor_id"
                        v-if="allTenors"
                      >
                        <option
                          v-for="item in allTenors"
                          :value="item.id"
                          selected
                          :key="item.id"
                          >{{ item.Tenor.split(" ")[0] }}</option
                        >
                      </select>

                      <label for="exampleSelect9">months</label>
                      <span
                        v-show="errors.has('tenor')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("tenor") }}</span
                      >
                    </div>
                    <div class="form-group w-90">
                      <label for="exampleSelect9">I’d like to invest</label>
                      <input
                        type="number"
                        id="exampleSelect9"
                        name="amount"
                        v-validate="'required'"
                        class="form-control"
                        placeholder="₦"
                        aria-label=""
                        aria-describedby=""
                        v-model="form.minimum_amount"
                      />
                      <span
                        v-show="errors.has('amount')"
                        class="text-danger"
                        style="font-size:9px;font-weight:bold;"
                        >{{ errors.first("amount") }}</span
                      >
                    </div>
                    <div class="form-group w-100">
                      <label for="exampleSelect2"></label>
                      <select
                        class="form-control"
                        id="exampleSelect2"
                        v-validate="'required'"
                        name="frequency"
                        v-model="form.frequency"
                      >
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
                    <div class="custom-table w-100 ">
                      <div class="custom-table-row border border-bottom-0">
                        <p class="invite-members">Invite Members</p>
                      </div>
                      <div class="custom-table-row trc">
                        <v-combobox
                          v-model="chips"
                          label="After each Email, Press ENTER to add"
                          chips
                          clearable
                          prepend-icon="filter_list"
                          solo
                          multiple
                        >
                          <template slot="selection" slot-scope="data">
                            <v-chip
                              :selected="data.selected"
                              close
                              @input="remove(data.item)"
                            >
                              <strong>{{ data.item }}</strong
                              >&nbsp; <span>(Email)</span>
                            </v-chip>
                          </template>
                        </v-combobox>
                      </div>
                    </div>
                    <button
                      type="submit"
                      :disabled="errors.any()"
                      class="btn-submit"
                    >
                      Confirm
                    </button>
                  </form>
                  <span class="spanStyle"
                    >By clicking, I agree to the KoloBox
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
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
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
  data() {
    return {
      snackbar: {
        msg: "",
        show: false
      },
      form: {
        name: "",
        tenor_id: "",
        group_type_id: "",
        minimum_amount: "",
        frequency: ""
      },
      inviteForm: {
        email: "",
        group_id: ""
      },
      chips: []
    };
  },
  methods: {
    ...mapActions([
      "createGroup",
      "getGroups",
      "getTenors",
      "inviteMembers",
      "validateGroup",
      "getAllProducts"
    ]),
    submit() {
      this.snackbar.msg = "Creating Group...";
      this.snackbar.show = true;
      return this.$http
        .post("group/create", this.form, { emulateJSON: true })
        .then(res => {
          this.inviteForm.group_id = res.body.data.id;
          if (this.chips.length > 0) {
            this.chips.forEach(email => {
              this.inviteForm.email = email;
              this.inviteMembers({
                form: this.inviteForm,
                snackbar: this.snackbar
              });
            });
            this.snackbar.msg = "Your invites have been sent!";
            this.chips = [];
          }
          this.snackbar.msg = "You will be redirected to pay for this product";
        })
        .then(() => {
          const product_id = this.allProduct.find(
            x => x.name.toLowerCase() === 'kolo-group'
          ).id;

          // product/check/usergroupproduct

          // product_id: product_id
          // product/check/userproduct

          this.$http.post("product/check/userproduct", {
            grou_id: this.inviteForm.group_id
          },
          {
            emulateJSON: true
          })
          .then(res => {
            if(res.body.status){
              this.$router.push("/index/group")
            } else {
              this.validateGroup({
              router: this.$router,
              snackbar: this.snackbar,
              form: {
                group_id: this.inviteForm.group_id,
                deposit_amount: this.form.minimum_amount,
                saving_frequency: this.form.frequency,
              }
            });
            }
          }).catch(e => {
            this.validateGroup({
              router: this.$router,
              snackbar: this.snackbar,
              form: {
                group_id: this.inviteForm.group_id,
                deposit_amount: this.form.minimum_amount,
                saving_frequency: this.form.frequency,
              }
            });
          })
        })
        .catch(e => {
          this.snackbar.msg = e.body.message.message || e.body.message;
          this.snackbar.show = true;
        });
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) this.submit();
        })
        .catch(e => {
          console.log({e})
          this.snackbar.msg =
            e.message || "Oops! An error occured. Please try again";
          this.snackbar.show = true;
        });
    }
  },
  created() {
    this.getGroups();
    this.getTenors();
    this.getAllProducts();
  },
  computed: {
    ...mapGetters(["allGroups", "allTenors", "allProduct"])
  }
};
</script>

<style>
.spanStyle {
  font-size: 9px;
  color: gray;
}
.custom-table {
  margin-top: 50px !important;
}
</style>