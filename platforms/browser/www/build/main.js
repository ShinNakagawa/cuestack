webpackJsonp([8],{

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cuestack_cuestack__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CuesPage = (function () {
    function CuesPage(navCtrl, navParams, modalCtrl, cueStack) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.stackid = navParams.get('id');
        this.currentUser = navParams.get('currentUser');
        //this.loadCards();
    }
    //   https://static.pexels.com/photos/34950/pexels-photo.jpg
    //   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
    //   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg
    CuesPage.prototype.loadCards = function () {
        var _this = this;
        var cuerates = [];
        var list = this.cueStack.getCueRatesByUserID();
        if (list) {
            list.subscribe(function (result) {
                console.log("result=", result);
                result.forEach(function (rate) {
                    cuerates.push(rate);
                    console.log('got result');
                });
            });
        }
        this.cueStack.getCuesMultiStacks(this.stackid).subscribe(function (success) {
            var index = 0;
            _this.cards = [];
            success.subscribe(function (cues) {
                console.log('loadCards()::cues::length=', cues.length);
                cues.forEach(function (cue) {
                    var checkData = _this.cards.filter(function (item) { return item.front.id === cue.id; });
                    if (checkData.length > 0) {
                        console.log('exits duplicated cue id=', cue.id);
                    }
                    else if (cue.id === undefined) {
                        console.log('cue.id is undefined');
                    }
                    else {
                        // get rate data
                        var cuerate = cuerates.find(function (data) { return data.cueid === cue.id; });
                        var idrate = '';
                        var rate = '';
                        var timeStart = '';
                        if (cuerate) {
                            console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
                            idrate = cuerate.id;
                            rate = cuerate.rate;
                            timeStart = _this.setRateTime(cuerate.rate, cuerate.timeStart);
                        }
                        else {
                            console.log('not found cuerate with userid: cueid=' + cue.id);
                            //add cuerate
                            rate = 'new';
                            idrate = _this.cueStack.addCueRate(cue.stackid, cue.id, rate);
                        }
                        console.log(cuerate);
                        // store cue data
                        index++;
                        _this.cards.push({
                            front: { stackid: cue.stackid,
                                id: cue.id,
                                count: String(index),
                                idrate: idrate,
                                rate: rate,
                                timeStart: timeStart,
                                title: "front-title: " + cue.stackid,
                                subtitle: "front-subtitle: " + cue.question,
                                imageUrl: cue.imageUrl },
                            back: { title: "back-title: " + 'title',
                                imageUrl: cue.imageUrl,
                                subtitle: "back-subtitle(question): " + cue.question,
                                content: "back-content(answer): " + cue.answer }
                        });
                    }
                });
            });
        }, function (getCuesMultiStacksError) {
            console.log(getCuesMultiStacksError);
        });
    };
    CuesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CuesPage');
    };
    CuesPage.prototype.openModalAddCue = function () {
        var addCueModel = this.modalCtrl.create('AddCuePage', { id: this.stackid[0].id }, { cssClass: 'inset-modal' });
        addCueModel.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                console.log("added cue");
            }
        });
        addCueModel.present();
    };
    CuesPage.prototype.updateCueRate = function (card) {
        console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
        this.cueStack.updateCueRate(card.front.idrate, card.front.rate);
    };
    CuesPage.prototype.setRateTime = function (rate, timestamp) {
        var days = 0;
        if (rate == 'good') {
            days = 100;
        }
        else if (rate == 'bad') {
            days = 1;
        }
        else {
            days = 1000;
        }
        var timeStart = __WEBPACK_IMPORTED_MODULE_3_moment___default()(timestamp, 'YYYY-MM-DD').add(days, 'days').calendar();
        return timeStart;
    };
    return CuesPage;
}());
CuesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cues',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cues\n      <ion-buttons end>\n        <button ion-button icon-only (click)="loadCards()">\n          <ion-icon name=\'share-alt\'></ion-icon>\n        </button>\n        <button *ngIf="currentUser" ion-button icon-only (click)="openModalAddCue()">\n          <ion-icon name=\'add\'></ion-icon>\n        </button>     \n      </ion-buttons>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-slides>\n    <ion-slide *ngFor="let card of cards">\n      <flash-card>\n        <div class="fc-front">\n          <p>{{card.front.count}} of {{cards.length}}</p>              \n          <img *ngIf="card.front.imageUrl"  [src]="card.front.imageUrl" />\n          <h2 text-center>{{card.front.title}}</h2>\n          <h3 text-center>{{card.front.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.front.title" >{{card.front.content}}</p>\n          <p>{{card.front.timeStart}}</p>              \n        </div>\n        <div class="fc-back">\n          <p>{{card.front.count}} of {{cards.length}}</p>              \n          <img *ngIf="card.back.imageUrl"  [src]="card.back.imageUrl" />\n          <h2 text-center>{{card.back.title}}</h2>\n          <h3 text-center>{{card.back.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.back.title" >{{card.back.content}}</p>\n        </div>\n      </flash-card>\n      <ion-row no-padding>\n        <ion-item>\n          <ion-label>Rate: </ion-label>\n          <ion-select [(ngModel)]="card.front.rate" block (ionChange)="updateCueRate(card)">\n            <ion-option value="bad">Bad</ion-option>\n            <ion-option value="good">Good</ion-option>\n            <ion-option value="never show">Never Show</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-row>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cuestack_cuestack__["a" /* CueStackProvider */]])
], CuesPage);

