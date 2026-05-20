import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, MatToolbarRow, MatToolbar, MatButton, RouterLinkActive,
    TranslatePipe, LanguageSwitcher, FooterContent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = [
    {link: '/home', label: 'option.home'},
    {link: '/new', label: 'option.new'},
    {link: '/services/vehicles', label: 'option.vehicles'},
    {link: '/services/rentals', label: 'option.rentals'},
    {link: '/services/incidents', label: 'option.incidents'}
  ];
}
