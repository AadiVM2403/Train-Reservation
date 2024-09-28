import { Component } from '@angular/core';

interface Seat {
  seatNumber: number;
  row: number;
  isBooked: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Seat Reservation';
  seats: Seat[] = [];
  maxSeats = 80;
  seatsInRow = 7;
  lastRowSeats = 3;

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    let seatNumber = 1;

    // Initialize rows except the last one (rows 1 to 11)
    for (let row = 1; row <= 11; row++) {
      for (let i = 0; i < this.seatsInRow; i++) {
        this.seats.push({
          seatNumber: seatNumber++,
          row: row,
          isBooked: false,
        });
      }
    }

    // Initialize the last row (row 12) with only 3 seats
    for (let i = 0; i < this.lastRowSeats; i++) {
      this.seats.push({
        seatNumber: seatNumber++,
        row: 12,
        isBooked: false,
      });
    }
  }

  bookSeats(numOfSeats: number): void {
    if (numOfSeats > 7) {
      alert('Cannot book more than 7 seats at a time.');
      return;
    }

    const availableSeats = this.findAvailableSeats(numOfSeats);
    if (availableSeats.length < numOfSeats) {
      alert('Not enough seats available.');
      return;
    }

    for (let seat of availableSeats) {
      seat.isBooked = true;
    }

    console.log(
      `Booked seats: ${availableSeats
        .map((seat) => seat.seatNumber)
        .join(', ')}`
    );
  }

  findAvailableSeats(numOfSeats: number): Seat[] {
    // First, try to book seats in the same row
    for (let row = 1; row <= 12; row++) {
      let availableInRow = this.seats.filter(
        (seat) => seat.row === row && !seat.isBooked
      );
      if (availableInRow.length >= numOfSeats) {
        return availableInRow.slice(0, numOfSeats);
      }
    }

    // If no row has enough, find the closest available seats
    return this.seats.filter((seat) => !seat.isBooked).slice(0, numOfSeats);
  }

  getSeatClass(seat: Seat): string {
    return seat.isBooked ? 'booked-seat' : 'available-seat';
  }
}
