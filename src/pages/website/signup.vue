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
							<a href="#">
								<div class="logo">
									<!-- <img class="logo-size" src="https://fe-staging.kolobox.ng/img/logo-kolobox.fff5e8f1.png" alt=""> -->
									</div>
							</a>
						</div>
						<div class="page-links"> <a href="#" class="active">Register</a> </div>
						<form action="" method="POST" id="register-form" v-on:submit.prevent="handleSubmit()">
							<label for="firstName" style="color:#fff">First Name</label>
							<input type="text" class="form-control" placeholder="First Name" name="firstName" v-model="form.firstname" @blur="validateField('firstname')" v-validate="'required|min:2'" required /> 
							<div v-show="errors.has('firstName') || formValidation.fieldErrors.firstname" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.firstname || errors.first("firstName") }}</div>
							<!-- firstname data   -->
							<label for="lastName" style="color:#fff">Last Name</label>
							<input class="form-control" type="text" name="lastName" v-model="form.lastname" @blur="validateField('lastname')" v-validate="'required|min:2'" required placeholder="Last Name"> 
							<div v-show="errors.has('lastName') || formValidation.fieldErrors.lastname" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.lastname || errors.first("lastName") }}</div>
							<!-- lastname data   -->
							<label for="email" style="color:#fff">Email</label>
							<input class="form-control" type="email" name="email" placeholder="E-mail Address" required v-model="form.email" @blur="validateField('email')" v-validate="'required|email'"> 
							<div v-show="errors.has('email') || formValidation.fieldErrors.email" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.email || errors.first("email") }}</div>
							<label for="dateOfBirth" style="color:#fff">Date of Birth</label>
							<datetime v-model="form.dob" name="dateOfBirth" id="dob" @input="validateField('dob')" v-validate="'required'"></datetime> 
							<div v-show="errors.has('dateOfBirth') || formValidation.fieldErrors.dob" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.dob || errors.first("dateOfBirth") }}</div>
							<label for="number" style="color:#fff">Phone Number</label>
							<input class="form-control" type="tel" placeholder="Phone Number" required name="number" v-model="form.phone" @blur="validateField('phone')" v-validate="'required|min:10'"> 
							<div v-show="errors.has('number') || formValidation.fieldErrors.phone" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.phone || errors.first("number") }}</div>
							<label for="nextOfKin" style="color:#fff">Next of Kin</label>
							<input class="form-control" type="text" placeholder="Next of Kin" name="nextOfKin" v-model="form.Next_Of_Kin" @blur="validateField('Next_Of_Kin')" v-validate="'required'" required> 
							<div v-show="errors.has('nextOfKin') || formValidation.fieldErrors.Next_Of_Kin" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.Next_Of_Kin || errors.first("nextOfKin") }}</div>
							<label for="occupation" style="color:#fff">Occupation</label>
							<select class="custom-select form-control" id="inputGroupSelect04" name="occupation" v-model="form.occupation" @change="validateField('occupation')" v-validate="'required'">
								<option value="" disabled selected hidden> Select Occupation </option>
								<option value="Account Officer">Account Officer</option>
								<option value="Accountant">Accountant</option>
								<option value="Admin">Admin</option>
								<option value="Analyst">Analyst</option>
								<option value="Architect">Architect</option>
								<option value="Auditor">Auditor</option>
								<option value="Banker">Banker</option>
								<option value="Blogger">Blogger</option>
								<option value="Brand Manager">Brand Manager</option>
								<option value="Business Analyst">Business Analyst</option>
								<option value="Business Developer">Business Developer</option>
								<option value="Call Center Executive">Call Center Executive</option>
								<option value="Car Dealer">Car Dealer</option>
								<option value="Chef">Chef</option>
								<option value="Chemist">Chemist</option>
								<option value="Civil Servant">Civil Servant</option>
								<option value="Cleaner">Cleaner</option>
								<option value="Clergy">Clergy</option>
								<option value="Consultant">Consultant</option>
								<option value="Courier">Courier</option>
								<option value="Customer Service">Customer Service</option>
								<option value="Customs">Customs</option>
								<option value="Data Analyst">Data Analyst</option>
								<option value="Dental Surgeon">Dental Surgeon</option>
								<option value="Developer">Developer</option>
								<option value="Development Worker">Development Worker</option>
								<option value="Digital Marketing">Digital Marketing</option>
								<option value="Director">Director</option>
								<option value="Doctor">Doctor</option>
								<option value="Driver">Driver</option>
								<option value="Editor">Editor</option>
								<option value="Education Consultant">Education Consultant</option>
								<option value="Engineer">Engineer</option>
								<option value="Entrepreneur">Entrepreneur</option>
								<option value="Factory Worker">Factory Worker</option>
								<option value="Farmer">Farmer</option>
								<option value="Fashion">Fashion</option>
								<option value="Fashion Designer">Fashion Designer</option>
								<option value="Financial Services">Financial Services</option>
								<option value="Forex Trader">Forex Trader</option>
								<option value="Geologist">Geologist</option>
								<option value="Graduate">Graduate</option>
								<option value="Graphics Designer">Graphics Designer</option>
								<option value="Healthcare">Healthcare</option>
								<option value="House Wife">House Wife</option>
								<option value="HR">HR</option>
								<option value="HR Consultant">HR Consultant</option>
								<option value="ICT Consultant">ICT Consultant</option>
								<option value="Investment Banker">Investment Banker</option>
								<option value="IT">IT</option>
								<option value="IT Consultant">IT Consultant</option>
								<option value="Journalist">Journalist</option>
								<option value="Lab Scientists">Lab Scientists</option>
								<option value="Lawyer">Lawyer</option>
								<option value="Lecturing">Lecturing</option>
								<option value="Legal Practioner">Legal Practioner</option>
								<option value="Logistics">Logistics</option>
								<option value="Make-up Artist">Make-up Artist</option>
								<option value="Management Trainer">Management Trainer</option>
								<option value="Manager">Manager</option>
								<option value="Marketing">Marketing</option>
								<option value="Mechanic">Mechanic</option>
								<option value="Media">Media</option>
								<option value="Medical Field">Medical Field</option>
								<option value="Military">Military</option>
								<option value="Musician">Musician</option>
								<option value="NYSC">NYSC</option>
								<option value="Others">Others</option>
								<option value="Pension Admin">Pension Admin</option>
								<option value="Pharmacist">Pharmacist</option>
								<option value="Pilot">Pilot</option>
								<option value="Procurement Manager">Procurement Manager</option>
								<option value="Public Relations">Public Relations</option>
								<option value="Real Estate">Real Estate</option>
								<option value="Receiptionist">Receiptionist</option>
								<option value="Registered Nurse">Registered Nurse</option>
								<option value="Sales">Sales</option>
								<option value="Sciences">Sciences</option>
								<option value="Surveyor">Surveyor</option>
								<option value="Tailor">Tailor</option>
								<option value="Teacher">Teacher</option>
								<option value="Technician">Technician</option>
								<option value="Technology VC">Technology VC</option>
								<option value="Telecom">Telecom</option>
								<option value="Trader">Trader</option>
								<option value="Transmission Control">Transmission Control</option>
								<option value="Travel Agent">Travel Agent</option>
								<option value="Uber Driver">Uber Driver</option>
								<option value="Unemployed">Unemployed</option>
								<option value="UX Designer">UX Designer</option>
								<option value="Web Developer">Web Developer</option>
								<option value="Worker">Worker</option>
								<option value="Writer">Writer</option>
							</select> 
							<div v-show="errors.has('occupation') || formValidation.fieldErrors.occupation" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.occupation || errors.first("occupation") }}</div>
							<hr>
							<label for="password" style="color:#fff">Password</label>
							<div class="form-group">
								<div class="input-group" id="show_hide_password">
									<input class="form-control" type="password" placeholder="Password" v-model="form.password" @input="validatePassword" v-validate="'required|min:8'" name="password" ref="password"> 
									<div v-show="errors.has('password')" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:5px;">{{ errors.first("password") }}</div>
									<div class="input-group-addon psh"> <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a> </div>
								</div>
								<PasswordStrength 
									:strength="formValidation.passwordValidation.strength"
									:validation-errors="formValidation.passwordValidation.errors"
								/>
							</div>
							<hr>
							<label for="confirmPassword" style="color:#fff">Confirm Password</label>
							<div class="form-group">
								<div class="input-group" id="show_hide_passwords">
									<input class="form-control" type="password" placeholder="Confirm Password" name="confirmPassword" data-vv-as="password" v-model="form.cpassword" @blur="validateField('cpassword')" v-validate="{ required: true, is: form.cpassword }"> 
									<div class="input-group-addon psh"> <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a> </div>
								</div>
								<div v-show="errors.has('confirmPassword') || formValidation.fieldErrors.cpassword" class="text-danger" style="font-size:9px;font-weight:bold;margin-bottom:10px;">{{ formValidation.fieldErrors.cpassword || errors.first("confirmPassword") }}</div>
							</div>
							<label for="code" style="color:#fff">Referal Code</label>
							<input class="form-control" type="number" name="code" placeholder="Referal Code (if any)">
							<div class="form-button">
								<button id="submit" type="submit" class="ibtn" :disabled="!isFormValid || form.busy" :class="{ 'disabled': !isFormValid || form.busy }">Register</button>
							</div>
						</form>
						<div class="other-links"> <span>Already have an account?</span>
							<a href="#">
								<router-link class="link" style="color:#fff" to="/signin">Sign In
									<br>
								</router-link>
							</a> 
							<a href="https://testingcors.s3.us-east-2.amazonaws.com/Kolobox+Terms+of+Use.pdf"><small style="color:#fff"> Terms & Conditions </small></a> </div>
					</div>
				</div>
			</div>
		</div>
		<v-snackbar v-model="toast.show" top right color="black"> {{ toast.msg }}
			<v-btn flat dark small @click.native="toast.show = false">Close</v-btn>
		</v-snackbar>
		
		<VerificationModal 
			v-model="showVerificationModal"
			:email="form.email"
			:user-id="registeredUserId"
			@verified="onVerified"
			@code-sent="onCodeSent"
		/>
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
import termsOfUse from "@/components/termsOfUse";
import VerificationModal from "@/components/VerificationModal";
import PasswordStrength from "@/components/PasswordStrength";
import formValidationMixin from "@/mixins/formValidationMixin";
import authService from "@/services/AuthService";
import moment from "moment";
import $ from 'jquery';

