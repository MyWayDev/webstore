import { Profile } from '../models/profile';
import { SlsService } from './sls.service';
import { AuthService } from './auth.service';
import { FirebaseListObservable, getOrderObservables } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Invoice } from '../models/invoice';
import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class InvoiceService {

user:Profile;
orders:FirebaseListObservable<Invoice[]>
invoices:Observable<Invoice[]>;
folder:any;
 

  constructor(private af:AngularFire,
              private authSerive:AuthService,
              private sls:SlsService) {
                 const uid = this.authSerive.authInfo$.value.$uid;
             this.user=this.sls.getUid(uid).subscribe(uid=>this.user=uid);
             this.folder= 'deposits';
           
               }

     updateDeposit(key:string,depositNumber:string){
            let storageRef=firebase.storage().ref()
            for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
              let path=`/${this.folder}/${selectedFile.name}`;
              let iRef = storageRef.child(path);
              iRef.put(selectedFile).then((snapshot)=>{
                storageRef.child(path).getDownloadURL().then((url)=>{
                       this.af.database.object('/invoices/'+key)
                  .update({
                    depositNumber:depositNumber,
                    depositImg:url,
                    pending:false  
                  });
                });
              
              })
            }
            
  }  

  removeDeposit(key:string){
     this.af.database.object('/invoices/'+key).remove();
  }
   

   getInvoices():Observable<Invoice[]>{
                                        return this.af.database.list('invoices')
                                        .map(Invoice.fromJsonInvoiceList)
                                        .do(console.log);
                                      }

   getOrder(id:string):Observable<Invoice[]>{
                      return this.af.database.list
                                   ('/invoices',{
                                        query:{
                                               orderByChild:'uid',
                                                equalTo:id
                                         }}).map(result=>Invoice.fromJsonInvoiceList
                                        (result).reverse()).do(console.log)            
                                         }   
        getKey(id:string){
          return this.af.database.list('invoices',
          {
            query:{
              orderByKey:true,
              equalTo:id
            }
          }).map(result=>(result[0])).do(console.log);
        }

    userOrders(id:string){
      this.orders= this.af.database.list('/invoices',{
        query:{
                orderByChild:'uid',
                equalTo:id

        }
      }) as FirebaseListObservable<Invoice[]>
          return this.orders
    }

          
    getUserOrders(){
           return  this.getOrder(this.user.distrId).do(console.log)
          }            

 /* getUserInvoices(){

       this.invoices = this.af.database.list('/invoices')
                        .map(invoices=>{
                          console.log('beforeMap',invoices)
                          invoices.map(invoice =>{
                          invoice.items = [];
                          for(var i in invoice.invoiceDetails)
                          invoice.items.push(this.af.database.object('/invoiceDetails/'+i))
                          });
                          return invoices
                        })
   
    
          
          }*/
  
}