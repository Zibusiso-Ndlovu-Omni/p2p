import React, { useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
} from '@material-tailwind/react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h2" color="blue-gray" className="mb-4">
            Get In Touch
          </Typography>
          <Typography variant="lead" color="gray" className="max-w-2xl mx-auto">
            Have questions about the event? Need assistance with exhibition or sponsorship? 
            We're here to help make your experience exceptional.
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-lg">
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-6">
                Send us a Message
              </Typography>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  size="lg"
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  size="lg"
                  type="email"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Textarea
                  size="lg"
                  label="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  color="blue"
                >
                  Send Message
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Direct Contacts & Map */}
          <div className="space-y-8">
            {/* Direct Contacts */}
            <Card className="shadow-lg">
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-6">
                  Direct Contacts
                </Typography>
                
                <div className="space-y-6">
                  {/* General Info */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        General Information
                      </Typography>
                      <Typography color="gray" className="text-sm">
                        For general inquiries and event information
                      </Typography>
                      <Typography color="blue" className="font-medium">
                        info@event.com
                      </Typography>
                    </div>
                  </div>

                  {/* Exhibitors */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        Exhibitors
                      </Typography>
                      <Typography color="gray" className="text-sm">
                        Exhibition space, booth setup, and logistics
                      </Typography>
                      <Typography color="blue" className="font-medium">
                        exhibitors@event.com
                      </Typography>
                      <div className="flex items-center space-x-2 mt-1">
                        <PhoneIcon className="h-4 w-4 text-green-500" />
                        <Typography color="gray" className="text-sm">
                          +263 4 123 4567
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Sponsors */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <EnvelopeIcon className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <Typography variant="h6" color="blue-gray">
                        Sponsors
                      </Typography>
                      <Typography color="gray" className="text-sm">
                        Sponsorship packages and partnership opportunities
                      </Typography>
                      <Typography color="blue" className="font-medium">
                        sponsors@event.com
                      </Typography>
                      <div className="flex items-center space-x-2 mt-1">
                        <PhoneIcon className="h-4 w-4 text-purple-500" />
                        <Typography color="gray" className="text-sm">
                          +263 4 123 4568
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Event Location */}
            <Card className="shadow-lg">
              <CardBody>
                <div className="flex items-center space-x-3 mb-4">
                  <MapPinIcon className="h-6 w-6 text-red-500" />
                  <Typography variant="h5" color="blue-gray">
                    Event Location
                  </Typography>
                </div>
                
                <Typography color="gray" className="mb-4">
                  Hyatt Regency Harare
                </Typography>

                {/* Google Maps Embed */}
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.2736892873847!2d31.044444115457647!3d-17.82405278768593!2m3!1f
                    0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a4f3c8b84d81%3A0x1c4e8b5c6f7d8a2b!2sHyatt%20Regency%20Harare!5e0!3m2!1sen!2szw
                    !4v1640000000000!5m2!1sen!2szw"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hyatt Regency Harare Location"
                  ></iframe>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <Typography variant="small" color="gray">
                    <strong>Address:</strong> Corner Samora Machel Avenue & Julius Nyerere Way, Harare, Zimbabwe
                  </Typography>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;