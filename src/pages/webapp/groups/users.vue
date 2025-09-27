<template>
  <div id="dashboard" data-app>
    <div class="col-lg-10 p-0">
      <div class="rightSide-page-title"><h6>Add Users</h6></div>
      <div class="rightSide-main" id="product-group">
        <section id="investment-interest">
          <div class="row">
            <div class="col-md-12">
              <aside id="investment">
                <div class="title-step-top" v-if="groupName">
                  <h6>{{ groupName }}</h6>
                </div>
                <div class="bottom-form-step">
                  <form class="form-inline" v-on:submit.prevent="submit">
                    <label for="exampleSelect1">Select Group</label>
                    <div class="input-group w-150" v-if="adminGroups">
                      <select
                        type="text"
                        id="liketoinvest"
                        class="form-control"
                        v-model="form.group_id"
                        name="group"
                        v-validate="'required'"
                        aria-label=""
                        aria-describedby="basic-addon1"
                      >
                        <option
                          v-for="(group, i) in adminGroups"
                          :key="i"
                          :value="group.group_id"
                          >{{ group.group_name.toUpperCase() }} --
                          {{ group.Name.toUpperCase() }}</option
                        >
                      </select>
                    </div>
                    <div class="custom-table w-100">
                      <div class="custom-table-row border border-bottom-0">
                        <p class="invite-members">Invite Members</p>
                      </div>
                      <v-combobox
                        v-model="chips"
                        label="Email address of the users you want to invite"
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
                    <button type="submit" class="btn-submit">Invite</button>
                    <span
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
                  </form>
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
      chips: [],
      snackbar: {
        msg: "",
        show: false
      },
      form: {
        group_id: ""
      },
      groupName: ""
    };
  },

  methods: {
    ...mapActions(["inviteMembers", "get_admin_groups"]),
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    validateForm() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            this.submit();
          }
        })
        .catch(e => {
          this.snackbar.msg = "Invalid Group";
          this.snackbar.show = true;
        });
    },
    submit() {
      this.chips.forEach(email => {
        this.inviteMembers({
          form: { email, group_id: this.form.group_id },
          snackbar: this.snackbar
        });
      });
      this.chips = [];
    }
  },
  created() {
    if (this.$route.params.form) {
      this.form.group_id = this.$route.params.form.group.group_id;
      this.groupName = this.$route.params.form.group.name;
    } else this.get_admin_groups();
  },
  computed: {
    ...mapGetters(["adminGroups"])
  }
};
</script>
