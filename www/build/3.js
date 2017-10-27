webpackJsonp([3],{

/***/ 539:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddStackPageModule", function() { return AddStackPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_cue__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var AddStackPageModule = (function () {
    function AddStackPageModule() {
    }
    return AddStackPageModule;
}());
AddStackPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_0__edit_cue__["a" /* EditCuePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__edit_cue__["a" /* EditCuePage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__edit_cue__["a" /* EditCuePage */]
        ]
    })
], AddStackPageModule);

//# sourceMappingURL=edit-cue.module.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditCuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
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




var EditCuePage = (function () {
    function EditCuePage(viewCtrl, navParams, fb, cueStack) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.cueStack = cueStack;
        var data = navParams.get('card');
        this.card = {
            id: data.id,
            question: data.question,
            answer: data.answer,
            imageUrl: data.imageUrl,
        };
        this.idrate = data.idrate;
        this.edrate = data.rate;
        this.editCueForm = this.fb.group({
            'question': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'answer': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'imageUrl': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'rate': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.question = this.editCueForm.controls['question'];
        this.answer = this.editCueForm.controls['answer'];
        this.imageUrl = this.editCueForm.controls['imageUrl'];
        this.rate = this.editCueForm.controls['rate'];
    }
    EditCuePage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditCuePage.prototype.update = function () {
        this.card.question = this.question.value;
        this.card.answer = this.answer.value;
        this.card.imageUrl = this.imageUrl.value;
        if (this.rate.value !== undefined && this.rate.value !== '') {
            this.edrate = this.rate.value;
        }
        //send message to add it into firebase
        this.cueStack.updateCue(this.card);
        this.cueStack.updateCueRate(this.card.id, this.edrate, this.idrate);
        this.viewCtrl.dismiss({ title: "cue was modified" });
    };
    return EditCuePage;
}());
EditCuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-cue',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list-cue\edit-cue\edit-cue.html"*/'<ion-content>\n  <form [formGroup]="editCueForm" (ngSubmit)="submit()" novalidate>      \n    <ion-row>\n      <ion-item>\n        <ion-label for="question"></ion-label>\n        <ion-input type="question" value=\'{{card.question}}\' placeholder="Question" formControlName="question"></ion-input>\n      </ion-item>\n    </ion-row> \n    <ion-row>         \n      <ion-item>\n        <ion-label for="answer"></ion-label>\n        <ion-input type="answer" value=\'{{card.answer}}\' placeholder="Answer" formControlName="answer"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>         \n      <ion-item>\n        <ion-label for="imageUrl"></ion-label>\n        <ion-input type="imageUrl" value=\'{{card.imageUrl}}\' placeholder="ImageUrl" formControlName="imageUrl"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>         \n      <ion-item>\n        <ion-label for="rate"></ion-label>\n        <ion-select placeholder="Rate" formControlName="rate">\n          <ion-option value="good">Good</ion-option>\n          <ion-option value="bad">Bad</ion-option>\n          <ion-option value="never shows">Never shows</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n  </form>\n  <ion-row no-padding>\n    <ion-col>\n      <button ion-button block (click)="update()">\n        Update\n      </button>\n    </ion-col>\n    <ion-col text-right>\n      <button ion-button block color="danger" (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list-cue\edit-cue\edit-cue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */]])
], EditCuePage);

//# sourceMappingURL=edit-cue.js.map

/***/ })

});
//# sourceMappingURL=3.js.map