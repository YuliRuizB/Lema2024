import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
    providedIn: 'root'
  })

  export class UsersService {
   
    constructor(  private afs: AngularFirestore,
      private snackBar: MatSnackBar) { 

    }

    getClientInfo(claveCliente:string){     
      return this.afs.collection('customers', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente)
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    getUserInfo(claveCliente:string, limit?: number){    
      return this.afs.collection('users', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente) 
      .where('active', '==', true)
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }

    getAlumnosInfo(claveCliente:string){    
      return this.afs.collection('students', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }


    getGradesInfo(claveCliente:string, limit?: number){    
      return this.afs.collection('grades', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    getAlumnosByGrade(claveCliente:string, gradeId:string){    
      return this.afs.collection('students', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente)  
      .where('claveGrado', '==',gradeId )
      .where('userId', '==','' )
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }

    getAlumnoInfo(userId:string){    
      return this.afs.collection('students', (ref:any) => 
      ref
      .where('userId', '==', userId)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }


    getStudentsByGrade(claveGrado:string,claveCliente:string ){    
      return this.afs.collection('students', (ref:any) => 
      ref
      .where('claveGrado', '==', claveGrado)  
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }


    getGradebyCustomer(claveCliente:string ){    
      return this.afs.collection('grades', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    getNotifybyCustomer(claveCliente:string ){    
      return this.afs.collection('notify', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    


    getGradebyCustomerID(claveCliente:string, claveGrado:string ){    
      return this.afs.collection('grades', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      .where('claveGrado', '==', claveGrado)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    getPaymentbyCustomer(claveCliente:string ){    
      return this.afs.collectionGroup('payments', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      .where('active', '==', true)  
      .orderBy('date_created', 'asc')
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
    getPaymentbyDatebyCustomer(claveCliente:string, startDate: Date, endDate: Date){
      return this.afs.collectionGroup('payments', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      .where('active', '==', true)  
      .where('date_created', '>=', startDate)
      .where('date_created', '<=', endDate)
      .orderBy('date_created', 'asc')
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }

    getProductsbyCustomer(claveCliente:string ){    
      return this.afs.collection('products', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }

    getProductsbyIdbyCustomer(claveCliente:string, idProduct:any ){    
      return this.afs.collection('products', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      .where('uid', '==', idProduct)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }


    getTeachersbyCustomer(claveCliente:string ){    
      return this.afs.collection('teachers', (ref:any) => 
      ref    
      .where('claveCliente', '==', claveCliente)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }


    getUserInfoByID(uid:string, limit?: number){    
      return this.afs.collection('users', (ref:any) => 
      ref
      .where('uid', '==', uid)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }
  
    updateUserInfoByID(uid: string, url: string) {
      this.afs.collection('users', (ref:any) =>
        ref
          .where('uid', '==', uid)
      ).get().toPromise().then((querySnapshot:any) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc:any) => {
            // Update the 'photoUrl' field in the Firestore document
            this.afs.collection('users').doc(doc.id).update({
              photoUrl: url
            });          
          });
        } else {
          console.error('Query snapshot is undefined.');
        }
      }).catch((error:any) => {
        console.error('Error updating user info:', error);
      });
    }

    deleteUserInfoByID(uid: string) {
      this.afs.collection('users', (ref:any) =>
        ref
          .where('uid', '==', uid)
      ).get().toPromise().then((querySnapshot:any) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc:any) => {
            // Update the 'photoUrl' field in the Firestore document
            this.afs.collection('users').doc(doc.id).update({
              active: false
            });          
          });
        } 
      }).catch((error:any) => {
        console.error('Error updating user info:', error);
      });
    }

    updateAlumnoInfoByID(uid: string, url: string) {
      this.afs.collection('students', (ref:any) =>
        ref
          .where('uid', '==', uid)
      ).get().toPromise().then((querySnapshot:any) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc:any) => {
            // Update the 'photoUrl' field in the Firestore document
            this.afs.collection('students').doc(doc.id).update({
              photoUrl: url
            });          
          });
        } else {
          console.error('Query snapshot is undefined.');
        }
      }).catch((error:any) => {
        console.error('Error updating user info:', error);
      });
    }

      
    updateStudentUser(id: string ,uidUser: string) {
      // Update the 'photoUrl' field in the Firestore document
      this.afs.collection('students').doc(id).update({
        userId: uidUser
      });       
     // this.notifyUser("Se associó correctamente el alumno","info");   
    }
    
    private showNotification(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 5000,
      });
    }
    private notifyUser(message: string, type: 'info' | 'error' | 'warning') {
      this.showNotification(message, type);
    }  
    createUser(newUser: any) {
      const newId = this.afs.createId();
      newUser.uid = newId;   
      const user = this.afs.collection('users').doc(newId);
      return user.set(newUser).then(() => {
        return newId;
      });      
    }

    createStudent(newStudent: any) {
      const newId = this.afs.createId();
      newStudent.uid = newId;   
      const student = this.afs.collection('students').doc(newId);
      return student.set(newStudent).then(() => {
        return newId;
      });
    }

    createTeacher(newTeacher: any) {
      const newId = this.afs.createId();
      newTeacher.uid = newId;   
      const student = this.afs.collection('students').doc(newId);
      return student.set(newTeacher).then(() => {
        return newId;
      });
    }
    createProduct(product: any) {
      const newId = this.afs.createId();
      product.uid = newId;   
      const student = this.afs.collection('products').doc(newId);
      return student.set(product).then(() => {
        return newId;
      });
    }

    createPayment(newPayment: any, studentid : any) {
      const newId = this.afs.createId();
      newPayment.uid = newId;  
      const student = this.afs.collection("students").doc(studentid).collection('payments').doc(newId);     
      return student.set(newPayment).then(() => {
        return newId;
      });
    }

    updateProduct(studentId: string, student:any) {
      const studentRef = this.afs.collection('products').doc(studentId);
      return studentRef.update(student);
    }

    updateStudent(studentId: string, student:any) {
      const studentRef = this.afs.collection('students').doc(studentId);
      return studentRef.update(student);
    }
    updateStudentAvatar(userId: string, photoURL: string) {
      // this.message.loading('Actualizando ...');
      console.log(userId);
      console.log(photoURL);
       const vendorRef = this.afs.collection('students').doc(userId);
       vendorRef.update({photoURL}).then( () => {        
       }).catch( (err) => {
         console.log(err)
       })
     }

     getAlumnosConsole(claveCliente:string , uidUser:string){    
      return this.afs.collection('students', (ref:any) => 
      ref
      .where('claveCliente', '==', claveCliente)  
      .where('userId', '==', uidUser)  
      ).snapshotChanges().pipe(
        map((actions:any) => actions.map((a:any) => {
          const id = a.payload.doc.id;
          const data = a.payload.doc.data() as any;
          return { id, ...data }
        }))
      )
    }

    createControlPanel(newControlUpdate: any) {
      const newId = this.afs.createId();
      newControlUpdate.uid = newId;   
      const student = this.afs.collection('controlPanel').doc(newId);
      return student.set(newControlUpdate).then(() => {
        return newId;
      });
    }

    getControlPanelInfo(claveCliente:string , alumnoId:string,currentDate:any,){    
      return this.afs.collection('controlPanel', (ref:any) => 
        ref
        .where('claveCliente', '==', claveCliente)  
        .where('uid', '==', alumnoId)
        .where('active', '==', true)
        .where('date', '==', currentDate)  
        ).snapshotChanges().pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          }))
        )
    }

    getConsolaPanelInfo(currentDate:any, claveGrado:string, claveCliente:string) {     
      return this.afs.collection('controlPanel', (ref:any) => 
        ref
        .where('claveCliente', '==', claveCliente)  
        .where('claveGrado', '==', claveGrado)
        .where('active', '==', true)
        .where('date', '==', currentDate)  
        ).snapshotChanges().pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          }))
        )
    }
   
    getConsolaPanelInfoByStudent(currentDate:any, claveGrado:string, claveCliente:string, alumnoId:string) {     
      return this.afs.collection('controlPanel', (ref:any) => 
        ref
        .where('claveCliente', '==', claveCliente)  
        .where('claveGrado', '==', claveGrado)
        .where('active', '==', true)
        .where('alumnoId', '==', alumnoId)        
        .where('date', '==', currentDate)  
        ).snapshotChanges().pipe(
          map((actions:any) => actions.map((a:any) => {
            const id = a.payload.doc.id;
            const data = a.payload.doc.data() as any;
            return { id, ...data }
          }))
        )
    }    
   
    OutControlPanel(currentDate:any, alumnoId: string, claveCliente:string) {
      // this.message.loading('Actualizando ...');
      console.log(alumnoId); 
      console.log(currentDate); 
      console.log(claveCliente);      
      const vendorRef = this.afs.collection('controlPanel', ref => 
        ref.where('date', '==', currentDate)
          .where('uid', '==', alumnoId)
          .where('claveCliente', '==', claveCliente)
      );
      vendorRef.get().subscribe(querySnapshot => {
        querySnapshot.forEach(doc => {
          // Actualizar el documento con la nueva photoURL
          const docRef = this.afs.collection('controlPanel').doc(doc.id);
          docRef.update({ active : false,
            endTime: new Date().toISOString()      
           }).then(() => {          
          }).catch((err) => {
            console.error('Error al actualizar documento:', err);
          });
        });
      });    
    }

    createGrade(newGrade: any) {
      const newId = this.afs.createId();
      newGrade.uid = newId;   
      const user = this.afs.collection('grades').doc(newId);
      return user.set(newGrade).then(() => {
        return newId;
      });      
    }

}