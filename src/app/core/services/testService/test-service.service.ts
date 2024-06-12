import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  constructor(private afs: AngularFirestore) { }

	getVendorsPublicList() {
    const vendors = this.afs.collection('vendors', ref => ref.where('active', '==', true).orderBy('name','asc'));
    return vendors.snapshotChanges();
  }
}
