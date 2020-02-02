import { Injectable } from '@angular/core';

interface Tour {
  id: number,
  destination: string,
  description: string,
  start_date: string,
  end_date: string,
  mode: string,
  status: string,
  cost_breakdown: Object,
  conveyance: string,
  created_by: string,
  created_at: string,
  approved_by?: string,
  rejected_by?: string,
};

@Injectable({
  providedIn: 'root'
})
export class TourService {
  tours: Array<Tour> = [
    {
      id: 1,
      destination: 'Osaka, Japan',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'pending',
      created_by: 'user',
      created_at: '1/1/2020',
      approved_by: 'manager',
      cost_breakdown: {
        ticket: 999,
        airport_cab_home: 999,
        airport_cab_destination: 999,
        hotel: 999,
      },
      conveyance: 'rented van',
    }, {
      id: 2,
      destination: 'Florence, Italy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'approved',
      created_by: 'user',
      created_at: '1/1/2020',
      approved_by: 'manager',
      cost_breakdown: {
        ticket: 999,
        airport_cab_home: 999,
        airport_cab_destination: 999,
        hotel: 999,
      },
      conveyance: 'rented van',
    }, {
      id: 3,
      destination: 'London, United Kingdom',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'rejected',
      created_by: 'user',
      created_at: '1/1/2020',
      rejected_by: 'manager',
      cost_breakdown: {
        ticket: 999,
        airport_cab_home: 999,
        airport_cab_destination: 999,
        hotel: 999,
      },
      conveyance: 'rented van',
    }
  ];

  constructor() { }

  getAll() {
    return this.tours;
  }

  getById(id) {
    return this.tours.filter((tour) => tour.id === parseInt(id, 10))[0];
  }
}
