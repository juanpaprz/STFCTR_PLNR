import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CanvasComponent } from './Components/canvas/canvas.component';
import { MachineComponent } from './Components/machine/machine.component';
import { PropertiesComponent } from './Components/properties/properties.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DataJsonService } from './Services/data-json.service';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { ConnectionLineComponent } from './Components/connection-line/connection-line.component';

@NgModule({
  imports: [BrowserModule, CdkDrag],
  providers: [DataJsonService],
  declarations: [
    AppComponent,
    SidebarComponent,
    CanvasComponent,
    PropertiesComponent,
    MachineComponent,
    ConnectionLineComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
