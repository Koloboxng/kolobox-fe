<template>
  <div data-app>
    <div id="dashboard" v-if="!earnings"><loader /></div>

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
import loader from "@/components/loader";
import { mapActions } from "vuex";
export default {
  components: {
    loader
  },
  data() {
    return {
      snackbar: {
        msg: "",
        show: false
      },
      earnings: false
    };
  },
  created() {
    this.snackbar.msg = "Joining Group...";
    this.snackbar.show = true;
    if (this.$route.params) {
      let { params } = this.$route;

      this.$http
        .post("auth/user/join/group", params, { emulateJSON: true })
        .then(res => {
          this.snackbar.msg =
            res.body.data.message || "You have joined this group successfully";
          return res;
        })
        .then(res => {
          localStorage.setItem("token", res.body.data.user.token);
          this.$auth.authenticated = true;
          this.$router.push({
            name: "products",
            params: {
              form: {
                deposit_amount:
                  res.body.data.groupInfo.group_minimum_amount ||
                  res.body.data.product.minimum_amount,
                product: res.body.data.product,
                group_id: res.body.data.groupInfo.group_id,
                snackbarMessage:
                  "You'll have to pay for this group product to continue"
              }
            }
          });
        })
        .catch(e => {
          this.snackbar.msg = e.body.message;
          setTimeout(() => {
            this.$router.push("/signin");
          }, 3000);
        })
        .finally(() => {
          this.snackbar.show = true;
        });
    }
  },
  methods: {
    ...mapActions(["joinGroup"])
  }
};
</script>
