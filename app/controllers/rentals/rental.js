import Controller from '@ember/controller';
import { action } from '@ember/object';
import emailjs from 'emailjs-com';
import { inject as service } from '@ember/service';

emailjs.init('eXtD1bAoayDRr6OFJ');

export default class RentalsRentalController extends Controller {
  @service authentication;

  showSuccessToast(color, text) {
    var x = document.getElementById('snackbar');
    x.className = 'show';
    x.innerHTML = text;
    x.style.backgroundColor = color;
    setTimeout(function () {
      x.className = x.className.replace('show', '');
    }, 3000);
  }

  myAlert(text, color) {
    this.showSuccessToast(color, text);
  }

  @action
  async sendEmail() {
    let data = JSON.parse(this.authentication.user);

    ///to buyer
    const buyertemplateParams = {
      to_email: data.email,
      to_name: `${data.firstName} ${data.lastName}`,
      from_name: 'Rentify',
      from_email: 'rentify08@gmail.com',
      message: `
      Property : ${this.model.title}
      Description: ${this.model.description}
      Property Type: ${this.model.propertyType}
      Area (Sq Ft): ${this.model.areaSqFt}
      Nearby Landmarks: ${this.model.nearbyLandmarks}
      Number of Bathrooms: ${this.model.numberOfBathrooms}
      Number of Bedrooms: ${this.model.numberOfBedrooms}
      Price: $${this.model.price}

      Seller Details:
      Name: ${this.model.firstName} ${this.model.lastName}
      Email: ${this.model.email}
      Phone Number: ${this.model.phoneNumber}
      `,
    };

    // to seller
    const sellertemplateParams = {
      to_email: this.model.email,
      to_name: `${this.model.firstName} ${this.model.lastName}`,
      from_name: 'Rentify',
      from_email: 'rentify08@gmail.com',
      message: `
      Property : ${this.model.title}

      Buyer Details:
      Name: ${data.firstName} ${data.lastName}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      `,
    };

    try {
      const bresult = await emailjs.send(
        'service_c1rnnav', // Replace with your EmailJS service ID
        'template_5uycqgq', // Replace with your EmailJS template ID
        buyertemplateParams,
        'eXtD1bAoayDRr6OFJ' // Replace with your EmailJS user ID (public key)
      );

      const sresult = await emailjs.send(
        'service_c1rnnav', // Replace with your EmailJS service ID
        'template_7awsomk', // Replace with your EmailJS template ID
        sellertemplateParams,
        'eXtD1bAoayDRr6OFJ' // Replace with your EmailJS user ID (public key)
      );

      this.myAlert('Email sent successfully!', '#3fc235');
    } catch (error) {
      console.error('Error sending email:', error);
      this.myAlert('Failed to send email.', '#ee1f1f');
    }
  }
}
