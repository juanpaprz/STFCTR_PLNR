import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CanvasComponent } from './Components/canvas/canvas.component';
import { MachineComponent } from './Components/machine/machine.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DataJsonService } from './Services/data-json.service';

@NgModule({
  imports: [BrowserModule, MachineComponent],
  providers: [DataJsonService],
  declarations: [AppComponent, SidebarComponent, CanvasComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
