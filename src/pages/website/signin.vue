<template>
	<div class="form-body" data-app>
		<div class="row">
			<div class="img-holder">
				<div class="bg"></div>
				<div class="info-holder">
					<h3>Welcome to KoloBox</h3>
					<p>We make it easy to invest in right product, Let your money work for you</p> <img src="@/assets/images/4002800.svg" alt=""> </div>
			</div>
			<div class="form-holder">
				<div class="form-content">
					<div class="form-items">
						<div class="website-logo-inside">
							<div class="logo">
								<!-- <img class="logo-size" src="https://fe-staging.kolobox.ng/img/logo-kolobox.fff5e8f1.png" alt=""> -->
                </div>
						</div>
						<div class="page-links"> <a href="" class="active">Login</a>
							<a href="" class="active">
								<router-link class="link" to="/signup"><span style="color:#FFF">Register</span></router-link>
							</a>
						</div>
						<form action="" method="POST" class="form-login-pages" id="login-form" v-on:submit.prevent="submit">
							<input type="text" class="form-control" placeholder="Email address or phone number" name="email" v-model="form.username" required>
							<input :type="showPassword ? 'text' : 'password'" class="form-control" id="password-form" placeholder="Password" name="password" v-model="form.password" required> <small @click="showPassword = !showPassword" style="color:#fff"> show password </small>
							<div class="form-button">
								<button id="submit" type="submit" class="ibtn" :disabled="!isFormValid || form.busy" :class="{ 'disabled': !isFormValid || form.busy }">Login</button>
								<a href="">
									<router-link class="link" to="/forgot_password"><span style="color:#fff">Forgot password ?</span></router-link>&nbsp;&nbsp;
									<router-link class="link" to="/resend-activation"><span style="color:#fff">Activate Account</span></router-link>
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<v-snackbar v-model="toast.show" top right color="black"> {{ toast.msg }}
			<v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<!-- Google tag (gtag.js) -->
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HP1WKQF3LQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HP1WKQF3LQ');
</script>

<script>
export default {
  data() {
    return {
      valid: true,
      form: {
        username: "",
        password: "",
        busy: false
      },
      toast: {
        msg: "",
        show: false
      },
      showPassword: false
    };
  },
  computed: {
    isFormValid() {
      return this.form.username.trim() !== '' && this.form.password.trim() !== '';
    }
  },
  methods: {
    submit() {
      //if (!this.canSubmit) return
      this.form.busy = true;
      this.toast.msg = "Signing in...";
      this.toast.show = true;

      setTimeout(() => {
        this.$auth.login(this, this.form, "/index/products", errors => {
          this.toast.msg = errors.body.message;
          this.toast.show = true;
          this.form.busy = false;
        });
      }, 1500);
    }
  }
};
</script>

<style scoped>
.link {
  color: blue !important;
}
.buttons-wrapper a {
  background: #fff;
  padding: 10px;
  box-shadow: 1px 0px 17px -2px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #117edc !important;
  font-weight: bold;
  font-size: 14px;
}
.theme--dark.v-icon {
  color: rgb(161, 161, 161) !important;
}

#cardContainer {
  height: 600px;
}

.mobileView {
  display: none;
}

@media screen and (max-width: 625px) {
  div.right-area {
    /*padding-top: 25px !important;*/
    margin-top: -63px !important;
  }
  .mobileView {
    display: block;
    margin: 25px 0px 0px 0px;
  }
  #cardContainer {
    height: 100%;
  }
}

.ibtn:disabled,
.ibtn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc !important;
}
</style>