//# sourceMappingURL=cues.js.map

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cues/add-cue/add-cue.module": [
		527,
		6
	],
	"../pages/cues/cues.module": [
		526,
		7
	],
	"../pages/home/add-stack/add-stack.module": [
		528,
		5
	],
	"../pages/home/login/login.module": [
		529,
		4
	],
	"../pages/home/signup/signup.module": [
		530,
		3
	],
	"../pages/list-cue/edit-cue/edit-cue.module": [
		533,
		2
	],
	"../pages/list/edit-stack/edit-stack.module": [
		531,
		1
	],
	"../pages/list/reports/reports.module": [
		532,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 191;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cues_cues__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cuestack_cuestack__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, modalCtrl, cueStack, alertCtrl, actionsheetCtrl, auth) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.alertCtrl = alertCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.auth = auth;
        this.status = 'all';
        this.checked = false;
        this.value = '1';
    }
    //   https://www.w3schools.com/css/img_lights.jpg
    //   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
    //   https://cdn.eso.org/images/thumb700x/eso1238a.jpg
    HomePage.prototype.showStacks = function () {
        var _this = this;
        this.cards = [];
        var all = this.cueStack.getAllStacks();
        all.subscribe(function (stacks) {
            stacks.subscribe(function (res) {
                console.log('res.length=', res.length);
                res.forEach(function (stack) {
                    var checkData = _this.cards.filter(function (item) { return item.id === stack.id; });
                    if (checkData.length > 0) {
                        console.log('exits duplicated stack id=', stack.id);
                    }
                    else if (stack.id === undefined) {
                        console.log('stack.id is undefined');
                    }
                    else if (stack.id === 'temp-key') {
                        console.log('stack.id is temp-key');
                    }
                    else {
                        _this.cards.push({
                            id: stack.id,
                            checked: false,
                            title: stack.title,
                            description: stack.description,
                            imageUrl: stack.imageUrl,
                            status: stack.status,
                            shareflag: stack.shareflag,
                            timeStart: __WEBPACK_IMPORTED_MODULE_5_moment___default()(stack.timeStart, 'YYYY-MM-DD').calendar()
                            //timeStart: moment(stack.timeStart, 'YYYY-MM-DD').add(5, 'days').calendar()
                        });
                    }
                });
            });
        }, function (getAllStacksError) {
            console.log(getAllStacksError);
        });
    };
    HomePage.prototype.openModalAddStack = function () {
        this.openModal('AddStackPage');
    };
    HomePage.prototype.openModalLogin = function () {
        var _this = this;
        //this.openModal('LoginPage');
        var loginModel = this.modalCtrl.create('LoginPage', null, { cssClass: 'inset-modal' });
        loginModel.onDidDismiss(function (data) {
            if (data) {
                console.log("HomePage::uid=" + data.uid);
                _this.showStacks();
            }
        });
        loginModel.present();
    };
    HomePage.prototype.openModalSignup = function () {
        var _this = this;
        //this.openModal('SignupPage');
        var signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
        signupModel.onDidDismiss(function (data) {
            if (data) {
                console.log("HomePage::uid=" + data.uid);
                _this.showStacks();
            }
        });
        signupModel.present();
    };
    HomePage.prototype.openModal = function (pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    };
    HomePage.prototype.logout = function () {
        this.auth.logout();
        this.cueStack.logout();
        this.showStacks();
    };
    HomePage.prototype.cardTapped = function (event, card) {
        var ids = [];
        ids.push({ id: card.id, title: card.title });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { id: ids, currentUser: this.auth.currentUser });
    };
    HomePage.prototype.startStudy = function () {
        var ids = [];
        this.cards.forEach(function (card) {
            if (card.checked) {
                ids.push({ id: card.id, title: card.title });
            }
        });
        //clear check
        this.clearCheck(false);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { id: ids, currentUser: this.auth.currentUser });
    };
    HomePage.prototype.checkMode = function () {
        this.clearCheck(false);
        this.checked = true;
        this.value = '2';
    };
    HomePage.prototype.searchMode = function () {
        this.value = '3';
    };
    HomePage.prototype.closeMode = function () {
        this.clearCheck(false);
    };
    HomePage.prototype.clearCheck = function (checked) {
        this.value = '1';
        this.checked = checked;
        if (this.cards) {
            this.cards.forEach(function (card) {
                card.checked = false;
            });
        }
    };
    HomePage.prototype.selectStatus = function (status) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Set Status');
        alert.addInput({
            type: 'radio',
            label: 'Favorite',
            value: 'favorite',
            checked: (status == 'favorite') ? true : false
        });
        alert.addInput({
            type: 'radio',
            label: 'Study',
            value: 'study',
            checked: (status == 'study') ? true : false
        });
        alert.addInput({
            type: 'radio',
            label: 'All',
            value: 'all',
            checked: (status == 'all') ? true : false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('status data:', data);
                _this.status = data;
                _this.clearCheck(false);
            }
        });
        alert.present();
    };
    HomePage.prototype.actionSheet1 = function () {
        var _this = this;
        var actionsheet = this.actionsheetCtrl.create({
            title: 'select action',
            buttons: [
                {
                    text: 'select filter',
                    icon: 'text',
                    handler: function () {
                        _this.selectStatus(_this.status);
                    }
                },
                {
                    text: 'start study',
                    icon: 'text',
                    handler: function () {
                        _this.startStudy();
                    }
                },
                {
                    text: 'cancel',
                    icon: 'close',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button menuToggle left>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title text-align-center>Cue Stacks</ion-title>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="searchMode()">\n            <ion-icon name=\'search\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="checkMode()">\n            <ion-icon name=\'list\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="showStacks()">\n            <ion-icon name=\'share-alt\'></ion-icon>\n          </button>\n          <button *ngIf="auth.currentUser" ion-button icon-only (click)="openModalAddStack()">\n            <ion-icon name=\'add\'></ion-icon>\n          </button>     \n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>   \n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar (ionInput)="getItems($event)" placeholder="search()"></ion-searchbar>         \n        <!-- <ion-searchbar\n          [(ngModel)]="myInput"\n          [showCancelButton]="shouldShowCancel"\n          (ionInput)="onInput($event)"\n          (ionCancel)="onCancel($event)">\n        </ion-searchbar> -->\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Stacks</h3>\n  <div *ngIf="auth.currentUser">current user is {{auth.currentUser}}</div>                \n  \n<!--  <div *ngIf="auth.currentUser">current user is {{auth.currentUser}}</div> \n  <button ion-button round color="danger" (click)="showSharedStacks()">Show Shared Stacks</button>   \n  <ion-row no-padding>\n    <button *ngIf="checked == false; else selectcheck;" ion-button round (click)="checkSelect()">Select</button>\n    <ng-template #selectcheck>\n      <button ion-button round color="danger" (click)="checkSelect()">Close</button>\n      <button ion-button round color="secondary" (click)="actionSheet1()">Action</button>\n    </ng-template>\n  </ion-row>\n-->\n  <ion-card *ngFor="let card of cards" >\n    <div *ngIf="card.status == status || card.status == \'all\' || status == \'all\'">\n      <ion-checkbox *ngIf="checked == true;" [(ngModel)]="card.checked"></ion-checkbox>     \n      <img *ngIf="card.imageUrl"  [src]="card.imageUrl" (click)="cardTapped($event, card)" />\n      <ion-card-content>\n        <h2 class="card-title" (click)="cardTapped($event, card)">\n          {{card.title}}\n        </h2>\n        <p>\n          {{card.description}}\n        </p>\n        <p>\n          {{card.status}}\n        </p>  \n        <p>\n          {{card.timeStart}}\n        </p>  \n        <p>\n          {{card.shareflag}}\n        </p>  \n        </ion-card-content>\n    </div>\n  </ion-card>\n\n  <!-- Float Action Buttons -->\n  <ion-fab bottom right >\n    <button ion-fab class="pop-in" color="danger">Accout</button>\n    <ion-fab-list side="top">\n      <button ion-fab color="primary" (click)="openModalLogin()">\n        <ion-icon  name="log-in"></ion-icon>\n      </button>\n      <button ion-fab color="secondary" (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n      <button ion-fab color="danger" (click)="openModalSignup()">\n        <ion-icon name="link"></ion-icon>\n      </button>\n    </ion-fab-list>\n    <ion-fab-list side="left">\n      <button ion-fab>\n        <ion-icon name="logo-github"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_cuestack_cuestack__["a" /* CueStackProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_cue_list_cue__ = __webpack_require__(391);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ListPage = (function () {
    function ListPage(navCtrl, modalCtrl, cueStack, alertCtrl, actionsheetCtrl, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.alertCtrl = alertCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.auth = auth;
        this.checked = false;
        this.value = '1';
        if (this.auth.currentUser) {
            var stacks = this.cueStack.getStacks();
            stacks.subscribe(function (res) {
                _this.cards = [];
                res.forEach(function (stack) {
                    _this.cards.push({
                        title: stack.title,
                        description: stack.description,
                        imageUrl: stack.imageUrl,
                        id: stack.id,
                        status: stack.status,
                        shareflag: stack.shareflag,
                        checked: false
                    });
                });
            });
        }
    }
    ListPage.prototype.cardTapped = function (event, card) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_cue_list_cue__["a" /* ListCuePage */], { title: card.title, id: card.id });
    };
    ListPage.prototype.reportsPage = function (card) {
        this.modalCtrl.create('ReportsPage', { title: card.title, id: card.id }, { cssClass: 'inset-modal' })
            .present();
    };
    ListPage.prototype.edit = function (card) {
        this.modalCtrl.create('EditStackPage', { card: card }, { cssClass: 'inset-modal' })
            .present();
    };
    ListPage.prototype.updateStatus = function (cards, status) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.updateStackStatus(card.id, status);
            }
        });
        //clear check
        this.clearCheck(false);
    };
    ListPage.prototype.deleteChecked = function (cards) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.deleteStack(card.id);
            }
        });
        //clear check
        this.clearCheck(false);
    };
    ListPage.prototype.checkMode = function () {
        this.clearCheck(false);
        this.checked = true;
        this.value = '2';
    };
    ListPage.prototype.searchMode = function () {
        this.value = '3';
    };
    ListPage.prototype.closeMode = function () {
        this.clearCheck(false);
    };
    ListPage.prototype.clearCheck = function (checked) {
        this.value = '1';
        this.checked = checked;
        if (this.cards) {
            this.cards.forEach(function (card) {
                card.checked = false;
            });
        }
    };
    ListPage.prototype.selectStatus = function (status) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Set Status');
        alert.addInput({
            type: 'radio',
            label: 'Favorite',
            value: 'favorite',
            checked: (status == 'favorite') ? true : false
        });
        alert.addInput({
            type: 'radio',
            label: 'Study',
            value: 'study',
            checked: (status == 'study') ? true : false
        });
        alert.addInput({
            type: 'radio',
            label: 'All',
            value: 'all',
            checked: (status == 'all') ? true : false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('status data:', data);
                _this.updateStatus(_this.cards, data);
                _this.clearCheck(false);
            }
        });
        alert.present();
    };
    ListPage.prototype.selectShare = function (sharedflag) {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Set Share');
        alert.addInput({
            type: 'radio',
            label: 'Public',
            value: 'public',
            checked: (sharedflag == true) ? true : false
        });
        alert.addInput({
            type: 'radio',
            label: 'Private',
            value: 'private',
            checked: (sharedflag == false) ? true : false
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log('share data:', data);
                var flag = false;
                if (data === 'public') {
                    flag = true;
                }
                _this.updateShare(_this.cards, flag);
                _this.clearCheck(false);
            }
        });
        alert.present();
    };
    ListPage.prototype.updateShare = function (cards, sharedflag) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.updateStackShare(card.id, sharedflag);
            }
        });
        //clear check
        this.clearCheck(false);
    };
    ListPage.prototype.actionSheet1 = function () {
        var _this = this;
        var actionsheet = this.actionsheetCtrl.create({
            title: 'select action',
            buttons: [
                {
                    text: 'update status',
                    icon: 'text',
                    handler: function () {
                        _this.selectStatus('all');
                    }
                },
                {
                    text: 'share stacks',
                    icon: 'text',
                    handler: function () {
                        _this.selectShare(false);
                    }
                },
                {
                    text: 'delete',
                    icon: 'trash',
                    handler: function () {
                        _this.deleteChecked(_this.cards);
                    }
                },
                {
                    text: 'cancel',
                    icon: 'close',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button small menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Stack List\n          <ion-buttons end>\n            <button ion-button icon-only (click)="searchMode()">\n              <ion-icon name=\'search\'></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="checkMode()">\n              <ion-icon name=\'list\'></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-title>\n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar\n          [(ngModel)]="myInput"\n          [showCancelButton]="shouldShowCancel"\n          (ionInput)="onInput($event)"\n          (ionCancel)="onCancel($event)">\n        </ion-searchbar>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cards">\n      <button *ngIf="checked == true; else selectcheck;" ion-item>\n        <ion-checkbox [(ngModel)]="card.checked"></ion-checkbox>\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.title}}</ion-label>\n        <!-- <div item-content>{{card.description}}</div> -->\n        <ion-note item-end>Status: {{card.status}}, Share: {{card.shareflag}}</ion-note>     \n      </button>\n      <ng-template #selectcheck>\n      <button ion-item (click)="cardTapped($event, card)">\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <h2>{{card.title}}</h2>\n        <!-- <div item-content>{{card.description}}</div> -->\n        <p>{{card.description}}</p>\n        <ion-note item-end>Status: {{card.status}}, Share: {{card.shareflag}}</ion-note>\n      </button>\n      </ng-template>\n\n      <ion-item-options>\n        <button ion-button (click)="edit(card)">\n          Edit\n        </button>\n        <button ion-button (click)="reportsPage(card)">\n          Report\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list\list.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
], ListPage);

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_cuestack_cuestack__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListCuePage = (function () {
    function ListCuePage(modalCtrl, navParams, actionsheetCtrl, cueStack) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.actionsheetCtrl = actionsheetCtrl;
        this.cueStack = cueStack;
        this.checked = false;
        this.value = '1';
        this.stackid = navParams.get('id');
        var cues = this.cueStack.getCues(this.stackid);
        cues.subscribe(function (res) {
            _this.cards = [];
            res.forEach(function (cue) {
                _this.cards.push({
                    question: cue.question,
                    answer: cue.answer,
                    imageUrl: cue.imageUrl,
                    id: cue.id,
                    idrate: '',
                    rate: '',
                    timeStart: '',
                    checked: false
                });
            });
        });
    }
    ListCuePage.prototype.showRates = function () {
        var _this = this;
        var cuerates = [];
        var list = this.cueStack.getCueRatesByUserID();
        if (list) {
            list.subscribe(function (result) { cuerates.push(result); });
        }
        this.cards.forEach(function (card) {
            console.log('cue id=' + card.id);
            var cuerate = cuerates.find(function (item) { return item.cueid === card.id; });
            if (cuerate) {
                console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
                card.idrate = cuerate.id;
                card.rate = cuerate.rate;
                card.timeStart = _this.setRateTime(cuerate.rate, cuerate.timeStart);
            }
        });
    };
    ListCuePage.prototype.setRateTime = function (rate, timestamp) {
        var days = 0;
        if (rate == 'good') {
            days = 100;
        }
        else if (rate == 'bad') {
            days = 1;
        }
        else {
            days = 1000;
        }
        var timeStart = __WEBPACK_IMPORTED_MODULE_3_moment___default()(timestamp, 'YYYY-MM-DD').add(days, 'days').calendar();
        return timeStart;
    };
    ListCuePage.prototype.cardTapped = function (event, card) {
        var _this = this;
        var editCueModel = this.modalCtrl.create('EditCuePage', { card: card }, { cssClass: 'inset-modal' });
        editCueModel.onDidDismiss(function (data) {
            //console.log(data);
            if (data) {
                console.log("modified cue");
                _this.showRates();
            }
        });
        editCueModel.present();
    };
    ListCuePage.prototype.deleteChecked = function (cards) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.deleteCue(card.id);
            }
        });
        //clear check
        this.clearCheck(false);
        this.showRates();
    };
    ListCuePage.prototype.checkMode = function () {
        this.clearCheck(false);
        this.checked = true;
        this.value = '2';
    };
    ListCuePage.prototype.searchMode = function () {
        this.value = '3';
    };
    ListCuePage.prototype.closeMode = function () {
        this.clearCheck(false);
    };
    ListCuePage.prototype.clearCheck = function (checked) {
        this.value = '1';
        this.checked = checked;
        if (this.cards) {
            this.cards.forEach(function (card) {
                card.checked = false;
            });
        }
    };
    ListCuePage.prototype.actionSheet1 = function () {
        var _this = this;
        var actionsheet = this.actionsheetCtrl.create({
            title: 'select action',
            buttons: [
                {
                    text: 'delete',
                    icon: 'trash',
                    handler: function () {
                        _this.deleteChecked(_this.cards);
                    }
                },
                {
                    text: 'cancel',
                    icon: 'close',
                    role: 'destructive',
                    handler: function () {
                        console.log('the user has cancelled the interaction.');
                    }
                }
            ]
        });
        return actionsheet.present();
    };
    return ListCuePage;
}());
ListCuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list-cue',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button small menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Cue List\n          <ion-buttons end>\n            <button ion-button icon-only (click)="searchMode()">\n              <ion-icon name=\'search\'></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="checkMode()">\n              <ion-icon name=\'list\'></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="showRates()">\n              <ion-icon name=\'ribbon\'></ion-icon>\n            </button>\n          </ion-buttons>\n        </ion-title>\n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar\n          [(ngModel)]="myInput"\n          [showCancelButton]="shouldShowCancel"\n          (ionInput)="onInput($event)"\n          (ionCancel)="onCancel($event)">\n        </ion-searchbar>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cards">\n      <button *ngIf="checked == true; else selectcheck;" ion-item>\n        <ion-checkbox [(ngModel)]="card.checked"></ion-checkbox>\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.question}}</ion-label>\n        <div item-content>{{card.answer}}</div>\n        <ion-note item-end>Rate: {{card.rate}}</ion-note>     \n      </button>\n      <ng-template #selectcheck>\n      <button ion-item (click)="cardTapped($event, card)">\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.question}}</ion-label>\n        <div item-content>{{card.answer}}</div>\n        <ion-note item-end>Rate: {{card.rate}}</ion-note>     \n      </button>\n      </ng-template>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_2__providers_cuestack_cuestack__["a" /* CueStackProvider */]])
], ListCuePage);