export default {
  mixins: [formValidationMixin],
  
  components: {
    termsOfUse,
    VerificationModal,
    PasswordStrength
  },
  data() {
    return {
      formCode: "",
      form: {
        Next_Of_Kin: "",
        firstname: "",
        lastname: "",
        email: "",
        dob: null,
        occupation: "",
        phone: "",
        password: "",
        cpassword: "",
        busy: false
      },
      toast: {
        show: false,
        msg: ""
      },
      termDialog: false,
      passwordVisibility: true,
      showVerificationModal: false,
      registeredUserId: null,
      koloboxStaff: {
        "001": "slyvester.nosakhare@kolobox.ng",
        "002": "oluwatoni.idowu@kolobox.ng",
        "003": "paschal.obba@kolobox.ng"
      }
    };
  },
  
  watch: {
    'form.password'() {
      this.validatePassword()
      if (this.form.cpassword) {
        this.validateField('cpassword')
      }
    },
    'form.cpassword'() {
      this.validateField('cpassword')
    },
    'form.dob'() {
      this.validateField('dob')
    }
  },
  
  mounted: function(){
       $("#dob").focus( function() {
	    $(this).attr({type: 'date'});
      });
       $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
 
    });
           $("#show_hide_passwords a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_passwords input').attr("type") == "text"){
            $('#show_hide_passwords input').attr('type', 'password');
            $('#show_hide_passwords i').addClass( "fa-eye-slash" );
            $('#show_hide_passwords i').removeClass( "fa-eye" );
        }else if($('#show_hide_passwords input').attr("type") == "password"){
            $('#show_hide_passwords input').attr('type', 'text');
            $('#show_hide_passwords i').removeClass( "fa-eye-slash" );
            $('#show_hide_passwords i').addClass( "fa-eye" );
        }
 
    });

    },
  methods: {
    async submit() {
      if (this.userAgeGTE18()) {
        this.form.busy = true;
        this.toast.msg = "Signing up...";
        this.toast.show = true;

        if (
          this.formCode.startsWith("00") &&
          Object.keys(this.koloboxStaff).indexOf(this.formCode) >= 0
        ) {
          this.form.referral = this.koloboxStaff[this.formCode];
        } else this.form.referral = this.formCode;

        this.form.busy = true;
        
        const result = await authService.register(this.form);
        
        if (result.success) {
          this.registeredUserId = result.data.data.id;
          // Redirect to verify page with both parameters
          this.$router.push({
            path: '/verify',
            query: {
              id: result.data.data.id,
              email: this.form.email
            }
          });
          return;
        } else {
          this.toast.msg = result.error;
        }
        
        this.toast.show = true;
        this.form.busy = false;
      } else {
        this.toast.msg = "Oops! You have to be above 18 Years.";
        this.toast.show = true;
      }
    },

    userAgeGTE18() {
      this.form.dob = moment(this.form.dob).format("YYYY-MM-DD");
      //if (!this.form.dob) return false
      let userYear = this.form.dob.split("-")[0];
      let thisYear = new Date().getFullYear();
      let age = Number(thisYear) - Number(userYear);
      return age >= 18;
    },
    
    onVerified() {
      this.toast.msg = 'Account verified successfully!';
      this.toast.show = true;
      setTimeout(() => {
        this.$router.push('/signin');
      }, 2000);
    },
    
    onCodeSent() {
      this.toast.msg = 'Verification code sent!';
      this.toast.show = true;
    },
    
    handleSubmit() {
      if (!this.validateForm()) {
        this.toast.msg = 'Please fix form errors'
        this.toast.show = true
        return
      }
      
      if (!this.userAgeGTE18()) {
        this.toast.msg = 'You must be 18 years or older'
        this.toast.show = true
        return
      }
      
      this.submit()
    },

 
  }
};
</script>

<style scoped
>

.keepStatic {
  position: fixed;
  bottom: 28px;
  right: 20px;
}
.buttons-wrapper a {
  background: #fff;
  padding: 12px;
  -webkit-box-shadow: 1px 0px 17px -2px rgba(0, 0, 0, 0.2);
  box-shadow: 1px 0px 17px -2px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #117edc !important;
  font-weight: bold;
  font-size: 13px;
}
.nav-link {
  color: blue !important;
}
.cardContainer {
  height: 864px;
}
#welcome-text {
  margin-top: 60px;
}

@media screen and (max-width: 655px) {
  .cardContainer {
    height: 100%;
  }
}
a, a:hover{
  color:#333
}
.psh{
  padding-top: 5px;
  padding-right: 3px;
}

.ibtn:disabled,
.ibtn.disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: #ccc !important;
}

</style>
