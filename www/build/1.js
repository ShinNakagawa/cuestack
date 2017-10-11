webpackJsonp([1],{

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddStackPageModule", function() { return AddStackPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__edit_stack__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
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
            __WEBPACK_IMPORTED_MODULE_0__edit_stack__["a" /* EditStackPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_0__edit_stack__["a" /* EditStackPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_0__edit_stack__["a" /* EditStackPage */]
        ]
    })
], AddStackPageModule);

//# sourceMappingURL=edit-stack.module.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditStackPage; });
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




var EditStackPage = (function () {
    function EditStackPage(viewCtrl, navParams, fb, cueStack) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.cueStack = cueStack;
        var data = navParams.get('card');
        this.card = {
            id: data.id,
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            status: data.status,
            shareflag: data.shareflag
        };
        this.editStackForm = this.fb.group({
            'title': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'description': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'imageUrl': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'status': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])],
            'shareflag': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(1)])]
        });
        this.title = this.editStackForm.controls['title'];
        this.description = this.editStackForm.controls['description'];
        this.imageUrl = this.editStackForm.controls['imageUrl'];
        this.status = this.editStackForm.controls['status'];
        this.shareflag = this.editStackForm.controls['shareflag'];
    }
    EditStackPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EditStackPage.prototype.update = function () {
        this.card.title = this.title.value;
        this.card.description = this.description.value;
        this.card.imageUrl = this.imageUrl.value;
        this.card.status = this.status.value;
        this.card.shareflag = this.shareflag.value;
        //send message to add it into firebase
        this.cueStack.updateStack(this.card);
        this.viewCtrl.dismiss({ title: "new stack was added" });
    };
    return EditStackPage;
}());
EditStackPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-edit-stack',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list\edit-stack\edit-stack.html"*/'<ion-content>\n  <ion-title>Edit Stack data</ion-title>\n  <form [formGroup]="editStackForm" (ngSubmit)="update()" novalidate>\n    <ion-row>\n      <ion-item>\n        <ion-label for="title"></ion-label>\n        <ion-input type="title" value=\'{{card.title}}\' placeholder="Title" formControlName="title"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="description"></ion-label>\n        <ion-input type="description" value=\'{{card.description}}\' placeholder="Description" formControlName="description"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="imageUrl"></ion-label>\n        <ion-input type="imageUrl" value=\'{{card.imageUrl}}\' placeholder="ImageUrl" formControlName="imageUrl"></ion-input>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="status"></ion-label>\n        <ion-select placeholder="Status" formControlName="status">\n          <ion-option value="all">All</ion-option>\n          <ion-option value="favorite">Favorite</ion-option>\n          <ion-option value="study">Study</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-label for="shareflag"></ion-label>\n        <ion-select placeholder="Shareflag" formControlName="shareflag">\n          <ion-option value="public">Public</ion-option>\n          <ion-option value="private">Private</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-row>\n  </form>\n  <ion-row no-padding>\n    <ion-col>\n      <button ion-button block (click)="update()">\n        Update\n      </button>\n    </ion-col>\n    <ion-col text-right>\n      <button ion-button block color="danger" (click)="dismiss()">\n        Cancel\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list\edit-stack\edit-stack.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */]])
], EditStackPage);

//# sourceMappingURL=edit-stack.js.map

/***/ })

});
//# sourceMappingURL=1.js.map