//# sourceMappingURL=list-cue.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FlashCardComponent = (function () {
    function FlashCardComponent() {
        this.toggled = false;
    }
    FlashCardComponent.prototype.ngAfterViewChecked = function () {
        var frontH = this.fcFront.nativeElement.querySelector('.fc-front').offsetHeight + 40;
        var backH = this.fcBack.nativeElement.querySelector('.fc-back').offsetHeight + 40;
        var h = ((frontH > backH) ? frontH : backH) + 'px';
        this.fcContainer.nativeElement.style.height = h;
        this.fcBack.nativeElement.style.height = h;
        this.fcFront.nativeElement.style.height = h;
    };
    FlashCardComponent.prototype.toggle = function () {
        this.toggled = !this.toggled;
    };
    return FlashCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('fcContainer'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcContainer", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('front'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcFront", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('back'),
    __metadata("design:type", Object)
], FlashCardComponent.prototype, "fcBack", void 0);
FlashCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'flash-card',template:/*ion-inline-start:"E:\ionic\CueStacks\src\components\flash-card\flash-card.html"*/'<ion-card class="fc-container" (click)="toggle()" [class.fc-back]="toggled" #fcContainer>\n    <div class="front" #front>\n        <ng-content class="" select=".fc-front"></ng-content>\n    </div>\n \n    <div class="back" #back>\n        <ng-content select=".fc-back"></ng-content>\n    </div>\n</ion-card>'/*ion-inline-end:"E:\ionic\CueStacks\src\components\flash-card\flash-card.html"*/
    })
], FlashCardComponent);

