
import { SlsService } from '../services/sls.service';
import { Invoice } from '../models/invoice';
import { Component, OnInit,Input,ViewContainerRef  } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload';
import * as _ from "lodash";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap'

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
    styles: [`
             input.hidden {
                   position: absolute;
                  }

               #profile-image1 {
                      cursor: pointer;
                    }
                      `]


})

export class DashboardItemComponent implements OnInit {
  depositNumber:string="";
 
  @Input() invoice:Invoice;
  @Input() key:string;
  depositAmount:number; //=0;
  depositDate: Date; //=new Date();
  selectedFiles: FileList;
  currentUpload: Upload;

  constructor( private invoiceService:InvoiceService,
               private upSvc: UploadService,private sls:SlsService,
               overlay: Overlay, vcRef: ViewContainerRef, public modal: Modal
               ) {  overlay.defaultViewContainer = vcRef; }

               onClick() {
    this.modal.confirm()
    .size('sm')
    .isBlocking(true)
    .showClose(true)
    .keyboard(27)
    .dialogClass('modal-dialog')
   
    .body('<div class="pull-right">!!!هل تريد حذف الطلبية</div>')
    .okBtnClass('btn btn-danger')
    .open().then( (resultPromise) => {
        resultPromise.result.then( (result) => {
         this.remove();
        }, 
        () => {
          //TODO - SAVE TEMP
        } );
    });
    
  }

              ngOnInit() {}

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload,this.key,
                          this.depositAmount,this.depositDate)
  }

 /* uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload)}
    )
  }*/

update(key:string=this.key,depositNumber:string=this.depositNumber)
                     {
this.invoiceService.updateDeposit(key,depositNumber)
}

remove(order:Invoice=this.invoice,key:string=this.key){
  //this.sls.updateRemoved(order);
  this.invoiceService.removeDeposit(key);

}


  deleteUpload(upload) {
    this.upSvc.deleteUpload(this.currentUpload)
  }


}
