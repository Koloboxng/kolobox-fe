<template>
  <div class="col-lg-10 p-0" data-app>
    <div class="rightSide-page-title"><h6>Settings</h6></div>
    <div class="rightSide-main" id="settigs-main">
      <div class="row">
        <div class="col-md-8">
          <aside class="settings-tab">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <li
                  :class="first ? 'nav-item active' : 'nav-item'"
                  id="nav-home-tab"
                  data-toggle="tab"
                  role="tab"
                  aria-controls="nav-home"
                  @click="clicked(1)"
                  :aria-selected="first ? true : false"
                >
                  <a href="#nav-home" class=" nav-link">Account</a>
                </li>
                <li
                  :class="second ? 'nav-item active' : 'nav-item'"
                  id="Settings-tab"
                  data-toggle="tab"
                  href="#Settings"
                  role="tab"
                  aria-controls="Settings"
                  @click="clicked(2)"
                  :aria-selected="second ? true : false"
                >
                  <a href="#Settings" class=" nav-link">Password</a>
                </li>
                <li
                  :class="third ? 'nav-item active' : 'nav-item'"
                  id="Notifications-tab"
                  data-toggle="tab"
                  href="#Notifications"
                  role="tab"
                  aria-controls="Notifications"
                  @click="clicked(3)"
                  :aria-selected="third ? true : false"
                >
                  <a href="#Notifications" class=" nav-link">Pin</a>
                </li>
                <li
                  :class="fourth ? 'nav-item active' : 'nav-item'"
                  id="BankDetails-tab"
                  data-toggle="tab"
                  href="#BankDetails"
                  role="tab"
                  aria-controls="BankDetails"
                  @click="clicked(4)"
                  :aria-selected="fourth ? true : false"
                >
                  <a href="#BankDetails" class=" nav-link">Bank Details</a>
                </li>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
              <div
                :class="first ? 'tab-pane fade show active' : 'tab-pane fade'"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div class="tab-title"><h4>Basic Info</h4></div>
                <form
                  class="account"
                  v-on:submit.prevent="updateProfile({ form, snackbar })"
                >
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">First name:</span>
                        </div>
                        <section><input v-model="firstname" /></section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Last name:</span>
                        </div>
                        <section><input v-model="lastname" /></section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Email:</span>
                        </div>
                        <section>
                          <p>{{ account.user.email }}</p>
                        </section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-lock"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">D.O.B:</span>
                        </div>
                        <section><input v-model="dob" /></section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Phone:</span>
                        </div>
                        <section>
                          <p>{{ account.user.phone }}</p>
                        </section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-lock"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row mb-3">
                    <div class="col">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Next Of Kin:</span>
                        </div>
                        <section><input v-model="Next_Of_Kin" /></section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                    <div class="col">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Occupation:</span>
                        </div>
                        <section><input v-model="occupation" /></section>
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row mb-3">
                    <div class="col">
                      <div
                        class="input-group d-flex justify-content-start align-items-center"
                        style="height: 46px;"
                      >
                        <div class="input-group-prepend" style=" width: 82px;">
                          <span class="input-group-text">SMS Alert:</span>
                        </div>
                        <v-switch color="blue"></v-switch>
                      </div>
                    </div>
                  </div>
                  <div class="form-row mb-3">
                    <div class="col">
                      <div
                        class="input-group d-flex justify-content-start align-items-center"
                        style="height: 46px;"
                      >
                        <div class="input-group-prepend" style=" width: 82px;">
                          <span class="input-group-text">Email Alert:</span>
                        </div>
                        <v-switch color="blue"></v-switch>
                      </div>
                    </div>
                  </div>
                  <div class="form-row mb-3">
                    <button
                      type="submit"
                      class="btn-submit"
                      style="padding:0px 10px 0px 10px;font-size:15px;"
                    >
                      UPDATE
                    </button>
                  </div>
                </form>
              </div>
              <div
                :class="second ? 'tab-pane fade show active' : 'tab-pane fade'"
                id="Settings"
                role="tabpanel"
                aria-labelledby="Settings-tab"
              >
                <div class="tab-title"><h4>Update Password</h4></div>
                <form class="account" v-on:submit.prevent="updatePassword">
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Old Password:</span>
                        </div>
                        <section>
                          <input
                            v-model="passwordForm.old_password"
                            name="oldPassword"
                            v-validate="'required'"
                            type="password"
                            placeholder="Old Password"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('oldPassword')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("oldPassword") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">New Password:</span>
                        </div>
                        <section>
                          <input
                            v-model="passwordForm.new_password"
                            placeholder="New Password"
                            v-validate="'required|min:6'"
                            type="password"
                            name="newPassword"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('newPassword')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("newPassword") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-lock"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text"
                            >Confirm Password:</span
                          >
                        </div>
                        <section>
                          <input
                            v-model="passwordForm.new_cpassword"
                            name="cPassword"
                            v-validate="'required|min:6'"
                            type="password"
                            placeholder="Confirm Password"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('cPassword')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("cPassword") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button type="submit" class="btn-submit update">
                            UPDATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div
                :class="third ? 'tab-pane fade show active' : 'tab-pane fade'"
                id="Notifications"
                role="tabpanel"
                aria-labelledby="Notifications-tab"
              >
                <div class="tab-title"><h4>Update Pin</h4></div>
                <form
                  class="account"
                  v-on:submit.prevent="updatePin({ pinForm, snackbar })"
                >
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Old Pin:</span>
                        </div>
                        <section>
                          <input
                            v-model="pinForm.old_pin"
                            name="oldPin"
                            type="password"
                            v-validate="'required|min:4'"
                            v-mask="'####'"
                            placeholder="#-#-#-#"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('oldPin')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("oldPin") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">New Pin:</span>
                        </div>
                        <section>
                          <input
                            v-model="pinForm.new_pin"
                            type="password"
                            placeholder="#-#-#-#"
                            v-validate="'required|min:4'"
                            v-mask="'####'"
                            name="newPin"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('newPin')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("newPin") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-lock"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button type="submit" class="btn-submit update">
                            UPDATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <v-spacer></v-spacer>
                <div class="tab-title"><h4>Create Pin</h4></div>
                <form class="account" v-on:submit.prevent="createPin">
                  <div class="form-row mb-3">
                    <div class="col">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">CREATE PIN:</span>
                        </div>
                        <section>
                          <input
                            v-model="createForm.pin"
                            placeholder="#-#-#-#"
                            v-validate="'required|min:4'"
                            v-mask="'####'"
                            type="password"
                            name="pin"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('pin')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("pin") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                      <button class="btn-submit update" type="submit">
                        CREATE
                      </button>
                    </div>
                  </div>
                </form>
                <v-spacer></v-spacer>
                <div class="tab-title"><h4>Forgotten Pin?</h4></div>
                <div class="form-row mb-3">
                  <div class="col">
                    <div
                      class="input-group d-flex justify-content-start align-items-center"
                      style="height: 46px;"
                    >
                      <div class="input-group-prepend" style=" width: 82px;">
                        <button class="btn-submit update" @click="resetPin">
                          RESET PIN
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                :class="fourth ? 'tab-pane fade show active' : 'tab-pane fade'"
                id="BankDetails"
                role="tabpanel"
                aria-labelledby="BankDetails-tab"
              >
                <div class="tab-title">
                  <h4>Bank Accounts ({{ account.accounts.length }})</h4>
                </div>
                <div v-for="(bankAccount, i) in account.accounts" :key="i">
                  <debit-card
                    :number="bankAccount.bank_name"
                    :account-number="bankAccount.account_number"
                    :name="bankAccount.account_name"
                    class="ma-2"
                    type="bank"
                  ></debit-card>
                  <v-layout class="py-3">
                    <v-flex class="text-xs-center">
                      <v-btn
                        flat
                        color="error"
                        @click="
                          pinDialog = true;
                          bankAccountToDelete = bankAccount.id;
                        "
                        >remove</v-btn
                      >
                      <!--<v-btn flat  color="error" @click="editDialog = true; bankAccountToEdit = bankAccount">Edit</v-btn>-->
                    </v-flex>
                  </v-layout>
                  <div>
                    <v-dialog v-model="pinDialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span>Enter your pin to continue</span>
                        </v-card-title>
                        <v-card-title>
                          <v-text-field
                            type="text"
                            label="Pin code"
                            v-model.number="pinCode"
                            mask="# - # - # - #"
                          ></v-text-field>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            color="primary"
                            flat
                            @click.stop="
                              pinDialog = false;
                              pinCode = '';
                            "
                            >Close</v-btn
                          >
                          <v-spacer></v-spacer>
                          <v-btn
                            color="blue"
                            @click.stop="
                              pinDialog = false;
                              removeBank({
                                snackbar,
                                id: bankAccountToDelete,
                                pin: pinCode
                              });
                              pinCode = '';
                            "
                            >Continue</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                  <div>
                    <v-dialog v-model="editDialog" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <span>Edit your account details</span>
                        </v-card-title>
                        <v-card-title>
                          <v-form v-if="bankAccountToEdit">
                            <input
                              type="text"
                              placeholder="Account Number"
                              v-model="bankAccountToEdit.account_number"
                            />
                            <input
                              type="text"
                              placeholder="Account Name"
                              v-model="bankAccountToEdit.account_name"
                            />
                            <input
                              type="text"
                              placeholder="PIN"
                              v-model="editPin"
                            />
                            <select v-model="editBank">
                              <option
                                v-for="bank in banks.data"
                                :value="bank"
                                >{{ bank.name }}</option
                              >
                            </select>
                          </v-form>
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            color="primary"
                            flat
                            @click.stop="editDialog = false"
                            >Close</v-btn
                          >
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            @click.stop="
                              editDialog = false;
                              editBankdetails();
                              bankAccountToEdit = null;
                            "
                            >Continue</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </div>
                <div class="tab-title"><h4>Add Bank Account</h4></div>
                <form class="account" v-on:submit.prevent="createBank">
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Choose Bank:</span>
                        </div>
                        <section>
                          <select
                            v-model="bankForm.bank_name"
                            name="bankName"
                            v-validate="'required'"
                          >
                            <option
                              v-if="banks"
                              v-for="bank in banks.data"
                              :value="bank"
                              >{{ bank.name }}</option
                            >
                          </select>
                        </section>
                        <span
                          v-show="errors.has('bankName')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("bankName") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Account Number:</span>
                        </div>
                        <section>
                          <input
                            v-model="bankForm.account_number"
                            placeholder="Account Number"
                            v-validate="'required'"
                            type="text"
                            name="accNo"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('accNo')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("accNo") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-lock"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="col border-right-0 border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <span class="input-group-text">Account Name:</span>
                        </div>
                        <section>
                          <input
                            v-model="bankForm.account_name"
                            name="accName"
                            v-validate="'required'"
                            type="text"
                            placeholder="Account Name"
                            required
                          />
                        </section>
                        <span
                          v-show="errors.has('accName')"
                          class="text-danger"
                          style="font-size:9px;font-weight:bold;"
                          >{{ errors.first("accName") }}</span
                        >
                        <div class="input-group-append">
                          <a href="#" class="input-group-text"
                            ><i class="fas fa-pen"></i
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="form-row bg-grey">
                    <div class="col border-bottom-0">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button type="submit" class="btn-submit update">
                            CREATE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </aside>
        </div>
        <v-snackbar v-model="snackbar.show" top right color="black">
          {{ snackbar.msg }}
          <v-btn flat small dark @click.native="snackbar.show = false"
            >Close</v-btn
          >
        </v-snackbar>
      </div>
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
import { mapActions, mapGetters } from "vuex";
import debitCard from "@/components/debitCard";

