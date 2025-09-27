<template>
    <div class="form-body" data-app>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <h3>Welcome to KoloBox</h3>
                    <p>We make it easy to invest in right product, Let your money work for you</p>
                    <img src="@/assets/images/4002800.svg" alt="">
                </div>
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
                        <div class="page-links">
                           <a href="#" class="active">Register</a>
                        </div>
  <form action="" method="POST" id="register-form" v-on:submit.prevent="validateForm()">
                
 <input type="text" class="form-control" placeholder="First Name" name="firstName"  v-model="form.firstname" v-validate="'required|min:2'" required  />

   <span v-show="errors.has('firstName')" class="text-danger" style="font-size:9px;font-weight:bold;">{{ errors.first("firstName") }}</span> 
   <!-- firstname data   -->  
                                    
   <input class="form-control" type="text" name="lastName"  v-model="form.lastname" v-validate="'required|min:2'" required placeholder="Last Name" >  

  <span v-show="errors.has('lastName')" class="text-danger" style="font-size:9px;font-weight:bold;">{{ errors.first("lastName") }}</span> 
                        
     <!-- lastname data   -->                                        
                        
   <input class="form-control" type="email" name="email" placeholder="E-mail Address" required v-model="form.email" v-validate="'required|email'" > 

    <span v-show="errors.has('email')" class="text-danger" style="font-size:9px;font-weight:bold;">{{ errors.first("email") }}</span>    

  <input class="form-control" id="dob" type="text"  placeholder="Date of Birth"  name="dateOfBirth"
   v-model="form.dob" v-validate="'required'" required >
                        
   <span v-show="errors.has('dateOfBirth')" class="text-danger" style="font-size:9px;font-weight:bold;">{{ errors.first("dateOfBirth") }}</span>    
   
                   
                        
                        
                     
                   
                           
                          

                            <input class="form-control" type="tel" name="phone" placeholder="Phone Number" required>
                            <input class="form-control" type="text" name="kin" placeholder="Next of Kin" required>
                           
  <select class="custom-select form-control" id="inputGroupSelect04">
       <option selected> Occupation</option>
                        <option value="Account Officer">Account Officer</option>
                        <option value="Accountant">Accountant</option>
                        <option value="Admin">Admin</option>
                        <option value="Analyst">Analyst</option>
                        <option value="Architect">Architect</option>
                        <option value="Auditor">Auditor</option>
                        <option value="Banker">Banker</option>
                        <option value="Blogger">Blogger</option>
                        <option value="Brand Manager">Brand Manager</option>
                        <option value="Business Analyst"
                          >Business Analyst</option
                        >
                        <option value="Business Developer"
                          >Business Developer</option
                        >
                        <option value="Call Center Executive"
                          >Call Center Executive</option
                        >
                        <option value="Car Dealer">Car Dealer</option>
                        <option value="Chef">Chef</option>
                        <option value="Chemist">Chemist</option>
                        <option value="Civil Servant">Civil Servant</option>
                        <option value="Cleaner">Cleaner</option>
                        <option value="Clergy">Clergy</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Courier">Courier</option>
                        <option value="Customer Service"
                          >Customer Service</option
                        >
                        <option value="Customs">Customs</option>
                        <option value="Data Analyst">Data Analyst</option>
                        <option value="Dental Surgeon">Dental Surgeon</option>
                        <option value="Developer">Developer</option>
                        <option value="Development Worker"
                          >Development Worker</option
                        >
                        <option value="Digital Marketing"
                          >Digital Marketing</option
                        >
                        <option value="Director">Director</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Driver">Driver</option>
                        <option value="Editor">Editor</option>
                        <option value="Education Consultant"
                          >Education Consultant</option
                        >
                        <option value="Engineer">Engineer</option>
                        <option value="Entrepreneur">Entrepreneur</option>
                        <option value="Factory Worker">Factory Worker</option>
                        <option value="Farmer">Farmer</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Fashion Designer"
                          >Fashion Designer</option
                        >
                        <option value="Financial Services"
                          >Financial Services</option
                        >
                        <option value="Forex Trader">Forex Trader</option>
                        <option value="Geologist">Geologist</option>
                        <option value="Graduate">Graduate</option>
                        <option value="Graphics Designer"
                          >Graphics Designer</option
                        >
                        <option value="Healthcare">Healthcare</option>
                        <option value="House Wife">House Wife</option>
                        <option value="HR">HR</option>
                        <option value="HR Consultant">HR Consultant</option>
                        <option value="ICT Consultant">ICT Consultant</option>
                        <option value="Investment Banker"
                          >Investment Banker</option
                        >
                        <option value="IT">IT</option>
                        <option value="IT Consultant">IT Consultant</option>
                        <option value="Journalist">Journalist</option>
                        <option value="Lab Scientists">Lab Scientists</option>
                        <option value="Lawyer">Lawyer</option>
                        <option value="Lecturing">Lecturing</option>
                        <option value="Legal Practioner"
                          >Legal Practioner</option
                        >
                        <option value="Logistics">Logistics</option>
                        <option value="Make-up Artist">Make-up Artist</option>
                        <option value="Management Trainer"
                          >Management Trainer</option
                        >
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
                        <option value="Procurement Manager"
                          >Procurement Manager</option
                        >
                        <option value="Public Relations"
                          >Public Relations</option
                        >
                        <option value="Real Estate">Real Estate</option>
                        <option value="Receiptionist">Receiptionist</option>
                        <option value="Registered Nurse"
                          >Registered Nurse</option
                        >
                        <option value="Sales">Sales</option>
                        <option value="Sciences">Sciences</option>
                        <option value="Surveyor">Surveyor</option>
                        <option value="Tailor">Tailor</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Technician">Technician</option>
                        <option value="Technology VC">Technology VC</option>
                        <option value="Telecom">Telecom</option>
                        <option value="Trader">Trader</option>
                        <option value="Transmission Control"
                          >Transmission Control</option
                        >
                        <option value="Travel Agent">Travel Agent</option>
                        <option value="Uber Driver">Uber Driver</option>
                        <option value="Unemployed">Unemployed</option>
                        <option value="UX Designer">UX Designer</option>
                        <option value="Web Developer">Web Developer</option>
                        <option value="Worker">Worker</option>
                        <option value="Writer">Writer</option>
  </select>
  <hr>
   <input class="form-control" type="text" name="pass" placeholder=" Password" required> 


     <input class="form-control" type="text" name="kin" placeholder="Confirm Password" required>

      <input class="form-control" type="number" name="code" placeholder="Referal Code (if any)" >


                            <div class="form-button">
                                <button id="submit" type="submit" class="ibtn">Register</button>
                            </div>
                        </form>
                        <div class="other-links">
                            <span>Already have an account?</span><a href="#">Sign in</a>

                        </div>
                    </div>
                </div>
            </div>
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
export default {
  

}
</script>

