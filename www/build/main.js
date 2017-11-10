webpackJsonp([10],{

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_cuerate_model__ = __webpack_require__(170);
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
    function CuesPage(navCtrl, navParams, modalCtrl, cueStack, auth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.auth = auth;
        this.stackData = navParams.get('stackData');
        this.currentUserId = '';
        if (this.auth.currentUser) {
            this.currentUserId = this.cueStack.currentUserId;
        }
        this.loadCards();
    }
    //   https://static.pexels.com/photos/34950/pexels-photo.jpg
    //   http://www.nhm.ac.uk/content/dam/nhmwww/visit/Exhibitions/art-of-british-natural-history/magpie-illustration-keulemans-two-column.jpg
    //   http://i.telegraph.co.uk/multimedia/archive/03598/lightning-10_3598416k.jpg
    CuesPage.prototype.loadCards = function () {
        var _this = this;
        var userid = this.currentUserId;
        this.cards = [];
        this.cueStack.getCuesMultiStacks(this.stackData).subscribe(function (success) {
            success.subscribe(function (cues) {
                cues.forEach(function (cue) {
                    var checkData = _this.cards.filter(function (item) { return item.front.id === cue.id; });
                    if (checkData.length > 0) {
                        console.log('exits duplicated cue id=', cue.id);
                        // update rate data
                        if (cue.rateAry === null || cue.rateAry === undefined) {
                            console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.');
                        }
                        else {
                            Object.keys(cue.rateAry).map(function (rateIndex) {
                                var cueRate = new __WEBPACK_IMPORTED_MODULE_5__models_cuerate_model__["a" /* CueRate */];
                                cueRate = cue.rateAry[rateIndex];
                                if (cueRate.userid === userid) {
                                    checkData[0].front.rate = cueRate.rate;
                                    checkData[0].front.idrate = rateIndex;
                                    checkData[0].front.timeStart = cueRate.timeStart;
                                }
                            });
                            //update rate time start
                            if (checkData[0].front.rate !== '' && checkData[0].front.rate !== undefined) {
                                if (_this.compareRateTime(checkData[0].front.rate, checkData[0].front.timeStart)) {
                                    checkData[0].front.timeStart = _this.setRateTime(checkData[0].front.rate, checkData[0].front.timeStart);
                                }
                                else {
                                    _this.cards.splice(_this.cards.indexOf(checkData[0]), 1);
                                }
                            }
                        }
                    }
                    else if (cue.id === undefined) {
                        console.log('cue.id is undefined');
                    }
                    else {
                        if (cue.rateAry === null || cue.rateAry === undefined) {
                            console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.');
                        }
                        else {
                            var rate_1 = '';
                            var idrate_1 = '';
                            var timeStart_1 = '';
                            // get rate data
                            Object.keys(cue.rateAry).map(function (rateIndex) {
                                var cueRate = new __WEBPACK_IMPORTED_MODULE_5__models_cuerate_model__["a" /* CueRate */];
                                cueRate = cue.rateAry[rateIndex];
                                console.log('rateIndex=', rateIndex);
                                console.log('cueRate in loop=', cueRate);
                                console.log('cueRate.rate=', cueRate.rate);
                                if (cueRate.userid === userid) {
                                    rate_1 = cueRate.rate;
                                    idrate_1 = rateIndex;
                                    timeStart_1 = cueRate.timeStart;
                                }
                            });
                            //update rate time start
                            var showFlag = true;
                            if (rate_1 !== '' && idrate_1 !== '' && timeStart_1 !== '') {
                                showFlag = _this.compareRateTime(rate_1, timeStart_1);
                                timeStart_1 = _this.setRateTime(rate_1, timeStart_1);
                            }
                            // get title
                            var title = '';
                            var titleData = _this.stackData.filter(function (data) { return data.id === cue.stackid; });
                            if (titleData.length > 0) {
                                title = titleData[0].title;
                            }
                            // store cue data
                            _this.cards.push({
                                front: { stackid: cue.stackid,
                                    id: cue.id,
                                    rate: rate_1,
                                    idrate: idrate_1,
                                    timeStart: timeStart_1,
                                    title: "Title: " + title,
                                    subtitle: "Question: " + cue.question,
                                    imageUrl: cue.imageUrl },
                                back: { title: "Title: " + title,
                                    imageUrl: cue.imageUrl,
                                    subtitle: "Question: " + cue.question,
                                    content: "Answer: " + cue.answer }
                            });
                        }
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
        var _this = this;
        var addCueModel = this.modalCtrl.create('AddCuePage', { id: this.stackData[0].id }, { cssClass: 'inset-modal' });
        addCueModel.onDidDismiss(function (data) {
            if (data) {
                console.log("CuesPage::openModelAddCue() added cue");
                _this.loadCards();
            }
        });
        addCueModel.present();
    };
    CuesPage.prototype.updateCueRate = function (card) {
        if (this.currentUserId !== '') {
            console.log("card.front.id=" + card.front.id + ', rate to [' + card.front.rate + '].');
            card.front.idrate = this.cueStack.updateCueRate(card.front.id, card.front.rate, card.front.idrate);
        }
        else {
            alert('Please log in to update rate.');
            card.front.rate = '';
        }
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
        var timeStart = __WEBPACK_IMPORTED_MODULE_4_moment___default()(timestamp, 'YYYY-MM-DD').add(days, 'days').calendar();
        return timeStart;
    };
    CuesPage.prototype.compareRateTime = function (rate, timestamp) {
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
        var dateWithRate = __WEBPACK_IMPORTED_MODULE_4_moment___default()(timestamp, 'YYYY-MM-DD').add(days, 'days');
        var currentDate = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        return __WEBPACK_IMPORTED_MODULE_4_moment___default()(currentDate).isSameOrAfter(dateWithRate);
    };
    return CuesPage;
}());
CuesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cues',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Cues\n      <!-- <ion-buttons end>\n        <button *ngIf="currentUser" ion-button icon-only (click)="openModalAddCue()">\n          <ion-icon name=\'add\'></ion-icon>\n        </button>     \n      </ion-buttons> -->\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-slides>\n    <ion-slide *ngFor="let card of cards; let i = index">\n      <flash-card>\n        <div class="fc-front">\n          <p>{{i+1}} of {{cards.length}}</p>              \n          <img *ngIf="card.front.imageUrl"  [src]="card.front.imageUrl" />\n          <h2 text-center>{{card.front.title}}</h2>\n          <h3 text-center>{{card.front.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.front.title" >{{card.front.content}}</p>\n          <p>{{card.front.timeStart}}</p>              \n        </div>\n        <div class="fc-back">\n          <p>{{i+1}} of {{cards.length}}</p>              \n          <img *ngIf="card.back.imageUrl"  [src]="card.back.imageUrl" />\n          <h2 text-center>{{card.back.title}}</h2>\n          <h3 text-center>{{card.back.subtitle}}</h3>\n          <hr />\n          <p *ngIf="card.back.title" >{{card.back.content}}</p>\n        </div>\n      </flash-card>\n      <ion-row no-padding>\n        <ion-item>\n          <ion-label>Rate: </ion-label>\n          <ion-select [(ngModel)]="card.front.rate" block (ionChange)="updateCueRate(card)">\n            <ion-option value="bad">Bad</ion-option>\n            <ion-option value="good">Good</ion-option>\n            <ion-option value="never show">Never Show</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-row>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\cues\cues.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
], CuesPage);

//# sourceMappingURL=cues.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CueRate; });
var CueRate = (function () {
    function CueRate() {
    }
    return CueRate;
}());

//# sourceMappingURL=cuerate.model.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StackStatus; });
var StackStatus = (function () {
    function StackStatus() {
    }
    return StackStatus;
}());

//# sourceMappingURL=stackstatus.model.js.map

/***/ }),

/***/ 181:
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
webpackEmptyAsyncContext.id = 181;

/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/cues/add-cue/add-cue.module": [
		817,
		8
	],
	"../pages/cues/cues.module": [
		816,
		9
	],
	"../pages/home/add-stack/add-stack.module": [
		818,
		7
	],
	"../pages/home/login/login.module": [
		819,
		6
	],
	"../pages/home/signup/signup.module": [
		820,
		5
	],
	"../pages/list-cue/add-cue/add-cue.module": [
		824,
		4
	],
	"../pages/list-cue/edit-cue/edit-cue.module": [
		825,
		3
	],
	"../pages/list/add-stack/add-stack.module": [
		821,
		2
	],
	"../pages/list/edit-stack/edit-stack.module": [
		822,
		1
	],
	"../pages/list/reports/reports.module": [
		823,
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
webpackAsyncContext.id = 224;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cues_cues__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_cuestack_cuestack__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_stack_model__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
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
    function HomePage(navCtrl, modalCtrl, cueStack, alertCtrl, toastCtrl, actionsheetCtrl, auth) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.auth = auth;
        this.ticks = 0;
        this.status = 'all';
        this.checked = false;
        this.value = '1';
        this.currentUserId = '';
        this.keptCards = null;
        if (this.auth.currentUser) {
            console.log('this.auth.currentUser=', this.auth.currentUser);
            this.currentUserId = this.cueStack.currentUserId;
            console.log('userid=', this.cueStack.currentUserId);
            this.loadCards();
        }
        else {
            console.log('Unable to read userID, so add timer to wait for user ID');
            var toast = this.toastCtrl.create({
                message: 'Unable to read userID, please wait for a while.',
                duration: 3000,
                position: 'top'
            });
            toast.present();
            this.startTimer();
        }
    }
    HomePage.prototype.tickerFunc = function (tick) {
        console.log("tickerFunc tick=", tick);
        this.ticks = tick;
        if (this.auth.currentUser) {
            this.stopTimer();
            // get userID
            console.log('this.auth.currentUser=', this.auth.currentUser);
            this.currentUserId = this.cueStack.currentUserId;
            console.log('userid=', this.cueStack.currentUserId);
            this.loadCards();
        }
        else if (tick === 2) {
            this.stopTimer();
            // assuming no userID
            console.log('assuming no userID');
            this.loadCards();
        }
    };
    // start timer
    HomePage.prototype.startTimer = function () {
        var _this = this;
        console.log("start timer");
        //1 every second (1000ms), starting after 0.5(500ms) seconds
        this.timer = __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__["Observable"].timer(500, 1000);
        // subscribing to a observable returns a subscription object
        this.sub = this.timer.subscribe(function (t) { return _this.tickerFunc(t); });
    };
    ;
    // stops and resets the current timer
    HomePage.prototype.stopTimer = function () {
        console.log("stop timer");
        // unsubscribe here
        this.sub.unsubscribe();
    };
    //   https://www.w3schools.com/css/img_lights.jpg
    //   http://i.dailymail.co.uk/i/pix/2017/01/16/20/332EE38400000578-4125738-image-a-132_1484600112489.jpg   
    //   https://cdn.eso.org/images/thumb700x/eso1238a.jpg
    HomePage.prototype.loadCards = function () {
        var _this = this;
        var userid = this.currentUserId;
        this.cueStack.getAllStacks1().subscribe(function (data) {
            _this.cards = [];
            data.subscribe(function (res) {
                res.forEach(function (stack) {
                    var checkData = _this.cards.filter(function (item) { return item.id === stack.id; });
                    if (checkData.length > 0) {
                        console.log('exits duplicated stack id=', stack.id);
                        if (stack.statusAry === null || stack.statusAry === undefined) {
                            console.log('skip to update stack:;status[', stack.id, '] into cards because stack.statusAry is null or undefined.');
                        }
                        else {
                            Object.keys(stack.statusAry).map(function (statusIndex) {
                                var stackStatus = new __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__["a" /* StackStatus */];
                                stackStatus = stack.statusAry[statusIndex];
                                if (stackStatus.userid === userid) {
                                    checkData[0].status = stackStatus.status;
                                    checkData[0].idstatus = statusIndex;
                                }
                            });
                        }
                    }
                    else if (stack.id === undefined) {
                        console.log('stack.id is undefined');
                    }
                    else if (stack.id === 'temp-key') {
                        console.log('stack.id is temp-key');
                    }
                    else {
                        if (stack.statusAry === null || stack.statusAry === undefined) {
                            console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.');
                        }
                        else {
                            var status_1 = '';
                            var idstatus_1 = '';
                            Object.keys(stack.statusAry).map(function (statusIndex) {
                                var stackStatus = new __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__["a" /* StackStatus */];
                                stackStatus = stack.statusAry[statusIndex];
                                console.log('stackStatus in loop=', stackStatus);
                                console.log('stackStatus.status=', stackStatus.status);
                                if (stackStatus.userid === userid) {
                                    status_1 = stackStatus.status;
                                    idstatus_1 = statusIndex;
                                }
                            });
                            // add stack into cards
                            _this.cards.push({
                                id: stack.id,
                                checked: false,
                                title: stack.title,
                                description: stack.description,
                                imageUrl: stack.imageUrl,
                                status: status_1,
                                idstatus: idstatus_1,
                                shareflag: stack.shareflag,
                                timeStart: __WEBPACK_IMPORTED_MODULE_5_moment___default()(stack.timeStart, 'YYYY-MM-DD').calendar()
                                //timeStart: moment(stack.timeStart, 'YYYY-MM-DD').add(5, 'days').calendar()
                            });
                        }
                    }
                });
            });
        }, function (getAllStacksError) {
            console.log(getAllStacksError);
        });
    };
    HomePage.prototype.loadCards1 = function () {
        var _this = this;
        this.cards = [];
        var data = this.cueStack.getAllStacks();
        data.subscribe(function (result) {
            console.log('result=', result);
            console.log('result.length=', result.length);
            var stacks;
            stacks = [];
            Object.keys(result).map(function (arrayIndex) {
                var array = result[arrayIndex];
                console.log('array in loop=', array);
                Object.keys(array).map(function (stackIndex) {
                    var stack = new __WEBPACK_IMPORTED_MODULE_7__models_stack_model__["a" /* Stack */];
                    stack = array[stackIndex];
                    console.log('stack in loop=', stack);
                    console.log('stack.id=', stack.id);
                    Object.keys(stack.statusAry).map(function (statusIndex) {
                        var stackStatus = new __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__["a" /* StackStatus */];
                        stackStatus = stack.statusAry[statusIndex];
                        console.log('stackStatus in loop=', stackStatus);
                        console.log('stackStatus.status=', stackStatus.status);
                    });
                    stacks.push(stack);
                });
            });
            stacks.forEach(function (stack) {
                _this.cards.push({
                    id: stack.id,
                    checked: false,
                    title: stack.title,
                    description: stack.description,
                    imageUrl: stack.imageUrl,
                    idstatus: '',
                    status: status,
                    shareflag: stack.shareflag,
                    timeStart: __WEBPACK_IMPORTED_MODULE_5_moment___default()(stack.timeStart, 'YYYY-MM-DD').calendar()
                });
            });
        });
    };
    HomePage.prototype.openModalAddStack = function () {
        var _this = this;
        var addStackModel = this.modalCtrl.create('AddStackPage', null, { cssClass: 'inset-modal' });
        addStackModel.onDidDismiss(function (data) {
            if (data) {
                console.log("HomePage::openModalAddStack new stack was added");
                _this.loadCards();
            }
        });
        addStackModel.present();
    };
    HomePage.prototype.openModalLogin = function () {
        var _this = this;
        var loginModel = this.modalCtrl.create('LoginPage', null, { cssClass: 'inset-modal' });
        loginModel.onDidDismiss(function (data) {
            if (data) {
                console.log("HomePage::openModalLogin login");
                _this.loadCards();
            }
        });
        loginModel.present();
    };
    HomePage.prototype.openModalSignup = function () {
        var _this = this;
        var signupModel = this.modalCtrl.create('SignupPage', null, { cssClass: 'inset-modal' });
        signupModel.onDidDismiss(function (data) {
            if (data) {
                console.log("HomePage::openModalSignup signup");
                _this.loadCards();
            }
        });
        signupModel.present();
    };
    HomePage.prototype.logout = function () {
        this.auth.logout();
        this.cueStack.logout();
        this.loadCards();
    };
    HomePage.prototype.cardTapped = function (event, card) {
        var stackData = [];
        stackData.push({ id: card.id, title: card.title });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { stackData: stackData });
        this.closeMode();
    };
    HomePage.prototype.startStudy = function () {
        var stackData = [];
        this.cards.forEach(function (card) {
            if (card.checked) {
                stackData.push({ id: card.id, title: card.title });
            }
        });
        this.clearCheck(false);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__cues_cues__["a" /* CuesPage */], { stackData: stackData });
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
        this.loadCards();
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
    HomePage.prototype.updateStatus = function (cards, status) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                card.idstatus = _this.cueStack.updateStackStatus(card.id, status, card.idstatus);
            }
        });
        this.clearCheck(false);
    };
    HomePage.prototype.setStatus = function (status) {
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
                    text: 'update status',
                    icon: 'text',
                    handler: function () {
                        if (_this.currentUserId !== '') {
                            _this.setStatus('all');
                        }
                        else {
                            alert('Please log in to update status.');
                        }
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
    // Search functions=======================================
    HomePage.prototype.initializeSearch = function () {
        if (this.keptCards) {
            this.cards = this.keptCards;
        }
        else {
            this.keptCards = this.cards;
        }
    };
    HomePage.prototype.getItems = function (event) {
        this.initializeSearch();
        var val = event.target.value;
        if (!val || !val.trim()) {
            this.initializeSearch();
            return;
        }
        this.cards = this.query(this.cards, { title: val, description: val });
    };
    HomePage.prototype.query = function (cards, params) {
        if (!params) {
            return cards;
        }
        return cards.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    HomePage.prototype.onClear = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    HomePage.prototype.onCancel = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button menuToggle left>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title text-align-center>Cue Stacks</ion-title>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="searchMode()">\n            <ion-icon name=\'search\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="checkMode()">\n            <ion-icon name=\'list\'></ion-icon>\n          </button>\n          <!-- <button ion-button icon-only (click)="loadCards()">\n            <ion-icon name=\'share-alt\'></ion-icon>\n          </button> -->\n          <!-- <button *ngIf="auth.currentUser" ion-button icon-only (click)="openModalAddStack()">\n            <ion-icon name=\'add\'></ion-icon>\n          </button>      -->\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>   \n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar\n          (ionInput)="getItems($event)"\n          (ionClear)="onClear($event)"\n          (ionCancel)="onCancel($event)"\n          placeholder="Search">\n        </ion-searchbar>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h3>Stacks</h3>\n  <div *ngIf="auth.currentUser">current user is {{auth.currentUser}}</div>                \n  <ion-card *ngFor="let card of cards" >\n    <div *ngIf="card.status == status || card.status == \'all\' || status == \'all\'">\n      <ion-checkbox *ngIf="checked == true;" [(ngModel)]="card.checked"></ion-checkbox>     \n      <img *ngIf="card.imageUrl"  [src]="card.imageUrl" (click)="cardTapped($event, card)" />\n      <ion-card-content>\n        <h2 class="card-title" (click)="cardTapped($event, card)">\n          {{card.title}}\n        </h2>\n        <p>\n          {{card.description}}\n        </p>\n        <p>\n          {{card.status}}\n        </p>  \n        <p>\n          {{card.timeStart}}\n        </p>  \n        </ion-card-content>\n    </div>\n  </ion-card>\n\n  <!-- Float Action Buttons -->\n  <ion-fab bottom right >\n    <button ion-fab class="pop-in" color="danger">Accout</button>\n    <ion-fab-list side="top">\n      <button ion-fab color="primary" (click)="openModalLogin()">\n        <ion-icon  name="log-in"></ion-icon>\n      </button>\n      <button ion-fab color="secondary" (click)="logout()">\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n      <button ion-fab color="danger" (click)="openModalSignup()">\n        <ion-icon name="link"></ion-icon>\n      </button>\n    </ion-fab-list>\n    <ion-fab-list side="left">\n      <button ion-fab>\n        <ion-icon name="logo-github"></ion-icon>\n      </button>\n    </ion-fab-list>\n  </ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4__providers_cuestack_cuestack__["a" /* CueStackProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_auth_auth__["a" /* AuthProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_cue_list_cue__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__ = __webpack_require__(171);
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
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.cueStack = cueStack;
        this.alertCtrl = alertCtrl;
        this.actionsheetCtrl = actionsheetCtrl;
        this.auth = auth;
        this.checked = false;
        this.value = '1';
        this.keptCards = null;
        this.loadCards();
    }
    ListPage.prototype.loadCards = function () {
        var _this = this;
        if (this.auth.currentUser) {
            var stacks = this.cueStack.getStacks();
            stacks.subscribe(function (res) {
                _this.cards = [];
                res.forEach(function (stack) {
                    if (stack.statusAry === null || stack.statusAry === undefined) {
                        console.log('skip to add stack[', stack.id, '] into cards because stack.statusAry is null or undefined.');
                    }
                    else {
                        var userid_1 = _this.cueStack.currentUserId;
                        var status_1 = '';
                        var idstatus_1 = '';
                        Object.keys(stack.statusAry).map(function (statusIndex) {
                            var stackStatus = new __WEBPACK_IMPORTED_MODULE_6__models_stackstatus_model__["a" /* StackStatus */];
                            stackStatus = stack.statusAry[statusIndex];
                            console.log('stackStatus in loop=', stackStatus);
                            console.log('stackStatus.status=', stackStatus.status);
                            if (stackStatus.userid === userid_1) {
                                status_1 = stackStatus.status;
                                idstatus_1 = statusIndex;
                            }
                        });
                        // add stack into cards
                        _this.cards.push({
                            id: stack.id,
                            checked: false,
                            title: stack.title,
                            description: stack.description,
                            imageUrl: stack.imageUrl,
                            status: status_1,
                            idstatus: idstatus_1,
                            shareflag: stack.shareflag,
                            timeStart: __WEBPACK_IMPORTED_MODULE_5_moment___default()(stack.timeStart, 'YYYY-MM-DD').calendar()
                            //timeStart: moment(stack.timeStart, 'YYYY-MM-DD').add(5, 'days').calendar()
                        });
                    }
                });
            });
        }
    };
    ListPage.prototype.cardTapped = function (event, card) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_cue_list_cue__["a" /* ListCuePage */], { title: card.title, id: card.id });
        this.closeMode();
    };
    ListPage.prototype.reportsPage = function (card) {
        this.modalCtrl.create('ReportsPage', { title: card.title, id: card.id }, { cssClass: 'inset-modal' })
            .present();
    };
    ListPage.prototype.edit = function (card) {
        this.modalCtrl.create('EditStackPage', { card: card }, { cssClass: 'inset-modal' })
            .present();
    };
    ListPage.prototype.openModalAddStack = function () {
        var _this = this;
        var addStackModel = this.modalCtrl.create('AddStackPage', null, { cssClass: 'inset-modal' });
        addStackModel.onDidDismiss(function (data) {
            if (data) {
                console.log("ListPage::openModalAddStack new stack was added");
                _this.loadCards();
            }
        });
        addStackModel.present();
    };
    ListPage.prototype.deleteChecked = function (cards) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.deleteStack(card.id);
            }
        });
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
        this.loadCards();
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
    ListPage.prototype.setStatus = function (status) {
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
    ListPage.prototype.setShare = function (sharedflag) {
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
    ListPage.prototype.updateStatus = function (cards, status) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                card.idstatus = _this.cueStack.updateStackStatus(card.id, status, card.idstatus);
            }
        });
        this.clearCheck(false);
    };
    ListPage.prototype.updateShare = function (cards, sharedflag) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.updateStackShare(card.id, sharedflag);
            }
        });
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
                        _this.setStatus('all');
                    }
                },
                {
                    text: 'share stacks',
                    icon: 'text',
                    handler: function () {
                        _this.setShare(false);
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
    // Search functions=======================================
    ListPage.prototype.initializeSearch = function () {
        if (this.keptCards) {
            this.cards = this.keptCards;
        }
        else {
            this.keptCards = this.cards;
        }
    };
    ListPage.prototype.getItems = function (event) {
        this.initializeSearch();
        var val = event.target.value;
        if (!val || !val.trim()) {
            this.initializeSearch();
            return;
        }
        this.cards = this.query(this.cards, { title: val, description: val });
    };
    ListPage.prototype.query = function (cards, params) {
        if (!params) {
            return cards;
        }
        return cards.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    ListPage.prototype.onClear = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    ListPage.prototype.onCancel = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    return ListPage;
}());
ListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list\list.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button small menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Stack List\n          <ion-buttons end>\n            <button ion-button icon-only (click)="searchMode()">\n              <ion-icon name=\'search\'></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="checkMode()">\n              <ion-icon name=\'list\'></ion-icon>\n            </button>\n            <button *ngIf="auth.currentUser" ion-button icon-only (click)="openModalAddStack()">\n              <ion-icon name=\'add\'></ion-icon>\n            </button>     \n            </ion-buttons>\n        </ion-title>\n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar\n          (ionInput)="getItems($event)"\n          (ionClear)="onClear($event)"\n          (ionCancel)="onCancel($event)"\n          placeholder="Search">\n        </ion-searchbar>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cards">\n      <button *ngIf="checked == true; else selectcheck;" ion-item>\n        <ion-checkbox [(ngModel)]="card.checked"></ion-checkbox>\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.title}}</ion-label>\n        <!-- <div item-content>{{card.description}}</div> -->\n        <ion-note item-end>Status: {{card.status}}, Share: {{card.shareflag}}</ion-note>     \n      </button>\n      <ng-template #selectcheck>\n      <button ion-item (click)="cardTapped($event, card)">\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <h2>{{card.title}}</h2>\n        <!-- <div item-content>{{card.description}}</div> -->\n        <p>{{card.description}}</p>\n        <ion-note item-end>Status: {{card.status}}, Share: {{card.shareflag}}</ion-note>\n      </button>\n      </ng-template>\n\n      <ion-item-options>\n        <button ion-button (click)="edit(card)">\n          Edit\n        </button>\n        <button ion-button (click)="reportsPage(card)">\n          Report\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list\list.html"*/
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

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCuePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_cuerate_model__ = __webpack_require__(170);
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
    function ListCuePage(modalCtrl, navParams, actionsheetCtrl, cueStack, auth) {
        this.modalCtrl = modalCtrl;
        this.navParams = navParams;
        this.actionsheetCtrl = actionsheetCtrl;
        this.cueStack = cueStack;
        this.auth = auth;
        this.checked = false;
        this.value = '1';
        this.stackid = navParams.get('id');
        this.keptCards = null;
        this.loadCards();
    }
    ListCuePage.prototype.loadCards = function () {
        var _this = this;
        if (this.auth.currentUser) {
            var userid_1 = this.cueStack.currentUserId;
            this.cueStack.getCues(this.stackid).subscribe(function (res) {
                _this.cards = [];
                res.forEach(function (cue) {
                    if (cue.rateAry === null || cue.rateAry === undefined) {
                        console.log('skip to update cue::rate[', cue.id, '] into cards because cue.rateAry is null or undefined.');
                    }
                    else {
                        // get rate data
                        var rate_1 = '';
                        var idrate_1 = '';
                        var timeStart_1 = '';
                        Object.keys(cue.rateAry).map(function (rateIndex) {
                            var cueRate = new __WEBPACK_IMPORTED_MODULE_4__models_cuerate_model__["a" /* CueRate */];
                            cueRate = cue.rateAry[rateIndex];
                            if (cueRate.userid === userid_1) {
                                rate_1 = cueRate.rate;
                                idrate_1 = rateIndex;
                                timeStart_1 = cueRate.timeStart;
                            }
                        });
                        // store cue data
                        _this.cards.push({
                            question: cue.question,
                            answer: cue.answer,
                            imageUrl: cue.imageUrl,
                            id: cue.id,
                            idrate: idrate_1,
                            rate: rate_1,
                            timeStart: timeStart_1,
                            checked: false
                        });
                    }
                });
            });
        }
    };
    ListCuePage.prototype.cardTapped = function (event, card) {
        var _this = this;
        var editCueModel = this.modalCtrl.create('EditCuePage', { card: card }, { cssClass: 'inset-modal' });
        editCueModel.onDidDismiss(function (data) {
            if (data) {
                console.log("ListCuePage::cardTapped::modified cue");
                _this.loadCards();
            }
        });
        editCueModel.present();
        this.closeMode();
    };
    ListCuePage.prototype.openModalAddCue = function () {
        var _this = this;
        var addCueModel = this.modalCtrl.create('AddCuePage', { id: this.stackid }, { cssClass: 'inset-modal' });
        addCueModel.onDidDismiss(function (data) {
            if (data) {
                console.log("ListCuePage::openModelAddCue() added cue");
                _this.loadCards();
            }
        });
        addCueModel.present();
    };
    ListCuePage.prototype.deleteChecked = function (cards) {
        var _this = this;
        cards.forEach(function (card) {
            if (card.checked) {
                _this.cueStack.deleteCue(card.id);
            }
        });
        this.clearCheck(false);
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
        this.loadCards();
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
    // Search functions=======================================
    ListCuePage.prototype.initializeSearch = function () {
        if (this.keptCards) {
            this.cards = this.keptCards;
        }
        else {
            this.keptCards = this.cards;
        }
    };
    ListCuePage.prototype.getItems = function (event) {
        this.initializeSearch();
        var val = event.target.value;
        if (!val || !val.trim()) {
            this.initializeSearch();
            return;
        }
        this.cards = this.query(this.cards, { question: val, answer: val });
    };
    ListCuePage.prototype.query = function (cards, params) {
        if (!params) {
            return cards;
        }
        return cards.filter(function (item) {
            for (var key in params) {
                var field = item[key];
                if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
                    return item;
                }
                else if (field == params[key]) {
                    return item;
                }
            }
            return null;
        });
    };
    ListCuePage.prototype.onClear = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    ListCuePage.prototype.onCancel = function (event) {
        this.initializeSearch();
        this.keptCards = null;
    };
    return ListCuePage;
}());
ListCuePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-list-cue',template:/*ion-inline-start:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/'<ion-header>\n  <ion-navbar>\n    <div [ngSwitch]="value">\n      <div *ngSwitchCase="1">\n        <button ion-button small menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n        <ion-title>Cue List\n          <ion-buttons end>\n            <button ion-button icon-only (click)="searchMode()">\n              <ion-icon name=\'search\'></ion-icon>\n            </button>\n            <button ion-button icon-only (click)="checkMode()">\n              <ion-icon name=\'list\'></ion-icon>\n            </button>\n            <button *ngIf="auth.currentUser" ion-button icon-only (click)="openModalAddCue()">\n              <ion-icon name=\'add\'></ion-icon>\n            </button>   \n          </ion-buttons>\n        </ion-title>\n      </div>\n      <div *ngSwitchCase="2">\n        <ion-buttons end>\n          <button ion-button icon-only (click)="actionSheet1()">\n            <ion-icon name=\'beer\'></ion-icon>\n          </button>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>       \n      </div>\n      <div *ngSwitchCase="3">\n        <ion-searchbar\n          (ionInput)="getItems($event)"\n          (ionClear)="onClear($event)"\n          (ionCancel)="onCancel($event)"\n          placeholder="Search">\n        </ion-searchbar>\n        <ion-buttons end>\n          <button ion-button icon-only (click)="closeMode()">\n            <ion-icon name=\'close\'></ion-icon>\n          </button>\n        </ion-buttons>         \n      </div>\n      <div *ngSwitchDefault>Default Template</div>\n    </div>\n  </ion-navbar>\n</ion-header>\n\n<ion-content> \n  <ion-list>\n    <ion-item-sliding *ngFor="let card of cards">\n      <button *ngIf="checked == true; else selectcheck;" ion-item>\n        <ion-checkbox [(ngModel)]="card.checked"></ion-checkbox>\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.question}}</ion-label>\n        <div item-content>{{card.answer}}</div>\n        <ion-note item-end>Rate: {{card.rate}}</ion-note>     \n      </button>\n      <ng-template #selectcheck>\n      <button ion-item (click)="cardTapped($event, card)">\n        <ion-avatar item-start>\n          <img [src]="card.imageUrl" />\n        </ion-avatar>\n        <ion-label>{{card.question}}</ion-label>\n        <div item-content>{{card.answer}}</div>\n        <ion-note item-end>Rate: {{card.rate}}</ion-note>     \n      </button>\n      </ng-template>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"E:\ionic\CueStacks\src\pages\list-cue\list-cue.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_cuestack_cuestack__["a" /* CueStackProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */]])
], ListCuePage);

