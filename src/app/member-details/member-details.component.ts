import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

// This interface may be useful in the times ahead...
interface Member {
  _id: string,
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  });
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.alertMessage = '';
    this.appService.getTeams().subscribe(teams => {
      this.teams = teams;

      this.route.paramMap.subscribe(params => {      
        if(params.get('id') == null){
          this.memberModel = null;
          this.memberForm.setValue({
            _id: -1,
            firstName: '',
            lastName: '',
            jobTitle: '',
            team: '',
            status: ''
          })
        }
        else{
          this.appService.getMember(params.get('id')).subscribe(member => {
            this.memberModel = {
              _id: member._id,
              firstName: member.firstName,
              lastName: member.lastName,
              jobTitle: member.jobTitle,
              team: member.team,
              status: member.status
            };
            this.memberForm.setValue({
              _id: member._id,
              firstName: member.firstName,
              lastName: member.lastName,
              jobTitle: member.jobTitle,
              team: member.team,
              status: member.status
            })
          });
        }
      });
    });
    
  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit(form: FormGroup) {
    this.submitted = true;
    if(this.memberForm.valid){
      if(this.memberForm.value._id == -1){
        this.appService.addMember(this.memberForm.value).subscribe(res => {
          if(res.success){
            this.router.navigate(['/members']);
          }
          else{
            this.alertMessage = res.message;
          }
        })
      }
      else{
        this.appService.updateMember(this.memberForm.value).subscribe(res => {
          if(res.success){
            this.router.navigate(['/members']);
          }
          else{
            this.alertMessage = res.message;
          }
        })
      }
      
    }
  }

}
