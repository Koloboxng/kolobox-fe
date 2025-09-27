<template>
  <div data-app>
    <v-card class="mb-5 elevation-3" id="history">
      <div class="card__context blue-grey lighten-5"></div>
      <v-card-title primary-title>
        <h3 class="title blue-grey--text mb-0">History</h3>
      </v-card-title>
      <v-data-table
        v-if="walletHistory"
        :headers="headers"
        :items="walletHistory"
      >
        <template slot="items" slot-scope="props">
          <td>{{ formatDate(props.item.updated_at) }}</td>
          <td class="text-xs-left">{{ props.item.detail }}</td>
          <td class="text-xs-left">
            {{ props.item.credit || 0 | currency("₦", 2) }}
          </td>
          <td class="text-xs-left">
            {{ props.item.debit || 0 | currency("₦", 2) }}
          </td>
        </template>
      </v-data-table>
    </v-card>
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
      headers: [
        {
          text: "Date",
          align: "left",
          sortable: true,
          value: "updated_at"
        },
        { text: "Detail", value: "detail", sortable: false, align: "left" },
        { text: "Credit", value: "credit", sortable: false, align: "left" },
        { text: "Debit", value: "debit", sortable: false, align: "left" }
      ],
      snackbar: {
        msg: "",
        show: false
      }
    };
  },
  created() {
    this.getWallet({ data: { snackbar: this.snackbar } });
  },
  computed: {
    ...mapGetters(["walletHistory"])
  },
  methods: {
    ...mapActions(["getWallet"])
  }
};
</script>

<style></style>