//# sourceMappingURL=list-cue.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlashCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
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

/***/ 451:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(452);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(456);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_cues_cues__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_list__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_list_cue_list_cue__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_flash_card_flash_card__ = __webpack_require__(450);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_moment_moment__ = __webpack_require__(815);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_auth_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_cuestack_cuestack__ = __webpack_require__(62);
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
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_cues_cues__["a" /* CuesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_list_cue_list_cue__["a" /* ListCuePage */],
            __WEBPACK_IMPORTED_MODULE_12__components_flash_card_flash_card__["a" /* FlashCardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pipes_moment_moment__["a" /* MomentPipe */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["b" /* AngularFireDatabaseModule */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["b" /* AngularFireAuthModule */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/cues/cues.module#CuesPageModule', name: 'CuesPage', segment: 'cues', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/cues/add-cue/add-cue.module#AddCuePageModule', name: 'AddCuePage', segment: 'add-cue', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/add-stack/add-stack.module#AddStackPageModule', name: 'AddStackPage', segment: 'add-stack', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/home/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/add-stack/add-stack.module#AddStackPageModule', name: 'AddStackPage', segment: 'add-stack', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/edit-stack/edit-stack.module#AddStackPageModule', name: 'EditStackPage', segment: 'edit-stack', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list/reports/reports.module#ReportsPageModule', name: 'ReportsPage', segment: 'reports', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list-cue/add-cue/add-cue.module#AddCuePageModule', name: 'AddCuePage', segment: 'add-cue', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/list-cue/edit-cue/edit-cue.module#AddStackPageModule', name: 'EditCuePage', segment: 'edit-cue', priority: 'low', defaultHistory: [] }
                ]
            }),
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_list_list__["a" /* ListPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_list_cue_list_cue__["a" /* ListCuePage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_cues_cues__["a" /* CuesPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_15__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_16__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_cuestack_cuestack__["a" /* CueStackProvider */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_12__components_flash_card_flash_card__["a" /* FlashCardComponent */],
            __WEBPACK_IMPORTED_MODULE_13__pipes_moment_moment__["a" /* MomentPipe */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 533:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 265,
	"./af.js": 265,
	"./ar": 266,
	"./ar-dz": 267,
	"./ar-dz.js": 267,
	"./ar-kw": 268,
	"./ar-kw.js": 268,
	"./ar-ly": 269,
	"./ar-ly.js": 269,
	"./ar-ma": 270,
	"./ar-ma.js": 270,
	"./ar-sa": 271,
	"./ar-sa.js": 271,
	"./ar-tn": 272,
	"./ar-tn.js": 272,
	"./ar.js": 266,
	"./az": 273,
	"./az.js": 273,
	"./be": 274,
	"./be.js": 274,
	"./bg": 275,
	"./bg.js": 275,
	"./bn": 276,
	"./bn.js": 276,
	"./bo": 277,
	"./bo.js": 277,
	"./br": 278,
	"./br.js": 278,
	"./bs": 279,
	"./bs.js": 279,
	"./ca": 280,
	"./ca.js": 280,
	"./cs": 281,
	"./cs.js": 281,
	"./cv": 282,
	"./cv.js": 282,
	"./cy": 283,
	"./cy.js": 283,
	"./da": 284,
	"./da.js": 284,
	"./de": 285,
	"./de-at": 286,
	"./de-at.js": 286,
	"./de-ch": 287,
	"./de-ch.js": 287,
	"./de.js": 285,
	"./dv": 288,
	"./dv.js": 288,
	"./el": 289,
	"./el.js": 289,
	"./en-au": 290,
	"./en-au.js": 290,
	"./en-ca": 291,
	"./en-ca.js": 291,
	"./en-gb": 292,
	"./en-gb.js": 292,
	"./en-ie": 293,
	"./en-ie.js": 293,
	"./en-nz": 294,
	"./en-nz.js": 294,
	"./eo": 295,
	"./eo.js": 295,
	"./es": 296,
	"./es-do": 297,
	"./es-do.js": 297,
	"./es.js": 296,
	"./et": 298,
	"./et.js": 298,
	"./eu": 299,
	"./eu.js": 299,
	"./fa": 300,
	"./fa.js": 300,
	"./fi": 301,
	"./fi.js": 301,
	"./fo": 302,
	"./fo.js": 302,
	"./fr": 303,
	"./fr-ca": 304,
	"./fr-ca.js": 304,
	"./fr-ch": 305,
	"./fr-ch.js": 305,
	"./fr.js": 303,
	"./fy": 306,
	"./fy.js": 306,
	"./gd": 307,
	"./gd.js": 307,
	"./gl": 308,
	"./gl.js": 308,
	"./gom-latn": 309,
	"./gom-latn.js": 309,
	"./he": 310,
	"./he.js": 310,
	"./hi": 311,
	"./hi.js": 311,
	"./hr": 312,
	"./hr.js": 312,
	"./hu": 313,
	"./hu.js": 313,
	"./hy-am": 314,
	"./hy-am.js": 314,
	"./id": 315,
	"./id.js": 315,
	"./is": 316,
	"./is.js": 316,
	"./it": 317,
	"./it.js": 317,
	"./ja": 318,
	"./ja.js": 318,
	"./jv": 319,
	"./jv.js": 319,
	"./ka": 320,
	"./ka.js": 320,
	"./kk": 321,
	"./kk.js": 321,
	"./km": 322,
	"./km.js": 322,
	"./kn": 323,
	"./kn.js": 323,
	"./ko": 324,
	"./ko.js": 324,
	"./ky": 325,
	"./ky.js": 325,
	"./lb": 326,
	"./lb.js": 326,
	"./lo": 327,
	"./lo.js": 327,
	"./lt": 328,
	"./lt.js": 328,
	"./lv": 329,
	"./lv.js": 329,
	"./me": 330,
	"./me.js": 330,
	"./mi": 331,
	"./mi.js": 331,
	"./mk": 332,
	"./mk.js": 332,
	"./ml": 333,
	"./ml.js": 333,
	"./mr": 334,
	"./mr.js": 334,
	"./ms": 335,
	"./ms-my": 336,
	"./ms-my.js": 336,
	"./ms.js": 335,
	"./my": 337,
	"./my.js": 337,
	"./nb": 338,
	"./nb.js": 338,
	"./ne": 339,
	"./ne.js": 339,
	"./nl": 340,
	"./nl-be": 341,
	"./nl-be.js": 341,
	"./nl.js": 340,
	"./nn": 342,
	"./nn.js": 342,
	"./pa-in": 343,
	"./pa-in.js": 343,
	"./pl": 344,
	"./pl.js": 344,
	"./pt": 345,
	"./pt-br": 346,
	"./pt-br.js": 346,
	"./pt.js": 345,
	"./ro": 347,
	"./ro.js": 347,
	"./ru": 348,
	"./ru.js": 348,
	"./sd": 349,
	"./sd.js": 349,
	"./se": 350,
	"./se.js": 350,
	"./si": 351,
	"./si.js": 351,
	"./sk": 352,
	"./sk.js": 352,
	"./sl": 353,
	"./sl.js": 353,
	"./sq": 354,
	"./sq.js": 354,
	"./sr": 355,
	"./sr-cyrl": 356,
	"./sr-cyrl.js": 356,
	"./sr.js": 355,
	"./ss": 357,
	"./ss.js": 357,
	"./sv": 358,
	"./sv.js": 358,
	"./sw": 359,
	"./sw.js": 359,
	"./ta": 360,
	"./ta.js": 360,
	"./te": 361,
	"./te.js": 361,
	"./tet": 362,
	"./tet.js": 362,
	"./th": 363,
	"./th.js": 363,
	"./tl-ph": 364,
	"./tl-ph.js": 364,
	"./tlh": 365,
	"./tlh.js": 365,
	"./tr": 366,
	"./tr.js": 366,
	"./tzl": 367,
	"./tzl.js": 367,
	"./tzm": 368,
	"./tzm-latn": 369,
	"./tzm-latn.js": 369,
	"./tzm.js": 368,
	"./uk": 370,
	"./uk.js": 370,
	"./ur": 371,
	"./ur.js": 371,
	"./uz": 372,
	"./uz-latn": 373,
	"./uz-latn.js": 373,
	"./uz.js": 372,
	"./vi": 374,
	"./vi.js": 374,
	"./x-pseudo": 375,
	"./x-pseudo.js": 375,
	"./yo": 376,
	"./yo.js": 376,
	"./zh-cn": 377,
	"./zh-cn.js": 377,
	"./zh-hk": 378,
	"./zh-hk.js": 378,
	"./zh-tw": 379,
	"./zh-tw.js": 379
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
webpackContext.id = 533;

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_list_list__ = __webpack_require__(448);
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

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stack; });
var Stack = (function () {
    function Stack() {
    }
    return Stack;
}());

