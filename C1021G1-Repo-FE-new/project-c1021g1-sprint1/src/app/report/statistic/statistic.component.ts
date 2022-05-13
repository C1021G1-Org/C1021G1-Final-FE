import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as Highcharts from "highcharts";
import {ReportService} from "../report.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {IReportEmployee} from "../model/IReportEmployee";
import {IReportAirline} from "../model/IReportAirline";


@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  select1 = '';
  select2 = '';
  private option: any;
  private chart: any;
  private lineShape: any;
  checkModal: boolean=false;
  selectShape: number;
  nameEmployee: string[] = [];
  arrayEmployee: any[] = [];
  sumPoint: any[] = [];
  startMonth: number;
  endMonth: number;
  totalDate: number;
  selectRevenue: number;
  createReportForm: FormGroup;
  public nameAirline: string[] = [];
  public countAirline: number[] = [];
  public errorBadRequest: any;
  checkNullData : boolean = false;

  iReportEmployee:  IReportEmployee[];
  iReportAirline: IReportAirline[];
  fromDateAirline: string;
  toDateAirline: string;
  error : string;



  @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor(private reportServiceService: ReportService) {
  }

  ngOnInit(): void {
    this.createReportForm = new FormGroup(
      {
        chart: new FormControl('', Validators.required),
        revenue: new FormControl('', Validators.required),
        select1: new FormControl('', Validators.required),
        select2: new FormControl('', Validators.required),
        startDate: new FormControl('',Validators.required),
        endtDate: new FormControl('',Validators.required),
        select3: new FormControl('',Validators.required),
        date3: new FormControl( '',Validators.required),
        date4: new FormControl('',Validators.required),
      }
    )
  }




  generatePDF() {
    var data = document.getElementById('contentToConvert');
    console.log(data)
    html2canvas(data).then(canvas => {
      console.log(canvas)
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('newPDF.pdf');
    });
  }

  reportStatistic() {
    for (let i = 1; i <= 12; i++) {
      if (this.select1 == '' + i + '') {
        this.startMonth = i;
      }
      if (this.select2 == '' + i + '') {
        this.endMonth = i;
      }
    }
    if (this.selectShape == 1 && this.selectRevenue == 1) {
      if (this.startMonth == this.endMonth){
        this.error = 'Không được so sánh 2 tháng trùng nhau';
      }else {
        this.getAllReportPrice();
      }
    }else if (this.selectShape == 2 && this.selectRevenue == 2){
      this.getAllReportEmployee();
    }else {
      this.getAllReportAirline();
    }
  }

  getAllReportPrice(){
    this.checkNullData = true;
    this.reportServiceService.getAllReport().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        switch (Number(data[i].monthStartDate)) {
          case this.startMonth:
            this.startMonth = Number(data[i].totalPrice);
            break;
          case this.endMonth:
            this.endMonth = Number(data[i].totalPrice);
            break;
        }
      }
      this.option = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Danh thu vé máy bay tháng'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        },
        series: [{
          name: 'Doanh thu',
          colorByPoint: true,
          data: [
            {
              name: 'Tháng' + this.select1,
              y: this.startMonth
            }
            , {
              name: 'Tháng' + this.select2,
              y: this.endMonth
            }

          ]
        }]
      };
      Highcharts.chart('container', this.option);
    },error => {
      console.log('Lỗi không có dữ liệu từ database lên')
      this.errorBadRequest= 'Không có dữ liệu ở database';
    });

  }

  getAllReportEmployee(){
    this.checkNullData = true;
    this.reportServiceService.getAllReportEmployee(this.startMonth).subscribe(value => {
      this.iReportEmployee = value;
      console.log(this.iReportEmployee);

      this.chart = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Top nhân viên bán được nhiều vé nhất'
        },
        xAxis: {
          categories: [

          ]
        },

        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: 'Thống kê theo điểm dặt vé'
          }
        },
        tooltip: {
          formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
              this.series.name + ': ' + this.y + '<br/>';
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal'
          }
        },
        series: [
          {
            name: 'Điểm đặt vé',
            data: this.arrayEmployee
          }
        ]
      };
      for (let i = 0; i < value.length; i++) {
        this.nameEmployee[i] = value[i].name_employee;
        this.arrayEmployee[i] = Number(value[i].sumPoint);
        this.chart.xAxis.categories.push(this.nameEmployee[i]);
      }
      Highcharts.chart('chart', this.chart);
    }, error => {
      this.checkNullData = false;
      console.log('Không có dữ liệu ở database !!!')
      this.errorBadRequest = 'Không có dữ liệu ở database!!';
    }) ;

  }

  getAllReportAirline(){
    this.checkNullData = true;
    this.reportServiceService.getAllReportAirline(this.fromDateAirline,this.toDateAirline).subscribe(result=> {
      this.iReportAirline = result;
      this.lineShape = {
        chart: {
          type: 'areaspline'
        },
        title: {
          text: 'Doanh thu của các hãng bay'
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
          categories: [
          ],
          plotBands: [{
            from: 4.5,
            to: 6.5,
            color: 'rgba(68, 170, 213, .2)'
          }]
        },
        yAxis: {
          title: {
            text: 'Số lượng đặt vé của các hãng bay'
          }
        },
        tooltip: {
          shared: true,
          valueSuffix: ':Firm revenue'
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          areaspline: {
            fillOpacity: 0.5
          }
        },
        series: [
          {
            name: 'Số lượng đặt vé của các hãng',
            data: this.countAirline
          }
        ]
      };
      for (let i = 0; i < result.length; i++) {
        this.nameAirline[i] = result[i].name_airline;
        this.countAirline[i] = Number(result[i].countAirline);
        this.lineShape.xAxis.categories.push(result[i].name_airline);
      }
      Highcharts.chart('charts', this.lineShape);
    },error => {
      this.checkNullData = false;
      console.log('Không có dữ liệu ở database');
      this.errorBadRequest = 'Không có dữ liệu ở database';

    });

  }


  setSelectShape(shape: HTMLSelectElement) {
    if (shape.value == '1'){
      this.checkDisable();
      this.selectShape = Number(shape.value);
    }else {
      this.checkDisableSelect1();
      this.selectShape = Number(shape.value);
    }
    this.selectShape = Number(shape.value);
  }

  setSelectRevenue(revenue: HTMLSelectElement) {
    this.checkDisable();
    this.selectRevenue = Number(revenue.value);
  }

  setFromDateAirline(fromDate: HTMLInputElement) {
    this.checkDisableInput();
    this.fromDateAirline = fromDate.value;
  }

  setToDateAirline(toDate: HTMLInputElement) {
    this.checkDisableInput();
    this.toDateAirline = toDate.value;
  }

  checkDisable(){
    if (this.selectShape == 1){
      let shape = !this.createReportForm.get('chart').errors?.required;
      let revenue = !this.createReportForm.get('revenue').errors?.required;
      let select1 = !this.createReportForm.get('select1').errors?.required;
      let select2 = !this.createReportForm.get('select2').errors?.required;
      this.checkModal = shape&&revenue&&select1&&select2;
    }else {
      this.checkDisableSelect1();
    }

  }

  checkDisableInput(){
    let shape = !this.createReportForm.get('chart').errors?.required;
    let revenue = !this.createReportForm.get('revenue').errors?.required;
    let startDate = !this.createReportForm.get('startDate').errors?.required;
    let endtDate = !this.createReportForm.get('endtDate').errors?.required;
    this.checkModal = shape&&revenue&&startDate&&endtDate;
  }

  checkDisableSelect1(){
    let shape = !this.createReportForm.get('chart').errors?.required;
    let revenue = !this.createReportForm.get('revenue').errors?.required;
    let select1 = !this.createReportForm.get('select1').errors?.required;
    this.checkModal = shape&&revenue&&select1;
  }

}
