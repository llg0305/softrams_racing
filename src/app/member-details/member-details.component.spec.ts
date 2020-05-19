import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../app.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { of, Observable } from 'rxjs';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let appService: AppService;
  let httpMock: HttpTestingController;
  let el: DebugElement;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({id: '2'}))
            // snapshot: {
            //   paramMap: convertToParamMap({
            //     id: '1'
            //   })
            // }
          }
        },
        {
          provide: AppService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    appService = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
    // route = TestBed.get(ActivatedRoute);
    // route.parent.params = Observable.of({id: 2});

    //  get the "a" element by CSS selector (e.g., by class name)
    el = fixture.debugElement.query(By.css('submit-btn-label'));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    appService = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);

    route = TestBed.get(ActivatedRoute);
    el = fixture.debugElement.query(By.css('submit-btn-label'));
  });

  it('render update member page', fakeAsync(() => {
    // expect(component).toBeTruthy();
    // fixture.detectChanges();
    // spyOn(appService, 'getMember').and.returnValue(Promise.resolve({
    //   "id": 3,
    //   "firstName": "Jeb",
    //   "lastName": "Jackson",
    //   "jobTitle": "Reserve Driver",
    //   "team": "Formula 1 - Car 77",
    //   "status": "Inactive"
    // }));
    // component.ngOnInit();
    // fixture.detectChanges();

    // expect(el.nativeElement.textContent.trim()).toBe('Update Member');
  }));

  
});