//# sourceMappingURL=stack.model.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CueStackProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
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
    function CueStackProvider(db, http, afAuth) {
        var _this = this;
        this.db = db;
        this.http = http;
        this.afAuth = afAuth;
        this._serviceUrl = 'https://cuestacks.firebaseapp.com/';
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
    Object.defineProperty(CueStackProvider.prototype, "currentUserId", {
        get: function () {
            return this.user !== null ? this.user.uid : '';
            //return this.user.uid;
        },
        enumerable: true,
        configurable: true
    });
    //// ------------ CueRate Table --------------
    CueStackProvider.prototype.addCueRate = function (cueid, rate) {
        var userid = this.user.uid;
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        var list = this.getCueRates(cueid);
        var key = list.push({
            userid: userid,
            cueid: cueid,
            rate: rate,
            timeStart: timestamp
        }).key;
        return key;
    };
    CueStackProvider.prototype.updateCueRate = function (cueid, rate, idrate) {
        if (idrate === undefined || idrate === '') {
            console.log('error in updateCueRate:: no data CueRate cueID=', cueid, ', userID=', this.user.uid);
            return this.addCueRate(cueid, rate);
        }
        else {
            var path = "cues/" + cueid + "/rateAry/" + idrate;
            var data = {
                rate: rate,
            };
            this.db.object(path).update(data)
                .catch(function (error) { return console.log(error); });
            return idrate;
        }
    };
    CueStackProvider.prototype.getCueRates = function (cueid) {
        if (this.user) {
            return this.db.list("cues/" + cueid + "/rateAry", {
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
    //// ------------ CueRate Table --------------
    //// ------------ Cue Table --------------
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
            timeStart: timestamp,
        }).key;
        this.updateCueID(key);
        this.addCueRate(key, rate);
    };
    CueStackProvider.prototype.updateCueID = function (key) {
        var path = "cues/" + key;
        var data = {
            id: key
        };
        this.db.object(path).update(data)
            .catch(function (error) { return console.log(error); });
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
        var checkOb = this.db.object(path);
        if (checkOb === null || checkOb === undefined) {
            console.log('error in updateCue:: no data Cue with id=', cue.id);
        }
        else {
            this.db.object(path).update(data)
                .catch(function (error) { return console.log(error); });
        }
    };
    //// ------------ Cue Table --------------
    //// ------------ Stack Table --------------
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
    CueStackProvider.prototype.getAllStacks = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Headers */]();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', 'https://cuestacks.firebaseapp.com');
        headers.append('Access-Control-Allow-Credentials', 'true');
        var options = new __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var url = this._serviceUrl;
        return this.http.get(url, options).map(function (res) { return res.json(); });
    };
    CueStackProvider.prototype.getAllStacks1 = function () {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].create(function (observer) {
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
            observer.complete();
        });
    };
    CueStackProvider.prototype.updateStackShare = function (stackid, shareflag) {
        var path = "stacks/" + stackid;
        var data = {
            shareflag: shareflag
        };
        var checkOb = this.db.object(path);
        if (checkOb === null || checkOb === undefined) {
            console.log('error in updateStackShare:: no data Stack with id=', stackid);
        }
        else {
            this.db.object(path).update(data)
                .catch(function (error) { return console.log(error); });
        }
    };
    CueStackProvider.prototype.updateStackID = function (key) {
        var path = "stacks/" + key;
        var data = {
            id: key
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
            shareflag: stack.shareflag
        };
        var checkOb = this.db.object(path);
        if (checkOb === null || checkOb === undefined) {
            console.log('error in updateStack:: no data Stack with id=', stack.id);
        }
        else {
            this.db.object(path).update(data)
                .catch(function (error) { return console.log(error); });
        }
    };
    //// ------------ Stack Table --------------
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
        // delete stack
        var path = "stacks/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.deleteCue = function (key) {
        var path = "cues/" + key;
        this.db.object(path).remove()
            .catch(function (error) { return console.log(error); });
    };
    CueStackProvider.prototype.addStackStatus = function (stackid, status) {
        var userid = this.user.uid;
        var timestamp = __WEBPACK_IMPORTED_MODULE_4_moment___default()(new Date()).format('YYYY-MM-DD');
        var list = this.getStackStatus(stackid);
        var key = list.push({
            userid: userid,
            status: status,
            timeStart: timestamp
        }).key;
        return key;
    };
    CueStackProvider.prototype.updateStackStatus = function (stackid, status, idstatus) {
        if (idstatus === undefined || idstatus === '') {
            console.log('error in updateStackStatus:: no data CueRate stackid=', stackid, ', userID=', this.user.uid);
            return this.addStackStatus(stackid, status);
        }
        else {
            var path = "stacks/" + stackid + "/statusAry/" + idstatus;
            var data = {
                status: status,
            };
            this.db.object(path).update(data)
                .catch(function (error) { return console.log(error); });
            return idstatus;
        }
    };
    CueStackProvider.prototype.getStackStatus = function (stackid) {
        if (this.user) {
            return this.db.list("stacks/" + stackid + "/statusAry", {
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
        __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
], CueStackProvider);

//# sourceMappingURL=cuestack.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(0);
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

/***/ }),

/***/ 815:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
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

/***/ })

},[451]);
//# sourceMappingURL=main.js.map