import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../common/services/firestore.service';
import { Apk } from '../../common/models/apk.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-apk-list',
  standalone: true,
  imports: [IonicModule, CommonModule],  // Asegúrate de que IonicModule esté aquí
  templateUrl: './apklist.component.html',
  styleUrls: ['./apklist.component.scss'],
})
export class ApkListComponent implements OnInit {
  apks$: Observable<Apk[]>;

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.apks$ = this.firestoreService.getApks();
  }
}
