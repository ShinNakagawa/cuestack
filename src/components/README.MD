To add custom components:

1. create a new component.
$ ionic g component flash-card

2. edit custom code/html/css in component/flash-card/ folder

3. add this custom component in the page

But there are some problems with just above steps.
1. "ionic g component" created components.module.ts, but this is not working if just importing it in app.modules.ts.
  --> solution:
    instead of using components.module.ts, edit app.modules.ts with the followings:
    1. import flash-card component
    2. add FlashCardComponent in declarations: and exports:.
    3. add schemas: [ CUSTOM_ELEMENTS_SCHEMA ], and import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

2. import FlashCardComponent in the page


========components.module.ts===(not working)==============
import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
@NgModule({
	declarations: [FlashCardComponent],
	imports: [],
	exports: [FlashCardComponent]
})
export class ComponentsModule {}
=============================================