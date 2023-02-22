import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm = {} as FormGroup;
  formSubmitted = false;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.contactForm = new FormGroup({
      'userData': new FormGroup({
        'name': new FormControl('', [ Validators.required ]),
        'email': new FormControl('', [ Validators.required, Validators.email ])
      }),
      'subject': new FormControl('', [ Validators.required ]),
      'message': new FormControl('', [ Validators.required, Validators.minLength(5) ])
    });

    // this.contactForm = this.formBuilder.group({
    //   userData: this.formBuilder.group({
    //     name: [ '', Validators.required ],
    //     email: [ '', [ Validators.required, Validators.email ] ]
    //   }),
    //   subject: [ '', Validators.required ],
    //   message: [ '', [ Validators.required, Validators.minLength(5) ] ]
    // })
  }

  onSubmit() {
    // console.log(this.contactForm);
    this.router.navigate([ 'home' ]);
  }
}
