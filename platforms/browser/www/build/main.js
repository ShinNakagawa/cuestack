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
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.stackid = [];
        this.stackid = navParams.get('id');
        //console.log("this.stackid=" + this.stackid.length);
        this.userid = navParams.get('userid');
        this.currentUser = navParams.get('currentUser');
        var index = 0;
        this.cards = [];
        this.stackid.forEach(function (data) {
            console.log('no' + String(index) + ': stackid=' + data.id);
            var cues = _this.cueStack.getCues(data.id);
            cues.subscribe(function (res) {
                res.forEach(function (cue) {
                    index++;
                    _this.cards.push({
                        front: { stackid: data.id,
                            id: cue.id,
                            count: String(index),
                            idrate: '',
                            rate: '',
                            timeStart: '',
                            title: "front-title: " + data.title,
                            subtitle: "front-subtitle: " + cue.question,
                            imageUrl: cue.imageUrl },
                        back: { title: "back-title: " + data.title,
                            imageUrl: cue.imageUrl,
                            subtitle: "back-subtitle(question): " + cue.question,
                            content: "back-content(answer): " + cue.answer }
                    });
                });
            });
        });
    }
    //   https://static.pexels.com/photos/34950/pexels-photo.jpg
    //   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
    //   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg
    CuesPage.prototype.showRates = function () {
        var _this = this;
        this.cards.forEach(function (card) {
            console.log("no=" + card.front.count + ', id=' + card.front.id);
            var cuerates = _this.cueStack.getCueRates(card.front.id);
            cuerates.subscribe(function (resRate) {
                console.log('resRate length=' + String(resRate.length));
                var cuerate = resRate.find(function (item) { return item.userid === _this.userid; });
                if (cuerate) {
                    console.log('found cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
                    card.front.idrate = cuerate.id;
                    card.front.rate = cuerate.rate;
                    card.front.timeStart = _this.setRateTime(cuerate.rate, cuerate.timeStart);
                }
                else {
                    console.log('not found cuerate: userid=[' + _this.userid + '], card.front.id=[' + card.front.id + ']');
                    //add cuerate
                    _this.cueStack.addCueRate(_this.userid, card.front.stackid, card.front.id, card.front.idrate);
                }
            });
        });
    };
    CuesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CuesPage');
    };
    CuesPage.prototype.openModalAddCue = function () {
        var _this = this;
        var addCueModel = this.modalCtrl.create('AddCuePage', { id: this.stackid[0].id }, { cssClass: 'inset-modal' });
        addCueModel.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                console.log("added cue");
                _this.showRates();
            }
        });
        addCueModel.present();
    };
    CuesPage.prototype.updateCueRate = function (card) {
        //console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
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
        selector: 'page-cues',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cues:</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <h3>Cues\n    <ion-icon *ngIf="currentUser" name="add-circle" block (click)="openModalAddCue()"></ion-icon>\n  </h3>\n  <button ion-button round color="danger" (click)="showRates()">Show Rates</button> \n  <ion-slides>\n    <ion-slide *ngFor="let card of cards">\n      <flash-card>\n        <div class="fc-front">\n          <p>{{card.front.count}} of {{cards.length}}</p>              \n          <img *ngIf="card.front.imageUrl"  [src]="card.front.imageUrl" />\n          <h2 text-center>{{card.front.title}}</h2>\n          <h3 text-center>{{card.front.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.front.title" >{{card.front.content}}</p>\n          <p>{{card.front.timeStart}}</p>              \n        </div>\n        <div class="fc-back">\n          <p>{{card.front.count}} of {{cards.length}}</p>              \n          <img *ngIf="card.back.imageUrl"  [src]="card.back.imageUrl" />\n          <h2 text-center>{{card.back.title}}</h2>\n          <h3 text-center>{{card.back.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.back.title" >{{card.back.content}}</p>\n        </div>\n      </flash-card>\n      <ion-row no-padding>\n        <ion-item>\n          <ion-label>Rate: </ion-label>\n          <ion-select [(ngModel)]="card.front.rate" block (ionChange)="updateCueRate(card)">\n            <ion-option value="bad">Bad</ion-option>\n            <ion-option value="good">Good</ion-option>\n            <ion-option value="never show">Never Show</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n          <ion-range min="0" max=\'{{card.front.length}}\' step="1" color="danger" value=\'{{card.front.count}}\' [(ngModel)]="card.front.count"></ion-range>\n        </ion-item>      \n      </ion-row>\n    </ion-slide>\n  </ion-slides>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/,
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
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.alertCtrl = alertCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.auth = auth;
        this.status = 'all';
        this.checked = false;
        this.user = this.auth.authUser();
        this.user.subscribe(function (data) {
            if (data) {
                _this.userid = data.uid;
                var stacks = _this.cueStack.getStacks(_this.userid);
                stacks.subscribe(function (res) {
                    _this.cards = [];
                    res.forEach(function (stack) {
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
                    });
                });
            }
        });
    }
    //   https://www.w3schools.com/css/img_lights.jpg
    //   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
    //   https://cdn.eso.org/images/thumb700x/eso1238a.jpg
    HomePage.prototype.showSharedStacks = function () {
        var _this = this;
        var sharedStacks = this.cueStack.getShareStacks(true);
        sharedStacks.subscribe(function (res) {
            //console.log('shared length=' + res.length);
            res.forEach(function (data) {
                var stack = _this.cards.find(function (item) { return item.id === data.id; });
                if (!stack) {
                    //console.log('found id=' + data.id);          
                    _this.cards.push({
                        id: data.id,
                        checked: false,
                        title: data.title,
                        description: data.description,
                        imageUrl: data.imageUrl,
                        status: data.status,
                        shareflag: data.shareflag,
                        timeStart: __WEBPACK_IMPORTED_MODULE_5_moment___default()(data.timeStart, 'YYYY-MM-DD').calendar()
                    });
                }
            });
        });
    };
    HomePage.prototype.openModalAddStack = function () {
        this.openModal('AddStackPage');
    };
    HomePage.prototype.openModalLogin = function () {
        this.openModal('LoginPage');
    };
    HomePage.prototype.openModalSignup = function () {
        this.openModal('SignupPage');
    };
    HomePage.prototype.openModal = function (pageName) {
        this.modalCtrl.create(pageName, null, { cssClass: 'inset-modal' })
            .present();
    };
    HomePage.prototype.logout = function () {
        this.cards = [];
        this.auth.logout();
    };
    HomePage.prototype.cardTapped = function (event, card) {
        var ids = [];
        ids.push({ id: card.id, title: card.title });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { id: ids, userid: this.userid, currentUser: this.auth.currentUser });
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { id: ids, userid: this.userid, currentUser: this.auth.currentUser });
    };
    HomePage.prototype.checkSelect = function () {
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
        //clear
        this.clearCheck(this.checked);
    };
    HomePage.prototype.clearCheck = function (checked) {
        this.checked = checked;
        this.cards.forEach(function (card) {
            card.checked = false;
        });
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
        selector: 'page-home',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cue Stacks</ion-title>\n    <button ion-button round color="secondary" (click)="openModalSignup()">sign up</button>\n    <button *ngIf="auth.currentUser; else login;" ion-button round (click)="logout()">Log out</button>\n    <ng-template #login>\n      <button ion-button round (click)="openModalLogin()">Log in</button>\n    </ng-template>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Stacks\n    <ion-icon *ngIf="auth.currentUser" name="add-circle" block (click)="openModalAddStack()"></ion-icon>\n  </h3>\n  <div *ngIf="auth.currentUser">current user is {{auth.currentUser}}</div> \n  <button ion-button round color="danger" (click)="showSharedStacks()">Show Shared Stacks</button>   \n  <ion-row no-padding>\n    <button *ngIf="checked == false; else selectcheck;" ion-button round (click)="checkSelect()">Select</button>\n    <ng-template #selectcheck>\n      <button ion-button round color="danger" (click)="checkSelect()">Close</button>\n      <button ion-button round color="secondary" (click)="actionSheet1()">Action</button>\n    </ng-template>\n  </ion-row>\n\n  <ion-card *ngFor="let card of cards" >\n    <div *ngIf="card.status == status || card.status == \'all\' || status == \'all\'">\n      <ion-checkbox *ngIf="checked == true;" [(ngModel)]="card.checked"></ion-checkbox>     \n      <img *ngIf="card.imageUrl"  [src]="card.imageUrl" (click)="cardTapped($event, card)" />\n      <ion-card-content>\n        <h2 class="card-title" (click)="cardTapped($event, card)">\n          {{card.title}}\n        </h2>\n        <p>\n          {{card.description}}\n        </p>\n        <p>\n          {{card.status}}\n        </p>  \n        <p>\n          {{card.timeStart}}\n        </p>  \n        <p>\n          {{card.shareflag}}\n        </p>  \n        </ion-card-content>\n    </div>\n  </ion-card>\n\n  <!-- Float Action Buttons \n  <ion-fab bottom right >\n    <button ion-fab class="pop-in" color="danger">Share</button>\n    <ion-fab-list side="top">\n      <button ion-fab color="primary">\n        <ion-icon  name="logo-facebook"></ion-icon>\n      </button>\n      <button ion-fab color="secondary">\n        <ion-icon name="logo-twitter"></ion-icon>\n      </button>\n      <button ion-fab color="dark">\n        <ion-icon name="logo-instagram"></ion-icon>\n      </button>\n    </ion-fab-list>\n    <ion-fab-list side="left">\n      <button ion-fab>\n        <ion-icon name="logo-github"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n-->\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\home\home.html"*/
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
        var user = this.auth.authUser();
        user.subscribe(function (data) {
            if (data) {
                _this.userid = data.uid;
                var stacks = _this.cueStack.getStacks(_this.userid);
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
        });
    }
    ListPage.prototype.cardTapped = function (event, card) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_cue_list_cue__["a" /* ListCuePage */], { title: card.title, id: card.id, userid: this.userid });
    };
    ListPage.prototype.reportsPage = function (card) {
        this.modalCtrl.create('ReportsPage', { title: card.title, id: card.id, userid: this.userid }, { cssClass: 'inset-modal' })
            .present();
    };
    ListPage.prototype.edit = function (card) {
        this.modalCtrl.create('EditStackPage', {
            id: card.id,
            title: card.title,
            description: card.description,
            imageUrl: card.imageUrl,
            status: card.status,
            shareflag: card.shareflag
        }, { cssClass: 'inset-modal' })
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
    ListPage.prototype.checkSelect = function () {
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
        //clear check
        this.clearCheck(this.checked);
    };
    ListPage.prototype.clearCheck = function (checked) {
        this.checked = checked;
        this.cards.forEach(function (card) {
            card.checked = false;
        });
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
        selector: 'page-list',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-row no-padding>\n    <button *ngIf="checked == false; else selectcheck;" ion-button round (click)="checkSelect()">Select</button>\n    <ng-template #selectcheck>\n      <button ion-button round color="danger" (click)="checkSelect()">Close</button>\n      <button ion-button round color="secondary" (click)="actionSheet1()">Action</button>\n    </ng-template>\n  </ion-row>\n    \n  <ion-card *ngFor="let card of cards">\n    <ion-checkbox *ngIf="checked == true;" [(ngModel)]="card.checked"></ion-checkbox>          \n    <img *ngIf="card.imageUrl"  [src]="card.imageUrl" (click)="cardTapped($event, card)" />      \n    <ion-card-content>\n      <h2 class="card-title" (click)="cardTapped($event, card)">\n        Title: {{card.title}}\n      </h2>\n      <p>\n        Description: {{card.description}}\n      </p>\n      <p>\n        Image: {{card.imageUrl}}\n      </p>\n      <p>\n        Status: {{card.status}}\n      </p>\n      <p>\n        Public Share: {{card.shareflag}}\n      </p>\n    </ion-card-content>\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-left (click)="edit(card)">\n          <ion-icon name=\'star\'></ion-icon>\n          Edit\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="danger" icon-left (click)="reportsPage(card)">\n          <ion-icon name=\'musical-notes\'></ion-icon>\n          Reports\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list\list.html"*/
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
    function ListCuePage(modalCtrl, navParams, cueStack) {
        var _this = this;
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.cueStack = cueStack;
        this.stackid = navParams.get('id');
        this.userid = navParams.get('userid');
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
                    rate: ''
                });
            });
        });
    }
    ListCuePage.prototype.showRates = function () {
        var _this = this;
        this.cards.forEach(function (card) {
            //console.log("no=" + card.front.count + ', id=' + card.front.id);
            var cuerates = _this.cueStack.getCueRates(card.id);
            cuerates.subscribe(function (resRate) {
                //console.log('resRate length=' + String(resRate.length));
                var cuerate = resRate.find(function (item) { return item.userid === _this.userid; });
                //console.log('cuerate.id=' + cuerate.id + ', rate=' + cuerate.rate);
                if (cuerate) {
                    card.idrate = cuerate.id;
                    card.rate = cuerate.rate;
                }
            });
        });
    };
    ListCuePage.prototype.cardTapped = function (event, card) {
        var _this = this;
        var editCueModel = this.modalCtrl.create('EditCuePage', {
            id: card.id,
            idrate: card.idrate,
            question: card.question,
            answer: card.answer,
            imageUrl: card.imageUrl,
            rate: card.rate
        }, { cssClass: 'inset-modal' });
        editCueModel.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                console.log("modified cue");
                _this.showRates();
            }
        });
        editCueModel.present();
    };
    ListCuePage.prototype.share = function (card) {
        alert(card.question + ' was shared.');
    };
    ListCuePage.prototype.edit = function (card) {
        alert(card.question + ' was editted.');
    };
    ListCuePage.prototype.delete = function (card) {
        alert('Deleting ' + card.question);
        this.cueStack.deleteCue(card.id);
    };
    return ListCuePage;
}());
ListCuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list-cue',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>List Cue</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <button ion-button round color="danger" (click)="showRates()">Show Rates</button> \n  \n  <ion-card *ngFor="let card of cards">\n    <ion-card-content>\n      <img *ngIf="card.imageUrl"  [src]="card.imageUrl" (click)="cardTapped($event, card)" />      \n      <h2 class="card-title" (click)="cardTapped($event, card)">\n        Question: {{card.question}}\n      </h2>\n      <p>\n        Answer: {{card.answer}}\n      </p>\n      <p>\n        Image: {{card.imageUrl}}\n      </p>\n      <p>\n        Rate: {{card.rate}}\n      </p>\n    </ion-card-content>\n    <ion-row no-padding>\n      <ion-col>\n        <button ion-button clear small color="danger" icon-left (click)="edit(card)">\n          <ion-icon name=\'star\'></ion-icon>\n          Edit\n        </button>\n      </ion-col>\n      <ion-col text-center>\n        <button ion-button clear small color="danger" icon-left (click)="delete(card)">\n          <ion-icon name=\'musical-notes\'></ion-icon>\n          Delete\n        </button>\n      </ion-col>\n      <ion-col text-right>\n        <button ion-button clear small color="danger" icon-left (click)="share(card)">\n          <ion-icon name=\'share-alt\'></ion-icon>\n          Share\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
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