//# sourceMappingURL=flash-card.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(410);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cues_cues__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_list_list__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_cue_list_cue__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_flash_card_flash_card__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pipes_moment_moment__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_cuestack_cuestack__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



//firebase



//pages





//components

//pipes

//providers




var firebaseConfig = {
    apiKey: "AIzaSyAMjUz8wB5l0wWxoMpa0apGDYGlWXG-uLk",
    authDomain: "cuestacks.firebaseapp.com",
    databaseURL: "https://cuestacks.firebaseio.com",
    projectId: "cuestacks",
    storageBucket: "cuestacks.appspot.com",
    messagingSenderId: "250430045856"
};
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_cues_cues__["a" /* CuesPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_cue_list_cue__["a" /* ListCuePage */],
            __WEBPACK_IMPORTED_MODULE_11__components_flash_card_flash_card__["a" /* FlashCardComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pipes_moment_moment__["a" /* MomentPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/cues/cues.module#CuesPageModule', name: 'CuesPage', segment: 'cues', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/cues/add-cue/add-cue.module#AddCuePageModule', name: 'AddCuePage', segment: 'add-cue', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/add-stack/add-stack.module#AddStackPageModule', name: 'AddStackPage', segment: 'add-stack', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/edit-stack/edit-stack.module#AddStackPageModule', name: 'EditStackPage', segment: 'edit-stack', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/reports/reports.module#ReportsPageModule', name: 'ReportsPage', segment: 'reports', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list-cue/edit-cue/edit-cue.module#AddStackPageModule', name: 'EditCuePage', segment: 'edit-cue', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_cue_list_cue__["a" /* ListCuePage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_cues_cues__["a" /* CuesPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_15__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_cuestack_cuestack__["a" /* CueStackProvider */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_11__components_flash_card_flash_card__["a" /* FlashCardComponent */],
            __WEBPACK_IMPORTED_MODULE_12__pipes_moment_moment__["a" /* MomentPipe */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CueStackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CueStackProvider = (function () {
    // cues: FirebaseListObservable<Cue[]>;
    // cuerates: FirebaseListObservable<CueRate[]>;
    // stacks: FirebaseListObservable<Stack[]>;
    function CueStackProvider(db, afAuth) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.afAuth.authState.subscribe(function (auth) {
            if (auth !== undefined && auth !== null) {
                _this.user = auth;
                console.log("CueStackProvider::userid=" + auth.uid);
            }
        });
    }
    CueStackProvider.prototype.logout = function () {
        this.user = null;
        console.log("CueStackProvider::logout");
    };
    CueStackProvider.prototype.addCue = function (stackid, question, answer, imageUrl, rate) {
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        var userid = this.user.uid;
        var list = this.getCues(stackid);
        var key = list.push({
            userid: userid,
            stackid: stackid,
            question: question,
            answer: answer,
            imageUrl: imageUrl,
            //rate: rate,
            timeStart: timestamp,
        }).key;
        this.updateCueID(key);
        this.addCueRate(stackid, key, rate);
    };
    CueStackProvider.prototype.updateCueID = function (key) {
        var path = "cues/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addCueRate = function (stackid, cueid, rate) {
        var userid = this.user.uid;
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        var list = this.getCueRates();
        var key = list.push({
            userid: userid,
            stackid: stackid,
            cueid: cueid,
            rate: rate,
            timeStart: timestamp
        }).key;
        this.updateCueRateID(key);
        return key;
    };
    CueStackProvider.prototype.updateCueRateID = function (key) {
        var path = "cuerates/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.updateCueRate = function (id, rate) {
        var path = "cuerates/" + id;
        var data = {
            rate: rate,
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.getCueRates = function () {
        return this.db.list('cuerates', {
            query: {
                limitToLast: 25,
                orderByChild: 'userid',
                equalTo: this.user.uid,
            }
        });
    };
    CueStackProvider.prototype.getCueRatesByUserID = function () {
        if (this.user) {
            return this.db.list('cuerates', {
                query: {
                    limitToLast: 25,
                    orderByChild: 'userid',
                    equalTo: this.user.uid,
                }
            });
        }
        else {
            return null;
        }
    };
    CueStackProvider.prototype.getCues = function (stackid) {
        return this.db.list('cues', {
            query: {
                limitToLast: 25,
                orderByChild: 'stackid',
                equalTo: stackid,
            }
        });
    };
    // http://reactivex.io/rxjs/manual/overview.html#creating-observables
    // https://github.com/angular/angularfire2/issues/162
    CueStackProvider.prototype.getCuesMultiStacks = function (stackid) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            stackid.forEach(function (data) {
                var refData1;
                console.log('getCuesMultiStacks::stackid=', data.id);
                refData1 = _this.db.list('cues', {
                    query: {
                        limitToLast: 25,
                        orderByChild: 'stackid',
                        equalTo: data.id,
                    }
                });
                observer.next(refData1);
            }), function (error) {
                observer.error(error);
            };
        });
    };
    CueStackProvider.prototype.updateCue = function (cue) {
        var path = "cues/" + cue.id;
        var data = {
            question: cue.question,
            answer: cue.answer,
            imageUrl: cue.imageUrl
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addStack = function (title, description, imageUrl, status) {
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        //const timestamp = new Date();
        var userid = this.user.uid;
        var list = this.getStacks();
        var key = list.push({
            userid: userid,
            id: 'temp-key',
            title: title,
            description: description,
            imageUrl: imageUrl,
            status: '',
            timeStart: timestamp,
            shareflag: false,
        }).key;
        this.updateStackID(key);
        this.addStackStatus(key, status);
    };
    CueStackProvider.prototype.getStacks = function () {
        var userid = this.user.uid;
        return this.db.list('stacks', {
            query: {
                limitToLast: 25,
                orderByChild: 'userid',
                equalTo: userid,
            }
        });
    };
    // getShareStacks(shareflag: boolean): FirebaseListObservable<Stack[]> {
    //   return this.db.list('stacks', {
    //     query: {
    //       limitToLast: 25,
    //       orderByChild: 'shareflag',
    //       equalTo: shareflag,
    //     }
    //   });
    // }
    CueStackProvider.prototype.getAllStacks = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            if (_this.user) {
                var refData1 = void 0;
                refData1 = _this.db.list('stacks', {
                    query: {
                        limitToLast: 25,
                        orderByChild: 'userid',
                        equalTo: _this.user.uid,
                    }
                });
                observer.next(refData1);
                console.log('got stacks with this.user.uid=', _this.user.uid);
            }
            var refData2;
            refData2 = _this.db.list('stacks', {
                query: {
                    limitToLast: 25,
                    orderByChild: 'shareflag',
                    equalTo: true,
                }
            });
            observer.next(refData2);
            console.log('got shared stacks');
            observer.complete();
        });
    };
    CueStackProvider.prototype.updateStackShare = function (stackid, shareflag) {
        var path = "stacks/" + stackid;
        var data = {
            shareflag: shareflag
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.updateStackID = function (key) {
        var path = "stacks/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.updateStackStatus = function (stackid, status) {
        var path = "stacks/" + stackid;
        var data = {
            status: status
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.updateStack = function (stack) {
        var path = "stacks/" + stack.id;
        var data = {
            title: stack.title,
            description: stack.description,
            imageUrl: stack.imageUrl,
            status: stack.status,
            shareflag: stack.shareflag
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.deleteStack = function (key) {
        var _this = this;
        // delete cues
        var list;
        list = this.db.list('cues', {
            query: {
                limitToLast: 25,
                orderByChild: 'stackid',
                equalTo: key,
            }
        });
        list.subscribe(function (items) {
            // Remove the matching item:
            if (items.length) {
                _this.deleteCue(items[0].id);
            }
        });
        // delete stack status
        var listS;
        listS = this.db.list('statckstatus', {
            query: {
                limitToLast: 25,
                orderByChild: 'stackid',
                equalTo: key,
            }
        });
        listS.subscribe(function (items) {
            // Remove the matching item:
            if (items.length) {
                _this.deleteCue(items[0].id);
            }
        });
        // delete stack
        var path = "stacks/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.deleteCue = function (key) {
        // delete cuerate data on this cue
        var list;
        list = this.db.list('cuerates', {
            query: {
                limitToLast: 25,
                orderByChild: 'cueid',
                equalTo: key,
            }
        });
        list.subscribe(function (items) {
            // Remove the matching item:
            if (items.length) {
                list.remove(items[0].id)
                    .then(function () { return console.log('removed ' + items[0].id); })
                    .catch(function (error) { return console.log(error); });
            }
        });
        // delete cue
        var path = "cues/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addStackStatus = function (stackid, status) {
        var userid = this.user.uid;
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        var list = this.getStackStatus();
        var key = list.push({
            userid: userid,
            stackid: stackid,
            status: status,
            timeStart: timestamp
        }).key;
        this.updateStackStatusID(key);
        return key;
    };
    CueStackProvider.prototype.updateStackStatusID = function (key) {
        var path = "stackstatus/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    // updateStackStatus(id: string, status: string): void {
    //   const path = `stackstatus/${id}`;
    //   const data = {
    //     status: status,
    //     //timeStart: firebase.database.ServerValue.TIMESTAMP,
    //   };
    //   this.db.object(path).update(data)
    //     .catch(error => console.log(error));
    // }
    CueStackProvider.prototype.getStackStatus = function () {
        if (this.user) {
            return this.db.list('stackstatus', {
                query: {
                    limitToLast: 25,
                    orderByChild: 'userid',
                    equalTo: this.user.uid,
                }
            });
        }
        else {
            return null;
        }
    };
    return CueStackProvider;
}());
CueStackProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], CueStackProvider);

//# sourceMappingURL=cuestack.js.map

/***/ }),

/***/ 498:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 231,
	"./af.js": 231,
	"./ar": 232,
	"./ar-dz": 233,
	"./ar-dz.js": 233,
	"./ar-kw": 234,
	"./ar-kw.js": 234,
	"./ar-ly": 235,
	"./ar-ly.js": 235,
	"./ar-ma": 236,
	"./ar-ma.js": 236,
	"./ar-sa": 237,
	"./ar-sa.js": 237,
	"./ar-tn": 238,
	"./ar-tn.js": 238,
	"./ar.js": 232,
	"./az": 239,
	"./az.js": 239,
	"./be": 240,
	"./be.js": 240,
	"./bg": 241,
	"./bg.js": 241,
	"./bn": 242,
	"./bn.js": 242,
	"./bo": 243,
	"./bo.js": 243,
	"./br": 244,
	"./br.js": 244,
	"./bs": 245,
	"./bs.js": 245,
	"./ca": 246,
	"./ca.js": 246,
	"./cs": 247,
	"./cs.js": 247,
	"./cv": 248,
	"./cv.js": 248,
	"./cy": 249,
	"./cy.js": 249,
	"./da": 250,
	"./da.js": 250,
	"./de": 251,
	"./de-at": 252,
	"./de-at.js": 252,
	"./de-ch": 253,
	"./de-ch.js": 253,
	"./de.js": 251,
	"./dv": 254,
	"./dv.js": 254,
	"./el": 255,
	"./el.js": 255,
	"./en-au": 256,
	"./en-au.js": 256,
	"./en-ca": 257,
	"./en-ca.js": 257,
	"./en-gb": 258,
	"./en-gb.js": 258,
	"./en-ie": 259,
	"./en-ie.js": 259,
	"./en-nz": 260,
	"./en-nz.js": 260,
	"./eo": 261,
	"./eo.js": 261,
	"./es": 262,
	"./es-do": 263,
	"./es-do.js": 263,
	"./es.js": 262,
	"./et": 264,
	"./et.js": 264,
	"./eu": 265,
	"./eu.js": 265,
	"./fa": 266,
	"./fa.js": 266,
	"./fi": 267,
	"./fi.js": 267,
	"./fo": 268,
	"./fo.js": 268,
	"./fr": 269,
	"./fr-ca": 270,
	"./fr-ca.js": 270,
	"./fr-ch": 271,
	"./fr-ch.js": 271,
	"./fr.js": 269,
	"./fy": 272,
	"./fy.js": 272,
	"./gd": 273,
	"./gd.js": 273,
	"./gl": 274,
	"./gl.js": 274,
	"./gom-latn": 275,
	"./gom-latn.js": 275,
	"./he": 276,
	"./he.js": 276,
	"./hi": 277,
	"./hi.js": 277,
	"./hr": 278,
	"./hr.js": 278,
	"./hu": 279,
	"./hu.js": 279,
	"./hy-am": 280,
	"./hy-am.js": 280,
	"./id": 281,
	"./id.js": 281,
	"./is": 282,
	"./is.js": 282,
	"./it": 283,
	"./it.js": 283,
	"./ja": 284,
	"./ja.js": 284,
	"./jv": 285,
	"./jv.js": 285,
	"./ka": 286,
	"./ka.js": 286,
	"./kk": 287,
	"./kk.js": 287,
	"./km": 288,
	"./km.js": 288,
	"./kn": 289,
	"./kn.js": 289,
	"./ko": 290,
	"./ko.js": 290,
	"./ky": 291,
	"./ky.js": 291,
	"./lb": 292,
	"./lb.js": 292,
	"./lo": 293,
	"./lo.js": 293,
	"./lt": 294,
	"./lt.js": 294,
	"./lv": 295,
	"./lv.js": 295,
	"./me": 296,
	"./me.js": 296,
	"./mi": 297,
	"./mi.js": 297,
	"./mk": 298,
	"./mk.js": 298,
	"./ml": 299,
	"./ml.js": 299,
	"./mr": 300,
	"./mr.js": 300,
	"./ms": 301,
	"./ms-my": 302,
	"./ms-my.js": 302,
	"./ms.js": 301,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./pa-in": 309,
	"./pa-in.js": 309,
	"./pl": 310,
	"./pl.js": 310,
	"./pt": 311,
	"./pt-br": 312,
	"./pt-br.js": 312,
	"./pt.js": 311,
	"./ro": 313,
	"./ro.js": 313,
	"./ru": 314,
	"./ru.js": 314,
	"./sd": 315,
	"./sd.js": 315,
	"./se": 316,
	"./se.js": 316,
	"./si": 317,
	"./si.js": 317,
	"./sk": 318,
	"./sk.js": 318,
	"./sl": 319,
	"./sl.js": 319,
	"./sq": 320,
	"./sq.js": 320,
	"./sr": 321,
	"./sr-cyrl": 322,
	"./sr-cyrl.js": 322,
	"./sr.js": 321,
	"./ss": 323,
	"./ss.js": 323,
	"./sv": 324,
	"./sv.js": 324,
	"./sw": 325,
	"./sw.js": 325,
	"./ta": 326,
	"./ta.js": 326,
	"./te": 327,
	"./te.js": 327,
	"./tet": 328,
	"./tet.js": 328,
	"./th": 329,
	"./th.js": 329,
	"./tl-ph": 330,
	"./tl-ph.js": 330,
	"./tlh": 331,
	"./tlh.js": 331,
	"./tr": 332,
	"./tr.js": 332,
	"./tzl": 333,
	"./tzl.js": 333,
	"./tzm": 334,
	"./tzm-latn": 335,
	"./tzm-latn.js": 335,
	"./tzm.js": 334,
	"./uk": 336,
	"./uk.js": 336,
	"./ur": 337,
	"./ur.js": 337,
	"./uz": 338,
	"./uz-latn": 339,
	"./uz-latn.js": 339,
	"./uz.js": 338,
	"./vi": 340,
	"./vi.js": 340,
	"./x-pseudo": 341,
	"./x-pseudo.js": 341,
	"./yo": 342,
	"./yo.js": 342,
	"./zh-cn": 343,
	"./zh-cn.js": 343,
	"./zh-hk": 344,
	"./zh-hk.js": 344,
	"./zh-tw": 345,
	"./zh-tw.js": 345
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 498;

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'List', component: __WEBPACK_IMPORTED_MODULE_5__pages_list_list__["a" /* ListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"E:\ionic\CueStacks\src\app\app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"E:\ionic\CueStacks\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 525:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MomentPipe = (function () {
    function MomentPipe() {
    }
    MomentPipe.prototype.transform = function (value, args) {
        args = args || '';
        return args === 'ago' ? __WEBPACK_IMPORTED_MODULE_1_moment___default()(value).fromNow() : __WEBPACK_IMPORTED_MODULE_1_moment___default()(value).format(args);
    };
    return MomentPipe;
}());
MomentPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Pipe */])({
        name: 'moment'
    })
], MomentPipe);

