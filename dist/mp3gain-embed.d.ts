/// <reference path="../typings/index.d.ts" />
declare var MEMFS: FS.IFileSystem;
declare namespace FS {
    function mkdir(path: string): void;
    function mount(fs: FS.IFileSystem, basePath: IPath, path: string): void;
    function writeFile(path: string, data: Uint8Array, options: any): void;
    function readFile(path: string, options: any): Uint8Array;
    interface IPath {
        root: string;
    }
    interface IFileSystem {
    }
}
declare namespace emloader {
    interface IModule {
        arguments: Array<string>;
        screenIsReadOnly: boolean;
        print: Function;
        printErr: Function;
        canvas: HTMLCanvasElement;
        noInitialRun: boolean;
        preInit?: Function;
        callMain?: {
            (arguments: Array<string>): void;
        };
        addOnExit?: Function;
        requestAnimationFrame?: any;
        locateFile?: {
            (file: string): string;
        };
    }
    interface IModule_SDL_SendKeyboardKey {
        (state: number, scancode: number): void;
    }
}
interface Window {
    Module: emloader.IModule;
    mozRequestAnimationFrame: any;
    webkitRequestAnimationFrame: number;
    mozCancelRequestAnimationFrame: any;
    webkitCancelRequestAnimationFrame: any;
    cancelRequestAnimationFrame: any;
}
declare namespace emloader {
    interface IFile {
        name: string;
        data: Uint8Array;
    }
}
declare namespace emloader {
    interface IControlMapping {
        start: number;
        coin: number;
        up: number;
        right: number;
        down: number;
        left: number;
        button1: number;
        button2: number;
        button3: number;
        button4: number;
        button5: number;
        button6: number;
    }
    interface IControlKeyHandler {
        on(event: string, callback: {
            (keyCode: number): void;
        }): void;
        off(event: string, callback: {
            (keyCode: number): void;
        }): void;
        pressKey(keyCode: number): void;
        releaseKey(keyCode: number): void;
    }
    interface IJoystick {
        setControlMapping(controlMapping: IControlMapping): void;
        getControlMapping(): IControlMapping;
        setKeyHandler(handler: IControlKeyHandler): void;
        getKeyHandler(): IControlKeyHandler;
        connect(gamepad: Gamepad): void;
        disconnect(): void;
        isConnected(): boolean;
        getGamepad(): Gamepad;
        getButtonMap(): Array<string>;
        setButtonMap(buttonMap: Array<string>): void;
    }
}
declare namespace emloader.event {
    class EventEmiter {
        private handlers;
        on(eventName: string, callback: Function): void;
        off(eventName: string, callback: Function): void;
        emit(eventName: string, data?: any): void;
        clean(): void;
    }
}
declare namespace emloader.helper {
    class KeyCode {
        static backspace: number;
        static tab: number;
        static enter: number;
        static shift: number;
        static ctrl: number;
        static alt: number;
        static pauseBreak: number;
        static capsLock: number;
        static escape: number;
        static space: number;
        static pageup: number;
        static pagedown: number;
        static end: number;
        static home: number;
        static leftarrow: number;
        static uparrow: number;
        static rightarrow: number;
        static downarrow: number;
        static insert: number;
        static delete: number;
        static digit0: number;
        static digit1: number;
        static digit2: number;
        static digit3: number;
        static digit4: number;
        static digit5: number;
        static digit6: number;
        static digit7: number;
        static digit8: number;
        static digit9: number;
        static a: number;
        static b: number;
        static c: number;
        static d: number;
        static e: number;
        static f: number;
        static g: number;
        static h: number;
        static i: number;
        static j: number;
        static k: number;
        static l: number;
        static m: number;
        static n: number;
        static o: number;
        static p: number;
        static q: number;
        static r: number;
        static s: number;
        static t: number;
        static u: number;
        static v: number;
        static w: number;
        static x: number;
        static y: number;
        static z: number;
        static leftWindowKey: number;
        static rightWindowKey: number;
        static selectKey: number;
        static numpad0: number;
        static numpad1: number;
        static numpad2: number;
        static numpad3: number;
        static numpad4: number;
        static numpad5: number;
        static numpad6: number;
        static numpad7: number;
        static numpad8: number;
        static numpad9: number;
        static multiply: number;
        static add: number;
        static subtract: number;
        static decimalPoint: number;
        static divide: number;
        static f1: number;
        static f2: number;
        static f3: number;
        static f4: number;
        static f5: number;
        static f6: number;
        static f7: number;
        static f8: number;
        static f9: number;
        static f10: number;
        static f11: number;
        static f12: number;
        static numlock: number;
        static scrolllock: number;
        static semicolon: number;
        static equalsign: number;
        static comma: number;
        static dash: number;
        static period: number;
        static forwardslash: number;
        static graveAccent: number;
        static openbracket: number;
        static backslash: number;
        static closebraket: number;
        static singlequote: number;
    }
    var KeyCodeKey: Array<string>;
}
declare namespace emloader {
    class KeyHandler extends event.EventEmiter implements IControlKeyHandler {
        private module;
        static KEYPRESS: string;
        static KEYRELEASE: string;
        static getKeyCode(key: any): number;
        static getKey(keyCode: number): string;
        static triggerKeyEvent(module: IModule, eventType: string, keyCode: number, charCode: number): void;
        constructor(module: IModule);
        pressKey(keyCode: number): void;
        releaseKey(keyCode: number): void;
    }
    class FakeKeyHandler extends event.EventEmiter {
        pressKey(keyCode: string): void;
        releaseKey(keyCode: string): void;
    }
}
declare namespace emloader {
    interface IEmloader {
        keyHandler: KeyHandler;
        scope: Window;
        canvas: HTMLCanvasElement;
        module: IModule;
        FS: any;
        stdout: Array<string>;
        stderr: Array<string>;
        addFS(basepath: string, fs?: FS.IFileSystem): void;
        addFile(file: IFile, path: string): void;
        loadFile(url: string, name: string, path: string, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<void>;
        loadFiles(files: {
            [filename: string]: string;
        }, path: string, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<void>;
    }
}
declare namespace emloader.helper {
    class HTMLHelper {
        static loadScript(doc: Document, url: any): Promise<HTMLScriptElement>;
        static createIframe(doc?: Document): HTMLIFrameElement;
        static getWindow(element: HTMLElement): Window;
        static addClass(element: HTMLElement, className: string): void;
        static removeClass(element: HTMLElement, className: string): void;
    }
}
declare namespace emloader.helper {
    class FileLoader {
        static toUint8Array: (str: string) => Uint8Array;
        static loadFile(url: string, name: string, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<IFile>;
        static fetchFile(url: string, responseType: XMLHttpRequestResponseType, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<ArrayBuffer>;
    }
}
declare namespace emloader {
    class Joystick extends emloader.event.EventEmiter implements IJoystick {
        static axes: string[][];
        static buttonMap: string[];
        static BUTTONMAPCHANGE: string;
        static DISCONNECTED: string;
        static CONNECTED: string;
        static CONTROLCHANGE: string;
        private pressed;
        private loopId;
        private sensibility;
        private customButtonMap;
        private handler;
        private gamepad;
        private controlMapping;
        setControlMapping(controlMapping: IControlMapping): void;
        getControlMapping(): IControlMapping;
        setKeyHandler(handler: IControlKeyHandler): void;
        getKeyHandler(): IControlKeyHandler;
        connect(gamepad: Gamepad): void;
        disconnect(): void;
        isConnected(): boolean;
        getGamepad(): Gamepad;
        getButtonMap(): Array<string>;
        setButtonMap(buttonMap: Array<string>): void;
        private keyPress(key);
        private keyRelease(key);
    }
}
declare namespace emloader {
    class Keyboard {
        static KEYMAPPINGCHANGE: string;
        keyhandler: IControlKeyHandler;
        private keyboardEventHandler;
        private keyCodeMapping;
        setKeyHandler(keyhandler: IControlKeyHandler): void;
        bind(): void;
        unbind(): void;
    }
}
declare namespace emloader {
    class Controllers extends emloader.event.EventEmiter {
        private mappings;
        static JOYSTICKCONNECTED: string;
        static JOYSTICKDISCONNECTED: string;
        static JOYSTICKBUTTONMAPCHANGE: string;
        static JOYSTICKCONTROLCHANGE: string;
        static KEYPRESS: string;
        static KEYRELEASE: string;
        keyboard: Keyboard;
        private _joysticks;
        private gamepadChecker;
        private keyHandler;
        constructor(mappings: Array<IControlMapping>);
        setKeyHandler(keyHandler: IControlKeyHandler): void;
        getKeyHandler(): IControlKeyHandler;
        getJoysticks(): Array<Joystick>;
        getJoystick(mapping: IControlMapping): Joystick;
        getAvailableMappings(): Array<IControlMapping>;
        checkGamepads(): void;
        bind(scope?: Window): void;
        unbind(scope?: Window): void;
    }
}
declare namespace emloader.plugins {
    class ControllerButton {
        controllers: Controllers;
        keyCode: any;
        private element;
        constructor(controllers: Controllers, keyCode: any);
        getElement(): HTMLElement;
        setValue(name: string): void;
    }
}
declare namespace emloader.plugins {
    class ControllerSelector {
        private controllers;
        private mapping;
        private onChange;
        private mainContainer;
        private joystick;
        private baseClass;
        constructor(controllers: Controllers, mapping: IControlMapping, onChange?: {
            (joystick?: IJoystick): void;
        });
        getElement(): HTMLElement;
        setJoystick(joystick?: IJoystick): void;
        open(): void;
        close(): void;
        private isOpened();
        private empty();
        private createOption(joystick?, main?);
    }
}
declare namespace emloader.plugins {
    class VirtualController {
        controllers: Controllers;
        mapping: IControlMapping;
        joystick: Joystick;
        buttons: Array<ControllerButton>;
        keyHandler: IControlKeyHandler;
        private mainContainer;
        private selector;
        private baseClass;
        private keyCodeId;
        constructor(controllers: Controllers, mapping: IControlMapping);
        getElement(): HTMLElement;
        setKeyHandler(keyHandler: IControlKeyHandler): void;
        getKeyHandler(): IControlKeyHandler;
        setJoystick(joystick?: Joystick): void;
        updateButtons(): void;
        updateButton(button: ControllerButton, buttonId: string): void;
        private onKeyEvent(eventName, keyCode);
    }
}
interface CSSStyleDeclaration {
    imageRendering: string;
}
declare namespace emloader {
    function load(url: string, container: HTMLElement, emModule?: any): Promise<Emloader>;
    function loadHeadless(url: string, emModule?: any): Promise<Emloader>;
    class Emloader extends event.EventEmiter implements IEmloader {
        private _container;
        static ON_STDERROR: string;
        static ON_STDOUT: string;
        static triggerEvent(emModule: IModule, eventType: string, data?: any): void;
        private _stdout;
        private _stderr;
        private _scope;
        private _iframe;
        private _files;
        private _keyHandler;
        protected _canvas: HTMLCanvasElement;
        constructor(_container: HTMLElement, defaultModule: any);
        readonly keyHandler: KeyHandler;
        readonly canvas: HTMLCanvasElement;
        readonly scope: Window;
        readonly module: IModule;
        readonly stdout: Array<string>;
        readonly stderr: Array<string>;
        readonly files: Array<IFile>;
        readonly FS: any;
        run(args: Array<string>): Promise<void>;
        addFS(basepath: string, fs?: FS.IFileSystem): void;
        addFile(file: IFile, path: string): void;
        loadFile(url: string, name: string, path: string, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<void>;
        loadFiles(files: {
            [filename: string]: string;
        }, path: string, handler?: {
            (evt: ProgressEvent): void;
        }): Promise<void>;
    }
}
declare namespace mp3gain {
    interface IPostmessageData {
        files: Array<emloader.IFile>;
        arguments: Array<string>;
    }
    interface IMessageEvent {
        data: IPostmessageData;
    }
    interface IPostMessageResponse extends MessageEvent {
        data: any;
    }
    interface IModule {
        arguments: Array<string>;
        screenIsReadOnly: boolean;
        print: Function;
        printErr: Function;
        canvas: any;
        noInitialRun: boolean;
        preInit?: Function;
        callMain?: {
            (arguments: Array<string>): void;
        };
        addOnExit?: Function;
        requestAnimationFrame?: any;
        locateFile?: {
            (file: string): string;
        };
    }
}
interface Window {
    Worker: any;
}
declare var window: Window;
declare namespace mp3gain {
    class MP3Gain extends emloader.event.EventEmiter {
        protected binpath: string;
        static ON_STDERROR: string;
        static ON_STDOUT: string;
        private files;
        private mp3Path;
        constructor(binpath: string);
        addFile(file: emloader.IFile): void;
        addFiles(files: Array<emloader.IFile>): void;
        removeFile(file: emloader.IFile): void;
        removeFiles(): void;
        getOriginalFiles(): Array<emloader.IFile>;
        loadFile(name: any, url: any): Promise<emloader.IFile>;
        loadFiles(files: Array<string>): Promise<emloader.IFile[]>;
        run(args: Array<string> | string): Promise<emloader.IFile[]>;
        runWithEmloader(args: Array<string> | string): Promise<emloader.IFile[]>;
        runAsWorker(args: Array<string> | string): Promise<emloader.IFile[]>;
    }
}
declare namespace mp3gain {
    function getInstance(): MP3GainEmbed;
    class MP3GainEmbed extends MP3Gain {
        constructor();
        runAsWorker(args: Array<string> | string): Promise<emloader.IFile[]>;
        runWithEmloader(args: Array<string> | string): Promise<emloader.IFile[]>;
    }
}
