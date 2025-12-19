
import React from 'react';
import { Truck, Store, Home, Utensils, Briefcase } from 'lucide-react';
import { Candidate, RoleTemplate } from './types';

export const ROLE_TEMPLATES: RoleTemplate[] = [
  { id: 'Delivery', title: 'Delivery Partner', suggestedSalary: '15,000 - 22,000', hours: '9 AM - 7 PM', icon: 'truck' },
  { id: 'Retail', title: 'Retail Sales', suggestedSalary: '12,000 - 18,000', hours: '10 AM - 9 PM', icon: 'store' },
  { id: 'Housekeeping', title: 'Housekeeping', suggestedSalary: '10,000 - 15,000', hours: '8 AM - 5 PM', icon: 'home' },
  { id: 'Kitchen Helper', title: 'Kitchen Helper', suggestedSalary: '11,000 - 16,000', hours: '11 AM - 11 PM', icon: 'utensils' },
  { id: 'Sales', title: 'Field Sales', suggestedSalary: '18,000 - 25,000', hours: 'Flexible', icon: 'briefcase' },
];

export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    role: 'Delivery',
    location: 'JP Nagar, Bangalore',
    experience: '2 years',
    education: '10th Pass',
    salaryExpectation: '18,000',
    distance: '1.2 km',
    status: 'actively_looking',
    lastActive: '2 mins ago',
    phone: '+91 9876543210',
    imageUrl: 'https://picsum.photos/seed/rahul/150/150'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Retail',
    location: 'Jayanagar, Bangalore',
    experience: '1 year',
    education: 'Graduate',
    salaryExpectation: '16,000',
    distance: '2.5 km',
    status: 'available',
    lastActive: '15 mins ago',
    phone: '+91 9876543211',
    imageUrl: 'https://picsum.photos/seed/priya/150/150'
  },
  {
    id: '3',
    name: 'Amit Singh',
    role: 'Delivery',
    location: 'JP Nagar, Bangalore',
    experience: '6 months',
    education: '10th Pass',
    salaryExpectation: '15,000',
    distance: '0.8 km',
    status: 'recently_applied',
    lastActive: '1 hour ago',
    phone: '+91 9876543212',
    imageUrl: 'https://picsum.photos/seed/amit/150/150'
  },
  {
    id: '4',
    name: 'Sneha Patil',
    role: 'Kitchen Helper',
    location: 'Koramangala, Bangalore',
    experience: 'Fresher',
    education: '10th Pass',
    salaryExpectation: '12,000',
    distance: '4.1 km',
    status: 'actively_looking',
    lastActive: '5 mins ago',
    phone: '+91 9876543213',
    imageUrl: 'https://picsum.photos/seed/sneha/150/150'
  },
  {
    id: '5',
    name: 'Vikas Reddy',
    role: 'Delivery',
    location: 'Bannerghatta, Bangalore',
    experience: '3 years',
    education: '10th Pass',
    salaryExpectation: '20,000',
    distance: '3.2 km',
    status: 'available',
    lastActive: '10 mins ago',
    phone: '+91 9876543214',
    imageUrl: 'https://picsum.photos/seed/vikas/150/150'
  },
  {
    id: '6',
    name: 'Kiran Deep',
    role: 'Housekeeping',
    location: 'HSR Layout, Bangalore',
    experience: '4 years',
    education: '8th Pass',
    salaryExpectation: '14,000',
    distance: '2.1 km',
    status: 'available',
    lastActive: '30 mins ago',
    phone: '+91 9876543215',
    imageUrl: 'https://picsum.photos/seed/kiran/150/150'
  },
  {
    id: '7',
    name: 'Arjun Das',
    role: 'Sales',
    location: 'Whitefield, Bangalore',
    experience: '2 years',
    education: 'Graduate',
    salaryExpectation: '22,000',
    distance: '5.5 km',
    status: 'actively_looking',
    lastActive: '1 min ago',
    phone: '+91 9876543216',
    imageUrl: 'https://picsum.photos/seed/arjun/150/150'
  }
];
