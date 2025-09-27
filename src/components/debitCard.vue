<template>
  <v-card
    color="blue-grey lighten-5 card__round px-1 debit-card"
    flat
    :ripple="{ class: 'primary--text' }"
  >
    <v-card-title primary-title>
      <div class="title text__strong">{{ number }}</div>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-flex xs8>
          <template v-if="expiration">
            <p class="caption mb-0 text__strong mt-2">EXPIRATION</p>
            <p class="body-2 text__strong">{{ expiration }}</p>
          </template>
          <template v-if="accountNumber">
            <p class="body-2 text__strong mt-5">{{ accountNumber }}</p>
          </template>
          <p class="body-2 text__strong mt-4 mb-0">{{ name }}</p>
        </v-flex>
        <v-flex xs4>
          <img
            v-if="type === 'mastercard'"
            src="/static/mastercard.png"
            alt="mastercard"
          />
          <img v-else-if="type === 'visa'" src="/static/visa.png" alt="visa" />
          <img
            v-else-if="type === 'verve'"
            src="/static/verve.png"
            alt="verve"
          />
          <v-icon v-else x-large>account_balance</v-icon>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    number: {
      type: String,
      required: true
    },
    expiration: {
      type: String
    },
    accountNumber: {
      type: String
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "mastercard"
    }
  }
};
</script>

<style lang="scss" scoped>
.debit-card {
  cursor: pointer;
  transition: box-shadow 0.4s ease-out;
  width: 28vw;
  color: grey;
  &:hover {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  img,
  .material-icons {
    position: absolute;
    bottom: 16px;
    right: 16px;
  }
  img {
    max-width: 80px;
    max-height: 40px;
  }
}
</style>
