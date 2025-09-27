<template>

    <div data-app>
        <div class="icon-bar">
            <a href="https://web.facebook.com/Koloboxng" class="facebook"><i class="fab fa-facebook"></i></a> 
            <a href="https://www.instagram.com/kolobox.ng/" class="google"><i class="fab fa-instagram"></i></a> 
            <a href="https://twitter.com/kolobox_ng" class="twitter"><i class="fab fa-twitter"></i></a> 
        
            <a href="https://wa.me/2349032135216?text=Hello,%20I'll%20like%20to know%20more%20about%20your%20service" class="whatsapp"><i class="fab fa-whatsapp"></i></a>
        </div>
      
        <div class="container-fluid" style="background-color: #064E89;">
            <div class="row ">
                <div class="col-md-12">
                    <nav class="navbar navbar-expand-md navbar-dark">
                        <a class="navbar-brand" href="/">
                            <img class="img-fluid" src="img/kolobox-logo.png" alt="Kolobox" />
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarCollapse"
                            aria-controls="navbarCollapse"
                            aria-expanded="true"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
        
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/"
                                >Home</a
                                >
                            </li>
            
                            <li class="nav-item active">
                                <router-link class="nav-link" to="/support"
                                >Contact Us <span class="sr-only">(current)</span></router-link
                                >
                            </li>
            
                            <li class="nav-item">
                                <router-link class="nav-link" to="/signup"
                                >Create An Account</router-link
                                >
                            </li>
                            <div class="social">
                            <ul>
                                <li>  <a href="https://web.facebook.com/Koloboxng" ><i class="fab fa-facebook" style="font-size:25px;color:#fff"></i></a></li>
                                <li>  <a href="https://www.instagram.com/kolobox.ng/" ><i class="fab fa-instagram" style="font-size:25px;color:#fff"></i></a> </li>
                                <li>  <a href="https://twitter.com/kolobox_ng" ><i class="fab fa-twitter" style="font-size:25px;color:#fff"></i></a> </li>
                                <li>  <a href="https://wa.me/2349032135216?text=Hello,20I'll%20like%20to know%20more%20about%20your%20service" ><i class="fab fa-whatsapp" style="font-size:25px;color:#fff"></i></a></li>
                                </ul>
                            </div>
                            
                            </ul>
            
                            <button
                            class=" btnRadius btn btn-outline-success my-2 my-sm-0 nav-item"
                            type="submit"
                            >
                            <router-link class="login-link" to="/signin">Login</router-link>
                            </button>
                            
                        </div>
                    </nav>
                </div>
  
            </div>
            <!-- row Ended -->
        </div>
        <!-- row div -->
  
        <!-- Container Start -->
        <div class="container">
          <div class="row">
            <div class="text-center mx-auto">
              <h4 class="font-weight-bold text-center">Contact Us</h4>
              <img src="img/heading-underline.png" />
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            
            <div class="col-md-6">

                <v-card>
                    <p class="mx-2">
                        This website is operated by Kolobox Capital Limited, Funds are
                        held and managed by Radix Capital Partners, a SEC registered
                        Investment/Asset Management Firm. Investing involves risk and
                        investments may lose value. Please consider your objectives before
                        investing. Past performance does not guarantee future results.
                    </p>

                    <v-list two-line>
                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="indigo">phone</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>0700 KOLO BOX(565-6269)</v-list-tile-title>
                                <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
                            </v-list-tile-content>

                            <v-list-tile-action>
                                <v-icon>chat</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>

                        <v-divider inset></v-divider>

                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="indigo">mail</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>contact@kolobox.ng</v-list-tile-title>
                                <v-list-tile-sub-title>Work</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-divider inset></v-divider>

                        <v-list-tile>
                            <v-list-tile-action>
                                <v-icon color="indigo">location_on</v-icon>
                            </v-list-tile-action>

                            <v-list-tile-content>
                                <v-list-tile-title>13 Olarenwaju Street, Ikeja, Lagos</v-list-tile-title>
                                <v-list-tile-sub-title>Office</v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>

            </div>

            <div class="col-md-6">
                
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    >
                    
                    <v-text-field
                        v-model="form.email"
                        label="Email"
                        required
                        :rules="emailRules"
                    ></v-text-field>

                    <v-text-field
                        v-model="form.fullname"
                        label="Full Name"
                        :rules="nameRules"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="form.phone"
                        label="Phone"
                        :rules="phoneRules"
                        required
                    ></v-text-field>

                    <v-text-field
                        v-model="form.subject"
                        label="Subject"
                        :rules="subjectRules"
                        required
                    ></v-text-field>

                    <v-textarea
                        label="Message"
                        v-model="form.message"
                        :rules="messageRules"
                        required
                    ></v-textarea>

                    <div class="form-button">
                        <v-btn
                        :disabled="!valid"
                        color="#064E89;"
                        @click="validate"
                        >
                        Send
                        </v-btn>
                    </div>
                </v-form>

            </div>

          </div>
        </div>


  
      <div class="footBG">
        <div class="container p-5">
          <div class="row">
            <footer class="footer-font">
              <p class="text-center">
                All Nigerian bank cards accepted and most Nigerian bank accounts
                supported<br />
  
                <img src="img/payment-icon.png" /><br />
                13 Olarenwaju Street, Ikeja, Lagos<br />
                contact@kolobox.ng<br />
                0700 KOLO BOX(565-6269)<br />
                © 2018 Kolobox Capital Limited | Disclosures<br />
                This website is operated by Kolobox Capital Limited, Funds are
                held and managed by Radix Capital Partners, a SEC registered
                Investment/Asset Management Firm. Investing involves risk and
                investments may lose value. Please consider your objectives before
                investing. Past performance does not guarantee future results.
              </p>
            </footer>
          </div>
        </div>
      </div>
  
      <!-- chatbox -->

      <v-snackbar v-model="toast" top right color="black">
        {{ msg }}
        <v-btn flat small dark @click.native="toast = false"
          >Close</v-btn
        >
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
    import "@/assets/js/jquery-migrate.min.js";
    import "@/assets/js/hs.core.js";
    import "@/assets/js/slick.min.js";
    import "@/assets/js/hs.slick-carousel.js";
    import Vue from 'vue';

    $(document).on("ready", function() {
        // initialization of slick carousel
        $.HSCore.components.HSSlickCarousel.init(".js-slick-carousel");
    });

    export default {
        data() {
            return {
                valid: true,
                form: {
                    email: "",
                    fullname: "",
                    subject: "",
                    phone: "",
                    message: "",
                },
                toast: false,
                msg: "",
                /* toast: {
                    msg: "",
                    show: false
                }, */
                rules: {
                required: value => !!value || 'Required.',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
                },
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length > 5) || 'Name must be more than 5 characters'
                ],
                messageRules: [
                    v => !!v || 'Message is required',
                    v => (v && v.length > 5) || 'Message must be more than 5 characters'
                ],
                phoneRules: [
                    v => !!v || 'Phone is required',
                    v => (v && v.length >= 11 && v.length <= 15) || 'Phone must be 11 or 15 characters'
                ],
                subjectRules: [
                    v => !!v || 'Subject is required',
                    v => (v && v.length > 3) || 'Subject must be more than 5 characters'
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
            };
        },
        
        methods: {
            redirect(url) {
                window.open(url, "_blank");
            },
        
            validate () {
                if (this.$refs.form.validate()) {
                    this.toast = true
                    this.valid = false;
            
                    Vue.http.post('auth/support', {
                        name: this.form.fullname,
                        email: this.form.email,
                        phone: this.form.phone,
                        subject: this.form.subject,
                        message: this.form.message
                    }, { emulateJSON: true }).then(( res ) => {
                        console.log(res.data.data)
                        console.log(res.data.status)
                        if (res.data.status) {
                            this.$refs.form.reset()
                            this.toast = true;
                            this.msg = `Success: ${res.data.data? res.data.data: 'Request successfully sent, we will get to you shortly'}`;
                            this.valid = true;
                            // window.location.reload();
                        }
                    }).catch(( e ) => {
                        console.log({e})
                        console.log(e.message)
                        this.toast = true;
                        this.msg = `Error: ${e.message ? e.message : 'Error while submitting form'}`;
                        this.valid = true;
                    });
        
                }
            },
    
        }
    };
  </script>
  
  <style scoped>
  #chatBox {
    font-size: 68px;
    color: green;
    position: fixed;
    bottom: 0px;
    left: 90%;
  }
  
  .error--text {
    color: red !important;
    caret-color: red !important;
  }
  
  .fontSize1 {
    font-size: 2em;
    color: #ffffff;
    font-weight: 600;
  }
  .fontSize2 {
    font-size: 3em;
    color: #ff8900;
    font-weight: 600;
  }
  .fontSize3 {
    font-size: 1em;
    color: #ffffff;
    font-weight: 600;
  }
  .fontSize4 {
    font-size: 1em;
    color: #ffffff;
    font-weight: 100;
  }
  .background_svg {
    background-image: url("../../assets/images/topheaderbg.png");
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 630px;
    /*font-family: "Open Sans", sans-serif;*/
  }
  
  .link {
    color: white !important;
  }
  .btnRadius {
    background-color: #ffffff;
    color: #082e61;
    font-size: 13px;
    font-weight: 600;
    border-radius: 200px 200px 200px 200px;
    -moz-border-radius: 200px 200px 200px 200px;
    -webkit-border-radius: 200px 200px 200px 200px;
    border: 0px solid #000000;
  }
  .login-link {
    color: #000 !important;
  }
  
  .laptopFrame {
    z-index: 3;
    position: absolute;
    margin: 22px 0px 0px 20px;
    width: 80%;
    height: 67%;
  }
  
  @media screen and (min-width: 320px) and (max-width: 425px) {
    .laptopFrame {
      margin: 12px 12px 0px 13px;
      height: 65%;
      width: 85.8%;
    }
  
  }
  
  @media screen and (min-width: 425px) and (max-width: 767px) {
    .laptopFrame {
      margin: 15px 12px 0px 16px;
      height: 65%;
      width: 85.8%;
    }
  }
  
  @media screen and (min-width: 768px) and (max-width: 1000px) {
    .laptopFrame {
      margin: 14px 12px 0px 14px;
      height: 65%;
      width: 85.8%;
    }
   
  }
  
  @media screen and (min-width: 1000px) and (max-width: 1199px) {
    .laptopFrame {
      margin: 15px 12px 0px 19px;
      height: 65%;
      width: 85.8%;
    }
   
  }
  
  /* sticky social icon query for mobile */
  @media (max-width: 767px) and (min-width:56px) { 
    .icon-bar{
    display: none;
  }
  }
  
  /* social icon query for tabs and laptops */
  @media only screen   
  and (min-width: 768px)  
  and (max-width: 1605px)  
  { 
      .social ul li{
      display: none;
    }
  }
  /* social icon query for tabs and laptops */
  .social ul {
    display: flex;
  }
  .social ul li{
     padding:10px;
     list-style: none;
  
    
  }
  
  .social ul li :hover{
    color:#ff8900;
  }
  .social{
    display: flex;
    justify-content: center;
   
  }
  .icon-bar {
    position: fixed;
    top: 50%;
    right:20px;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  
  .icon-bar a {
    display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px;
  }
  
  .icon-bar a:hover {
    background-color: #000;
  }
  
  .facebook {
    background: #3B5998;
    color: white;
  }
  
  .twitter {
    background: #55ACEE;
    color: white;
  }
  
  .google {
    background: #dd4b39;
    color: white;
  }
  
  .whatsapp {
    background: #008012;
    color: white;
  }
  
  .youtube {
    background: #bb0000;
    color: white;
  }
  
  .content {
    margin-left: 75px;
    font-size: 30px;
  }
  
  </style>
  