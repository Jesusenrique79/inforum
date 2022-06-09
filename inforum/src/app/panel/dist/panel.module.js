"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PanelModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var panel_routing_module_1 = require("./panel-routing.module");
var main_component_1 = require("./components/main/main.component");
var add_component_1 = require("./components/add/add.component");
var edit_component_1 = require("./components/edit/edit.component");
var list_component_1 = require("./components/list/list.component");
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        core_1.NgModule({
            declarations: [
                main_component_1.MainComponent,
                add_component_1.AddComponent,
                edit_component_1.EditComponent,
                list_component_1.ListComponent
            ],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                panel_routing_module_1.PanelRoutingModule
            ],
            exports: [
                main_component_1.MainComponent,
                add_component_1.AddComponent,
                edit_component_1.EditComponent,
                list_component_1.ListComponent
            ],
            providers: []
        })
    ], PanelModule);
    return PanelModule;
}());
exports.PanelModule = PanelModule;
