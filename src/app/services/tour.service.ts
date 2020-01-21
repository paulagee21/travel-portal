import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  tours = [
    {
      id: 1,
      name: 'test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'pending',
      created_by: 'user'
    }, {
      id: 2,
      name: 'test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'approved',
      created_by: 'user'
    }, {
      id: 3,
      name: 'test',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu ligula lacinia, laoreet nibh posuere, posuere purus. Sed aliquet leo eu mi suscipit laoreet. Vivamus in tincidunt enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      start_date: '2/4/2020',
      end_date: '2/18/2020',
      mode: 'plane',
      status: 'rejected',
      created_by: 'user'
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
