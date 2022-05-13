import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Category} from "../model/category";
import {NewsService} from "../service/news.service";
import {CategoryService} from "../service/category.service";
import {Router} from "@angular/router";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css'],
})
export class CreateNewsComponent implements OnInit {
  myDate  = new Date();
  //loading
  loading: boolean = false;
  //..........
  flag: boolean = false;
  newsForm: FormGroup = new FormGroup({
    nameNews: new FormControl('',
      Validators.compose([Validators.required,
        Validators.pattern("^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]" +
          "+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$"),Validators.minLength(2),Validators.maxLength(30)])),

    codeNews: new FormControl('',
      Validators.compose([Validators.required, Validators.pattern("^TT-[0-9]{4}$")])),

    dateNews: new FormControl('',[Validators.required]),
    // 'presentDate': new FormControl((new Date()).toISOString().substring(0,10)),

    imageNews: new FormControl('',
      Validators.compose([Validators.required])),

    titleNews: new FormControl('',
      Validators.compose([Validators.required, Validators.maxLength(40)])),

    descriptionNews: new FormControl('',
      Validators.compose([Validators.required])),

    category: new FormControl('',
      Validators.compose([Validators.required])),

  })

  category: Category[];
  private selectedImage: any = null;
  imageThis: string="https://aivivu.com/wp-content/uploads/2020/12/Dieu-kien-dat-giu-cho-tren-chuyen-bay-Vietnam-Airlines-Aivivu.jpg";



  constructor(
    private snackBar : MatSnackBar,
    private newsService: NewsService,
    private categoryService: CategoryService,
    private router: Router,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit() {
    this.getAllCategory()
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(category => {
      this.category = category;
    })
  }

  save() {
    //loading
    this.loading = true;

    // upload image to firebase
    // const nameImg = this.getCurrentDateTime();
    const nameImg = this.getCurrentDateTime() + this.selectedImage.nameNews;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {

          this.newsForm.get('imageNews').patchValue(url);


          this.newsService.saveNews(this.newsForm.value).subscribe(() => {
            // this.router.navigateByUrl('news/list-news').then(r => this.alertService.showMessage("Thêm mới thành công!"));
            this.snackBar.open("Thêm mới thành công!",'OK', {
              duration:2000
            });
            this.router.navigateByUrl('news/list-news');
          },error => {
            console.log(error.error)
            this.snackBar.open("Thêm mới không thành công!",'OK',{
              duration:2000
            });
          })
        });
      })
    ).subscribe();
  }
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.imageThis = event.target.result;
      };
    }
  }
}
