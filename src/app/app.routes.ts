import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';

const about = () => import('./shared/presentation/views/about/about').then(m => m.About);
const pageNotFound = () => import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const baseTitle = 'Rent-A-Car';

export const routes: Routes = [
  { path: 'home', component: Home, title: `${baseTitle} - Home`  },
  { path: 'about', loadComponent: about, title: `${baseTitle} - About`  },
  { path: 'services', loadChildren: () => import('./services/presentation/views/services.routes').then(m => m.servicesRoutes)},
  { path: '', redirectTo: '/home', pathMatch: 'full'  },
  { path: '**', loadComponent:  pageNotFound, title: `${baseTitle} - Page Not Found`  },
];