//# sourceMappingURL=moment.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthProvider = (function () {
    function AuthProvider(db, af) {
        this.db = db;
        this.af = af;
        this.user = af.authState;
    }
    AuthProvider.prototype.login = function (email, password) {
        var _this = this;
        return this.af.auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            _this.authState = user;
            _this.setUserStatus('online');
            //  console.log("success to log in");
        }).catch(function (error) {
            console.log(error);
        });
    };
    AuthProvider.prototype.logout = function () {
        this.af.auth.signOut();
        //  console.log("success to log out");
    };
    Object.defineProperty(AuthProvider.prototype, "currentUserId", {
        get: function () {
            return this.authState !== null ? this.authState.uid : '';
        },
        enumerable: true,
        configurable: true
    });
    AuthProvider.prototype.registerUser = function (credentials) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            _this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(function (authData) {
                observer.next(authData);
                _this.authState = authData;
                var status = 'online';
                _this.setUserData(credentials.email, credentials.username, status);
            }).catch(function (error) {
                observer.error(error);
            });
        });
    };
    AuthProvider.prototype.setUserData = function (email, displayName, status) {
        var path = "users/" + this.currentUserId;
        var data = {
            email: email,
            displayName: displayName,
            status: status
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    AuthProvider.prototype.setUserStatus = function (status) {
        var path = "users/" + this.currentUserId;
        var data = {
            status: status
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    Object.defineProperty(AuthProvider.prototype, "currentUser", {
        get: function () {
            return this.af.auth.currentUser ? this.af.auth.currentUser.email : null;
        },
        enumerable: true,
        configurable: true
    });
    AuthProvider.prototype.authUser = function () {
        return this.user;
    };
    AuthProvider.prototype.resetPassword = function (emailAddress) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
            _this.af.auth.sendPasswordResetEmail(emailAddress).then(function (success) {
                //console.log('email sent', success);
                observer.next(success);
            }, function (error) {
                //console.log('error sending email',error);
                observer.error(error);
            });
        });
    };
    return AuthProvider;
}());
AuthProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
        __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["a" /* AngularFireAuth */]])
], AuthProvider);

//# sourceMappingURL=auth.js.map

/***/ })

},[393]);
//# sourceMappingURL=main.js.map