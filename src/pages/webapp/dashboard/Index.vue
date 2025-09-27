<template>
  <div data-app>
    <v-flex v-if="!account" xs12 md6 offset-md3 lg4 offset-lg4>
      <loader />
    </v-flex>
    <div id="dashboard" else>
      <header v-if="account">
        <div class="container-fluid custom-padding">
          <div class="row">
            <div class="col-md-3">
              <a class="logo-wrap">
                <img
                  src="@/assets/images/logo.png"
                  class="img-fluid"
                  alt="logo-brand"
                />
              </a>
            </div>
            <div class="col-md-9">
              <div class="userDetail-settings h-100" v-if="account">
                <ul class="nav justify-content-end ">
                  <li class="nav-item">
                    <img
                      src="@/assets/images/user-settings.png"
                      class="img-fluid nav-link"
                      alt="user-settings"
                    />
                    <router-link
                      class="nav-link"
                      to="/index/settings"
                      :data-toggle="window.width < 700 ? 'collapse' : ''"
                      :data-target="
                        window.width < 700 ? '#navbarSupportedContent' : ''
                      "
                      :aria-controls="
                        window.width < 700 ? 'navbarSupportedContent' : ''
                      "
                      >Settings</router-link
                    >
                  </li>
                  <li
                    class="nav-item"
                    id="profileImage-email"
                    v-if="account.user"
                  >
                    <a class="nav-link">{{ account.user.email }}</a>
                  </li>
                  <li class="" id="login-logout">
                    <a
                      type="button"
                      @click="logout"
                      class="nav-link btn btn-link"
                      style="color:black !important"
                      >Logout</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main v-if="account">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-2 p-0">
              <aside class="left-menu-userInfo">
                <nav class="navbar-expand-lg">
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <i class="fas fa-bars"></i>
                  </button>

                  <div
                    class="collapse navbar-collapse"
                    id="navbarSupportedContent"
                    v-if="account"
                  >
                    <ul class="nav flex-column user-info w-100">
                      <li class="nav-item" id="profileImage-username">
                        <h4>
                          {{
                            account.user.firstname + " " + account.user.lastname
                          }}
                        </h4>
                      </li>
                      <li class="nav-item" v-if="account">
                        <span>Unlocked funds :</span>
                        <h4>
                          {{
                            account.wallet.account_balance ||
                              0 | currency("₦", 2)
                          }}
                        </h4>
                      </li>
                      <li class="nav-item" v-if="account">
                        <span>Locked funds :</span>
                        <h4>
                          {{ account.wallet.book_balance | currency("₦", 2) }}
                        </h4>
                      </li>
                      <li class="nav-item" v-if="account">
                        <span>Withdrawable Funds :</span>
                        <h4>
                          {{ account.wallet.withdrawable_funds | currency("₦", 2) }}
                        </h4>
                      </li>
                    </ul>
                    <ul class="nav flex-column left-menu w-100">
                       <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-tachometer-alt"></i></span> &nbsp;
                          <router-link
                            class="link"
                            to="/index/dashboard"
                            style="color: white !important;"
                            :data-toggle="window.width < 700 ? 'collapse' : ''"
                            :data-target="
                              window.width < 700
                                ? '#navbarSupportedContent'
                                : ''
                            "
                            :aria-controls="
                              window.width < 700 ? 'navbarSupportedContent' : ''
                            "
                            >Dashboard
                          </router-link>
                        </button>
                      </li>
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-money-check-alt"></i></span>&nbsp;
                          <router-link
                            class="link"
                            to="/index/products"
                            style="color: white !important;"
                            :data-toggle="window.width < 700 ? 'collapse' : ''"
                            :data-target="
                              window.width < 700
                                ? '#navbarSupportedContent'
                                : ''
                            "
                            :aria-controls="
                              window.width < 700 ? 'navbarSupportedContent' : ''
                            "
                            >
                            Fund Wallet
                          </router-link>
                        </button>
                      </li>
                      <li class="nav-item btn-group dropright">
                        <button type="button" class="btn btn-secondary" aria-expanded="false">
                          <span style="font-size:25px; color:#004D91">
                           <i class="fas fa-info"></i>
                          </span>
                          <router-link
                            class="link"
                            to="/index/details"
                            style="color: white !important;"
                            :data-toggle="window.width < 700 ? 'collapse' : ''"
                            :data-target="window.width < 700 ? '#navbarSupportedContent' : ''"
                            :aria-controls="window.width < 700 ? 'navbarSupportedContent' : ''">
                            My Details
                          </router-link>
                        </button>
                      </li>
                     
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-chart-line "
                              ></i></span
                             
                              
                          >&nbsp;
                          <span style="color:#fff;font-size:14px">Investment Tracker</span>
                        </button>
                        <div class="dropdown-menu sidebar-dropdown">
                          <ul
                            class="nav flex-column"
                            style="background-color:grey;color:white;"
                          >
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                style="color: black !important;"
                                ><img
                                  src="@/assets/images/dark-bank.png"
                                  alt="dark-bank"
                                /><router-link
                                  class="link"
                                  to="/index/investment"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Set Goal</router-link
                                ></a
                              >
                            </li>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                style="color: black !important;"
                                ><img
                                  src="@/assets/images/dark-bank.png"
                                /><router-link
                                  class="link"
                                  to="/index/simulate"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Expected Investment Return</router-link
                                ></a
                              >
                            </li>
                            <!-- <li class="nav-item">
                                <a
                                  class="nav-link"
                                
                                  style="color: black !important;"
                                  ><img
                                    src="@/assets/images/dark-coins.png"
                                  /><router-link
                                    class="link"
                                    to="/index/reverse-simulate"
                                    :data-toggle="window.width < 700 ? 'collapse' : ''"
                                    :data-target="window.width < 700 ? '#navbarSupportedContent' : ''"
                                    :aria-controls="window.width < 700 ? 'navbarSupportedContent' : ''"
                                    >Investment Calculator</router-link
                                  ></a
                                >
                              </li>-->
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                              style="font-size:25px; color:#004D91"
                            >
                            <i class="fab fa-product-hunt"></i>
                            </span>
                          <span style="color:#fff;font-size:14px"> Products </span>
                        </button>
                        <div class="dropdown-menu">
                          <ul
                            class="nav flex-column"
                            style="background-color:grey;color:white;"
                          >
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                style="color: #004D91 !important;"
                                ><i class="fas fa-cart-plus"></i>&nbsp;
                                <router-link
                                  class="link"
                                  to="/index/products"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Add Product</router-link
                                ></a
                              >
                            </li>

                          </ul>
                        </div>
                      </li>
                      <li class="nav-item btn-group dropright position-static">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-users"></i></span>&nbsp;
                         <span style="font-size:14px; color:#fff"
                            > Groups</span>
                        </button>
                        <div class="dropdown-menu">
                          <ul
                            class="nav flex-column"
                            style="background-color:grey;color:white;"
                          >
                            <h6>Actions:</h6>
                            <li class="nav-item">
                              <a class="nav-link"
                                ><img
                                  src="@/assets/images/dark-coins.png"
                                /><router-link
                                  class="link"
                                  to="/index/group"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Group Dashboard</router-link
                                ></a
                              >
                            </li>
                            <!-- <li class="nav-item">
                              <a class="nav-link active"
                                ><img
                                  src="@/assets/images/menu-eye.png"
                                /><router-link
                                  class="link"
                                  to="/index/subusers"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >SubUsers</router-link
                                ></a
                              >
                            </li>-->

                            <li class="nav-item">
                              <a class="nav-link"
                                ><img
                                  src="@/assets/images/dark-coins.png"
                                /><router-link
                                  class="link"
                                  to="/index/groups"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Create Group</router-link
                                ></a
                              >
                            </li>
                            <!-- <li class="nav-item">
                              <a class="nav-link"
                                ><img
                                  src="@/assets/images/dark-bank.png"
                                /><router-link
                                  class="link"
                                  to="/index/family"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Family</router-link
                                ></a
                              >
                            </li> -->
                            <li class="nav-item">
                              <a class="nav-link"
                                ><img
                                  src="@/assets/images/dark-bank.png"
                                /><router-link
                                  class="link"
                                  to="/index/users"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Invite members</router-link
                                ></a
                              >
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-hand-holding-usd"></i>
                            </span>&nbsp;
                          <span style="font-size:14px; color:#fff">  Withdrawal </span>
                        </button>

                        <div class="dropdown-menu sidebar-dropdown">
                          <ul
                            class="nav flex-column"
                            style="background-color:grey;color:white;"
                          >
                            <h6>Actions:</h6>
                            <li class="nav-item">
                              <a
                                class="nav-link"
                                style="color: #004D91 !important;"
                                >
                                <i class="fas fa-wallet"></i> &nbsp;
                                <router-link
                                  class="link"
                                  to="/index/withdraw"
                                  :data-toggle="
                                    window.width < 700 ? 'collapse' : ''
                                  "
                                  :data-target="
                                    window.width < 700
                                      ? '#navbarSupportedContent'
                                      : ''
                                  "
                                  :aria-controls="
                                    window.width < 700
                                      ? 'navbarSupportedContent'
                                      : ''
                                  "
                                  >Withdraw</router-link
                                ></a
                              >
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false">
                          <span style="font-size:25px; color:#004D91">
                           <i class="fas fa-digital-tachograph"></i>
                          </span>&nbsp;
                         <span style="font-size:14px; color:#fff"> Transfer </span>
                        </button>

                        <div class="dropdown-menu sidebar-dropdown">
                          <ul
                            class="nav flex-column"
                            style="background-color:grey;color:white;"
                          >
                            <h6>Actions:</h6>
                            <li class="nav-item">
                              <a class="nav-link" style="color: color:#004D91 !important;">
                               <i class="fas fa-layer-group"></i>
                                <router-link
                                  class="link"
                                  to="/index/transfer/product"
                                  :data-toggle="window.width < 700 ? 'collapse' : ''"
                                  :data-target="window.width < 700 ? '#navbarSupportedContent' : ''"
                                  :aria-controls="window.width < 700 ? 'navbarSupportedContent' : ''">
                                  To product
                                </router-link>
                              </a>
                            </li>
                            <li class="nav-item">
                              <a class="nav-link" style="color: #004D91 !important;">
                                <i class="far fa-user"></i>
                                <router-link
                                  class="link"
                                  to="/index/transfer/customer"
                                  :data-toggle="window.width < 700 ? 'collapse' : ''"
                                  :data-target="window.width < 700 ? '#navbarSupportedContent' : ''"
                                  :aria-controls="window.width < 700 ? 'navbarSupportedContent' : ''">
                                  To customer
                                </router-link>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>

                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          @click="toggleBalance"
                          class="btn btn-secondary"
                          aria-expanded="false"
                        >
                          <span
                            ><i style="font-size:25px; color:#004D91" class="fas fa-wallet"></i></span
                          >&nbsp;
                          <span style="font-size:14px; color:#fff">Wallet balance </span>
                        </button>
                      </li>

                      <div class="walletDiv" v-show="checkBalance">
                        <v-card flat v-if="earnings.length > 0">
                          <v-list class="body-1 grey" dark flat v-for="(item, index) in earnings" :key="index" v-if="!item.canceled">
                            <template>
                              <v-subheader>
                                {{ item.name }}: <br />
                                {{ item.amount || 0 | currency("₦", 2) }}
                              </v-subheader>
                            </template>
                          </v-list>
                        </v-card>
                      </div>

                      
                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-history"></i></span
                          >&nbsp;
                          <router-link class="link" to="/index/reports">
                          <span style="font-size:14px; color:#fff">
                            History
                          </span>
                            </router-link
                          >
                        </button>
                      </li>

                      <li class="nav-item btn-group dropright">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          aria-expanded="false"
                        >
                          <span style="font-size:25px; color:#004D91"
                            ><i class="fas fa-question-circle"></i></span
                          >&nbsp;
                          <router-link class="link" to="/index/help">
                          <span style="font-size:14px; color:#fff">
                            Help
                          </span>
                            </router-link
                          >
                        </button>
                      </li>
                    </ul>
                  </div>
                </nav>
              </aside>
            </div>
            <div class="col-lg-10 p-0"><router-view></router-view></div>
          </div>
        </div>
      </main>

      <v-snackbar v-model="snackbar.show" top right color="black">
        {{ snackbar.msg }}
        <v-btn flat small dark @click.native="snackbar.show = false"
          >Close</v-btn
        >
      </v-snackbar>
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
import loader from "@/components/loader.vue";
export default {
  components: {
    loader
  },
  data() {
    return {
      snackbar: {
        show: false,
        msg: " "
      },
      checkBalance: false,
      window: {
        width: 0
      }
    };
  },
  methods: {
    ...mapActions(["getProfile", "getAllProducts"]),
    logout() {
      this.$auth.logout(this, "/");
    },
    toggleBalance() {
      if (!this.checkBalance) this.checkBalance = true;
      else this.checkBalance = false;
    }
  },
  created() {
    this.getProfile().catch(e => {
      this.snackbar.msg = "Oops! Our Engineers are on it. Try again.";
      this.snackbar.show = true;
    });

    this.window.width = window.innerWidth;
    this.getAllProducts();
  },
  computed: {
    ...mapGetters(["account", "loaded", "allProduct"]),
    subscribedProductNames() {
      return this.$store.getters.earnings.map(({ name }) => name);
    },
    subscribedProducts() {
      return this.allProduct.filter(({ name }) => this.subscribedProductNames.includes(name));
    },
    subscriptions() {
      return this.$store.getters.subscriptions.map(s => {
        const product = this.subscribedProducts.find(p => s.product_id === p.id);

        return product ? { ...s, name: product.name } : s;
      });
    },
    earnings() {
      return this.$store.getters.earnings.map((e) => {
        const sub = this.subscriptions.find(s => s.name === e.name);

        e.subscription = sub || {};

        return e;
      });
    },
  }
};
</script>

<style>
.link {
  color: white !important;
}
.col-lg-10 {
  max-width: 100%;
}
.grey {
  background-color: #004d91 !important;
  color: white !important;
}
.walletDiv {
  margin-left: 55px !important;
}
</style>
