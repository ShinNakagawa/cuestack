webpackJsonp([5],{

/***/ 534:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignupPageModule", function() { return SignupPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__signup__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var SignupPageModule = (function () {
    function SignupPageModule() {
    }
    return SignupPageModule;
}());
SignupPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__signup__["a" /* SignupPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__signup__["a" /* SignupPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__signup__["a" /* SignupPage */]
        ]
    })
], SignupPageModule);

//# sourceMappingURL=signup.module.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupPage = (function () {
    function SignupPage(viewCtrl, fb, auth) {
        this.viewCtrl = viewCtrl;
        this.fb = fb;
        this.auth = auth;
        this.signupForm = this.fb.group({
            'email': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern(/[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'password': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'username': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.email = this.signupForm.controls['email'];
        this.password = this.signupForm.controls['password'];
        this.username = this.signupForm.controls['username'];
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.signupForm.valid) {
            var credentials = ({ email: this.email.value, password: this.password.value, username: this.username.value });
            this.auth.registerUser(credentials).subscribe(function (registerData) {
                //console.log(registerData);
                //alert('User is registered and logged in.');
                _this.viewCtrl.dismiss({ title: "signup" });
                //this.viewCtrl.dismiss(registerData);
            }, function (registerError) {
                console.log(registerError);
                if (registerError.code === 'auth/weak-password' || registerError.code === 'auth/email-already-in-use') {
                    alert(registerError.message);
                }
                _this.error = registerError;
            });
        }
    };
    SignupPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\home\signup\signup.html"*/'<ion-content>\n  <form [formGroup]="signupForm" (ngSubmit)="submit()" novalidate>      \n    <ion-row>\n      <ion-item>\n        <ion-label for="email"></ion-label>\n          <ion-input type="email" value="" placeholder="Email" formControlName="email"></ion-input>\n        </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="password"></ion-label>\n        <ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="username"></ion-label>\n        <ion-input type="username" placeholder="Username" formControlName="username"></ion-input>\n      </ion-item>\n    </ion-row>  \n  </form>\n  <ion-row no-padding>\n    <ion-col>\n      <button ion-button block (click)="signup()">\n        Sign up\n      </button>\n    </ion-col>\n    <ion-col text-right>\n      <button ion-button block color="danger" (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\home\signup\signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ })

});
//# sourceMappingURL=5.js.map