var CueStackProvider = (function () {
    function CueStackProvider(db, afAuth) {
        var _this = this;
        this.db = db;
        this.afAuth = afAuth;
        this.afAuth.authState.subscribe(function (auth) {
            if (auth !== undefined && auth !== null) {
                _this.user = auth;
            }
            _this.getUser().subscribe(function (a) {
                _this.userName = a.displayName;
            });
        });
    }
    CueStackProvider.prototype.getUser = function () {
        var userId = this.user.uid;
        var path = "/users/" + userId;
        return this.db.object(path);
    };
    CueStackProvider.prototype.getUsers = function () {
        var path = '/users';
        return this.db.list(path);
    };
    CueStackProvider.prototype.addCue = function (stackid, question, answer, imageUrl, rate) {
        var timestamp = __WEBPACK_IMPORTED_MODULE_3_moment___default()(new Date()).format('YYYY-MM-DD');
        var userid = this.user.uid;
        this.cues = this.getCues(stackid);
        var key = this.cues.push({
            userid: userid,
            stackid: stackid,
            question: question,
            answer: answer,
            imageUrl: imageUrl,
            //rate: rate,
            timeStart: timestamp,
        }).key;
        this.updateCueID(key);
        this.addCueRate(userid, stackid, key, rate);
    };
    CueStackProvider.prototype.updateCueID = function (key) {
        var path = "cues/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addCueRate = function (userid, stackid, cueid, rate) {
        var timestamp = __WEBPACK_IMPORTED_MODULE_3_moment___default()(new Date()).format('YYYY-MM-DD');
        this.cuerates = this.getCueRates(cueid);
        var key = this.cuerates.push({
            userid: userid,
            stackid: stackid,
            cueid: cueid,
            rate: rate,
            timeStart: timestamp
        }).key;
        this.updateCueRateID(key);
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
    CueStackProvider.prototype.getCueRates = function (cueid) {
        return this.db.list('cuerates', {
            query: {
                limitToLast: 25,
                orderByChild: 'cueid',
                equalTo: cueid,
            }
        });
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
    CueStackProvider.prototype.deleteCue = function (key) {
        var path = "cues/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.deleteCueRate = function (key) {
        var path = "cuerates/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addStack = function (title, description, imageUrl, status) {
        var timestamp = __WEBPACK_IMPORTED_MODULE_3_moment___default()(new Date()).format('YYYY-MM-DD');
        //const timestamp = new Date();
        var userid = this.user.uid;
        this.stacks = this.getStacks(userid);
        var key = this.stacks.push({
            userid: userid,
            id: 'temp-key',
            title: title,
            description: description,
            imageUrl: imageUrl,
            status: status,
            timeStart: timestamp,
            shareflag: false,
        }).key;
        this.updateStackID(key);
    };
    CueStackProvider.prototype.getStacks = function (userid) {
        return this.db.list('stacks', {
            query: {
                limitToLast: 25,
                orderByChild: 'userid',
                equalTo: userid,
            }
        });
    };
    CueStackProvider.prototype.getShareStacks = function (shareflag) {
        return this.db.list('stacks', {
            query: {
                limitToLast: 25,
                orderByChild: 'shareflag',
                equalTo: shareflag,
            }
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
        var path = "stacks/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
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