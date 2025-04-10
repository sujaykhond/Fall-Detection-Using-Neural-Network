
import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactCardProps {
  name: string;
  phone: string;
  email: string;
}

const ContactCard = ({ name, phone, email }: ContactCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="bg-detector-blue/10 pb-4">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-detector-blue" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 text-detector-blue" />
          <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-detector-blue transition-colors">
            {phone}
          </a>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-detector-blue" />
          <a href={`mailto:${email}`} className="hover:text-detector-blue transition-colors">
            {email}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

const ContactUs = () => {
  const contacts = [
    {
      name: 'Sujay Khond',
      phone: '+91 77410 15729',
      email: 'sujaykhond@gmail.com'
    },
    {
      name: 'Parth Yendhe',
      phone: '+91 73978 93290',
      email: 'yendheparth63@gmail.com'
    },
    {
      name: 'Rohit Shinde',
      phone: '+91 99604 37623',
      email: 'shinderohit1412@gmail.com'
    },
    {
      name: 'Omkar Kadam',
      phone: '+91 98904 66174',
      email: 'omkarkadam12@gmail.com'
    }
  ];

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions about our fall detection system? Reach out to our team directly and we'll be happy to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map((contact, index) => (
            <ContactCard 
              key={index}
              name={contact.name}
              phone={contact.phone}
              email={contact.email}
            />
          ))}
        </div>

        <div className="mt-16 bg-detector-card border border-border/20 rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full p-2 rounded-md bg-detector-dark border border-border focus:ring-1 focus:ring-detector-blue focus:border-detector-blue outline-none transition-all"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full p-2 rounded-md bg-detector-dark border border-border focus:ring-1 focus:ring-detector-blue focus:border-detector-blue outline-none transition-all"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
              <input 
                type="text" 
                id="subject" 
                className="w-full p-2 rounded-md bg-detector-dark border border-border focus:ring-1 focus:ring-detector-blue focus:border-detector-blue outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message" 
                rows={5}
                className="w-full p-2 rounded-md bg-detector-dark border border-border focus:ring-1 focus:ring-detector-blue focus:border-detector-blue outline-none transition-all"
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="bg-detector-blue hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
