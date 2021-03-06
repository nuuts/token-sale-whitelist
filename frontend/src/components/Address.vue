<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="top-logo">
          <img src="/static/assets/cb-logo-green.png" />
        </div>
        <div class="tab-title">
          Welcome to the CommerceBlock Whitelist Service
        </div>
        <div class="modal-container">
          <div class="modal-body">
            <slot name="body">
              <div v-if="status==='pending'">
                <div class="row">
                  <div class="status-logo">
                    <img src="/static/assets/status-pending.svg" />
                  </div>
                </div>
                <div class="row text-center">
                  <h3>Thank you for providing the address for whitelisting</h3>
                </div>
                <div class="row text-center">
                  This service may take up to 24 hours to complete. <br>
                  Please return soon to check the whitelisting status.
                </div>
                <br>
                <br>
                <div class="row text-center">
                  Please contact us via our <a href="https://t.me/joinchat/Ge36IURXhKAS_6HTznUXUg" target="_blank">Telegram</a> channel if you have any issues.
                </div>
              </div>

              <div v-if="status==='accepted'">
                <div class="row">
                  <div class="status-logo">
                    <img src="/static/assets/status-accepted.svg" />
                  </div>
                </div>
                <div class="row text-center">
                  <h1><strong>Congratulations!</strong></h1>
                </div>
                <div class="row text-center">
                  <h3>Your address has been approved</h3>
                </div>
                <div class="row text-center">
                  Your current default limit is 11,500 USD. For contributions of more than 11,500 USD please complete the <router-link :to="kycLink">KYC from here</router-link>.
                </div>
              </div>
              <div v-if="status==='rejected'">
                <div class="row">
                  <div class="status-logo">
                    <img src="/static/assets/status-rejected.svg" />
                  </div>
                </div>
                <div class="row text-center">
                  <h1><strong>We Apologize!</strong></h1>
                </div>
                <div class="row text-center">
                  <h3>The address provided has been rejected</h3>
                </div>
                <div class="row text-center">
                  Click <router-link to="/">here</router-link> to try another address, or you can contact <a href="mailto:info@commerceblock.com?Subject=Whitelist%20Issue">info@commerceblock.com</a> or ask on our <a href="https://t.me/joinchat/Ge36IURXhKAS_6HTznUXUg" target="_blank">Telegram</a> channel for support.
                </div>
              </div>
              <div v-if="status==='unknown'">
                <div class="row">
                  <div class="status-unknown-logo">
                    <i class="fa fa-question" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="row text-center">
                  This address has not been recorded, please make sure to submit the address <router-link to="/">here</router-link>.
                </div>
                <div class="row text-center">
                  You can contact <a href="mailto:info@commerceblock.com?Subject=Whitelist%20Issue">info@commerceblock.com</a> or ask on our <a href="https://t.me/joinchat/Ge36IURXhKAS_6HTznUXUg" target="_blank">Telegram</a> channel if you have any issues.
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
      <div class="bottom-logo">
        <img src="/static/assets/commcerblock-big-gray.png" />
      </div>
    </div>
  </transition>
</template>

<script>
import gql from 'graphql-tag';
import httpStatus from 'http-status-codes';
import { isEmpty } from 'lodash';
import  endpoints from '../lib/endpoints'

export default {
  name: 'Address',
  props: ['address'],
  data () {
    return {
      kycLink: `/addresses/${this.address}/kyc`
    }
  },
  computed: {
    status () {
      return this.listAddress && this.listAddress.status;
    }
  },
  apollo: {
    listAddress: {
      query: function () {
        return gql`query listAddress($address: String!) {
          listAddress(address: $address) {
              address
              status
          }}`;
      },
      variables() {
        return {
          address: this.address,
        };
      }
    }
  }
}
</script>

<style scoped>
.modal-mask {
  /* position: fixed; */
  /*z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: table;
  transition: opacity .3s ease;*/
  display: flex;
  justify-content: center;
      margin-top: 30px;
}

.modal-wrapper {
  /*display: table-cell;
  vertical-align: middle;*/
}

.modal-container {
  max-width: 650px;
  /*height: 500px;*/
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  margin-top: 30px;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-header {
  text-align: center;
}

.modal-footer {
  padding: 0 !important;
  padding-top: 10px;
  border: none;
}
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.tab-title {
  color: #141414;
  font-family: "Open Sans";
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  text-align: center;
}

.login-description {
  color: #141414;
  font-family: "Open Sans";
  font-size: 14px;
  line-height: 19px;
  margin: 5px 0 30px 0;
}

.bottom-logo {
  position: absolute;
  z-index: -1;
  bottom: 0;
  right: 0;
}

.top-logo {
  text-align: center;
  margin-bottom: 10px;
}

.status-logo {
  text-align: center;
}

.status-unknown-logo {
  text-align: center;
  font-size: 111px;
}
</style>
