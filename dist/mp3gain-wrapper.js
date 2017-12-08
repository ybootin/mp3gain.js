var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = window.mozCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame;
}
var emloader;
(function (emloader) {
    var event;
    (function (event) {
        var EventEmiter = (function () {
            function EventEmiter() {
                this.handlers = {};
            }
            EventEmiter.prototype.on = function (eventName, callback) {
                this.handlers[eventName] = this.handlers[eventName] || [];
                this.handlers[eventName].push(callback);
            };
            EventEmiter.prototype.off = function (eventName, callback) {
                if (this.handlers[eventName] && this.handlers[eventName].indexOf(callback) !== -1) {
                    this.handlers[eventName][this.handlers[eventName].indexOf(callback)] = function () { };
                }
            };
            EventEmiter.prototype.emit = function (eventName, data) {
                if (this.handlers[eventName]) {
                    this.handlers[eventName].forEach(function (callback) { return callback(data); });
                }
            };
            EventEmiter.prototype.clean = function () {
                this.handlers = {};
            };
            return EventEmiter;
        }());
        event.EventEmiter = EventEmiter;
    })(event = emloader.event || (emloader.event = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var helper;
    (function (helper) {
        var KeyCode = (function () {
            function KeyCode() {
            }
            KeyCode.backspace = 8;
            KeyCode.tab = 9;
            KeyCode.enter = 13;
            KeyCode.shift = 16;
            KeyCode.ctrl = 17;
            KeyCode.alt = 18;
            KeyCode.pauseBreak = 19;
            KeyCode.capsLock = 20;
            KeyCode.escape = 27;
            KeyCode.space = 32;
            KeyCode.pageup = 33;
            KeyCode.pagedown = 34;
            KeyCode.end = 35;
            KeyCode.home = 36;
            KeyCode.leftarrow = 37;
            KeyCode.uparrow = 38;
            KeyCode.rightarrow = 39;
            KeyCode.downarrow = 40;
            KeyCode.insert = 45;
            KeyCode.delete = 46;
            KeyCode.digit0 = 48;
            KeyCode.digit1 = 49;
            KeyCode.digit2 = 50;
            KeyCode.digit3 = 51;
            KeyCode.digit4 = 52;
            KeyCode.digit5 = 53;
            KeyCode.digit6 = 54;
            KeyCode.digit7 = 55;
            KeyCode.digit8 = 56;
            KeyCode.digit9 = 57;
            KeyCode.a = 65;
            KeyCode.b = 66;
            KeyCode.c = 67;
            KeyCode.d = 68;
            KeyCode.e = 69;
            KeyCode.f = 70;
            KeyCode.g = 71;
            KeyCode.h = 72;
            KeyCode.i = 73;
            KeyCode.j = 74;
            KeyCode.k = 75;
            KeyCode.l = 76;
            KeyCode.m = 77;
            KeyCode.n = 78;
            KeyCode.o = 79;
            KeyCode.p = 80;
            KeyCode.q = 81;
            KeyCode.r = 82;
            KeyCode.s = 83;
            KeyCode.t = 84;
            KeyCode.u = 85;
            KeyCode.v = 86;
            KeyCode.w = 87;
            KeyCode.x = 88;
            KeyCode.y = 89;
            KeyCode.z = 90;
            KeyCode.leftWindowKey = 91;
            KeyCode.rightWindowKey = 92;
            KeyCode.selectKey = 93;
            KeyCode.numpad0 = 96;
            KeyCode.numpad1 = 97;
            KeyCode.numpad2 = 98;
            KeyCode.numpad3 = 99;
            KeyCode.numpad4 = 100;
            KeyCode.numpad5 = 101;
            KeyCode.numpad6 = 102;
            KeyCode.numpad7 = 103;
            KeyCode.numpad8 = 104;
            KeyCode.numpad9 = 105;
            KeyCode.multiply = 106;
            KeyCode.add = 107;
            KeyCode.subtract = 109;
            KeyCode.decimalPoint = 110;
            KeyCode.divide = 111;
            KeyCode.f1 = 112;
            KeyCode.f2 = 113;
            KeyCode.f3 = 114;
            KeyCode.f4 = 115;
            KeyCode.f5 = 116;
            KeyCode.f6 = 117;
            KeyCode.f7 = 118;
            KeyCode.f8 = 119;
            KeyCode.f9 = 120;
            KeyCode.f10 = 121;
            KeyCode.f11 = 122;
            KeyCode.f12 = 123;
            KeyCode.numlock = 144;
            KeyCode.scrolllock = 145;
            KeyCode.semicolon = 186;
            KeyCode.equalsign = 187;
            KeyCode.comma = 188;
            KeyCode.dash = 189;
            KeyCode.period = 190;
            KeyCode.forwardslash = 191;
            KeyCode.graveAccent = 192;
            KeyCode.openbracket = 219;
            KeyCode.backslash = 220;
            KeyCode.closebraket = 221;
            KeyCode.singlequote = 222;
            return KeyCode;
        }());
        helper.KeyCode = KeyCode;
        helper.KeyCodeKey = new Array(222);
        for (var key in KeyCode) {
            helper.KeyCodeKey[KeyCode[key]] = key;
        }
    })(helper = emloader.helper || (emloader.helper = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var KeyHandler = (function (_super) {
        __extends(KeyHandler, _super);
        function KeyHandler(module) {
            var _this = _super.call(this) || this;
            _this.module = module;
            return _this;
        }
        KeyHandler.getKeyCode = function (key) {
            return emloader.helper.KeyCode[key];
        };
        KeyHandler.getKey = function (keyCode) {
            return emloader.helper.KeyCodeKey[keyCode];
        };
        KeyHandler.triggerKeyEvent = function (module, eventType, keyCode, charCode) {
            return emloader.Emloader.triggerEvent(module, eventType, {
                keyCode: keyCode,
                witch: keyCode,
                charCode: charCode
            });
        };
        KeyHandler.prototype.pressKey = function (keyCode) {
            KeyHandler.triggerKeyEvent(this.module, 'keydown', keyCode, 0);
            this.emit(KeyHandler.KEYPRESS, keyCode);
        };
        KeyHandler.prototype.releaseKey = function (keyCode) {
            KeyHandler.triggerKeyEvent(this.module, 'keyup', keyCode, 0);
            this.emit(KeyHandler.KEYRELEASE, keyCode);
        };
        KeyHandler.KEYPRESS = 'keypress';
        KeyHandler.KEYRELEASE = 'keyrelease';
        return KeyHandler;
    }(emloader.event.EventEmiter));
    emloader.KeyHandler = KeyHandler;
    var FakeKeyHandler = (function (_super) {
        __extends(FakeKeyHandler, _super);
        function FakeKeyHandler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FakeKeyHandler.prototype.pressKey = function (keyCode) {
            this.emit(KeyHandler.KEYPRESS, keyCode);
        };
        FakeKeyHandler.prototype.releaseKey = function (keyCode) {
            this.emit(KeyHandler.KEYRELEASE, keyCode);
        };
        return FakeKeyHandler;
    }(emloader.event.EventEmiter));
    emloader.FakeKeyHandler = FakeKeyHandler;
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var helper;
    (function (helper) {
        var HTMLHelper = (function () {
            function HTMLHelper() {
            }
            HTMLHelper.loadScript = function (doc, url) {
                return new Promise(function (resolve, reject) {
                    var script = doc.createElement('script');
                    script.addEventListener("load", function (evt) {
                        resolve(script);
                    });
                    script.addEventListener("error", function (evt) {
                        reject(evt);
                    });
                    script.type = 'text/javascript';
                    script.src = url;
                    doc.getElementsByTagName('head')[0].appendChild(script);
                });
            };
            HTMLHelper.createIframe = function (doc) {
                if (doc === void 0) { doc = window.document; }
                var iframe = doc.createElement('iframe');
                iframe.style.margin = '0px';
                iframe.style.padding = '0px';
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = '0px';
                iframe.style.overflow = 'hidden';
                iframe.setAttribute('scrolling', 'no');
                iframe.frameBorder = '0';
                return iframe;
            };
            HTMLHelper.getWindow = function (element) {
                return element.ownerDocument.defaultView || element.ownerDocument.parentWindow;
            };
            HTMLHelper.addClass = function (element, className) {
                element.className = element.className + (element.className.split(' ').indexOf(className) === -1 ? ' ' + className : '');
            };
            HTMLHelper.removeClass = function (element, className) {
                element.className = element.className.split(' ').filter(function (item) {
                    return item !== className;
                }).join(' ');
            };
            return HTMLHelper;
        }());
        helper.HTMLHelper = HTMLHelper;
    })(helper = emloader.helper || (emloader.helper = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var helper;
    (function (helper) {
        var FileLoader = (function () {
            function FileLoader() {
            }
            FileLoader.loadFile = function (url, name, handler) {
                return FileLoader.fetchFile(url, 'arraybuffer', handler).then(function (data) {
                    return {
                        name: name,
                        data: new Uint8Array(data)
                    };
                });
            };
            FileLoader.fetchFile = function (url, responseType, handler) {
                return new Promise(function (resolve, reject) {
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', url, true);
                    xhr.responseType = responseType;
                    var errorMsg = 'error loading ' + url;
                    if (handler && typeof handler === 'function') {
                        ['progress', 'load', 'error', 'abort'].forEach(function (eventName) {
                            xhr.addEventListener(eventName, handler);
                        });
                    }
                    xhr.onload = function (e) {
                        if (xhr.status < 200 || xhr.status >= 400) {
                            reject(errorMsg + ' : status code ' + xhr.status);
                        }
                        else {
                            resolve(xhr.response);
                        }
                    };
                    xhr.onerror = function (e) {
                        reject(errorMsg + ' : ' + e.toString());
                    };
                    xhr.send();
                });
            };
            FileLoader.toUint8Array = function (str) {
                var len = str.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    bytes[i] = str.charCodeAt(i);
                }
                return bytes;
            };
            return FileLoader;
        }());
        helper.FileLoader = FileLoader;
    })(helper = emloader.helper || (emloader.helper = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.pressed = {};
            _this.sensibility = 0.5;
            return _this;
        }
        Joystick.prototype.setControlMapping = function (controlMapping) {
            if (this.controlMapping !== controlMapping) {
                this.controlMapping = controlMapping;
                this.emit(Joystick.CONTROLCHANGE);
            }
        };
        Joystick.prototype.getControlMapping = function () {
            return this.controlMapping;
        };
        Joystick.prototype.setKeyHandler = function (handler) {
            this.handler = handler;
        };
        Joystick.prototype.getKeyHandler = function () {
            return this.handler;
        };
        Joystick.prototype.connect = function (gamepad) {
            var _this = this;
            if (!this.isConnected()) {
                this.gamepad = gamepad;
                var loop_1 = function () {
                    var gamepad = _this.getGamepad();
                    Joystick.axes.forEach(function (axe, index) {
                        try {
                            if (gamepad.axes[index] <= -_this.sensibility || gamepad.axes[index] >= _this.sensibility) {
                                _this.keyPress(gamepad.axes[index] <= -_this.sensibility ? axe[0] : axe[1]);
                            }
                            else if (_this.pressed[axe[0]] || _this.pressed[axe[1]]) {
                                _this.keyRelease(_this.pressed[axe[0]] ? axe[0] : axe[1]);
                            }
                        }
                        catch (e) { }
                    });
                    _this.getButtonMap().forEach(function (bt, index) {
                        if (bt) {
                            try {
                                if (gamepad.buttons[index].pressed) {
                                    _this.keyPress(bt);
                                }
                                else if (_this.pressed[bt]) {
                                    _this.keyRelease(bt);
                                }
                            }
                            catch (e) { }
                        }
                    });
                    _this.loopId = requestAnimationFrame(loop_1);
                };
                loop_1();
                this.emit(Joystick.CONNECTED);
            }
        };
        Joystick.prototype.disconnect = function () {
            cancelAnimationFrame(this.loopId);
            this.loopId = null;
            this.gamepad = null;
            this.controlMapping = null;
            this.emit(Joystick.DISCONNECTED);
        };
        Joystick.prototype.isConnected = function () {
            return !!this.loopId;
        };
        Joystick.prototype.getGamepad = function () {
            return this.gamepad ? navigator.getGamepads()[this.gamepad.index] : null;
        };
        Joystick.prototype.getButtonMap = function () {
            return this.customButtonMap || Joystick.buttonMap;
        };
        Joystick.prototype.setButtonMap = function (buttonMap) {
            if (buttonMap !== this.customButtonMap) {
                this.customButtonMap = buttonMap;
                this.emit(Joystick.BUTTONMAPCHANGE);
            }
        };
        Joystick.prototype.keyPress = function (key) {
            if (this.handler) {
                this.pressed[key] = true;
                this.handler.pressKey(this.controlMapping[key]);
            }
        };
        Joystick.prototype.keyRelease = function (key) {
            if (this.handler) {
                this.pressed[key] = false;
                this.handler.releaseKey(this.controlMapping[key]);
            }
        };
        Joystick.axes = [['left', 'right'], ['up', 'down']];
        Joystick.buttonMap = ['button1', 'button2', 'button3', 'button4', 'button5', 'button6', null, null, 'coin', 'start'];
        Joystick.BUTTONMAPCHANGE = 'buttonmapchange';
        Joystick.DISCONNECTED = 'disconnected';
        Joystick.CONNECTED = 'connected';
        Joystick.CONTROLCHANGE = 'controlchange';
        return Joystick;
    }(emloader.event.EventEmiter));
    emloader.Joystick = Joystick;
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var Keyboard = (function () {
        function Keyboard() {
            this.keyCodeMapping = [];
        }
        Keyboard.prototype.setKeyHandler = function (keyhandler) {
            this.keyhandler = keyhandler;
        };
        Keyboard.prototype.bind = function () {
            var _this = this;
            this.unbind();
            this.keyboardEventHandler = function (evt) {
                var keyCode = _this.keyCodeMapping[evt.keyCode] || evt.keyCode;
                if (keyCode) {
                    evt.type === 'keydown' ? _this.keyhandler.pressKey(keyCode) : _this.keyhandler.releaseKey(keyCode);
                }
            };
            document.addEventListener('keyup', this.keyboardEventHandler);
            document.addEventListener('keydown', this.keyboardEventHandler);
        };
        Keyboard.prototype.unbind = function () {
            if (this.keyboardEventHandler) {
                document.removeEventListener('keyup', this.keyboardEventHandler);
                document.removeEventListener('keydown', this.keyboardEventHandler);
                this.keyboardEventHandler = null;
            }
        };
        Keyboard.KEYMAPPINGCHANGE = 'keymappingchange';
        return Keyboard;
    }());
    emloader.Keyboard = Keyboard;
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var Controllers = (function (_super) {
        __extends(Controllers, _super);
        function Controllers(mappings) {
            var _this = _super.call(this) || this;
            _this.mappings = mappings;
            _this.keyboard = new emloader.Keyboard();
            _this._joysticks = new Array(4);
            for (var i = 0; i < 4; i++) {
                _this._joysticks[i] = (function () {
                    var joystick = new emloader.Joystick();
                    joystick.on(emloader.Joystick.CONNECTED, function () { return _this.emit(Controllers.JOYSTICKCONNECTED, joystick); });
                    joystick.on(emloader.Joystick.DISCONNECTED, function () { return _this.emit(Controllers.JOYSTICKDISCONNECTED, joystick); });
                    joystick.on(emloader.Joystick.BUTTONMAPCHANGE, function () { return _this.emit(Controllers.JOYSTICKBUTTONMAPCHANGE, joystick); });
                    joystick.on(emloader.Joystick.CONTROLCHANGE, function () {
                        _this.emit(Controllers.JOYSTICKCONTROLCHANGE, joystick);
                        _this.getJoysticks().forEach(function (j) {
                            if (j !== joystick && j.getControlMapping() === joystick.getControlMapping()) {
                                j.setControlMapping(_this.getAvailableMappings()[0]);
                            }
                        });
                    });
                    return joystick;
                })();
            }
            return _this;
        }
        Controllers.prototype.setKeyHandler = function (keyHandler) {
            var _this = this;
            this.keyHandler = keyHandler;
            this.keyHandler.on('keypress', function (keyCode) { return _this.emit(Controllers.KEYPRESS, keyCode); });
            this.keyHandler.on('keyrelease', function (keyCode) { return _this.emit(Controllers.KEYRELEASE, keyCode); });
            this.getJoysticks().forEach(function (joystick) {
                if (joystick) {
                    joystick.setKeyHandler(keyHandler);
                }
            });
            this.keyboard.setKeyHandler(keyHandler);
        };
        Controllers.prototype.getKeyHandler = function () {
            return this.keyHandler;
        };
        Controllers.prototype.getJoysticks = function () {
            return this._joysticks.filter(function (joystick) {
                return joystick.isConnected();
            });
        };
        Controllers.prototype.getJoystick = function (mapping) {
            return this._joysticks.filter(function (joystick) {
                return joystick && joystick.getControlMapping() === mapping;
            })[0];
        };
        Controllers.prototype.getAvailableMappings = function () {
            var _this = this;
            return this.mappings.filter(function (mapping) { return !_this.getJoystick(mapping); });
        };
        Controllers.prototype.checkGamepads = function () {
            var gamepads = navigator.getGamepads();
            for (var i = 0, l = gamepads.length; i < l; i++) {
                if (gamepads[i] && !this._joysticks[i].isConnected()) {
                    this._joysticks[i].setControlMapping(this.getAvailableMappings()[0]);
                    this._joysticks[i].setKeyHandler(this.keyHandler);
                    this._joysticks[i].connect(gamepads[i]);
                }
                else if (!gamepads[i] && this._joysticks[i].isConnected()) {
                    this._joysticks[i].disconnect();
                }
            }
        };
        Controllers.prototype.bind = function (scope) {
            var _this = this;
            if (scope === void 0) { scope = window; }
            this.unbind(scope);
            this.gamepadChecker = setInterval(function () {
                _this.checkGamepads();
            }, 1000);
            this.checkGamepads();
            this.keyboard.bind();
        };
        Controllers.prototype.unbind = function (scope) {
            if (scope === void 0) { scope = window; }
            if (this.gamepadChecker) {
                clearInterval(this.gamepadChecker);
                this.getJoysticks().forEach(function (joystick) {
                    joystick.disconnect();
                });
            }
            this.keyboard.unbind();
        };
        Controllers.JOYSTICKCONNECTED = 'joystickconnected';
        Controllers.JOYSTICKDISCONNECTED = 'joystickdisconnected';
        Controllers.JOYSTICKBUTTONMAPCHANGE = 'joystickbuttonmapchange';
        Controllers.JOYSTICKCONTROLCHANGE = 'joystickcontrolchange';
        Controllers.KEYPRESS = 'keypress';
        Controllers.KEYRELEASE = 'keyrelease';
        return Controllers;
    }(emloader.event.EventEmiter));
    emloader.Controllers = Controllers;
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var plugins;
    (function (plugins) {
        var ControllerButton = (function () {
            function ControllerButton(controllers, keyCode) {
                var _this = this;
                this.controllers = controllers;
                this.keyCode = keyCode;
                this.element = document.createElement('button');
                this.element.appendChild(document.createElement('span'));
                this.element.addEventListener('mousedown', function (evt) { return _this.controllers.getKeyHandler().pressKey(keyCode); });
                this.element.addEventListener('mouseup', function (evt) { return _this.controllers.getKeyHandler().releaseKey(keyCode); });
                this.element.addEventListener('touchstart', function (evt) {
                    _this.controllers.getKeyHandler().pressKey(keyCode);
                });
                this.element.addEventListener('touchend', function (evt) {
                    _this.controllers.getKeyHandler().releaseKey(keyCode);
                });
            }
            ControllerButton.prototype.getElement = function () {
                return this.element;
            };
            ControllerButton.prototype.setValue = function (name) {
                this.element.getElementsByTagName('span')[0].innerHTML = name;
            };
            return ControllerButton;
        }());
        plugins.ControllerButton = ControllerButton;
    })(plugins = emloader.plugins || (emloader.plugins = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var plugins;
    (function (plugins) {
        var ControllerSelector = (function () {
            function ControllerSelector(controllers, mapping, onChange) {
                var _this = this;
                this.controllers = controllers;
                this.mapping = mapping;
                this.onChange = onChange;
                this.baseClass = 'emloader-control-selector';
                this.mainContainer = document.createElement('div');
                this.mainContainer.className = this.baseClass;
                this.setJoystick(controllers.getJoystick(mapping));
                controllers.on(emloader.Controllers.JOYSTICKCONNECTED, function (joystick) {
                    _this.setJoystick(joystick.getControlMapping() === mapping ? joystick : _this.joystick);
                });
                controllers.on(emloader.Controllers.JOYSTICKDISCONNECTED, function (joystick) {
                    _this.setJoystick(_this.joystick && !_this.joystick.isConnected() ? null : _this.joystick);
                });
                controllers.on(emloader.Controllers.JOYSTICKCONTROLCHANGE, function (joystick) {
                    if (joystick === _this.joystick && joystick.getControlMapping() !== mapping) {
                        _this.setJoystick(null);
                    }
                    else if (joystick !== _this.joystick && joystick.getControlMapping() === mapping) {
                        _this.setJoystick(joystick);
                    }
                    else {
                        _this.setJoystick(_this.joystick);
                    }
                });
            }
            ControllerSelector.prototype.getElement = function () {
                return this.mainContainer;
            };
            ControllerSelector.prototype.setJoystick = function (joystick) {
                if (joystick === void 0) { joystick = null; }
                if (joystick !== this.joystick && joystick && joystick.getControlMapping() !== this.mapping) {
                    joystick.setControlMapping(this.mapping);
                }
                this.joystick = joystick;
                this.empty();
                this.mainContainer.appendChild(this.createOption(this.joystick, true));
                if (typeof this.onChange === 'function') {
                    this.onChange(joystick);
                }
            };
            ControllerSelector.prototype.open = function () {
                var _this = this;
                if (this.isOpened()) {
                    return;
                }
                var addOptionClick = function (joystick) {
                    if (joystick === void 0) { joystick = null; }
                    var option = _this.createOption(joystick);
                    option.addEventListener('click', function (evt) {
                        _this.setJoystick(joystick);
                    });
                    _this.mainContainer.appendChild(option);
                };
                this.controllers.getJoysticks().forEach(function (joystick) {
                    if (joystick && joystick !== _this.joystick) {
                        addOptionClick(joystick);
                    }
                });
                if (this.joystick) {
                    addOptionClick();
                }
                emloader.helper.HTMLHelper.addClass(this.mainContainer.childNodes[0], this.baseClass + '-expanded');
            };
            ControllerSelector.prototype.close = function () {
                this.setJoystick(this.joystick);
            };
            ControllerSelector.prototype.isOpened = function () {
                return this.mainContainer.childNodes.length > 1;
            };
            ControllerSelector.prototype.empty = function () {
                while (this.mainContainer.hasChildNodes()) {
                    this.mainContainer.removeChild(this.mainContainer.lastChild);
                }
            };
            ControllerSelector.prototype.createOption = function (joystick, main) {
                var _this = this;
                if (joystick === void 0) { joystick = null; }
                var option = document.createElement('div');
                option.className = this.baseClass + '-item ' + this.baseClass + '-' + (joystick ? 'gamepad' : 'keyboard');
                option.innerHTML = joystick && joystick.getGamepad() ? String(joystick.getGamepad().index + 1) : '';
                if (main && this.controllers.getJoysticks().length > 0) {
                    emloader.helper.HTMLHelper.addClass(option, this.baseClass + '-expandable');
                    option.addEventListener('click', function (evt) {
                        _this.isOpened() ? _this.close() : _this.open();
                    });
                }
                return option;
            };
            return ControllerSelector;
        }());
        plugins.ControllerSelector = ControllerSelector;
    })(plugins = emloader.plugins || (emloader.plugins = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    var plugins;
    (function (plugins) {
        var VirtualController = (function () {
            function VirtualController(controllers, mapping) {
                var _this = this;
                this.controllers = controllers;
                this.mapping = mapping;
                this.buttons = new Array(222);
                this.baseClass = 'emloader-virtual-controller';
                this.keyCodeId = new Array(222);
                this.mainContainer = document.createElement('div');
                this.mainContainer.className = this.baseClass;
                this.setJoystick(controllers.getJoystick(mapping));
                for (var controllerButton in mapping) {
                    var keyCode = mapping[controllerButton];
                    this.buttons[keyCode] = new plugins.ControllerButton(controllers, keyCode);
                    this.keyCodeId[keyCode] = controllerButton;
                    this.mainContainer.appendChild(this.buttons[keyCode].getElement());
                }
                this.selector = new plugins.ControllerSelector(controllers, mapping, function (joystick) {
                    _this.setJoystick(joystick);
                });
                this.mainContainer.appendChild(this.selector.getElement());
                this.updateButtons();
                this.controllers.on(emloader.Controllers.KEYPRESS, function (keyCode) { return _this.onKeyEvent(emloader.Controllers.KEYPRESS, keyCode); });
                this.controllers.on(emloader.Controllers.KEYRELEASE, function (keyCode) { return _this.onKeyEvent(emloader.Controllers.KEYRELEASE, keyCode); });
            }
            VirtualController.prototype.getElement = function () {
                return this.mainContainer;
            };
            VirtualController.prototype.setKeyHandler = function (keyHandler) {
                this.keyHandler = keyHandler;
            };
            VirtualController.prototype.getKeyHandler = function () {
                return this.keyHandler;
            };
            VirtualController.prototype.setJoystick = function (joystick) {
                this.joystick = joystick;
                this.updateButtons();
            };
            VirtualController.prototype.updateButtons = function () {
                for (var keyCode in this.buttons) {
                    this.updateButton(this.buttons[keyCode], this.keyCodeId[keyCode]);
                }
            };
            VirtualController.prototype.updateButton = function (button, buttonId) {
                var keyName = emloader.KeyHandler.getKey(this.mapping[buttonId]);
                var buttonClass = this.baseClass + '-button';
                var classes = [buttonClass, buttonClass + '-' + keyName, buttonClass + '-' + buttonId];
                if (this.joystick) {
                    classes.push(buttonClass + '-gamepad');
                }
                button.getElement().className = classes.join(' ');
                switch (buttonId) {
                    case 'coin':
                    case 'start':
                        button.setValue(buttonId.replace('coin', 'insert coin') + ' (' + keyName.replace('digit', '') + ')');
                        break;
                    default:
                        button.setValue(this.joystick ? buttonId.replace('button', '') : keyName);
                }
            };
            VirtualController.prototype.onKeyEvent = function (eventName, keyCode) {
                if (this.buttons[keyCode]) {
                    emloader.helper.HTMLHelper[(eventName === emloader.Controllers.KEYPRESS ? 'add' : 'remove') + 'Class'](this.buttons[keyCode].getElement(), this.baseClass + '-button-pressed');
                }
            };
            return VirtualController;
        }());
        plugins.VirtualController = VirtualController;
    })(plugins = emloader.plugins || (emloader.plugins = {}));
})(emloader || (emloader = {}));
var emloader;
(function (emloader) {
    function load(url, container, emModule) {
        emModule = emModule || {};
        emModule.locateFile = emModule.locateFile || function (file) {
            if (file.substr(-4) === '.mem') {
                return url + '.mem';
            }
            return file;
        };
        var loader = new Emloader(container, emModule);
        return emloader.helper.HTMLHelper.loadScript(loader.scope.document, url).then(function () {
            return loader;
        });
    }
    emloader.load = load;
    function loadHeadless(url, emModule) {
        var container = document.createElement('div');
        container.style.display = 'none';
        document.body.appendChild(container);
        return load(url, container, emModule);
    }
    emloader.loadHeadless = loadHeadless;
    var Emloader = (function (_super) {
        __extends(Emloader, _super);
        function Emloader(_container, defaultModule) {
            var _this = _super.call(this) || this;
            _this._container = _container;
            _this._stdout = [];
            _this._stderr = [];
            _this._files = [];
            _this._iframe = emloader.helper.HTMLHelper.createIframe(emloader.helper.HTMLHelper.getWindow(_this._container).document);
            _this._container.appendChild(_this._iframe);
            var canvaCSS = 'width:100%;height:100%;';
            ['-moz-crisp-edges', '-o-crisp-edges', '-webkit-optimize-contrast', 'optimize-contrast', 'crisp-edges', 'pixelated', 'optimizeSpeed'].forEach(function (value) {
                canvaCSS += 'image-rendering:' + value + ';';
            });
            _this._iframe.contentWindow.document.write('<!doctype html><html><head><style>canvas {' + canvaCSS + '}</style></head><body style="margin:0px;padding:0px"><canvas/></body></html>');
            _this._iframe.contentWindow.document.close();
            _this._scope = _this._iframe.contentWindow;
            _this._canvas = _this._scope.document.getElementsByTagName('canvas')[0];
            _this._scope.Module = {};
            for (var att in defaultModule) {
                if (defaultModule.hasOwnProperty(att)) {
                    _this._scope.Module[att] = defaultModule[att];
                }
            }
            _this._scope.Module.arguments = defaultModule.arguments || [];
            _this._scope.Module.screenIsReadOnly = defaultModule.screenIsReadOnly || false;
            _this._scope.Module.print = function (stdout) {
                _this._stdout.push(stdout);
                if (typeof defaultModule.print === 'function') {
                    defaultModule.print(stdout);
                }
                _this.emit(Emloader.ON_STDOUT, stdout);
            };
            _this._scope.Module.printErr = function (stderr) {
                _this._stderr.push(stderr);
                if (typeof defaultModule.printErr === 'function') {
                    defaultModule.printErr(stderr);
                }
                _this.emit(Emloader.ON_STDERROR, stderr);
            };
            _this._scope.Module.canvas = _this.canvas;
            _this._scope.Module.noInitialRun = defaultModule.noInitialRun || true;
            _this._keyHandler = new emloader.KeyHandler(_this.module);
            return _this;
        }
        Emloader.triggerEvent = function (emModule, eventType, data) {
            if (data === void 0) { data = {}; }
            var scope = emloader.helper.HTMLHelper.getWindow(emModule.canvas);
            var e = scope.document.createEventObject ? scope.document.createEventObject() : scope.document.createEvent("Events");
            if (e.initEvent)
                e.initEvent(eventType, true, true);
            for (var att in data) {
                if (data.hasOwnProperty(att) && e[att] === undefined) {
                    e[att] = data[att];
                }
            }
            emModule.canvas.dispatchEvent ? emModule.canvas.dispatchEvent(e) : emModule.canvas.fireEvent("on" + eventType, e);
        };
        Object.defineProperty(Emloader.prototype, "keyHandler", {
            get: function () {
                return this._keyHandler;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "canvas", {
            get: function () {
                return this._canvas;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "scope", {
            get: function () {
                return this._scope;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "module", {
            get: function () {
                return this.scope.Module;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "stdout", {
            get: function () {
                return this._stdout;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "stderr", {
            get: function () {
                return this._stderr;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "files", {
            get: function () {
                return this._files;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Emloader.prototype, "FS", {
            get: function () {
                return this.scope.FS;
            },
            enumerable: true,
            configurable: true
        });
        Emloader.prototype.run = function (args) {
            return Promise.resolve(this.module.callMain(args));
        };
        Emloader.prototype.addFS = function (basepath, fs) {
            this.FS.mount(fs || this.scope.MEMFS, { root: '/' }, basepath);
        };
        Emloader.prototype.addFile = function (file, path) {
            this.FS.writeFile(path + '/' + file.name, file.data, {
                encoding: 'binary'
            });
            this._files.push(file);
        };
        Emloader.prototype.loadFile = function (url, name, path, handler) {
            var _this = this;
            return emloader.helper.FileLoader.loadFile(url, name, handler).then(function (file) { return _this.addFile(file, path); });
        };
        Emloader.prototype.loadFiles = function (files, path, handler) {
            var _this = this;
            return Promise.all(Object.keys(files).map(function (name) {
                return _this.loadFile(files[name], name, path, handler);
            })).then(function () {
                return Promise.resolve();
            });
        };
        Emloader.ON_STDERROR = 'onstderror';
        Emloader.ON_STDOUT = 'onstdout';
        return Emloader;
    }(emloader.event.EventEmiter));
    emloader.Emloader = Emloader;
})(emloader || (emloader = {}));
var mp3gain;
(function (mp3gain) {
    mp3gain.ON_STDERROR = 'onstderror';
    mp3gain.ON_STDOUT = 'onstdout';
    mp3gain.mp3Path = '/mp3';
    var MP3GainWrapper = (function (_super) {
        __extends(MP3GainWrapper, _super);
        function MP3GainWrapper(binpath) {
            var _this = _super.call(this) || this;
            _this.binpath = binpath;
            _this.files = [];
            return _this;
        }
        MP3GainWrapper.prototype.addFile = function (fileOrUrl) {
            var _this = this;
            if (typeof fileOrUrl === 'string') {
                return emloader.helper.FileLoader.loadFile(fileOrUrl, fileOrUrl.split('/').reverse()[0]).then(function (file) {
                    _this.files.push(file);
                    return file;
                });
            }
            else {
                this.files.push(fileOrUrl);
                return Promise.resolve(fileOrUrl);
            }
        };
        MP3GainWrapper.prototype.addFiles = function (filesOrUrls) {
            var _this = this;
            return Promise.all(filesOrUrls.map(function (file) { return _this.addFile(file); }));
        };
        MP3GainWrapper.prototype.removeFile = function (file) {
            var index = this.files.indexOf(file);
            if (index > -1) {
                this.files.splice(index, 1);
                return true;
            }
            return false;
        };
        MP3GainWrapper.prototype.removeFiles = function () {
            return this.files.splice(0, this.files.length);
        };
        MP3GainWrapper.prototype.getFiles = function () {
            return this.files;
        };
        MP3GainWrapper.prototype.run = function (args) {
            if (window.Worker) {
                return this.runAsWorker(args);
            }
            else {
                return this.runWithEmloader(args);
            }
        };
        MP3GainWrapper.prototype.runWithEmloader = function (args) {
            var _this = this;
            return emloader.loadHeadless(this.binpath).then(function (loader) {
                var safeArgs = Array.isArray(args) ? args : args.trim().split(' ');
                loader.FS.mkdir(mp3gain.mp3Path);
                _this.files.forEach(function (file) {
                    loader.addFile(file, mp3gain.mp3Path);
                    safeArgs.push(mp3gain.mp3Path + '/' + file.name);
                });
                loader.on(emloader.Emloader.ON_STDOUT, function (output) {
                    _this.emit(mp3gain.ON_STDOUT, output);
                });
                loader.on(emloader.Emloader.ON_STDERROR, function (error) {
                    _this.emit(mp3gain.ON_STDERROR, error);
                });
                return loader.run(safeArgs).then(function () {
                    return loader.FS.readdir(mp3gain.mp3Path).filter(function (filename) {
                        return !!_this.files.find(function (file) { return file.name === filename; });
                    }).map(function (filename) {
                        return {
                            name: filename,
                            data: loader.FS.readFile(mp3gain.mp3Path + '/' + filename, {
                                encoding: 'binary',
                            }),
                        };
                    });
                });
            });
        };
        MP3GainWrapper.prototype.runAsWorker = function (args) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var worker = new Worker(_this.binpath);
                worker.onmessage = function (evt) {
                    if (Array.isArray(evt.data)) {
                        worker.terminate();
                        resolve(evt.data);
                    }
                    else {
                        _this.emit(evt.data.stderr ? mp3gain.ON_STDERROR : mp3gain.ON_STDOUT, evt.data.stderr || evt.data.stdout);
                    }
                };
                worker.postMessage({
                    binpath: _this.binpath,
                    files: _this.files,
                    arguments: typeof args === 'string' ? args.trim().split(' ') : args,
                });
            });
        };
        return MP3GainWrapper;
    }(emloader.event.EventEmiter));
    mp3gain.MP3GainWrapper = MP3GainWrapper;
})(mp3gain || (mp3gain = {}));
//# sourceMappingURL=mp3gain-wrapper.js.map