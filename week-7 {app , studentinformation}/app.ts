import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {

  name: string = '';
  email: string = '';
  address: string = '';
  phone: string = '';

  submitForm(form: NgForm) {

    if (form.invalid) {
      alert("Please enter valid details");
      return;
    }

    alert("Form submitted successfully!");

    console.log({
      Name: this.name,
      Email: this.email,
      Address: this.address,
      Phone: this.phone
    });

    form.resetForm();
  }

}