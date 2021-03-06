import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './resume/resume.module#ResumeModule'
  },
  {
    path: 'resume',
    loadChildren: './resume/resume.module#ResumeModule'
  },
  {
    path: 'portfolio',
    loadChildren: './portfolio/portfolio.module#PortfolioModule'
  },
  {
    path: 'about',
    loadChildren: './about/about.module#AboutModule'
  },
  // {
  //   path: 'references',
  //   loadChildren: './references/references.module#ReferencesModule'
  // },
];
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' });
