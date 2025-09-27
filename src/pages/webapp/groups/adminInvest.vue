<template>
  <div class="col-lg-10 p-0" data-app>
    <div class="rightSide-page-title"><h6>Admin Groups</h6></div>
    <div class="rightSide-main" id="family-investment">
      <section
        id="products"
        v-if="adminGroups"
        class="investment-group-detail"
        v-for="(item, i) in adminGroups"
        :key="i"
      >
        <div class="table-responsive user-invest-table">
          <table class="table table-bordered m-0">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Tenor</th>
                <th scope="col">Type</th>
                <th scope="col">Active Threshold</th>
                <th scope="col">Created At</th>
                <th scope="col">Maximum Threshold</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ item.group_name.toUpperCase() }}</td>
                <td>{{ item.Tenor }}</td>
                <td>{{ item.Name.toUpperCase() }}</td>
                <td>{{ item.active_threshold }}</td>
                <td>{{ formatDate(item.created_at) }}</td>
                <td>{{ item.max_threshold }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section v-else>
        <h5
          style="color:red !important;text-align:center !important;font-weight:bold;text-decoration:underline;"
        >
          No data to show yet!
          <v-btn color="blue">
            <router-link class="link" to="/index/groups">Add Group</router-link>
          </v-btn>
        </h5>
      </section>
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
import dateMixin from "@/mixins/dateMixin";

export default {
  mixins: [dateMixin],
  data() {
    return {
      snackbar: {
        msg: "",
        show: false
      },
      items: [],
      users: [],
      adminDialog: false,
      form: {
        username: ""
      }
    };
  },
  computed: {
    ...mapGetters(["adminGroups"])
  },
  methods: {
    ...mapActions(["get_admin_groups"])
  },
  created() {
    this.get_admin_groups();
  }
};
</script>
