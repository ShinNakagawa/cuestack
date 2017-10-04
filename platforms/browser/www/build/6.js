webpackJsonp([6],{

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddCuePageModule", function() { return AddCuePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_cue__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddCuePageModule = (function () {
    function AddCuePageModule() {
    }
    return AddCuePageModule;
}());
AddCuePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__add_cue__["a" /* AddCuePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__add_cue__["a" /* AddCuePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__add_cue__["a" /* AddCuePage */]
        ]
    })
], AddCuePageModule);

//# sourceMappingURL=add-cue.module.js.map

/***/ }),

/***/ 545:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddCuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AddCuePage = (function () {
    function AddCuePage(viewCtrl, navParams, fb, cueStack) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.cueStack = cueStack;
        this.stackid = navParams.get('id');
        this.cueForm = this.fb.group({
            'question': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'answer': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'imageUrl': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'rate': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.question = this.cueForm.controls['question'];
        this.answer = this.cueForm.controls['answer'];
        this.imageUrl = this.cueForm.controls['imageUrl'];
        this.rate = this.cueForm.controls['rate'];
    }
    AddCuePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    AddCuePage.prototype.add = function () {
        //console.log("question: " + this.question.value + ", answer: " + this.answer.value + ", id=" + this.stackid);  
        //send message to add it into firebase
        this.cueStack.addCue(this.stackid, this.question.value, this.answer.value, this.imageUrl.value, this.rate.value);
        //clear chat text
        this.question.reset("");
        this.answer.reset("");
        this.viewCtrl.dismiss();
    };
    return AddCuePage;
}());
AddCuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-add-cue',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\cues\add-cue\add-cue.html"*/'<ion-content>\n  <form [formGroup]="cueForm" (ngSubmit)="submit()" novalidate>      \n    <ion-row>\n          <ion-item>\n              <ion-label for="question"></ion-label>\n              <ion-input type="question" value="" placeholder="Question" formControlName="question"></ion-input>\n          </ion-item>\n          <ion-item>\n            <ion-label for="answer"></ion-label>\n            <ion-input type="answer" value="" placeholder="Answer" formControlName="answer"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label for="imageUrl"></ion-label>\n            <ion-input type="imageUrl" value="" placeholder="ImageUrl" formControlName="imageUrl"></ion-input>\n        </ion-item>\n    </ion-row>\n    <ion-row>         \n      <ion-item>\n        <ion-label for="rate"></ion-label>\n        <ion-select placeholder="Rate" formControlName="rate">\n          <ion-option value="good">Good</ion-option>\n          <ion-option value="bad">Bad</ion-option>\n          <ion-option value="never show">Never show</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n  </form>\n  <ion-row no-padding>\n    <ion-col>\n      <button ion-button block (click)="add()">\n        Add\n      </button>\n    </ion-col>\n    <ion-col text-right>\n      <button ion-button block color="danger" (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\cues\add-cue\add-cue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */]])
], AddCuePage);

//# sourceMappingURL=add-cue.js.map

/***/ })

});
//# sourceMappingURL=6.js.map