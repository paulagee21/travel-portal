import { Injectable } from '@angular/core';

interface Tour {
  id: number,
  destination: string,
  description: string,
  start_date: string,
  end_date: string,
  mode: string,
  status: string,
  conveyance: string,
  hotel: number,
  ticket: number,
  airport_cab_home: number,
  airport_cab_destination: number,
  supporting_documents?: Array<any>,
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
      mode: 'airplane',
      status: 'pending',
      created_by: 'user',
      created_at: '1/1/2020',
      approved_by: 'manager',
      ticket: 999,
      airport_cab_home: 999,
      airport_cab_destination: 999,
      hotel: 999,
      conveyance: 'rented van',
    }, {
      id: 2,
      destination: 'Florence, Italy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'airplane',
      status: 'approved',
      created_by: 'user',
      created_at: '1/1/2020',
      approved_by: 'manager',
      ticket: 999,
      airport_cab_home: 999,
      airport_cab_destination: 999,
      hotel: 999,
      conveyance: 'rented van',
      supporting_documents: [
        {
          description: 'desc',
          image: 'https://i.pinimg.com/originals/35/00/f0/3500f0ea8dc332f61a91a5246f43317e.jpg'
        }
      ]
    }, {
      id: 3,
      destination: 'London, United Kingdom',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'airplane',
      status: 'rejected',
      created_by: 'user',
      created_at: '1/1/2020',
      rejected_by: 'manager',
      ticket: 999,
      airport_cab_home: 999,
      airport_cab_destination: 999,
      hotel: 999,
      conveyance: 'rented van',
    }, {
      id: 4,
      destination: 'Syndey, Australia',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'airplane',
      status: 'draft',
      created_by: 'user',
      created_at: '1/1/2020',
      ticket: 999,
      airport_cab_home: 999,
      airport_cab_destination: 999,
      hotel: 999,
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

  submit(id, data) {
    //
  }

  create(data) {
    //
  }

  update(id, data) {
    //
  }
}