export default {
  components: {
    debitCard
  },
  data() {
    return {
      snackbar: {
        msg: "",
        show: false
      },
      first: true,
      second: false,
      third: false,
      fourth: false,
      form: {},
      pinForm: {
        old_pin: "",
        new_pin: ""
      },
      createForm: {
        pin: ""
      },
      passwordForm: {
        old_password: "",
        new_password: "",
        new_cpassword: ""
      },
      bankForm: {
        bank_name: "",
        account_number: "",
        account_name: ""
      },
      detailsForm: {
        bank_name: "",
        account_number: "",
        account_name: "",
        pin: "",
        code: "",
        pay_with_bank: ""
      },
      bankAccountToDelete: null,
      bankAccountToEdit: null,
      pinDialog: false,
      pinCode: "",
      editDialog: false,
      editBank: null,
      editPin: null
    };
  },
  computed: {
    ...mapGetters(["account", "banks"]),
    firstname: {
      get() {
        return this.account.user.firstname;
      },
      set(value) {
        this.form.firstname = value;
      }
    },
    lastname: {
      get() {
        return this.account.user.lastname;
      },
      set(value) {
        this.form.lastname = value;
      }
    },
    dob: {
      get() {
        return this.account.user.dob.split("T")[0];
      },
      set(value) {
        this.form.dob = value;
      }
    },
    occupation: {
      get() {
        return this.account.user.occupation;
      },
      set(value) {
        this.form.occupation = value;
      }
    },
    Next_Of_Kin: {
      get() {
        return this.account.user.Next_Of_Kin;
      },
      set(value) {
        this.form.Next_Of_Kin = value;
      }
    }
  },

  mounted() {
    this.populateForm();
  },

  methods: {
    ...mapActions([
      "getProfile",
      "updateProfile",
      "updatePin",
      "resetPIN",
      "addBank",
      "removeBank"
    ]),
    editBankdetails() {
      this.snackbar.msg = "Updating...";
      this.snackbar.show = true;
      this.detailsForm = {
        bank_name: this.bankAccountToEdit.bank_name || "",
        account_number: this.bankAccountToEdit.account_number || "",
        account_name: this.bankAccountToEdit.account_name || "",
        pin: this.editPin,
        code: this.editBank.code,
        pay_with_bank: this.editBank.pay_with_bank
      };
      let id = this.bankAccountToEdit.id;
      let form = this.detailsForm;
      this.$http
        .put(`user/me/bank/${id}`, form, { emulateJSON: true })
        .then(res => {
          this.snackbar.msg = "Your details have been updated!";
        })
        .catch(e => {
          this.snackbar.msg =
            e.body.messag.message ||
            e.body.message ||
            "Oops! An error has occured. Try again";
        });
    },
    clicked(item) {
      if (item == 1) {
        this.first = true;
        this.second = this.third = this.fourth = false;
      }
      if (item == 2) {
        this.second = true;
        this.first = this.third = this.fourth = false;
      }
      if (item == 3) {
        this.third = true;
        this.first = this.second = this.fourth = false;
      }
      if (item == 4) {
        this.fourth = true;
        this.first = this.third = this.second = false;
      }
    },
    populateForm() {
      this.form = {
        Next_Of_Kin: this.account.user.Next_Of_Kin || "",
        firstname: this.account.user.firstname,
        lastname: this.account.user.lastname,
        email: this.account.user.email,
        dob: this.account.user.dob,
        phone: this.account.user.phone,
        occupation: this.account.user.occupation,
        busy: false
      };
    },
    resetPin() {
      let email = this.account.user.email;
      let snackbar = this.snackbar;
      this.resetPIN({ email, snackbar });
    },
    createBank() {
      let form = {
        bank_name: this.bankForm.bank_name.name,
        account_number: this.bankForm.account_number,
        account_name: this.bankForm.account_name,
        bank_code: this.bankForm.bank_name.code,
        pay_with_bank: this.bankForm.bank_name.pay_with_bank
      };
      let snackbar = this.snackbar;
      let bankForm = this.bankForm;
      this.addBank({ form, snackbar, bankForm });
    },
    createPin() {
      let pin = Number(this.createForm.pin);
      this.$http
        .post("user/me/pin", { pin }, { emulateJSON: true })
        .then(res => {
          this.snackbar.msg = res.body.data || "Your pin has been created!";
          this.snackbar.show = true;
          this.createForm.pin = "";
        })
        .catch(e => {
          this.snackbar.msg =
            e.body.message.message ||
            e.body.message ||
            "Oops! An error occured. Please try again";
          this.snackbar.show = true;
        });
    },
    updatePassword() {
      this.snackbar.msg = "Updating...";
      this.snackbar.show = true;
      let passwordForm = this.passwordForm;
      this.$http
        .put("user/me/password/change_password", passwordForm, {
          emulateJSON: true
        })
        .then(res => {
          this.snackbar.msg = "Your password has been updated!";
          passwordForm.old_password = "";
          passwordForm.new_password = "";
          passwordForm.new_cpassword = "";
        })
        .catch(e => {
          if (e.body)
            this.snackbar.msg = e.body.message.message || e.body.message;
          else this.snackbar.msg = "Oops! An error has occured. Try again.";
        });
    }
  },
  created() {
    this.getProfile();
    if (this.$route.params.redirect) this.clicked(4);
  },
  watch: {
    account() {
      this.populateForm();
    }
  }
};
</script>

<style>
.update {
  padding: 0px 13px 0px 13px;
  margin-top: 6px;
  font-size: 15px;
}

.element::-webkit-input-placeholder {
  color: black;
  font-weight: lighter;
}
@media (max-width: 480px) {
  .input-group-text svg {
    display: none;
  }
  section > input,
  section > p {
    padding: 10px;
  }
  .input-group.d-flex.justify-content-start.align-items-center {
    height: 70px !important;
  }
  .input-group-prepend {
    width: 40%;
  }
  .input-group section {
    width: 53% !important;
  }
  section > p {
    word-break: break-all;
  }
  .input-group {
    flex-wrap: nowrap;
  }
  .tab-title {
    text-align: center;
    position: unset !important;
  }
  .tab-title:after {
    display: none;
  }
  .switch {
    float: right;
    margin: -5px 10px !important;
  }
  .col.border-right-0.border-bottom-0 {
    border-right: 1px solid #e1e1e1 !important;
  }
  #BankDetails-tab a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 83px;
  }
  .input-group {
    padding: 10px 0;
  }
}
</style>
