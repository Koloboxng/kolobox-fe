<template>
  <div data-app>
    <v-dialog v-model="joinDialog" persistent max-width="390">
      <v-card>
        <v-card-title class="headline">JOIN GROUP</v-card-title>
        <v-card-text v-if="subUserToJoin">
          Add subuser, {{ subUserToJoin.firstname }}, to Group - <br />
          <div class="form-group w-100">
            <label for="liketoinvest">I’d like to Join Group</label>
            <div class="input-group" v-if="adminGroups">
              <select
                type="text"
                id="liketoinvest"
                name="group"
                class="form-control"
                v-validate="'required'"
                placeholder="Please enter group"
                v-model="form.group_id"
                aria-label
              >
                <option
                  v-for="(group, i) in adminGroups.filter(
                    group => group.Name === 'Kolo Family'
                  )"
                  :key="i"
                  :value="group.group_id"
                  >{{ group.group_name }}</option
                >
              </select>
              <span
                v-show="errors.has('group')"
                class="text-danger"
                style="font-size:9px;font-weight:bold;"
                >{{ errors.first("group") }}</span
              >
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat
            @click.native="
              joinDialog = false;
              subUserToJoin = null;
            "
            >CANCEL</v-btn
          >
          <v-btn
            color="green darken-1"
            :disabled="errors.any()"
            flat
            @click.native="
              joinGroup(subUserToJoin.id);
              joinDialog = false;
              subUserToJoin = null;
            "
            >JOIN</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="!allSubUsers"><loader /></div>
    <div id="dashboard" v-else>
      <div class="col-lg-10 p-0">
        <div class="rightSide-main">
          <section id="products">
            <h6 class="border-bottom">SubUsers</h6>
            <div class="products-order-detials-wrap">
              <ul class="d-flex flex-wrap top-head">
                <li><h6>First Name</h6></li>
                <li><h6>Email</h6></li>
                <li><h6>Created At</h6></li>
                <li><h6>Groups Joined</h6></li>
                <li></li>
              </ul>
              <ul
                class="d-flex flex-wrap bottom-body"
                v-if="allSubUsers.length > 0"
                v-for="(item, index) in allSubUsers"
                :key="index"
              >
                <li>
                  <h5>{{ item.firstname }}</h5>
                </li>
                <li>
                  <h5>{{ item.email }}</h5>
                </li>
                <li>
                  <h5>{{ formatDate(item.created_at) }}</h5>
                </li>
                <li>
                  <h5>{{ item.groups.length }}</h5>
                </li>
                <li class="top-up"><a @click="openDialog(item)">Join</a></li>
              </ul>
              <ul style="text-align:center;color:red;" v-else>
                No subusers yet!
              </ul>
            </div>
            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Created At</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody v-if="allSubUsers.length > 0">
                <tr v-for="(item, index) in allSubUsers" :key="index">
                  <td data-label="First Name">
                    <span>{{ item.firstname }}</span>
                  </td>
                  <td data-label="Email">
                    <span>{{ item.email }}</span>
                  </td>
                  <td data-label="End Date">
                    <span> {{ formatDate(item.created_at) }} </span>
                  </td>
                  <td data-label="Join">
                    <span> <a @click="openDialog(item)">Join</a> </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
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
import dateMixin from "@/mixins/dateMixin.js";
import loader from "@/components/loader";

export default {
  mixins: [dateMixin],
  components: {
    loader
  },
  data() {
    return {
      snackbar: {
        show: false,
        msg: ""
      },
      joinDialog: false,
      subUserToJoin: null,
      form: {
        group_id: "",
        subuser_id: ""
      }
    };
  },
  methods: {
    ...mapActions(["allSubusersByUser", "joinSubUser", "get_admin_groups"]),
    openDialog(subuser) {
      this.subUserToJoin = subuser;
      this.joinDialog = true;
    },
    joinGroup(subuserId) {
      this.snackbar.msg = "Sending...";
      this.snackbar.show = true;
      this.form.subuser_id = subuserId;
      this.joinSubUser({ form: this.form, snackbar: this.snackbar });
    }
  },
  created() {
    this.allSubusersByUser();
    this.get_admin_groups();
  },
  computed: {
    ...mapGetters(["allSubUsers", "adminGroups"])
  }
};
</script>

<style>
table {
  margin-left: 30px;
  display: none !important;
}
td {
  font-size: 11px;
}
td a {
  background-color: #1486e9;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  padding: 9px 20px;
  border-radius: 30px;
}

@media screen and (max-width: 767px) {
  table {
    display: block !important;
    margin: 0;
    padding: 0px 15px 10px 15px;
  }
  .products-order-detials-wrap {
    display: none;
  }

  thead {
    display: none;
  }
  tr {
    border-bottom: 3px solid #ddd;
    width: 100%;
    display: inline-block;
  }
  td {
    border-bottom: 1px solid #ddd;
    text-align: right;
    width: 100%;
    display: inline-block;
    float: left;
  }
  td:before {
    content: attr(data-label);
    float: left;
    width: 50%;
    display: block;
    text-align: left;
    font-weight: bold;
  }
  td > span {
    display: block;
    text-align: left;
    word-break: break-all;
    float: left;
  }
  td a {
    padding: 7px 30px;
  }
}

@media (max-width: 480px) {
  td a {
    border-radius: 30px !important;
  }
}
@media (min-width: 768px) {
  td a {
    border-radius: 30px !important;
  }
}
</style>
