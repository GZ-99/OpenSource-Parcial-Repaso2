import { Component, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  readonly options = [
    {link: '/home', label: 'home'},
    {link: '/services/vehicles', label: 'vehicles'},
    {link: '/services/rentals', label: 'new-rental'},
    {link: '/services/incidents', label: 'incidents'}
  ];
}
