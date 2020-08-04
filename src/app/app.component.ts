import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  public nuevoArreglo: string[] = [];
  public log: any[] = [];
  private ex1: any[];
  private ex2: any[];
  private ex3: any[];
  constructor(private storageHelper: StorageMap){
    this.ex1 = [
      {cod: 'a1', desc: 'desc 1', ID: 1},
      {cod: 'a2', desc: 'desc 2', ID: 2},
      {cod: 'a3', desc: 'desc 3', ID: 3}
    ];
    this.storageHelper.set('key1', this.ex1).subscribe(()=>{});
    this.ex2 = [
      {cod: 'b1', agr: 'img', ext: 'png', ID: 1},
      {cod: 'b2', agr: 'img', ext: 'jpg', ID: 2},
      {cod: 'b3', agr: 'doc', ext: 'pdf', ID: 3},
      {cod: 'b4', agr: 'doc', ext: 'docx', ID: 4},
      {cod: 'b5', agr: 'img', ext: 'png', ID: 5}
    ]
    this.storageHelper.set('key2', this.ex2).subscribe(()=>{});
    this.ex3 = [
      {cod: 'c1', name: 'name 1', ID: 1},
      {cod: 'c2', name: 'name 2', ID: 2}
    ]
    this.storageHelper.set('key3', this.ex3).subscribe(()=>{});
  }

  ngOnInit(): void {
    this.GenerateFile();
  }  

  private Generate(){
    //
  }
  
  private GenerateFile(): void {
  let keys: string[] = [];
    this.storageHelper.keys().subscribe({
        next: (key) => {
              keys.push(key);
              console.log('key :>> ', key);
              this.log.push(key);
        },
        complete: () => {
              console.log('keys :>> ', keys);
              this.log.push('GetDataKey');
              this.GetDataKey(keys);
        }
    });
  }

  private GetDataKey(keys: string[]): void {
    keys.forEach((key) => {
      console.log('element :>> ', key);
      this.log.push('element ' + key);
      this.storageHelper.get(key).subscribe({
        next: (data) => {
            console.log('data :>> ', data);
            this.log.push('data', data);
            if (Array.isArray(data)) {
              this.getDataArray(data);
            } else {
              let t: any[] = [];
              t.push(data);
              this.getDataArray(t);
            }
        },
        complete: () => {
          this.log.push('termino acá');
          console.log('termino acá');
        }
      });
    });
    this.log.push('Generando datos');
    console.log('Generando datos');
  }

  private getDataArray(data: any[]): void {
    data.map((x: any) => {    
      let item = '';
      Object.keys(x).forEach(k => {
        if (k !== 'ID') {
          item += `${x[k]};`;
        }
      });
      this.nuevoArreglo.push(item);
    });
    this.log.push('nuevo arreglo ', this.nuevoArreglo);
    console.log('this.nuevoArreglo :>> ', this.nuevoArreglo);
  }

}
