import { Component } from '@angular/core';
import { Hero } from "../../components/hero/hero";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Hero, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
