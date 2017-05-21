
import { Invoice } from '../models/invoice';
import { Component, OnInit,Input } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { UploadService } from '../services/upload.service';
import { Upload } from '../models/upload';
import * as _ from "lodash";

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
  depositNumber:string;

  @Input() invoice:Invoice;
  @Input() key:string;

  selectedFiles: FileList;
  currentUpload: Upload;

  constructor( private invoiceService:InvoiceService,private upSvc: UploadService
                ) { }

                  ngOnInit() {
  }

  detectFiles(event) {
      this.selectedFiles = event.target.files;
  }

  uploadSingle() {
    let file = this.selectedFiles.item(0)
    this.currentUpload = new Upload(file);
    this.upSvc.pushUpload(this.currentUpload)
  }

  uploadMulti() {
    let files = this.selectedFiles
    let filesIndex = _.range(files.length)
    _.each(filesIndex, (idx) => {
      this.currentUpload = new Upload(files[idx]);
      this.upSvc.pushUpload(this.currentUpload)}
    )
  }

update(key:string=this.key,depositeNumber:string=this.depositNumber){
this.invoiceService.updateDeposit(key,depositeNumber)
}

remove(key:string=this.key){
  this.invoiceService.removeDeposit(key);

}
  deleteUpload(upload) {
    this.upSvc.deleteUpload(this.currentUpload)
  }


}
